export default function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" width="60" className={className}>
      <path d="M0 0 L30 40 L60 0 Z" />
    </svg>
  );
}
