import { useState } from 'react';
import { Link } from 'wouter';
import { products } from '@/sections/Featured';

const examples = [
  {
    category: 'Pipes & fittings',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/82/UPVC_pipe_and_fitting.jpg',
    names: ['CPVC pipe ¾ inch', 'CPVC 90° elbow ¾ inch', 'CPVC equal tee ¾ inch', 'CPVC coupling ¾ inch', 'uPVC pipe 1 inch', 'uPVC reducer 1 × ¾ inch', 'uPVC union 1 inch'],
  },
  {
    category: 'Bathware',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Bathroom_Faucet.jpg/250px-Bathroom_Faucet.jpg',
    names: ['Single lever basin mixer', 'Tall basin mixer', 'Chrome pillar tap', 'Wall mounted bib tap', 'Kitchen sink mixer'],
  },
  {
    category: 'Pumps',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Centrifugal_monoblock_pump.jpg/330px-Centrifugal_monoblock_pump.jpg',
    names: ['0.5 HP self priming pump', '1 HP centrifugal monoblock pump', '1 HP pressure booster pump'],
  },
];

const catalog = [
  ...products.map(product => ({ ...product, example: false })),
  ...examples.flatMap(({ category, image, names }) => names.map(name => ({
    id: name, category, image, name, descriptor: 'Sample listing · Confirm with showroom', example: true,
  }))),
];

const control = 'rounded-md border border-border px-3 py-2 min-h-11';
const action = 'rounded-md bg-foreground text-background px-3 py-2 min-h-11';

export function AskAmbika() {
  const [search, setSearch] = useState('');
  const [basket, setBasket] = useState<Record<string, number>>({});
  const results = catalog.filter(({ name, category, descriptor }) => search.toLowerCase().trim().split(/\s+/).every(term => `${name} ${category} ${descriptor}`.toLowerCase().includes(term)));
  const selected = catalog.filter(({ id }) => basket[id] > 0);
  const message = selected.length
    ? ['Hello Ambika Agency, please quote:', ...selected.map(({ id, name }) => `${basket[id]} × ${name}`)].join('\n')
    : 'Hello Ambika Agency, I have a product inquiry.';

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-8 text-foreground sm:px-8 sm:py-12">
      <Link href="/" className="inline-flex min-h-11 items-center underline">← Ambika Agency</Link>
      <header className="mb-8 mt-4 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Ask Ambika</h1>
        <p className="text-muted-foreground">Browse {catalog.length} products and build your WhatsApp quote.</p>
        <p className="text-sm text-muted-foreground">Sample listings use illustrative photos. The showroom confirms exact models and availability.</p>
      </header>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section aria-label="Product catalog">
        <label className="grid gap-1 text-sm">
          Search products
          <input className={control} type="search" placeholder="Try CPVC or KSB" value={search} onChange={event => setSearch(event.target.value)} />
        </label>
        <a href="#quote-basket" className="inline-flex min-h-11 items-center text-sm underline lg:hidden">View quote basket ({selected.reduce((total, { id }) => total + basket[id], 0)} items)</a>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {results.map(({ id, name, category, image, example }) => (
            <li className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm" key={id}>
              <img className="size-14 rounded bg-muted object-contain" loading="lazy" src={image} alt="" />
              <span className="flex-1">{name}<small className="block text-muted-foreground">{category}{example && ' · Sample'}</small></span>
              <button type="button" className={control} aria-label={`Add ${name} to quote`} onClick={() => setBasket(previous => ({ ...previous, [id]: (previous[id] ?? 0) + 1 }))}>Add</button>
            </li>
          ))}
          {!results.length && <li className="text-sm">No products match. Ask the shop on WhatsApp.</li>}
        </ul>
        </section>
        <aside className="grid gap-5 rounded-xl border border-border p-5 lg:sticky lg:top-6">
        <section id="quote-basket" className="grid gap-2 text-sm" aria-label="Quote basket">
          <h3 className="font-semibold" aria-live="polite">Quote basket ({selected.reduce((total, { id }) => total + basket[id], 0)} items)</h3>
          {selected.map(({ id, name }) => (
            <div key={id} className="flex flex-wrap items-center gap-2">
              <span className="flex-1">{name}</span>
              <button type="button" className={control} aria-label={`Decrease quantity of ${name}`} onClick={() => setBasket(previous => ({ ...previous, [id]: Math.max(0, previous[id] - 1) }))}>−</button>
              <span>{basket[id]}</span>
              <button type="button" className={control} aria-label={`Increase quantity of ${name}`} onClick={() => setBasket(previous => ({ ...previous, [id]: previous[id] + 1 }))}>+</button>
            </div>
          ))}
          <p className="text-muted-foreground">Staff confirm stock, prices, and pump suitability.</p>
          <a className={action} href={`https://wa.me/918144532282?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">{selected.length ? 'Open quote in WhatsApp' : 'Ask the shop on WhatsApp'}</a>
        </section>
        <section className="text-sm">
          <h3 className="font-semibold">Showroom · Balasore, Odisha</h3>
          <p>Monday–Saturday: 8 AM–8 PM<br />Sunday: 8 AM–2 PM</p>
          <a className="inline-flex min-h-11 items-center underline" href="https://www.google.com/maps/search/?api=1&query=Ambika+Agency+Balasore+Odisha" target="_blank" rel="noopener noreferrer">Get directions</a>
        </section>
        </aside>
      </div>
      <footer className="mt-8 border-t border-border pt-4 text-xs text-muted-foreground">
        Illustrative photos from Wikimedia Commons:
        {' '}<a className="underline" href="https://commons.wikimedia.org/wiki/File:UPVC_pipe_and_fitting.jpg">Mekalshan (pipes)</a>,
        {' '}<a className="underline" href="https://commons.wikimedia.org/wiki/File:Bathroom_Faucet.jpg">Stilfehler (faucet, CC0)</a>,
        {' '}<a className="underline" href="https://commons.wikimedia.org/wiki/File:Centrifugal_monoblock_pump.jpg">KishanMalaviyaatCHETAK ELECTRICALS (pump)</a>.
        {' '}Pipe and pump photos are unmodified under <a className="underline" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.
      </footer>
    </main>
  );
}
