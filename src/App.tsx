import { useCallback, useState } from 'react'
import { DEMOS } from './prompts'
import { getApiKey } from './api'
import { DemoCard } from './components/DemoCard'
import { ApiKeyInput } from './components/ApiKeyInput'
import { LangToggle } from './components/LangToggle'

function App() {
  const [lang, setLang] = useState<'en' | 'de'>('en')
  const [hasKey, setHasKey] = useState(!!getApiKey())

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'de' : 'en'))
  }, [])

  const t = {
    title:
      lang === 'de'
        ? 'Wie Post-Training funktioniert'
        : 'How Post-Training Works',
    subtitle:
      lang === 'de'
        ? 'Ein Basismodell sagt nur das naechste Wort voraus. Post-Training bringt ihm bei, Fragen zu beantworten.'
        : 'A base model just predicts the next word. Post-training teaches it to answer questions.',
    insight:
      lang === 'de'
        ? 'Post-Training = diese Muster in die Modellgewichte einbrennen, sodass man die Beispiele nicht jedes Mal im Prompt braucht.'
        : 'Post-training = baking these patterns INTO the model weights, so you do not need the examples in the prompt every time.',
    apiKey: lang === 'de' ? 'Hyperbolic API Key' : 'Hyperbolic API Key',
    model:
      lang === 'de'
        ? 'Alle Demos nutzen dasselbe Basismodell: Llama 3.1 405B (kein Instruct, kein Chat — pures Basismodell)'
        : 'All demos use the same base model: Llama 3.1 405B (no instruct, no chat — pure base model)',
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
            {t.title}
          </h1>
          <LangToggle lang={lang} onToggle={toggleLang} />
        </div>
        <p className="text-lg leading-relaxed text-zinc-400">{t.subtitle}</p>
        <p className="mt-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 font-mono text-xs text-zinc-500">
          {t.model}
        </p>
      </header>

      <section className="mb-6">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-500">
          {t.apiKey}
        </h2>
        <ApiKeyInput onKeySet={() => setHasKey(true)} />
      </section>

      {hasKey && (
        <div className="space-y-6">
          {DEMOS.map((demo) => (
            <DemoCard key={demo.id} demo={demo} lang={lang} />
          ))}

          <div className="rounded-xl border border-amber-500/30 bg-amber-950/10 p-6">
            <h3 className="mb-2 text-lg font-bold text-amber-400">
              {lang === 'de' ? 'Die Erkenntnis' : 'The Insight'}
            </h3>
            <p className="text-base leading-relaxed text-zinc-300">
              {t.insight}
            </p>
          </div>
        </div>
      )}

      <footer className="mt-12 border-t border-zinc-800 pt-6 text-center text-xs text-zinc-600">
        <p>
          {lang === 'de'
            ? 'Erstellt mit Llama 3.1 405B BASE via Hyperbolic API'
            : 'Built with Llama 3.1 405B BASE via Hyperbolic API'}
        </p>
        <p className="mt-1">
          {lang === 'de'
            ? 'Keine Daten werden gespeichert. API-Key bleibt in deinem Browser.'
            : 'No data stored. API key stays in your browser.'}
        </p>
      </footer>
    </div>
  )
}

export default App
