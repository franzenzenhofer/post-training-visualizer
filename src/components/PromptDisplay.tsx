interface PromptDisplayProps {
  text: string
  label: string
}

export function PromptDisplay({ text, label }: PromptDisplayProps) {
  const lines = text.split('\n')

  return (
    <div className="rounded border border-[#a2a9b1] bg-white p-3">
      <div className="mb-1 text-xs font-bold uppercase tracking-wider text-[#72777d]">
        {label}
      </div>
      <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#202122]">
        {lines.map((line, i) => {
          const isQuestion = line.startsWith('Q:') || line.startsWith('Frage:')
          const isAnswer = line.startsWith('A:') || line.startsWith('Antwort:')
          const isTarget =
            line.includes('Are oranges blue?') ||
            line.includes('Sind Orangen blau?')

          let style = 'text-[#202122]'
          if (isTarget && isQuestion) style = 'text-[#b32424] font-bold'
          else if (isQuestion) style = 'text-[#3366cc]'
          else if (isAnswer) style = 'text-[#14866d]'

          return (
            <span key={i} className={style}>
              {line}
              {i < lines.length - 1 ? '\n' : ''}
            </span>
          )
        })}
      </pre>
    </div>
  )
}
