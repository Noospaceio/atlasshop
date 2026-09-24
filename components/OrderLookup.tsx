"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderLookup() {
  const [value, setValue] = useState("");
  const router = useRouter();

  function go(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim()) router.push(`/order/${value.trim()}`);
  }

  return (
    <form onSubmit={go} className="flex gap-3">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Order number"
        className="flex-1 border border-umber/40 bg-vellum/50 px-4 py-3 font-body text-ink placeholder:text-umber/50 focus:outline-none focus:border-rust"
      />
      <button
        type="submit"
        className="border border-rust text-rust px-6 py-3 hover:bg-rust hover:text-vellum transition-colors font-display text-lg"
      >
        View
      </button>
    </form>
  );
}
