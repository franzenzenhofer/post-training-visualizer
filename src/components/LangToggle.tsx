interface LangToggleProps {
  lang: 'en' | 'de'
  onToggle: () => void
}

export function LangToggle({ lang, onToggle }: LangToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="rounded border border-[#a2a9b1] px-3 py-1 text-sm font-bold text-[#3366cc] hover:bg-[#eaecf0]"
    >
      {lang === 'en' ? 'DE' : 'EN'}
    </button>
  )
}
