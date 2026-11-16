import { Link } from 'wouter';

export default function ReviewAssistant() {
  return (
    <main className="mx-auto min-h-screen max-w-2xl px-5 py-12 sm:px-8">
      <Link href="/" className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">← Ambika Agency</Link>
      <div className="mt-6 space-y-4 border border-border bg-secondary/40 p-6 sm:p-10">
        <h1 className="font-serif text-4xl font-semibold">Review Ambika Agency</h1>
        <p className="text-muted-foreground">Visited our Balasore showroom? Tell us how it went in your own words on Google.</p>
        <a href="https://g.page/r/CQSGbY8MMiX7EAE/review" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center bg-foreground px-4 text-sm text-background">Leave a Google review</a>
      </div>
    </main>
  );
}
