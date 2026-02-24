interface Env {
  HYPERBOLIC_API_KEY: string;
}

const HYPERBOLIC_URL = "https://api.hyperbolic.xyz/v1/completions";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function handleOptions(): Response {
  return new Response(null, { status: 204, headers: corsHeaders });
}

function errorResponse(message: string, status: number): Response {
  return new Response(
    JSON.stringify({ error: message }),
    {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
}

async function handleCompletions(
  request: Request,
  env: Env,
): Promise<Response> {
  if (request.method !== "POST") {
    return errorResponse("Method not allowed", 405);
  }

  if (!env.HYPERBOLIC_API_KEY) {
    return errorResponse("HYPERBOLIC_API_KEY not configured", 500);
  }

  let body: string;
  try {
    body = await request.text();
    JSON.parse(body);
  } catch {
    return errorResponse("Invalid JSON body", 400);
  }

  const upstream = await fetch(HYPERBOLIC_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.HYPERBOLIC_API_KEY}`,
    },
    body,
  });

  if (!upstream.ok) {
    const errText = await upstream.text();
    return errorResponse(
      `Hyperbolic API error: ${upstream.status} ${errText}`,
      upstream.status,
    );
  }

  const responseHeaders = new Headers(corsHeaders);
  const contentType = upstream.headers.get("Content-Type");
  if (contentType) {
    responseHeaders.set("Content-Type", contentType);
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

export default {
  async fetch(
    request: Request,
    env: Env,
  ): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return handleOptions();
    }

    if (url.pathname === "/api/completions") {
      return handleCompletions(request, env);
    }

    return errorResponse("Not found", 404);
  },
} satisfies ExportedHandler<Env>;
