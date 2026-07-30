export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="mx-auto min-h-[70vh] max-w-[1200px] px-6 pb-24 pt-32"
    >
      <div className="h-3 w-24 animate-pulse rounded-sm bg-[var(--tint-brand)]" />
      <div className="mt-5 h-12 max-w-2xl animate-pulse rounded-sm bg-[var(--surface-sunken)]" />
      <div className="mt-4 h-5 max-w-lg animate-pulse rounded-sm bg-[var(--surface-sunken)]" />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            aria-hidden="true"
            className="aspect-[4/3] animate-pulse rounded-sm border border-[var(--border)] bg-[var(--surface-card)]"
          />
        ))}
      </div>
    </div>
  );
}
