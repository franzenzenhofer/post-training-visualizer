interface Env {
  OPENROUTER_API_KEY: string;
  ASSETS: Fetcher;
  PER_IP_LIMITER: RateLimit;
  GLOBAL_LIMITER: RateLimit;
}

const OPENROUTER_URL = "https://openrouter.ai/api/v1/completions";
const MODEL = "meta-llama/llama-3.3-70b-instruct";
// Only providers verified to pass the prompt through raw. Others (Groq,
// Parasail, Novita) silently wrap it in the chat template, which turns the
// "base model babble" of step 1 into a polite assistant answer.
const RAW_COMPLETION_PROVIDERS = ["DeepInfra", "Together"];
const MAX_PROMPT_CHARS = 2000;
const MAX_TOKENS_LIMIT = 120;
const DEFAULT_MAX_TOKENS = 80;
const DEFAULT_TEMPERATURE = 0.7;

interface CompletionRequest {
  prompt: string;
  max_tokens: number;
  temperature: number;
}

function errorResponse(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function clamp(value: unknown, min: number, max: number, fallback: number): number {
  if (typeof value !== "number" || Number.isNaN(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

function parseCompletionRequest(raw: unknown): CompletionRequest | string {
  if (typeof raw !== "object" || raw === null) return "Body must be a JSON object";
  const { prompt, max_tokens, temperature } = raw as Record<string, unknown>;
  if (typeof prompt !== "string" || prompt.trim() === "") return "prompt must be a non-empty string";
  if (prompt.length > MAX_PROMPT_CHARS) return `prompt exceeds ${MAX_PROMPT_CHARS} characters`;
  return {
    prompt,
    max_tokens: clamp(max_tokens, 1, MAX_TOKENS_LIMIT, DEFAULT_MAX_TOKENS),
    temperature: clamp(temperature, 0, 2, DEFAULT_TEMPERATURE),
  };
}

// Browsers always send Origin on a POST fetch; only our own page may call the proxy.
function isSameOrigin(request: Request): boolean {
  return request.headers.get("Origin") === new URL(request.url).origin;
}

async function isRateLimited(request: Request, env: Env): Promise<boolean> {
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const [perIp, global] = await Promise.all([
    env.PER_IP_LIMITER.limit({ key: ip }),
    env.GLOBAL_LIMITER.limit({ key: "all" }),
  ]);
  return !perIp.success || !global.success;
}

async function handleCompletions(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") return errorResponse("Method not allowed", 405);
  if (!isSameOrigin(request)) return errorResponse("Forbidden origin", 403);
  if (await isRateLimited(request, env)) {
    return errorResponse("Too many requests - please wait a minute and try again.", 429);
  }
  if (!env.OPENROUTER_API_KEY) return errorResponse("OPENROUTER_API_KEY not configured", 500);

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return errorResponse("Invalid JSON body", 400);
  }
  const parsed = parseCompletionRequest(raw);
  if (typeof parsed === "string") return errorResponse(parsed, 400);

  const upstream = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://posttraining.franzai.com",
      "X-Title": "Post-Training Visualizer",
    },
    body: JSON.stringify({
      ...parsed,
      model: MODEL,
      stream: true,
      // Fallbacks stay on so a busy DeepInfra fails over to Together; `only` (and the
      // key guardrail) keep routing inside the raw-completion providers.
      provider: { only: RAW_COMPLETION_PROVIDERS },
    }),
  });

  if (!upstream.ok) {
    const errText = await upstream.text();
    console.error(`OpenRouter ${upstream.status}: ${errText}`);
    return errorResponse(`OpenRouter API error: ${upstream.status} ${errText}`, upstream.status);
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: { "Content-Type": upstream.headers.get("Content-Type") ?? "text/event-stream" },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/completions") return handleCompletions(request, env);
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
