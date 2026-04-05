// app/contact/ContactForm.tsx
"use client";

import { useState } from "react";
import { submitContactForm } from "./actions";
import { toast } from "sonner";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   setStatus("loading");
  //   const form = e.currentTarget;
  //   const data = Object.fromEntries(new FormData(form));

  //   const res = await fetch("/api/contact", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   });

  //   setStatus(res.ok ? "success" : "error");
  //   if (res.ok) form.reset();
  // }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;

    const result = await submitContactForm(new FormData(form));

    if (result.ok) {
      setStatus("success");
      form.reset();
      toast.success("Message sent — we’ll be in touch soon.");
      setTimeout(() => setStatus("idle"), 4000);
    } else {
      setStatus("error");
      toast.error("Something went wrong. Try emailing us directly.");
    }
  }

  return (
    <section className="p-12">
      <h2 className="font-serif text-2xl text-granite mb-8">Send a message</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Name"
            name="name"
            type="text"
            placeholder="Alex Chen"
            required
          />
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="alex@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-[10px] tracking-[0.18em] uppercase text-stone mb-2">
            I am a...
          </label>
          <select
            name="role"
            required
            className="w-full bg-white border border-fog rounded-md px-3.5 py-2.5 text-sm text-granite font-mono outline-none focus:border-clay transition-colors appearance-none"
          >
            <option value="">Select one</option>
            <option value="climber">Climber with feedback</option>
            <option value="gym_owner">Gym owner / manager</option>
            <option value="partner">Potential partner</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] tracking-[0.18em] uppercase text-stone mb-2">
            Message
          </label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="What's on your mind?"
            className="w-full bg-white border border-fog rounded-md px-3.5 py-2.5 text-sm text-granite font-mono outline-none focus:border-clay transition-colors resize-y"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-clay text-white rounded-full px-8 py-3 text-xs tracking-[0.1em] disabled:opacity-60 hover:opacity-90 transition-opacity"
        >
          {status === "loading" ? "Sending..." : "Send message"}
        </button>

        {status === "success" && (
          <p className="text-xs text-stone">
            Message sent — we&apos;ll be in touch soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-xs text-red-500">
            Something went wrong. Try emailing us directly.
          </p>
        )}
        <p className="text-[10px] text-stone font-light">
          We read every message. Expect a reply within a few days.
        </p>
      </form>
    </section>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.18em] uppercase text-stone mb-2">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-white border border-fog rounded-md px-3.5 py-2.5 text-sm text-granite font-mono outline-none focus:border-clay transition-colors"
      />
    </div>
  );
}
