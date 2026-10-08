// Display name of the model the worker calls (worker/src/index.ts pins the actual id).
export const MODEL_NAME = 'Llama 3.3 70B'
export const MODEL_ENDPOINT_NOTE = {
  en: 'raw /v1/completions, no chat template',
  de: 'roher /v1/completions-Aufruf, ohne Chat-Template',
} as const
