import { Link } from 'wouter';

import feat1 from '../assets/feat1.jpg';
import feat2 from '../assets/feat2.jpg';
import feat3 from '../assets/feat3.jpg';
import feat4 from '../assets/feat4.jpg';
import feat5 from '../assets/feat5.jpg';

export const products = [
  { 
    id: 'f1', 
    category: 'PRAYAG & PIDILITE',
    name: 'Concealed Wall Mixer', 
    descriptor: 'Ask for a mixer that matches your inlet size.',
    image: feat1 
  },
  { 
    id: 'f2', 
    category: 'PARRYWARE CERAMIC',
    name: 'Rimless Wall-Hung Closet', 
    descriptor: 'Ask about compatible concealed cisterns.',
    image: feat2 
  },
  { 
    id: 'f3', 
    category: 'KSB / TEXMO PUMPING',
    name: 'Submersible Pump Set', 
    descriptor: 'Share your bore depth and water needs so we can help you choose.',
    image: feat3 
  },
  { 
    id: 'f4', 
    category: 'HINDWARE SANITARY',
    name: 'Countertop Ceramic Vessel', 
    descriptor: 'Check basin dimensions and the waste fitting before ordering.',
    image: feat4 
  },
  { 
    id: 'f5', 
    category: 'ORI-PLAST / HARI PLAST',
    name: 'Heavy Brass & CPVC Fittings', 
    descriptor: 'Bring your pipe sizes or material list for a quote.',
    image: feat5 
  },
];

export function Featured() {
  return (
    <section id="featured" className="border-t border-border py-16 sm:py-24" data-testid="section-featured">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-4xl font-semibold sm:text-5xl">Featured products</h2>
            <p className="mt-2 text-sm text-muted-foreground">Ask the shop for the exact model, price, and current stock.</p>
          </div>
          <Link href="/ask-ambika" className="inline-flex min-h-11 items-center bg-foreground px-4 text-sm text-background">Browse the catalog</Link>
        </div>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {products.map(product => (
            <li key={product.id} className="min-w-0 border border-border bg-card" data-testid={`card-featured-${product.id}`}>
              <div className="aspect-[4/3] border-b border-border bg-secondary/60 p-4">
                <img src={product.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain" />
              </div>
              <div className="space-y-2 p-4">
                <p className="text-xs font-medium text-muted-foreground">{product.category}</p>
                <h3 className="font-serif text-2xl font-semibold leading-tight">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.descriptor}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
