import { Status } from "@/app/types/types";

export default function StatusDot({ status }: { status: Status }) {
  const map: Record<Status, { color: string; label: string }> = {
    idle: { color: "bg-[#D6CAB8]", label: "" },
    checking: { color: "bg-[#8C7B6B] animate-pulse", label: "Checking..." },
    available: { color: "bg-emerald-500", label: "Available" },
    taken: { color: "bg-red-400", label: "Already taken" },
    invalid: { color: "bg-[#D6CAB8]", label: "" },
  };
  const { color, label } = map[status];
  return (
    <span className="flex items-center gap-2">
      <span
        className={`inline-block w-2 h-2 rounded-full ${color} transition-colors duration-300`}
      />
      {label && (
        <span
          className={`font-mono text-[10px] uppercase tracking-widest transition-colors duration-300 ${
            status === "available" ? "text-emerald-500" : "text-[#8C7B6B]"
          }`}
        >
          {label}
        </span>
      )}
    </span>
  );
}
