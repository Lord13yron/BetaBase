"use client";

import { Wall } from "@/app/types/types";
import { useState, useRef, useEffect } from "react";

interface WallFilterProps {
  walls: Wall[];
  selected: number | null;
  onChange: (wallId: number | null) => void;
}

export function IconChevronDown() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function WallFilter({
  walls,
  selected,
  onChange,
}: WallFilterProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedWall = walls.find((w) => w.id === selected) ?? null;

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(wallId: number | null) {
    onChange(wallId);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 text-[9px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full border transition-all duration-150 cursor-pointer font-mono
          ${
            selected !== null
              ? "bg-granite border-granite text-chalk"
              : "bg-transparent border-fog text-stone hover:border-stone hover:text-granite"
          }`}
      >
        {selectedWall ? selectedWall.name : "Wall"}
        <IconChevronDown />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 mt-2 z-50 bg-white border border-fog rounded-xl shadow-lg overflow-hidden min-w-[180px]">
          {/* All option */}
          <button
            onClick={() => handleSelect(null)}
            className={`w-full text-left px-4 py-2.5 text-[10px] tracking-[0.12em] uppercase font-mono transition-colors duration-100 flex items-center justify-between
              ${
                selected === null
                  ? "text-clay bg-clay/5"
                  : "text-stone hover:bg-chalk hover:text-granite"
              }`}
          >
            All Walls
            {selected === null && (
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>

          {/* Divider */}
          <div className="h-px bg-fog mx-3" />

          {/* Wall options */}
          {walls.map((wall) => (
            <button
              key={wall.id}
              onClick={() => handleSelect(wall.id)}
              className={`w-full text-left px-4 py-2.5 transition-colors duration-100 flex items-start justify-between gap-3
                ${selected === wall.id ? "bg-clay/5" : "hover:bg-chalk"}`}
            >
              <span
                className={`text-[10px] tracking-[0.12em] uppercase font-mono ${selected === wall.id ? "text-clay" : "text-granite"}`}
              >
                {wall.name}
              </span>
              {selected === wall.id && (
                <svg
                  className="flex-shrink-0 mt-0.5 text-clay"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
