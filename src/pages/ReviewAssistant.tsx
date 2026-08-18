import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, ArrowRight, ArrowLeft, Loader2, Check,
  ExternalLink, RefreshCw, PenLine,
} from 'lucide-react';
import { Link } from 'wouter';

// ─── Constants ───────────────────────────────────────────────────────────────

const GOOGLE_REVIEW_LINK = 'https://g.page/r/CQSGbY8MMiX7EAE/review';

const PRODUCT_CATEGORIES = [
  'CPVC/PVC pipes',
  'Bathroom sanitaryware',
  'Borewell fittings',
  'Plumbing fittings',
  'Taps & fixtures',
] as const;

type ProductCategory = typeof PRODUCT_CATEGORIES[number];

const KEYWORD_GROUPS: Record<string, string[]> = {
  'Product Quality': [
    'Quality pipes',
    'Durable fittings',
    'Genuine/authentic brands',
    'Wide variety',
    'Good stock availability',
  ],
  'Pricing': [
    'Fair pricing',
    'Best price in Balasore',
    'Value for money',
    'No overcharging',
  ],
  'Service': [
    'Helpful staff',
    'Expert advice',
    'Quick installation help',
    'Friendly behavior',
    'Patient with questions',
  ],
  'Delivery': [
    'Fast delivery',
    'Same-day dispatch',
    'On-time delivery',
    'Careful packaging',
  ],
  'Trust': [
    'Trusted since years',
    'Recommended by others',
    'First-time customer great experience',
    'Repeat customer',
  ],
};

// ─── Gemini API ───────────────────────────────────────────────────────────────

