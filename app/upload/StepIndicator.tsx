import { Step } from "../types/types";

const STEPS: { key: Step; label: string }[] = [
  { key: "gym", label: "Gym" },
  { key: "wall", label: "Wall" },
  { key: "route", label: "Route" },
];

export default function StepIndicator({ current }: { current: Step }) {
  const currentIndex = STEPS.findIndex((s) => s.key === current);
  return (
    <div className="flex items-center gap-2 mb-10">
      {STEPS.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <div key={step.key} className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div
                className={`
                  w-5 h-5 rounded-full flex items-center justify-center
                  font-mono text-[9px] tracking-widest transition-colors duration-200
                  ${done ? "bg-clay text-chalk" : active ? "bg-granite text-chalk" : "bg-fog text-stone"}
                `}
              >
                {done ? (
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 5l2.5 2.5L8 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`font-mono text-[9px] tracking-widest uppercase transition-colors duration-200 ${
                  active ? "text-granite" : done ? "text-clay" : "text-fog"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-8 h-px transition-colors duration-300 ${done ? "bg-clay" : "bg-fog"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
