import { MODEL_ENDPOINT_NOTE, MODEL_NAME } from '../model'

interface SummarySlideProps {
  lang: 'en' | 'de'
}

interface InsightCardProps {
  borderColor: string
  bgColor: string
  title: string
  body: string
}

function InsightCard({ borderColor, bgColor, title, body }: InsightCardProps) {
  return (
    <div
      className="rounded px-4 py-3"
      style={{ borderLeft: `4px solid ${borderColor}`, background: bgColor }}
    >
      <div className="font-bold text-[#202122] mb-1">{title}</div>
      <p className="text-base leading-relaxed text-[#202122]">{body}</p>
    </div>
  )
}

const CONTENT = {
  en: {
    intro:
      'You just ran four experiments on a real language model, talking to it the way it looked before post-training. Here is what they reveal about the AI industry:',
    cards: [
      {
        borderColor: '#3366cc',
        bgColor: '#f0f4ff',
        title: 'The knowledge is already there',
        body: "Base models are trained on a vast slice of human text - science, history, code, medicine. Post-training adds little new knowledge. It shapes how that knowledge gets expressed: as helpful answers, in a consistent voice, within safety limits. You're not teaching the model new facts, you're teaching it new behavior.",
      },
      {
        borderColor: '#14866d',
        bgColor: '#f0fff8',
        title: 'Pre-training builds the engine. Post-training decides what it does.',
        body: 'Pre-training a frontier model costs hundreds of millions of dollars and months of compute. For a long time post-training was the cheap step on top. Not anymore: frontier labs now run reinforcement learning at pretraining scale, because that is where reasoning, reliability and the differences between products come from. At the other end, fine-tuning an open model for a niche still costs only a few thousand dollars.',
      },
      {
        borderColor: '#d33',
        bgColor: '#fff0f0',
        title: 'The real moat is the feedback data',
        body: "Frontier base models learn from much of the same public internet. What isn't shared is each company's post-training data: example conversations, human and AI ratings of which answers are better, and libraries of tasks with automatically checkable answers. That proprietary feedback - not just the model weights - is a key competitive differentiator, which is why Anthropic, OpenAI and Google invest so heavily in evaluation pipelines.",
      },
      {
        borderColor: '#f0a500',
        bgColor: '#fffbf0',
        title: 'Post-training is also how AI gets its personality',
        body: "Claude sounds like Claude. ChatGPT sounds like ChatGPT. Gemini sounds like Gemini. That's not the base model - it's post-training. Values, tone, refusals, verbosity, humor, caution - all post-training decisions. Every AI company is essentially programming a personality at scale through the examples and feedback it chooses to train on.",
      },
    ],
    footer: `This demo uses ${MODEL_NAME} (${MODEL_ENDPOINT_NOTE.en}) via OpenRouter. All prompts are editable. Go back and experiment.`,
  },
  de: {
    intro:
      'Du hast gerade vier Experimente mit einem echten Sprachmodell gemacht - so angesprochen, wie es vor dem Post-Training war. Hier ist, was sie über die KI-Industrie verraten:',
    cards: [
      {
        borderColor: '#3366cc',
        bgColor: '#f0f4ff',
        title: 'Das Wissen ist bereits vorhanden',
        body: 'Basismodelle werden auf einem riesigen Teil menschlicher Texte trainiert. Post-Training fügt kaum neues Wissen hinzu - es formt, wie dieses Wissen ausgedrückt wird: als hilfreiche Antwort, mit gleichbleibender Stimme, innerhalb von Sicherheitsgrenzen. Du lehrst das Modell keine neuen Fakten, sondern ein neues Verhalten.',
      },
      {
        borderColor: '#14866d',
        bgColor: '#f0fff8',
        title: 'Pre-Training baut den Motor. Post-Training entscheidet, was er tut.',
        body: 'Ein Frontier-Modell vorzutrainieren kostet Hunderte Millionen Dollar und Monate an Rechenzeit. Lange war Post-Training der günstige Schritt obendrauf. Das ist vorbei: Die führenden Labore betreiben Reinforcement Learning inzwischen im Maßstab des Pre-Trainings, weil dort Reasoning, Verlässlichkeit und die Unterschiede zwischen Produkten entstehen. Am anderen Ende kostet es weiterhin nur ein paar tausend Dollar, ein offenes Modell für eine Nische zu fine-tunen.',
      },
      {
        borderColor: '#d33',
        bgColor: '#fff0f0',
        title: 'Der echte Burggraben sind die Feedback-Daten',
        body: 'Frontier-Basismodelle lernen großteils aus demselben öffentlichen Internet. Was nicht geteilt wird, sind die Post-Training-Daten jedes Unternehmens: Beispiel-Gespräche, Bewertungen von Menschen und KI, welche Antworten besser sind, und Sammlungen von Aufgaben mit automatisch prüfbaren Lösungen. Dieses proprietäre Feedback - nicht nur die Modellgewichte - ist ein entscheidender Wettbewerbsvorteil.',
      },
      {
        borderColor: '#f0a500',
        bgColor: '#fffbf0',
        title: 'Post-Training gibt der KI ihre Persönlichkeit',
        body: 'Claude klingt wie Claude. ChatGPT klingt wie ChatGPT. Gemini klingt wie Gemini. Das ist nicht das Basismodell - es ist Post-Training. Werte, Ton, Ablehnungen, Ausführlichkeit, Humor - alles Post-Training-Entscheidungen. Jedes KI-Unternehmen programmiert im Grunde eine Persönlichkeit im großen Maßstab.',
      },
    ],
    footer: `Diese Demo verwendet ${MODEL_NAME} (${MODEL_ENDPOINT_NOTE.de}) über OpenRouter. Alle Prompts sind editierbar. Geh zurück und experimentiere.`,
  },
}

export function SummarySlide({ lang }: SummarySlideProps) {
  const c = CONTENT[lang]
  return (
    <div className="space-y-4 text-base leading-relaxed text-[#202122]">
      <p>{c.intro}</p>
      {c.cards.map((card) => (
        <InsightCard key={card.title} {...card} />
      ))}
      <p className="text-base text-[#72777d] border-t border-[#eaecf0] pt-4">
        {c.footer}
      </p>
    </div>
  )
}