async function generateReviewsWithGroq(
  rating: number,
  product: ProductCategory,
  tags: string[],
  name: string,
  apiKey: string
): Promise<string[]> {
  const prompt = `You are a review-writing assistant for Ambika Agency, a plumbing, sanitaryware, and pipe fitting shop in Balasore, Odisha.

Generate a SHORT, natural-sounding Google review in a casual mix of Hindi, English, and Odia (written in Roman/English script — NOT Devanagari or Odia script) based on the customer's selected keywords. This is how locals in Balasore actually text — a natural Hinglish-Odia blend, not pure Hindi.

Rules:
- Weave the selected keywords into natural sentences — do NOT list them or state them literally as phrases. Rephrase each keyword idea in your own casual words.
- Length: 2-3 sentences max (30-50 words)
- Tone: casual, genuine, like a real customer typed it quickly on their phone
- Mix Hindi, English, and Odia naturally — use common Odia words people actually text with (e.g. "bhala", "kama", "achha", "heigala", "dekhi") mixed with Hindi/English — keep it readable, not gibberish
- Vary the language mix per variation — one Hindi-leaning, one Odia-leaning, one English-leaning — so all 3 feel distinct
- Mention "Ambika Agency" and "Balasore" naturally
- Vary sentence structure and word choice every time — never repeat identical phrasing across generations, even for the same keyword combo
- No hashtags, no emojis, no marketing language, no quotation marks
- Output ONLY the review text for each variation, nothing else — no preamble, no explanation, no numbering

Star rating: ${rating}/5
Product category: ${product}
Selected keywords: ${tags.join(', ')}
Customer name (optional, first name only if given): ${name.trim() || '(no name)'}

Generate exactly 3 review variations. Separate each variation with the exact delimiter: ---SPLIT---`;

  const MODELS_TO_TRY = [
    'openai/gpt-oss-120b',
    'openai/gpt-oss-20b',
    'qwen/qwen3.6-27b',
    'groq/compound-mini',
    'llama-3.3-70b-versatile',
    'llama-3.1-8b-instant',
  ];

  let lastErrorMessage = '';

  for (const model of MODELS_TO_TRY) {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.8,
          max_tokens: 600,
        }),
      });

      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as any;
        const msg = err?.error?.message ?? `Groq API error: ${res.status}`;
        lastErrorMessage = msg;
        console.warn(`Groq model ${model} failed:`, msg);
        continue;
      }

      const data = await res.json();
      let raw: string = data?.choices?.[0]?.message?.content ?? '';

      // Strip <think> reasoning tags if present
      raw = raw.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

      const parts = raw
        .split('---SPLIT---')
        .map((p: string) => p.trim())
        .filter(Boolean);

      if (parts.length > 0) {
        return parts.slice(0, 3);
      }
    } catch (e: any) {
      lastErrorMessage = e?.message ?? 'Network error';
      console.warn(`Groq model ${model} request error:`, e);
    }
  }

  throw new Error(lastErrorMessage || 'Failed to generate reviews. Please try again.');
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRatingPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  const labels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-2 sm:gap-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            id={`star-btn-${n}`}
            type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            className="transition-transform duration-150 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label={`${n} star${n !== 1 ? 's' : ''}`}
          >
            <Star
              className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-150 ${
                n <= (hover || value) ? 'fill-primary text-primary' : 'fill-transparent text-border'
              }`}
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {(hover || value) > 0 && (
          <motion.span
            key={hover || value}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="font-sans text-sm tracking-[0.2em] uppercase font-bold text-primary"
          >
            {labels[hover || value]}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

function CategoryPicker({ value, onChange }: { value: ProductCategory | ''; onChange: (v: ProductCategory) => void }) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
      {PRODUCT_CATEGORIES.map((cat) => (
        <button
          key={cat}
          id={`category-btn-${cat.replace(/\W+/g, '-').toLowerCase()}`}
          type="button"
          onClick={() => onChange(cat)}
          className={`px-4 py-2.5 border font-sans text-xs tracking-[0.15em] uppercase font-medium transition-all duration-200 cursor-pointer rounded-none active:scale-[0.97] ${
            value === cat
              ? 'bg-foreground text-background border-foreground'
              : 'bg-transparent text-foreground border-border hover:border-foreground/60'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

function KeywordChips({ selected, onToggle }: { selected: string[]; onToggle: (kw: string) => void }) {
  return (
    <div className="flex flex-col gap-6 w-full">
      {Object.entries(KEYWORD_GROUPS).map(([group, keywords]) => (
        <div key={group}>
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-bold mb-2.5">
            {group}
          </p>
          <div className="flex flex-wrap gap-2">
            {keywords.map((kw) => {
              const active = selected.includes(kw);
              return (
                <button
                  key={kw}
                  id={`kw-btn-${kw.replace(/\W+/g, '-').toLowerCase()}`}
                  type="button"
                  onClick={() => onToggle(kw)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 border font-sans text-xs font-medium transition-all duration-200 cursor-pointer rounded-none active:scale-[0.97] ${
                    active
                      ? 'bg-primary/15 border-primary text-primary'
                      : 'bg-transparent border-border text-foreground/70 hover:border-foreground/40'
                  }`}
                >
                  {active && <Check className="w-3 h-3" />}
                  {kw}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function NameInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative pt-3">
        <label
          htmlFor="review-name-input"
          className={`absolute left-0 transition-all duration-300 font-sans tracking-[0.1em] text-xs uppercase cursor-text ${
            active ? '-top-2 text-primary font-bold text-[10px]' : 'top-4 text-muted-foreground'
          }`}
        >
          Your first name (optional)
        </label>
        <input
          id="review-name-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[<>&"'`]/g, ''))}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={30}
          className="w-full bg-transparent border-0 border-b border-border py-2 px-0 font-sans text-foreground text-base sm:text-sm focus:ring-0 focus:border-primary transition-colors duration-300 outline-none"
          autoComplete="given-name"
        />
      </div>
      <p className="font-sans text-[10px] text-muted-foreground mt-2">
        Adding your name makes the review feel more personal.
      </p>
    </div>
  );
}

function ReviewCard({
  index, text, selected, onSelect,
}: { index: number; text: string; selected: boolean; onSelect: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.4, ease: 'easeOut' }}
      onClick={onSelect}
      id={`review-card-${index + 1}`}
      className={`relative cursor-pointer border p-5 transition-all duration-250 rounded-none group ${
        selected
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-border bg-background hover:border-foreground/40'
      }`}
    >
      <div className={`absolute top-4 right-4 w-5 h-5 border rounded-full flex items-center justify-center transition-all duration-200 ${
        selected ? 'border-primary bg-primary' : 'border-border group-hover:border-foreground/50'
      }`}>
        {selected && <Check className="w-3 h-3 text-white" />}
      </div>
      <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-bold block mb-2">
        Draft {index + 1}
      </span>
      <p className="font-sans text-sm sm:text-base leading-relaxed text-foreground pr-8">{text}</p>
    </motion.div>
  );
}

function ReviewSubmitButton({ reviewText, disabled }: { reviewText: string; disabled: boolean }) {
  const [state, setState] = useState<'idle' | 'copied'>('idle');
  const handleClick = async () => {
    if (disabled) return;
    try { await navigator.clipboard.writeText(reviewText); } catch { /* fallback */ }
    setState('copied');
    setTimeout(() => window.open(GOOGLE_REVIEW_LINK, '_blank', 'noopener,noreferrer'), 600);
    setTimeout(() => setState('idle'), 3000);
  };
  return (
    <button
      id="btn-post-on-google"
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`group flex items-center justify-center gap-3 w-full px-8 py-4 font-sans text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 rounded-none border min-h-[52px] active:scale-[0.98] ${
        disabled
          ? 'bg-muted text-muted-foreground cursor-not-allowed border-border'
          : 'bg-foreground text-background hover:bg-primary cursor-pointer border-foreground hover:border-primary'
      }`}
    >
      {state === 'copied' ? (
        <><Check className="w-4 h-4" /> Copied — Opening Google…</>
      ) : (
        <><ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> Post on Google</>
      )}
    </button>
  );
}

// ─── Step Animation Variants ──────────────────────────────────────────────────

const stepVariants = {
  initial: (dir: number) => ({ opacity: 0, x: dir * 40 }),
  animate: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -40 }),
};

