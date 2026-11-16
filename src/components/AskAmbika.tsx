import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { products } from '@/sections/Featured';

const control = 'rounded-md border border-border px-3 py-2 min-h-11';
const action = 'rounded-md bg-foreground text-background px-3 py-2 min-h-11';

export function AskAmbika() {
  const [search, setSearch] = useState('');
  const [basket, setBasket] = useState<Record<string, number>>({});
  const results = products.filter(({ name, category, descriptor }) => search.toLowerCase().trim().split(/\s+/).every(term => `${name} ${category} ${descriptor}`.toLowerCase().includes(term)));
  const selected = products.filter(({ id }) => basket[id] > 0);
  const message = selected.length
    ? ['Hello Ambika Agency, please quote:', ...selected.map(({ id, name }) => `${basket[id]} × ${name}`)].join('\n')
    : 'Hello Ambika Agency, I have a product inquiry.';

  return (
    <Dialog>
      <DialogTrigger className="rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-lg">
        Ask Ambika
      </DialogTrigger>
      <DialogContent className="bottom-0 !left-auto right-0 !top-auto !max-h-[85dvh] !translate-x-0 !translate-y-0 rounded-t-xl sm:bottom-6 sm:right-6 sm:max-w-md">
        <DialogTitle>Ask Ambika</DialogTitle>
        <DialogDescription>Find featured products, build a quote, or plan a showroom visit.</DialogDescription>
        <label className="grid gap-1 text-sm">
          Search products
          <input className={control} type="search" placeholder="Try CPVC or KSB" value={search} onChange={event => setSearch(event.target.value)} />
        </label>
        <ul className="grid gap-2">
          {results.map(({ id, name, category, image }) => (
            <li className="flex items-center gap-2 text-sm" key={id}>
              <img className="size-10 rounded object-contain" src={image} alt="" />
              <span className="flex-1">{name}<small className="block text-muted-foreground">{category}</small></span>
              <button type="button" className={control} aria-label={`Add ${name} to quote`} onClick={() => setBasket(previous => ({ ...previous, [id]: (previous[id] ?? 0) + 1 }))}>Add</button>
            </li>
          ))}
          {!results.length && <li className="text-sm">No featured products match. Ask the shop on WhatsApp.</li>}
        </ul>
        <section className="grid gap-2 text-sm" aria-label="Quote basket">
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
      </DialogContent>
    </Dialog>
  );
}
