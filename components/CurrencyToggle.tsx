// components/CurrencyToggle.tsx
"use client";
import { useCurrency } from "./CurrencyProvider";

export function CurrencyToggle({ className = "" }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();
  return (
    <div className={`inline-flex items-center border rounded-full overflow-hidden ${className}`}>
      {/* [FIX] Change order to show USD first */}
      {(["USD", "CNY"] as const).map((c) => (
        <button
          key={c}
          onClick={() => setCurrency(c)}
          className={`px-3 py-1 text-sm ${currency === c ? "bg-gray-100 dark:bg-gray-900 font-medium" : ""}`}
          aria-pressed={currency === c}
        >
          {c === "CNY" ? "¥ CNY" : "$ USD"}
        </button>
      ))}
    </div>
  );
}