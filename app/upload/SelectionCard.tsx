// ─── Selection card ───────────────────────────────────────────────────────────

export default function SelectionCard({
  label,
  sublabel,
  onClick,
}: {
  label: string;
  sublabel?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
        w-full text-left px-5 py-4 rounded-xl
        border border-fog bg-white/40
        hover:border-stone hover:bg-sand/40
        active:bg-sand
        transition-all duration-150
        group
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-sm text-granite font-medium group-hover:text-granite">
            {label}
          </div>
          {sublabel && (
            <div className="font-mono text-xs text-stone mt-0.5">
              {sublabel}
            </div>
          )}
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-fog group-hover:text-stone transition-colors shrink-0"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </button>
  );
}
