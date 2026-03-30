export default function StatPill({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="font-mono text-lg font-medium text-chalk">{value}</span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-stone">
        {label}
      </span>
    </div>
  );
}
