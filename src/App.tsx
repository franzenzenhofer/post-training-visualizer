import { useCallback, useEffect, useState } from 'react'
import { SLIDES_EN, SLIDES_DE } from './prompts'
import { LangToggle } from './components/LangToggle'
import { Slide } from './components/Slide'

function App() {
  const [lang, setLang] = useState<'en' | 'de'>('en')
  const [slideIndex, setSlideIndex] = useState(0)
  const [started, setStarted] = useState(false)

  const slides = lang === 'en' ? SLIDES_EN : SLIDES_DE

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'de' : 'en'))
    setSlideIndex(0)
  }, [])

  const goNext = useCallback(() => {
    setSlideIndex((i) => Math.min(i + 1, slides.length - 1))
  }, [slides.length])

  const goPrev = useCallback(() => {
    setSlideIndex((i) => Math.max(i - 1, 0))
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev])

  const t = {
    title:
      lang === 'de'
        ? 'Wie Post-Training funktioniert'
        : 'How Post-Training Works',
    subtitle:
      lang === 'de'
        ? 'Ein Basismodell sagt nur das naechste Wort voraus. Post-Training bringt ihm bei, Fragen zu beantworten. Alle Prompts sind editierbar — experimentiere selbst!'
        : 'A base model just predicts the next word. Post-training teaches it to answer questions. All prompts are editable — experiment yourself!',
    start: lang === 'de' ? 'Demo starten' : 'Start Demo',
    model:
      lang === 'de'
        ? 'Llama 3.1 405B — pures Basismodell, kein Instruct, kein Chat'
        : 'Llama 3.1 405B — pure base model, no instruct, no chat',
  }

  if (!started) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6">
        <div className="absolute top-4 right-6">
          <LangToggle lang={lang} onToggle={toggleLang} />
        </div>
        <div className="max-w-[600px] text-center">
          <h1 className="mb-4 text-[2.2rem] font-normal leading-tight text-[#000]">
            {t.title}
          </h1>
          <p className="mb-6 text-[16px] leading-relaxed text-[#202122]">
            {t.subtitle}
          </p>
          <p className="mb-8 rounded bg-[#f8f9fa] border border-[#eaecf0] px-4 py-2 font-mono text-xs text-[#54595d]">
            {t.model}
          </p>
          <button
            onClick={() => setStarted(true)}
            className="rounded border border-[#3366cc] bg-[#3366cc] px-8 py-3 text-lg font-bold text-white hover:bg-[#2a4b8d] transition-all"
          >
            {t.start}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="absolute top-4 right-6 z-10">
        <LangToggle lang={lang} onToggle={toggleLang} />
      </div>
      <Slide
        key={slides[slideIndex].id}
        slide={slides[slideIndex]}
        slideIndex={slideIndex}
        totalSlides={slides.length}
        onPrev={goPrev}
        onNext={goNext}
        lang={lang}
      />
    </div>
  )
}

export default App
