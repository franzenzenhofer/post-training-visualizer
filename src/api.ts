const API_URL = 'https://api.hyperbolic.xyz/v1/completions'
const MODEL = 'meta-llama/Meta-Llama-3.1-405B'

export function getApiKey(): string | null {
  return localStorage.getItem('hyperbolic_api_key')
}

export function setApiKey(key: string): void {
  localStorage.setItem('hyperbolic_api_key', key)
}

interface StreamCallbacks {
  onToken: (token: string) => void
  onDone: () => void
  onError: (error: string) => void
}

export async function streamCompletion(
  prompt: string,
  callbacks: StreamCallbacks,
  signal?: AbortSignal,
): Promise<void> {
  const apiKey = getApiKey()
  if (!apiKey) {
    callbacks.onError('No API key set')
    return
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      max_tokens: 80,
      temperature: 0.7,
      stream: true,
    }),
    signal,
  })

  if (!response.ok) {
    const err = await response.text()
    callbacks.onError(`API error: ${response.status} - ${err}`)
    return
  }

  const reader = response.body?.getReader()
  if (!reader) {
    callbacks.onError('No response stream')
    return
  }

  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || !trimmed.startsWith('data: ')) continue
      const data = trimmed.slice(6)
      if (data === '[DONE]') {
        callbacks.onDone()
        return
      }
      try {
        const parsed = JSON.parse(data)
        const text = parsed.choices?.[0]?.text
        if (text) callbacks.onToken(text)
      } catch {
        // skip malformed chunks
      }
    }
  }

  callbacks.onDone()
}
