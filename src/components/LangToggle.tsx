interface LangToggleProps {
  lang: 'en' | 'de'
  onToggle: () => void
}

export function LangToggle({ lang, onToggle }: LangToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="rounded border border-[#a2a9b1] px-3 py-1 text-sm font-bold hover:bg-[#eaecf0] flex items-center gap-1"
    >
      <span style={{ color: lang === 'de' ? '#3366cc' : '#72777d' }}>DE</span>
      <span className="text-[#a2a9b1]">|</span>
      <span style={{ color: lang === 'en' ? '#3366cc' : '#72777d' }}>EN</span>
    </button>
  )
}
