export interface SlideConfig {
  id: string
  title: string
  description: string
  defaultPrompt: string
  expectsBabble: boolean
}

export const SLIDES_EN: SlideConfig[] = [
  {
    id: 'base-en',
    title: 'Base Model (Raw)',
    description:
      'The base model receives the question as raw text. It has no concept of "answering" — it just predicts what text comes next, as if continuing a document.',
    defaultPrompt: 'Are oranges blue?',
    expectsBabble: true,
  },
  {
    id: 'fewshot-en',
    title: 'Few-Shot Q&A',
    description:
      'Same base model, but now the prompt contains Q&A examples. The model recognizes the pattern and continues it correctly. This is what post-training "bakes in".',
    defaultPrompt: `Q: Is the sky green?
A: No, the sky is typically blue.

Q: Are dogs plants?
A: No, dogs are animals, not plants.

Q: Is water dry?
A: No, water is wet.

Q: Are oranges blue?
A:`,
    expectsBabble: false,
  },
  {
    id: 'freeform-en',
    title: 'Freeform',
    description:
      'No rigid Q&A format needed. Natural language examples work too — the model picks up on the conversational pattern.',
    defaultPrompt: `Someone asked me if ice is hot. Obviously not — ice is cold, that's the whole point.

Then they asked if the sun is dark. No way, the sun is incredibly bright.

Next question: Are oranges blue? Well,`,
    expectsBabble: false,
  },
]

export const SLIDES_DE: SlideConfig[] = [
  {
    id: 'base-de',
    title: 'Basismodell (Roh)',
    description:
      'Das Basismodell erhaelt die Frage als rohen Text. Es hat kein Konzept von "Antworten" — es sagt nur voraus, welcher Text als naechstes kommt.',
    defaultPrompt: 'Sind Orangen blau?',
    expectsBabble: true,
  },
  {
    id: 'fewshot-de',
    title: 'Few-Shot Frage & Antwort',
    description:
      'Dasselbe Basismodell, aber der Prompt enthaelt Frage-Antwort-Beispiele. Das Modell erkennt das Muster und setzt es korrekt fort.',
    defaultPrompt: `Frage: Ist der Himmel gruen?
Antwort: Nein, der Himmel ist normalerweise blau.

Frage: Sind Hunde Pflanzen?
Antwort: Nein, Hunde sind Tiere, keine Pflanzen.

Frage: Ist Wasser trocken?
Antwort: Nein, Wasser ist nass.

Frage: Sind Orangen blau?
Antwort:`,
    expectsBabble: false,
  },
  {
    id: 'freeform-de',
    title: 'Freiform',
    description:
      'Kein starres Format noetig. Natuerliche Sprachbeispiele funktionieren auch — das Modell erkennt das Konversationsmuster.',
    defaultPrompt: `Jemand hat mich gefragt, ob Eis heiss ist. Natuerlich nicht — Eis ist kalt, das ist ja der Punkt.

Dann fragten sie, ob die Sonne dunkel ist. Auf keinen Fall, die Sonne ist unglaublich hell.

Naechste Frage: Sind Orangen blau? Nun,`,
    expectsBabble: false,
  },
]
