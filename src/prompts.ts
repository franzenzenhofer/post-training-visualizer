export interface SlideConfig {
  id: string
  title: string
  description: string
  defaultPrompt: string
  expectsBabble: boolean
  insight: string
  static?: boolean
}

export const SLIDES_EN: SlideConfig[] = [
  {
    id: 'base-en',
    title: 'Step 1: The Raw Base Model',
    description:
      'Llama 3.1 405B is a base model — 405 billion parameters, trained by Meta on trillions of words from the internet. "Base model" means it was trained on one task only: predict the next word. No instructions. No chat. No personality. Just raw pattern completion. Every AI assistant you know — ChatGPT, Claude, Gemini — starts as something like this before post-training shapes it into a product.',
    defaultPrompt: 'Are oranges blue?',
    expectsBabble: true,
    insight:
      "This is not a bug — it's doing exactly what it was trained to do. The model isn't \"thinking.\" It's predicting the statistically likely next token based on patterns in its training data. A base model is a prediction engine, not an assistant. Without post-training, no AI product can exist.",
  },
  {
    id: 'fewshot-en',
    title: 'Step 2: Pattern Recognition (The Core Trick)',
    description:
      'Same model. Not a single weight changed. We just added Q&A examples to the prompt. The model detects the pattern and continues it — answering correctly. This manual trick is exactly what post-training does automatically, at industrial scale: AI companies feed the model millions of Q&A pairs, so the pattern gets permanently burned into the weights. After that, users never need to provide examples.',
    defaultPrompt: `Q: Is the sky green?
A: No, the sky is typically blue.

Q: Are dogs plants?
A: No, dogs are animals, not plants.

Q: Is water dry?
A: No, water is wet.

Q: Are oranges blue?
A:`,
    expectsBabble: false,
    insight:
      "You just did post-training manually. Anthropic, OpenAI, and Google do this with millions of examples and human and AI raters who score which answers are best. That scoring process — called RLHF (Reinforcement Learning from Human Feedback) — is the secret sauce. It's also their biggest moat: base models are increasingly similar, but the preference data is proprietary.",
  },
  {
    id: 'personality-en',
    title: 'Step 3: The Pattern Defines the Personality',
    description:
      'Same Q&A format — but now the examples teach a completely different personality: a sarcastic bot. The model has no values, no opinions, no character of its own. It just continues whatever pattern the examples establish. This is exactly how AI providers create distinct products from the same base model: change the training examples, change the personality. Claude sounds like Claude. GPT-5 sounds like GPT-5. That\'s post-training.',
    defaultPrompt: `Q: Is the sky green?
A: Oh absolutely, right next to the purple sun and the square moon. No — the sky is blue.

Q: Are dogs plants?
A: Yes, everyone knows dogs photosynthesize. Obviously not — dogs are animals.

Q: Is water dry?
A: Completely dry, that's why swimming is so comfortable. Of course not — water is wet.

Q: Are oranges blue?
A:`,
    expectsBabble: false,
    insight:
      "Same format as Step 2. Same base model. But now the examples demonstrate sarcasm — and the model continues that pattern. Post-training at scale does this with millions of examples that encode values, tone, safety, helpfulness, and personality. The examples are the product.",
  },
  {
    id: 'freeform-en',
    title: "Step 4: It's Not the Format — It's the Pattern",
    description:
      'Q&A structure is not required. Any consistent conversational pattern works. This is why post-trained models can handle poetry, code, customer service, legal documents, and casual chat with the same underlying mechanism. AI providers use this to create specialized models for specific industries — same base, different post-training data.',
    defaultPrompt: `Someone asked me if ice is hot. Obviously not — ice is cold, that's the whole point.

Then they asked if the sun is dark. No way, the sun is incredibly bright.

Next question: Are oranges blue? Well,`,
    expectsBabble: false,
    insight:
      'One base model, infinite products. Meta releases Llama 3.1 405B — then hundreds of companies fine-tune it for medicine, law, coding, customer support. The pre-training (the expensive part: $100M+) is shared. The post-training (the cheap, fast, proprietary part) is what creates differentiated products. This is why open-source base models are so strategically important.',
  },
  {
    id: 'summary-en',
    title: "Why Post-Training is the AI Industry's Most Powerful Lever",
    description: '',
    defaultPrompt: '',
    expectsBabble: false,
    insight: '',
    static: true,
  },
]

