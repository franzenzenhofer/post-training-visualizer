import { useEffect, useRef } from 'react'

const TOKEN_COLORS = [
  '#818cf8', '#34d399', '#fbbf24', '#f87171',
  '#a78bfa', '#2dd4bf', '#fb923c', '#f472b6',
  '#60a5fa', '#4ade80', '#facc15', '#e879f9',
]

function hashColor(token: string, index: number): string {
  return TOKEN_COLORS[(index + token.charCodeAt(0)) % TOKEN_COLORS.length]
}

interface TokenStreamProps {
  tokens: string[]
  isStreaming: boolean
}

export function TokenStream({ tokens, isStreaming }: TokenStreamProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [tokens])

  return (
    <div
      ref={containerRef}
      className="min-h-[60px] max-h-[120px] overflow-y-auto font-mono text-base leading-relaxed"
    >
      {tokens.map((token, i) => (
        <span
          key={i}
          className="token-animate inline"
          style={{
            color: hashColor(token, i),
            animationDelay: `${i * 0.02}s`,
          }}
        >
          {token}
        </span>
      ))}
      {isStreaming && (
        <span className="cursor-blink ml-0.5 text-white">|</span>
      )}
    </div>
  )
}
