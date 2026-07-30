import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-[1200px] flex-col items-start justify-center px-6 py-24">
      <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--brand-primary)]">404</span>
      <h1 className="mt-3 max-w-2xl text-4xl font-extrabold sm:text-6xl">This path ends here.</h1>
      <p className="mt-5 max-w-xl text-[var(--text-secondary)]">
        The destination may have moved, or the address may be incomplete. Return to the village overview and continue exploring.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-sm bg-[var(--brand-primary)] px-5 py-3 font-bold text-[var(--text-on-brand)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--brand-primary-hover)]"
      >
        Return home
      </Link>
    </section>
  );
}
