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
  const isBaseModel = demo.id.startsWith('base')

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

  const borderColor = isBaseModel ? '#d33' : '#14866d'
  const badgeBg = isBaseModel ? '#fee7e6' : '#d5fdf4'
  const badgeColor = isBaseModel ? '#d33' : '#14866d'

  return (
    <div
      className="rounded bg-[#f8f9fa] border-l-4 p-5"
      style={{ borderLeftColor: borderColor }}
    >
      <span
        className="inline-block rounded px-2 py-0.5 text-xs font-bold"
        style={{ background: badgeBg, color: badgeColor }}
      >
        {isBaseModel
          ? lang === 'de' ? 'Plappert' : 'Babbles'
          : lang === 'de' ? 'Antwortet korrekt' : 'Answers correctly'}
      </span>

      <h3 className="mt-2 mb-1 text-lg font-bold text-[#202122]">{title}</h3>
      <p className="mb-3 text-[14px] leading-relaxed text-[#54595d]">{desc}</p>

      <PromptDisplay
        text={demo.displayPrompt}
        label={lang === 'de' ? 'Prompt an das Modell' : 'Prompt sent to model'}
      />

      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={isStreaming ? handleStop : handleGenerate}
          className={`rounded px-4 py-2 text-sm font-bold transition-all ${
            isStreaming
              ? 'border border-[#a2a9b1] bg-[#f8f9fa] text-[#202122] hover:bg-[#eaecf0]'
              : 'border border-[#3366cc] bg-[#3366cc] text-white hover:bg-[#2a4b8d]'
          }`}
        >
          {isStreaming
            ? lang === 'de' ? 'Stopp' : 'Stop'
            : lang === 'de' ? 'Generieren' : 'Generate'}
        </button>
        <span className="font-mono text-xs text-[#72777d]">
          Llama 3.1 405B BASE
        </span>
      </div>

      {(tokens.length > 0 || isStreaming) && (
        <div className="mt-3 rounded border border-[#a2a9b1] bg-white p-4">
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[#72777d]">
            {lang === 'de' ? 'Modell-Ausgabe' : 'Model output'} ({tokens.length}{' '}
            tokens)
          </div>
          <TokenStream tokens={tokens} isStreaming={isStreaming} />
        </div>
      )}

      {error && (
        <div className="mt-3 rounded border border-[#d33] bg-[#fee7e6] p-3 text-sm text-[#d33]">
          {error}
        </div>
      )}
    </div>
  )
}
