export function PlaceholderNote({ className = '' }: { className?: string }) {
  return (
    <p
      className={`rounded-lg border border-sand-deep/40 bg-sand/70 px-3 py-2 text-sm text-navy/80 ${className}`}
    >
      Placeholder photos until we shoot real Waiheke setups.
    </p>
  )
}
