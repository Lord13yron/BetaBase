"use client";

import { ContactSubmission } from "@/app/types/types";
import { useState, useTransition } from "react";
import { deleteSubmission, markSubmissionRead } from "../actions";
import DeleteModal from "../[gymSlug]/DeleteModal";

export default function MessagesPanel({
  submissions,
}: {
  submissions: ContactSubmission[];
}) {
  const [items, setItems] = useState(submissions);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const [deleteTarget, setDeleteTarget] = useState<{
    id: number;
    username: string;
  } | null>(null);

  const visible = filter === "unread" ? items.filter((m) => !m.read) : items;
  const unreadCount = items.filter((m) => !m.read).length;

  function handleMarkRead(id: number) {
    startTransition(async () => {
      await markSubmissionRead(id);
      setItems((prev) =>
        prev.map((m) => (m.id === id ? { ...m, read: true } : m)),
      );
    });
  }

  function handleExpand(id: number) {
    setExpanded(expanded === id ? null : id);
    const msg = items.find((m) => m.id === id);
    if (msg && !msg.read) handleMarkRead(id);
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs tracking-widest uppercase text-stone">
          Contact Submissions
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-2.5 py-1 text-[10px] tracking-wider uppercase rounded font-mono border transition-colors ${
              filter === "all"
                ? "border-clay text-clay"
                : "border-fog text-stone hover:border-stone"
            }`}
          >
            All ({items.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-2.5 py-1 text-[10px] tracking-wider uppercase rounded font-mono border transition-colors ${
              filter === "unread"
                ? "border-clay text-clay"
                : "border-fog text-stone hover:border-stone"
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>
      </div>

      {visible.length === 0 && (
        <div className="text-center py-12 text-stone text-xs font-mono">
          {filter === "unread" ? "No unread messages." : "No messages yet."}
        </div>
      )}

      <div className="space-y-2">
        {visible.map((msg) => (
          <div
            key={msg.id}
            className="border border-fog rounded-lg overflow-hidden bg-chalk"
          >
            {/* Header row — always visible */}
            <button
              onClick={() => handleExpand(msg.id)}
              className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-sand/40 transition-colors"
            >
              {!msg.read && (
                <span className="w-2 h-2 rounded-full bg-clay flex-shrink-0" />
              )}
              {msg.read && <span className="w-2 h-2 flex-shrink-0" />}
              <span className="font-medium text-xs flex-shrink-0 w-36 truncate">
                {msg.name}
              </span>
              {msg.role && (
                <span className="text-[10px] tracking-wider uppercase text-stone flex-shrink-0">
                  {msg.role}
                </span>
              )}
              <span className="text-xs text-stone truncate flex-1 text-left">
                {msg.message.slice(0, 80)}…
              </span>
              <span className="text-[10px] text-stone flex-shrink-0 ml-2">
                {new Date(msg.created_at).toLocaleDateString("en-CA")}
              </span>
              <span className="text-stone text-xs ml-1">
                {expanded === msg.id ? "↑" : "↓"}
              </span>
            </button>

            {/* Expanded body */}
            {expanded === msg.id && (
              <div className="px-4 pb-4 border-t border-fog">
                <div className="pt-3 mb-3">
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-[11px] text-clay hover:underline font-mono"
                  >
                    {msg.email}
                  </a>
                </div>
                <p className="text-xs leading-relaxed text-granite font-mono whitespace-pre-wrap">
                  {msg.message}
                </p>
                <div className="flex gap-2 mt-4">
                  <a
                    href={`mailto:${msg.email}?subject=Re: BetaBase`}
                    className="px-2.5 py-1 text-[10px] tracking-wider uppercase border border-fog rounded font-mono text-stone hover:border-stone hover:text-granite transition-colors"
                  >
                    Reply
                  </a>
                  {!msg.read && (
                    <button
                      onClick={() => handleMarkRead(msg.id)}
                      disabled={isPending}
                      className="px-2.5 py-1 text-[10px] tracking-wider uppercase border border-fog rounded font-mono text-stone hover:border-stone hover:text-granite transition-colors disabled:opacity-40"
                    >
                      Mark read
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setDeleteTarget({ id: msg.id, username: msg.name })
                    }
                    disabled={isPending}
                    className="px-2.5 py-1 text-[10px] tracking-wider uppercase border border-red-200 text-red-600 rounded font-mono hover:bg-red-50 transition-colors disabled:opacity-40"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {deleteTarget && (
        <DeleteModal
          title="Delete Message"
          description={`Delete message from ${deleteTarget.username}?`}
          onConfirm={async () => {
            const result = await deleteSubmission(deleteTarget.id);
            if (result?.error) throw new Error(result.error);
            setItems((prev) => prev.filter((m) => m.id !== deleteTarget.id));
            if (expanded === deleteTarget.id) setExpanded(null);
          }}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
