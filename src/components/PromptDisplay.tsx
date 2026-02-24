interface PromptDisplayProps {
  text: string
  label: string
}

export function PromptDisplay({ text, label }: PromptDisplayProps) {
  const lines = text.split('\n')

  return (
    <div className="rounded-lg border border-zinc-700/50 bg-zinc-900/80 p-4">
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </div>
      <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-zinc-300">
        {lines.map((line, i) => {
          const isQuestion = line.startsWith('Q:') || line.startsWith('Frage:')
          const isAnswer = line.startsWith('A:') || line.startsWith('Antwort:')
          const isTarget =
            line.includes('Are oranges blue?') ||
            line.includes('Sind Orangen blau?')

          let color = 'text-zinc-300'
          if (isTarget && isQuestion) color = 'text-amber-400 font-semibold'
          else if (isQuestion) color = 'text-indigo-400'
          else if (isAnswer) color = 'text-emerald-400'

          return (
            <span key={i} className={color}>
              {line}
              {i < lines.length - 1 ? '\n' : ''}
            </span>
          )
        })}
      </pre>
    </div>
  )
}
