import storefront from '@/assets/storefront_real.jpg';
import tradeCounter from '@/assets/counter_owner.jpg';
import certificates from '@/assets/authorized_certificates.jpg';
import shelves from '@/assets/inventory_shelves.jpg';
import desk from '@/assets/store_desk.jpg';

const photos = [
  { src: storefront, title: 'Showroom entrance' },
  { src: tradeCounter, title: 'Trade counter' },
  { src: certificates, title: 'Dealer certificates' },
  { src: shelves, title: 'Stock shelves' },
  { src: desk, title: 'Billing desk' },
];

export function Craft() {
  return (
    <section id="craft" className="border-y border-border bg-secondary/30 py-16 sm:py-24" data-testid="section-craft">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-8 max-w-2xl">
          <h2 className="mb-3 font-serif text-4xl font-semibold sm:text-5xl" data-testid="text-craft-headline">Inside our Balasore showroom</h2>
          <p className="text-muted-foreground">We opened in 2020. Bring a material list or a photo of the part you need, and we can help you match it at the counter.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {photos.map(({ src, title }, index) => (
            <figure className={index === 0 ? 'sm:col-span-2 lg:row-span-2' : undefined} key={title}>
              <a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open photo: ${title} (new tab)`} className="block border border-border bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                <img src={src} alt="" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-contain" />
              </a>
              <figcaption className="mt-2 text-sm text-muted-foreground">{title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
