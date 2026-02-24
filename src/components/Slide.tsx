import { useCallback, useEffect, useRef, useState } from 'react'
import type { SlideConfig } from '../prompts'
import { streamCompletion } from '../api'
import { TokenStream } from './TokenStream'

interface SlideProps {
  slide: SlideConfig
  slideIndex: number
  totalSlides: number
  onPrev: () => void
  onNext: () => void
  lang: 'en' | 'de'
}

export function Slide({
  slide,
  slideIndex,
  totalSlides,
  onPrev,
  onNext,
  lang,
}: SlideProps) {
  const [prompt, setPrompt] = useState(slide.defaultPrompt)
  const [tokens, setTokens] = useState<string[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [visibleTokenCount, setVisibleTokenCount] = useState(0)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    setPrompt(slide.defaultPrompt)
    setTokens([])
    setError(null)
    setIsStreaming(false)
    abortRef.current?.abort()
  }, [slide.defaultPrompt])

  const handleGenerate = useCallback(() => {
    abortRef.current?.abort()
    setTokens([])
    setError(null)
    setIsStreaming(true)

    const controller = new AbortController()
    abortRef.current = controller

    streamCompletion(
      prompt,
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
  }, [prompt])

  const handleStop = useCallback(() => {
    abortRef.current?.abort()
    setIsStreaming(false)
  }, [])

  const handleReset = useCallback(() => {
    setPrompt(slide.defaultPrompt)
    setTokens([])
    setError(null)
  }, [slide.defaultPrompt])

  const isFirst = slideIndex === 0
  const isLast = slideIndex === totalSlides - 1
  const borderColor = slide.expectsBabble ? '#d33' : '#14866d'

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 mx-auto w-full max-w-[800px] px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <span className="text-sm text-[#72777d]">
            {slideIndex + 1} / {totalSlides}
          </span>
        </div>

        {/* Title + Description */}
        <h2
          className="mb-2 text-2xl font-normal text-[#000] border-b border-[#a2a9b1] pb-2"
        >
          {slide.title}
        </h2>
        <p className="mb-6 text-[15px] leading-relaxed text-[#202122]">
          {slide.description}
        </p>

        {/* Editable Prompt */}
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#72777d]">
              {lang === 'de' ? 'Prompt (editierbar)' : 'Prompt (editable)'}
            </label>
            {prompt !== slide.defaultPrompt && (
              <button
                onClick={handleReset}
                className="text-xs text-[#3366cc] hover:underline"
              >
                {lang === 'de' ? 'Zuruecksetzen' : 'Reset to default'}
              </button>
            )}
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={Math.min(prompt.split('\n').length + 1, 12)}
            className="w-full rounded border border-[#a2a9b1] bg-white px-3 py-2 font-mono text-[13px] leading-relaxed text-[#202122] outline-none focus:border-[#3366cc] resize-y overflow-y-scroll"
          />
        </div>

        {/* Generate Button */}
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={isStreaming ? handleStop : handleGenerate}
            className={`rounded px-5 py-2.5 text-sm font-bold transition-all ${
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

        {/* Output */}
        {(tokens.length > 0 || isStreaming) && (
          <div
            className="mb-4 rounded border-l-4 bg-[#f8f9fa] border border-[#a2a9b1] p-4"
            style={{ borderLeftColor: borderColor }}
          >
            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[#72777d]">
              {lang === 'de' ? 'Modell-Ausgabe' : 'Model output'} ({visibleTokenCount} tokens)
            </div>
            <TokenStream
              tokens={tokens}
              isStreaming={isStreaming}
              onVisibleCountChange={setVisibleTokenCount}
            />
          </div>
        )}

        {error && (
          <div className="mb-4 rounded border border-[#d33] bg-[#fee7e6] p-3 text-sm text-[#d33]">
            {error}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="border-t border-[#a2a9b1] bg-[#f8f9fa] px-6 py-4">
        <div className="mx-auto flex max-w-[800px] items-center justify-between">
          <button
            onClick={onPrev}
            disabled={isFirst}
            className={`rounded px-4 py-2 text-sm font-bold ${
              isFirst
                ? 'text-[#c8ccd1] cursor-not-allowed'
                : 'text-[#3366cc] hover:bg-[#eaecf0] border border-[#a2a9b1]'
            }`}
          >
            {lang === 'de' ? 'Zurueck' : 'Previous'}
          </button>
          <span className="text-sm text-[#72777d]">
            {lang === 'de' ? `Schritt ${slideIndex + 1} von ${totalSlides}` : `Step ${slideIndex + 1} of ${totalSlides}`}
          </span>
          <button
            onClick={onNext}
            disabled={isLast}
            className={`rounded px-4 py-2 text-sm font-bold ${
              isLast
                ? 'text-[#c8ccd1] cursor-not-allowed'
                : 'border border-[#3366cc] bg-[#3366cc] text-white hover:bg-[#2a4b8d]'
            }`}
          >
            {lang === 'de' ? 'Weiter' : 'Next'}
          </button>
        </div>
      </nav>
    </div>
  )
}
