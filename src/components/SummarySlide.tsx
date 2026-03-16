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
      <p className="text-[14px] leading-relaxed text-[#202122]">{body}</p>
    </div>
  )
}

const CONTENT = {
  en: {
    intro:
      'You just ran three experiments on a real 405-billion parameter model. Here is what they reveal about the AI industry:',
    cards: [
      {
        borderColor: '#3366cc',
        bgColor: '#f0f4ff',
        title: 'The knowledge is already there',
        body: "Base models are trained on virtually all human text — science, history, code, medicine, everything. Post-training doesn't add knowledge. It shapes how that knowledge gets expressed. This is why post-training is cheap relative to pre-training: you're not teaching the model new facts, you're teaching it new behavior.",
      },
      {
        borderColor: '#14866d',
        bgColor: '#f0fff8',
        title: 'Pre-training costs $100M+. Post-training costs thousands.',
        body: 'Training GPT-5 or Claude Opus 4.6 from scratch costs hundreds of millions of dollars and months of compute. Post-training the same model to behave differently costs a fraction — and can be done in days. This asymmetry is why every AI company obsessively fine-tunes: it is the highest-leverage operation in AI development.',
      },
      {
        borderColor: '#d33',
        bgColor: '#fff0f0',
        title: "The real moat is human preference data",
        body: "Base models are converging — GPT-5, Llama 4 Maverick, Gemini 3.1 Pro, Claude Opus 4.6 all have access to similar internet data. What isn't shared is each company's RLHF dataset: millions of human ratings about which AI responses are better. That proprietary preference data — not the model weights — is increasingly the competitive differentiator. It's why Anthropic, OpenAI, and Google employ thousands of human raters.",
      },
      {
        borderColor: '#f0a500',
        bgColor: '#fffbf0',
        title: "Post-training is also how AI gets its personality",
        body: "Claude Opus 4.6 sounds like Claude. GPT-5 sounds like ChatGPT. Gemini 3.1 Pro sounds like Gemini. That's not the base model — it's post-training. Values, tone, refusals, verbosity, humor, caution — all post-training decisions. Every AI company is essentially programming a personality at scale through the examples and feedback they choose to train on.",
      },
    ],
    footer:
      'This demo uses Llama 3.1 405B via Hyperbolic — a real base model, no instruction tuning, no post-training. All prompts are editable. Go back and experiment.',
  },
  de: {
    intro:
      'Du hast gerade drei Experimente mit einem echten 405-Milliarden-Parameter-Modell durchgeführt. Hier ist, was sie über die KI-Industrie verraten:',
    cards: [
      {
        borderColor: '#3366cc',
        bgColor: '#f0f4ff',
        title: 'Das Wissen ist bereits vorhanden',
        body: 'Basismodelle werden auf nahezu allen menschlichen Texten trainiert. Post-Training fügt kein Wissen hinzu — es formt, wie dieses Wissen ausgedrückt wird. Deshalb ist Post-Training günstig: Du lehrst das Modell keine neuen Fakten, sondern ein neues Verhalten.',
      },
      {
        borderColor: '#14866d',
        bgColor: '#f0fff8',
        title: 'Pre-Training kostet 100M€+. Post-Training kostet Tausende.',
        body: 'GPT-5 oder Claude Opus 4.6 von Grund auf zu trainieren kostet Hunderte von Millionen und dauert Monate. Dasselbe Modell durch Post-Training anders zu gestalten kostet einen Bruchteil — und kann in Tagen erledigt werden. Diese Asymmetrie ist der Grund, warum jedes KI-Unternehmen so obsessiv fine-tuned.',
      },
      {
        borderColor: '#d33',
        bgColor: '#fff0f0',
        title: 'Der echte Moat sind menschliche Präferenzdaten',
        body: 'Was nicht geteilt wird, sind die RLHF-Datensätze jedes Unternehmens: Millionen menschlicher Bewertungen darüber, welche KI-Antworten besser sind. Diese proprietären Präferenzdaten — nicht die Modellgewichte — sind der zunehmend entscheidende Wettbewerbsvorteil.',
      },
      {
        borderColor: '#f0a500',
        bgColor: '#fffbf0',
        title: 'Post-Training gibt der KI ihre Persönlichkeit',
        body: 'Claude klingt wie Claude. ChatGPT klingt wie ChatGPT. Das ist nicht das Basismodell — es ist Post-Training. Werte, Ton, Ablehnungen, Ausführlichkeit, Humor — alles Post-Training-Entscheidungen. Jedes KI-Unternehmen programmiert im Grunde eine Persönlichkeit im großen Maßstab.',
      },
    ],
    footer:
      'Diese Demo verwendet Llama 3.1 405B über Hyperbolic — ein echtes Basismodell, kein Instruction-Tuning, kein Post-Training. Alle Prompts sind editierbar. Geh zurück und experimentiere.',
  },
}

export function SummarySlide({ lang }: SummarySlideProps) {
  const c = CONTENT[lang]
  return (
    <div className="space-y-4 text-[15px] leading-relaxed text-[#202122]">
      <p>{c.intro}</p>
      {c.cards.map((card) => (
        <InsightCard key={card.title} {...card} />
      ))}
      <p className="text-[13px] text-[#72777d] border-t border-[#eaecf0] pt-4">
        {c.footer}
      </p>
    </div>
  )
}
