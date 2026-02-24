export interface DemoConfig {
  id: string
  titleEN: string
  titleDE: string
  descEN: string
  descDE: string
  prompt: string
  displayPrompt: string
  stopSequence?: string
  highlightRanges?: PromptHighlight[]
}

export interface PromptHighlight {
  start: number
  end: number
  color: string
  label: string
}

const BASE_RAW: DemoConfig = {
  id: 'base-raw',
  titleEN: 'Base Model (Raw)',
  titleDE: 'Basismodell (Roh)',
  descEN: 'The base model receives the question as raw text. It has no concept of "answering" — it just predicts what text comes next, as if continuing a document.',
  descDE: 'Das Basismodell erhaelt die Frage als rohen Text. Es hat kein Konzept von "Antworten" — es sagt nur voraus, welcher Text als naechstes kommt, als wuerde es ein Dokument fortsetzen.',
  prompt: 'Are oranges blue?',
  displayPrompt: 'Are oranges blue?',
}

const FEWSHOT_EN: DemoConfig = {
  id: 'fewshot-en',
  titleEN: 'Few-Shot Q&A (English)',
  titleDE: 'Few-Shot Frage & Antwort (Englisch)',
  descEN: 'Same base model, but now the prompt contains Q&A examples. The model recognizes the pattern and continues it correctly. This is what post-training "bakes in" — so you do not need the examples every time.',
  descDE: 'Dasselbe Basismodell, aber der Prompt enthaelt Frage-Antwort-Beispiele. Das Modell erkennt das Muster und setzt es korrekt fort. Genau das wird beim Post-Training "eingebrannt" — sodass man die Beispiele nicht jedes Mal braucht.',
  prompt: `Q: Is the sky green?
A: No, the sky is typically blue.

Q: Are dogs plants?
A: No, dogs are animals, not plants.

Q: Is water dry?
A: No, water is wet.

Q: Are oranges blue?
A:`,
  displayPrompt: `Q: Is the sky green?
A: No, the sky is typically blue.

Q: Are dogs plants?
A: No, dogs are animals, not plants.

Q: Is water dry?
A: No, water is wet.

Q: Are oranges blue?
A:`,
  highlightRanges: [
    { start: 0, end: 21, color: '#6366f1', label: 'Question' },
    { start: 22, end: 58, color: '#22c55e', label: 'Answer' },
    { start: 60, end: 79, color: '#6366f1', label: 'Question' },
    { start: 80, end: 116, color: '#22c55e', label: 'Answer' },
    { start: 118, end: 133, color: '#6366f1', label: 'Question' },
    { start: 134, end: 152, color: '#22c55e', label: 'Answer' },
    { start: 154, end: 175, color: '#f59e0b', label: 'Our Question' },
  ],
}

const FEWSHOT_DE: DemoConfig = {
  id: 'fewshot-de',
  titleEN: 'Few-Shot Q&A (German)',
  titleDE: 'Few-Shot Frage & Antwort (Deutsch)',
  descEN: 'It also works in German! The pattern is language-independent. The base model learned both languages during pre-training.',
  descDE: 'Es funktioniert auch auf Deutsch! Das Muster ist sprachunabhaengig. Das Basismodell hat beide Sprachen beim Pre-Training gelernt.',
  prompt: `Frage: Ist der Himmel gruen?
Antwort: Nein, der Himmel ist normalerweise blau.

Frage: Sind Hunde Pflanzen?
Antwort: Nein, Hunde sind Tiere, keine Pflanzen.

Frage: Ist Wasser trocken?
Antwort: Nein, Wasser ist nass.

Frage: Sind Orangen blau?
Antwort:`,
  displayPrompt: `Frage: Ist der Himmel gruen?
Antwort: Nein, der Himmel ist normalerweise blau.

Frage: Sind Hunde Pflanzen?
Antwort: Nein, Hunde sind Tiere, keine Pflanzen.

Frage: Ist Wasser trocken?
Antwort: Nein, Wasser ist nass.

Frage: Sind Orangen blau?
Antwort:`,
}

const FREEFORM_EN: DemoConfig = {
  id: 'freeform-en',
  titleEN: 'Freeform (English)',
  titleDE: 'Freiform (Englisch)',
  descEN: 'No rigid Q&A format needed. Natural language examples work too — the model picks up on the conversational pattern.',
  descDE: 'Kein starres Frage-Antwort-Format noetig. Natuerliche Sprachbeispiele funktionieren auch — das Modell erkennt das Konversationsmuster.',
  prompt: `Someone asked me if ice is hot. Obviously not — ice is cold, that's the whole point.

Then they asked if the sun is dark. No way, the sun is incredibly bright.

Next question: Are oranges blue? Well,`,
  displayPrompt: `Someone asked me if ice is hot. Obviously not — ice is cold, that's the whole point.

Then they asked if the sun is dark. No way, the sun is incredibly bright.

Next question: Are oranges blue? Well,`,
}

const BASE_DE: DemoConfig = {
  id: 'base-de',
  titleEN: 'Base Model - German (Raw)',
  titleDE: 'Basismodell - Deutsch (Roh)',
  descEN: 'Same babbling behavior in German. The base model just continues text — it does not answer.',
  descDE: 'Dasselbe Plapper-Verhalten auf Deutsch. Das Basismodell setzt nur Text fort — es antwortet nicht.',
  prompt: 'Sind Orangen blau?',
  displayPrompt: 'Sind Orangen blau?',
}

export const DEMOS: DemoConfig[] = [
  BASE_RAW,
  FEWSHOT_EN,
  FEWSHOT_DE,
  FREEFORM_EN,
  BASE_DE,
]
