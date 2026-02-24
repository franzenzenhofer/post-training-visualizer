import { useCallback, useRef, useState } from 'react'
import type { DemoConfig } from '../prompts'
import { streamCompletion } from '../api'
import { PromptDisplay } from './PromptDisplay'
import { TokenStream } from './TokenStream'

interface DemoCardProps {
  demo: DemoConfig
  lang: 'en' | 'de'
}

export function DemoCard({ demo, lang }: DemoCardProps) {
  const [tokens, setTokens] = useState<string[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const title = lang === 'de' ? demo.titleDE : demo.titleEN
  const desc = lang === 'de' ? demo.descDE : demo.descEN

  const handleGenerate = useCallback(() => {
    abortRef.current?.abort()
    setTokens([])
    setError(null)
    setIsStreaming(true)

    const controller = new AbortController()
    abortRef.current = controller

    streamCompletion(
      demo.prompt,
      {
        onToken: (token) => setTokens((prev) => [...prev, token]),
        onDone: () => setIsStreaming(false),
        onError: (err) => {
          setError(err)
          setIsStreaming(false)
        },
      },
      controller.signal,
    ).catch(() => setIsStreaming(false))
  }, [demo.prompt])

  const handleStop = useCallback(() => {
    abortRef.current?.abort()
    setIsStreaming(false)
  }, [])

  const isBaseModel = demo.id.startsWith('base')

  return (
    <div
      className={`rounded-xl border p-6 transition-all ${
        isBaseModel
          ? 'border-red-500/30 bg-red-950/10'
          : 'border-emerald-500/30 bg-emerald-950/10'
      }`}
    >
      <div className="mb-1 flex items-center gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isBaseModel
              ? 'bg-red-500/20 text-red-400'
              : 'bg-emerald-500/20 text-emerald-400'
          }`}
        >
          {isBaseModel
            ? lang === 'de'
              ? 'Plappert'
              : 'Babbles'
            : lang === 'de'
              ? 'Antwortet korrekt'
              : 'Answers correctly'}
        </span>
      </div>

      <h3 className="mb-2 text-xl font-bold text-zinc-100">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-zinc-400">{desc}</p>

      <PromptDisplay
        text={demo.displayPrompt}
        label={lang === 'de' ? 'Prompt an das Modell' : 'Prompt sent to model'}
      />

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={isStreaming ? handleStop : handleGenerate}
          disabled={false}
          className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
            isStreaming
              ? 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
              : 'bg-indigo-600 text-white hover:bg-indigo-500'
          }`}
        >
          {isStreaming
            ? lang === 'de'
              ? 'Stopp'
              : 'Stop'
            : lang === 'de'
              ? 'Generieren'
              : 'Generate'}
        </button>
        <span className="font-mono text-xs text-zinc-600">
          Llama 3.1 405B BASE
        </span>
      </div>

      {(tokens.length > 0 || isStreaming) && (
        <div className="mt-4 rounded-lg border border-zinc-700/50 bg-zinc-950 p-4">
          <div className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
            {lang === 'de' ? 'Modell-Ausgabe' : 'Model output'} ({tokens.length}{' '}
            tokens)
          </div>
          <TokenStream tokens={tokens} isStreaming={isStreaming} />
        </div>
      )}

      {error && (
        <div className="mt-3 rounded-lg border border-red-500/30 bg-red-950/30 p-3 text-sm text-red-400">
          {error}
        </div>
      )}
    </div>
  )
}
