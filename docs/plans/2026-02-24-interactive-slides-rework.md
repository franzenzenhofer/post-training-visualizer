# Interactive Slides Rework

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the one-pager into interactive slides with editable prompts, Cloudflare Worker API proxy, and full EN/DE separation.

**Architecture:** Slide-based SPA with prev/next navigation. CF Worker proxies Hyperbolic API (key in .env). Each language has 3 slides: base raw, few-shot Q&A, freeform. All prompts are editable textareas.

**Tech Stack:** Vite + React + TS + Tailwind, Cloudflare Worker (wrangler)

---

### Task 1: Cloudflare Worker API Proxy
- Create `worker/` directory with wrangler config
- Worker accepts POST, forwards to Hyperbolic with API key from env
- Supports streaming (SSE passthrough)

### Task 2: Restructure Prompts by Language
- EN mode: 3 slides (base raw EN, few-shot EN, freeform EN)
- DE mode: 3 slides (base raw DE, few-shot DE, freiform DE)
- No mixing languages

### Task 3: Slide Navigation
- Full-viewport slides with prev/next + keyboard arrows
- Slide counter (1/3)
- Smooth transitions

### Task 4: Editable Prompts
- Replace static PromptDisplay with textarea
- Default text from prompts.ts, user can edit
- Reset button to restore default

### Task 5: Update API client
- Point to CF Worker URL instead of direct Hyperbolic
- Remove client-side API key handling

### Task 6: Commit + Deploy