export const SLIDES_DE: SlideConfig[] = [
  {
    id: 'base-de',
    title: 'Schritt 1: Das rohe Basismodell',
    description:
      'Llama 3.1 405B ist ein Basismodell — 405 Milliarden Parameter, trainiert von Meta auf Billionen Wörtern aus dem Internet. "Basismodell" bedeutet: es wurde auf eine einzige Aufgabe trainiert — das nächste Wort vorherzusagen. Keine Anweisungen. Kein Chat. Keine Persönlichkeit. Nur Mustervervollständigung. Jeder KI-Assistent — ChatGPT, Claude, Gemini — beginnt als etwas Ähnliches, bevor Post-Training daraus ein Produkt macht.',
    defaultPrompt: 'Sind Orangen blau?',
    expectsBabble: true,
    insight:
      'Das ist kein Fehler — es tut genau das, wofür es trainiert wurde. Das Modell "denkt" nicht. Es sagt das statistisch wahrscheinlichste nächste Token voraus. Ein Basismodell ist eine Vorhersagemaschine, kein Assistent. Ohne Post-Training kann kein KI-Produkt existieren.',
  },
  {
    id: 'fewshot-de',
    title: 'Schritt 2: Mustererkennung (Der Kerntrick)',
    description:
      'Gleiches Modell. Kein einziges Gewicht verändert. Wir haben dem Prompt nur Q&A-Beispiele hinzugefügt. Das Modell erkennt das Muster und setzt es fort. Genau das macht Post-Training automatisch, im industriellen Maßstab: KI-Unternehmen füttern das Modell mit Millionen von Q&A-Paaren, sodass das Muster dauerhaft in die Gewichte eingebrannt wird. Danach brauchen Nutzer keine Beispiele mehr anzugeben.',
    defaultPrompt: `Frage: Ist der Himmel grün?
Antwort: Nein, der Himmel ist normalerweise blau.

Frage: Sind Hunde Pflanzen?
Antwort: Nein, Hunde sind Tiere, keine Pflanzen.

Frage: Ist Wasser trocken?
Antwort: Nein, Wasser ist nass.

Frage: Sind Orangen blau?
Antwort:`,
    expectsBabble: false,
    insight:
      'Du hast gerade manuell Post-Training durchgeführt. Anthropic, OpenAI und Google machen das mit Millionen von Beispielen und menschlichen sowie KI-basierten Bewertern. Dieser Bewertungsprozess — RLHF genannt — ist der entscheidende Wettbewerbsvorteil. Die proprietären Präferenzdaten sind der echte Moat der KI-Unternehmen.',
  },
  {
    id: 'personality-de',
    title: 'Schritt 3: Das Muster definiert die Persönlichkeit',
    description:
      'Gleiches Q&A-Format — aber jetzt lehren die Beispiele eine völlig andere Persönlichkeit: einen sarkastischen Bot. Das Modell hat keine Werte, keine Meinungen, keinen eigenen Charakter. Es setzt nur das Muster fort, das die Beispiele etablieren. Genau so erstellen KI-Anbieter unterschiedliche Produkte aus demselben Basismodell: Beispiele ändern, Persönlichkeit ändern. Claude klingt wie Claude. GPT-5 klingt wie GPT-5. Das ist Post-Training.',
    defaultPrompt: `Frage: Ist der Himmel grün?
Antwort: Natürlich, direkt neben der lila Sonne und dem eckigen Mond. Nein — der Himmel ist blau.

Frage: Sind Hunde Pflanzen?
Antwort: Ja, jeder weiß dass Hunde Photosynthese betreiben. Natürlich nicht — Hunde sind Tiere.

Frage: Ist Wasser trocken?
Antwort: Absolut trocken, deshalb ist Schwimmen so angenehm. Natürlich nicht — Wasser ist nass.

Frage: Sind Orangen blau?
Antwort:`,
    expectsBabble: false,
    insight:
      'Gleiches Format wie Schritt 2. Gleiches Basismodell. Aber jetzt demonstrieren die Beispiele Sarkasmus — und das Modell setzt dieses Muster fort. Post-Training im großen Maßstab macht das mit Millionen von Beispielen, die Werte, Ton, Sicherheit und Persönlichkeit kodieren. Die Beispiele sind das Produkt.',
  },
  {
    id: 'freeform-de',
    title: 'Schritt 4: Es geht um das Muster, nicht das Format',
    description:
      'Eine Q&A-Struktur ist nicht notwendig. Jedes konsistente Gesprächsmuster funktioniert. Deshalb können post-trainierte Modelle Poesie, Code, Kundendienst und juristische Dokumente mit demselben Mechanismus bearbeiten. KI-Anbieter nutzen das, um spezialisierte Modelle für bestimmte Branchen zu erstellen — gleiche Basis, andere Post-Training-Daten.',
    defaultPrompt: `Jemand hat mich gefragt, ob Eis heiß ist. Natürlich nicht — Eis ist kalt, das ist ja der Punkt.

Dann fragten sie, ob die Sonne dunkel ist. Auf keinen Fall, die Sonne ist unglaublich hell.

Nächste Frage: Sind Orangen blau? Nun,`,
    expectsBabble: false,
    insight:
      'Ein Basismodell, unendliche Produkte. Meta veröffentlicht Llama 3.1 405B — dann passen hunderte von Unternehmen es für Medizin, Recht, Coding, Kundensupport an. Das Pre-Training (der teure Teil: 100M€+) wird geteilt. Das Post-Training (der günstige, schnelle, proprietäre Teil) schafft differenzierte Produkte.',
  },
  {
    id: 'summary-de',
    title: 'Warum Post-Training der mächtigste Hebel der KI-Industrie ist',
    description: '',
    defaultPrompt: '',
    expectsBabble: false,
    insight: '',
    static: true,
  },
]
