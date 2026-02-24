interface LangToggleProps {
  lang: 'en' | 'de'
  onToggle: () => void
}

export function LangToggle({ lang, onToggle }: LangToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm font-medium text-zinc-400 transition-all hover:border-zinc-500 hover:text-zinc-200"
    >
      {lang === 'en' ? 'DE' : 'EN'}
    </button>
  )
}
