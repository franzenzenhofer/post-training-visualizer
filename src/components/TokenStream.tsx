import { useEffect, useRef, useState } from 'react'

const TOKEN_BG_COLORS = [
  '#dbeafe', '#d1fae5', '#fef3c7', '#fee2e2',
  '#ede9fe', '#ccfbf1', '#ffedd5', '#fce7f3',
  '#e0e7ff', '#dcfce7', '#fef9c3', '#f5d0fe',
]

const TOKEN_TEXT_COLORS = [
  '#1e40af', '#065f46', '#92400e', '#991b1b',
  '#5b21b6', '#115e59', '#9a3412', '#9d174d',
  '#1e3a8a', '#166534', '#854d0e', '#86198f',
]

function hashIndex(token: string, index: number): number {
  return (index + token.charCodeAt(0)) % TOKEN_BG_COLORS.length
}

const TOKEN_DELAY_MS = 300

interface TokenStreamProps {
  tokens: string[]
  isStreaming: boolean
  onVisibleCountChange: (count: number) => void
}

export function TokenStream({
  tokens,
  isStreaming,
  onVisibleCountChange,
}: TokenStreamProps) {
  const [visibleCount, setVisibleCount] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (tokens.length === 0) {
      setVisibleCount(0)
      onVisibleCountChange(0)
      return
    }
    if (visibleCount >= tokens.length && !isStreaming) return

    timerRef.current = setInterval(() => {
      setVisibleCount((prev) => {
        const next = prev >= tokens.length ? prev : prev + 1
        if (next >= tokens.length && timerRef.current) {
          clearInterval(timerRef.current)
        }
        return next
      })
    }, TOKEN_DELAY_MS)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [tokens.length, isStreaming, visibleCount, onVisibleCountChange])

  useEffect(() => {
    onVisibleCountChange(visibleCount)
  }, [visibleCount, onVisibleCountChange])

  const showCursor = isStreaming || visibleCount < tokens.length

  return (
    <div className="token-output min-h-[18em] font-mono text-[15px] leading-loose">
      {tokens.slice(0, visibleCount).map((token, i) => {
        const ci = hashIndex(token, i)
        return (
          <span
            key={i}
            className="token-animate rounded-sm px-[1px] mx-[1px]"
            style={{
              backgroundColor: TOKEN_BG_COLORS[ci],
              color: TOKEN_TEXT_COLORS[ci],
              whiteSpace: 'pre',
            }}
          >
            {token}
          </span>
        )
      })}
      {showCursor && (
        <span className="cursor-blink ml-0.5 text-[#3366cc] font-bold">|</span>
      )}
    </div>
  )
}