// ─── Main Page Component ──────────────────────────────────────────────────────

const STEPS = [
  { title: 'How was your experience?', subtitle: 'Tap your star rating to begin' },
  { title: 'What did you buy?', subtitle: 'Pick the product category' },
  { title: 'What did you love?', subtitle: 'Select all that apply — at least 1' },
  { title: 'Add a personal touch', subtitle: 'Optional — skip anytime' },
  { title: 'Your review is ready', subtitle: 'Pick a draft, then post it on Google' },
];

export default function ReviewAssistant() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState<ProductCategory | ''>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [drafts, setDrafts] = useState<string[]>([]);
  const [selectedDraft, setSelectedDraft] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apiKey = (import.meta.env as Record<string, string>).VITE_GROQ_API_KEY;
  const progress = ((step + 1) / STEPS.length) * 100;

  const canProceed = () => {
    if (step === 0) return rating > 0;
    if (step === 1) return category !== '';
    if (step === 2) return keywords.length > 0;
    return true;
  };

  const go = (dir: 1 | -1) => { setDirection(dir); setStep((s) => s + dir); };

  const toggleKeyword = (kw: string) =>
    setKeywords((prev) => prev.includes(kw) ? prev.filter((k) => k !== kw) : [...prev, kw]);

  const runGenerate = async () => {
    if (!apiKey) {
      setError('No Groq API key found. Please add VITE_GROQ_API_KEY to your .env.local file and restart the dev server.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    setDrafts([]);
    setSelectedDraft(null);
    try {
      const results = await generateReviewsWithGroq(rating, category as ProductCategory, keywords, name, apiKey);
      setDrafts(results);
    } catch (err: any) {
      setError(err?.message ?? 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (step < STEPS.length - 2) { go(1); }
    else if (step === STEPS.length - 2) { go(1); await runGenerate(); }
  };

  const handleRegenerate = async () => { setDrafts([]); setSelectedDraft(null); await runGenerate(); };

  const handleStartOver = () => {
    setDirection(-1); setStep(0); setRating(0); setCategory('');
    setKeywords([]); setName(''); setDrafts([]); setSelectedDraft(null); setError(null);
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col selection:bg-black selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border/60">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/">
            <span className="font-sans text-xs tracking-[0.25em] uppercase font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              Ambika Agency
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <PenLine className="w-4 h-4 text-primary" strokeWidth={1.5} />
            <span className="font-sans text-[11px] tracking-[0.2em] uppercase font-bold text-foreground">
              Review Generator
            </span>
          </div>
        </div>
        <div className="w-full h-0.5 bg-border">
          <motion.div
            className="h-full bg-primary"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-16 px-5 sm:px-8">
        <div className="w-full max-w-2xl mx-auto">

          {/* Step header */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`hdr-${step}`}
              custom={direction}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="text-center mb-10 sm:mb-12"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-400 ${
                      i === step ? 'w-6 h-1.5 bg-primary' : i < step ? 'w-1.5 h-1.5 bg-primary/40' : 'w-1.5 h-1.5 bg-border'
                    }`}
                  />
                ))}
              </div>
              <h1 className="font-serif font-light text-3xl sm:text-4xl text-foreground mb-2 leading-tight">
                {STEPS[step].title}
              </h1>
              <p className="font-sans text-xs tracking-[0.18em] uppercase text-muted-foreground">
                {STEPS[step].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Step body */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`body-${step}`}
              custom={direction}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex flex-col items-center gap-8 w-full"
            >
              {step === 0 && <StarRatingPicker value={rating} onChange={setRating} />}
              {step === 1 && <CategoryPicker value={category} onChange={(v) => setCategory(v)} />}
              {step === 2 && <KeywordChips selected={keywords} onToggle={toggleKeyword} />}
              {step === 3 && <NameInput value={name} onChange={setName} />}

              {step === 4 && (
                <div className="w-full flex flex-col gap-4">
                  {loading && (
                    <div className="flex flex-col items-center justify-center gap-4 py-16">
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                      <p className="font-sans text-sm text-muted-foreground tracking-wide">Crafting your review in Hinglish-Odia…</p>
                    </div>
                  )}

                  {!loading && error && (
                    <div className="border border-destructive/40 bg-destructive/5 p-5">
                      <p className="font-sans text-sm text-destructive mb-4">{error}</p>
                      <button
                        id="btn-retry"
                        type="button"
                        onClick={runGenerate}
                        className="font-sans text-xs tracking-[0.15em] uppercase font-bold text-foreground border border-border px-4 py-2 hover:bg-foreground hover:text-background transition-colors cursor-pointer"
                      >
                        Try Again
                      </button>
                    </div>
                  )}

                  {!loading && drafts.length > 0 && (
                    <>
                      <div className="flex flex-col gap-3">
                        {drafts.map((text, i) => (
                          <ReviewCard key={i} index={i} text={text} selected={selectedDraft === i} onSelect={() => setSelectedDraft(i)} />
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <ReviewSubmitButton reviewText={selectedDraft !== null ? drafts[selectedDraft] : ''} disabled={selectedDraft === null} />
                        <button
                          id="btn-regenerate"
                          type="button"
                          onClick={handleRegenerate}
                          className="flex items-center justify-center gap-2 px-6 py-4 border border-border text-foreground font-sans text-xs tracking-[0.15em] uppercase font-bold hover:border-foreground transition-all cursor-pointer rounded-none min-h-[52px] sm:min-w-[160px]"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Regenerate
                        </button>
                      </div>

                      {selectedDraft === null && (
                        <p className="font-sans text-[11px] text-muted-foreground text-center tracking-wide">
                          Tap a draft above to select it before posting
                        </p>
                      )}

                      <div className="mt-2 border border-border/60 bg-muted/30 p-4">
                        <p className="font-sans text-[11px] tracking-[0.2em] uppercase font-bold text-muted-foreground mb-2">How to post</p>
                        <ol className="font-sans text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                          <li>Select a draft above by tapping it</li>
                          <li>Click <strong className="text-foreground">Post on Google</strong> — it auto-copies the text</li>
                          <li>Google Maps opens — paste the text into the review box</li>
                          <li>Hit Submit on Google Maps</li>
                        </ol>
                      </div>

                      <button
                        id="btn-start-over"
                        type="button"
                        onClick={handleStartOver}
                        className="font-sans text-[11px] tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors cursor-pointer self-center mt-1"
                      >
                        ← Start over
                      </button>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons (steps 0–3) */}
          {step < 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between mt-10 sm:mt-12 pt-6 border-t border-border/40"
            >
              {step > 0 ? (
                <button
                  id="btn-back"
                  type="button"
                  onClick={() => go(-1)}
                  className="flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : <div />}

              <button
                id="btn-next"
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center gap-2.5 px-7 py-3 font-sans text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 rounded-none border min-h-[44px] active:scale-[0.97] ${
                  canProceed()
                    ? 'bg-foreground text-background border-foreground hover:bg-primary hover:border-primary cursor-pointer'
                    : 'bg-muted text-muted-foreground border-border cursor-not-allowed'
                }`}
              >
                {step === 3 ? (
                  <><PenLine className="w-3.5 h-3.5" /> Generate Reviews</>
                ) : (
                  <>Continue <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </motion.div>
          )}
        </div>
      </main>

      <footer className="py-6 text-center border-t border-border/40 bg-background">
        <p className="font-sans text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
          © {new Date().getFullYear()} Ambika Agency — Balasore. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
