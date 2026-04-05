"use client";

import { useState } from "react";

type Tab = "gyms" | "admins" | "messages";

export default function SuperadminTabs({
  gymsPanel,
  adminsPanel,
  messagesPanel,
}: {
  gymsPanel: React.ReactNode;
  adminsPanel: React.ReactNode;
  messagesPanel: React.ReactNode;
}) {
  const [active, setActive] = useState<Tab>("gyms");

  const tabs: { id: Tab; label: string }[] = [
    { id: "gyms", label: "Gyms" },
    { id: "admins", label: "Gym Admins" },
    { id: "messages", label: "Messages" },
  ];

  return (
    <>
      <div className="flex border-b border-fog mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-2 text-[11px] tracking-widest uppercase font-mono border-b-2 transition-colors ${
              active === tab.id
                ? "border-clay text-clay"
                : "border-transparent text-stone hover:text-granite"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === "gyms" && gymsPanel}
      {active === "admins" && adminsPanel}
      {active === "messages" && messagesPanel}
    </>
  );
}
