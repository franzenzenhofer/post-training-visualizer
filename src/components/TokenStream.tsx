import { useEffect, useRef, useState } from 'react'

const TOKEN_COLORS = [
  '#3366cc', '#14866d', '#b32424', '#7c3aed',
  '#0d9488', '#d97706', '#db2777', '#2563eb',
  '#16a34a', '#ca8a04', '#c026d3', '#ea580c',
]

function hashColor(token: string, index: number): string {
  return TOKEN_COLORS[(index + token.charCodeAt(0)) % TOKEN_COLORS.length]
}

const TOKEN_DELAY_MS = 300

interface TokenStreamProps {
  tokens: string[]
  isStreaming: boolean
}

export function TokenStream({ tokens, isStreaming }: TokenStreamProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (tokens.length === 0) {
      setVisibleCount(0)
      return
    }
    if (visibleCount >= tokens.length && !isStreaming) return

    timerRef.current = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= tokens.length) {
          if (timerRef.current) clearInterval(timerRef.current)
          return prev
        }
        return prev + 1
      })
    }, TOKEN_DELAY_MS)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [tokens.length, isStreaming, visibleCount])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [visibleCount])

  const showCursor = isStreaming || visibleCount < tokens.length

  return (
    <div
      ref={containerRef}
      className="min-h-[60px] max-h-[180px] overflow-y-auto font-mono text-[15px] leading-relaxed"
    >
      {tokens.slice(0, visibleCount).map((token, i) => (
        <span
          key={i}
          className="token-animate inline"
          style={{ color: hashColor(token, i) }}
        >
          {token}
        </span>
      ))}
      {showCursor && (
        <span className="cursor-blink ml-0.5 text-[#3366cc]">|</span>
      )}
    </div>
  )
}
