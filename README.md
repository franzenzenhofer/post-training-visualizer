# Post-Training Visualizer

Live: https://posttraining.franzai.com

Interactive EN/DE slide demo of what post-training does: a language model called
without its chat template babbles, then few-shot patterns turn it into a helpful,
sarcastic or free-form "assistant" - the same mechanism post-training burns into
the weights.

## Stack

- React 19 + Vite + Tailwind 4 (`src/`), all slide copy in `src/prompts.ts` and
  `src/components/SummarySlide.tsx`, model display name in `src/model.ts`
- Cloudflare Worker (`worker/src/index.ts`) serves `dist/` and proxies
  `POST /api/completions` to OpenRouter `/v1/completions`

## Inference and abuse protection

- Model `meta-llama/llama-3.3-70b-instruct`, providers pinned to DeepInfra and
  Together: the only ones verified to pass raw prompts through without applying
  the chat template.
- The worker sets model, providers and streaming itself; the client may only send
  `prompt` (max 2000 chars), `max_tokens` (max 120) and `temperature`.
- Same-origin check, rate limits 30/min per IP and 200/min global.
- The OpenRouter key has a 2 USD/month cap plus a guardrail allowing only this
  model on these providers at 0.25 USD/day.

## Commands

```bash
npm install && (cd worker && npm install)
npm run dev        # frontend only (no /api)
npx wrangler dev   # full app incl. worker, needs OPENROUTER_API_KEY (--var or .dev.vars)
npm run deploy     # typecheck + lint + build + wrangler deploy
```
