type GymFilterProps = {
  search: string;
  setSearch: (search: string) => void;
};

export default function GymFilter({ search, setSearch }: GymFilterProps) {
  return (
    <div className="relative flex-1">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8" strokeWidth={2} />
        <path d="m21 21-4.35-4.35" strokeWidth={2} strokeLinecap="round" />
      </svg>
      <input
        type="text"
        placeholder="Search by username or gym..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="font-mono text-xs text-granite bg-white border border-fog rounded-lg pl-8 pr-3 py-2 w-full sm:w-72 focus:outline-none focus:border-stone placeholder:text-stone/50"
      />
    </div>
  );
}
