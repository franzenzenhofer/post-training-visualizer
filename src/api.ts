const WORKER_URL = import.meta.env.DEV
  ? 'http://localhost:8787'
  : '' // same origin in production

const MODEL = 'meta-llama/Meta-Llama-3.1-405B'

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
  const response = await fetch(`${WORKER_URL}/api/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
