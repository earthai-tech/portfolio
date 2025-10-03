// components/StatsStrip.tsx
"use client";

import pubs from "@/data/publications.json";
import talks from "@/data/talks.json";
import funding from "@/data/funding.json";
import { useCurrency } from "@/components/CurrencyProvider";
import { convertFromCNY, formatMoney } from "@/utils/currency";

export default function StatsStrip() {
  // [MODIFIED] Get the live exchange rate from the hook
  const { currency, usdPerCnyRate } = useCurrency();

  const totalPubs = (pubs as any[]).length;
  const totalTalks = (talks as any[]).length;

  const totalCNY = (funding as any[]).reduce(
    (acc, f) => acc + (f.amount_cny || 0),
    0
  );

  // [MODIFIED] Pass the live rate to the conversion function
  const totalMoney = formatMoney(convertFromCNY(totalCNY, currency, usdPerCnyRate), currency);

  const stat = (label: string, value: string) => (
    <div className="card text-center">
      <div className="text-3xl font-semibold tracking-tight">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );

  return (
    <section className="grid sm:grid-cols-3 gap-4">
      {stat("Publications", String(totalPubs))}
      {stat("Talks & keynotes", String(totalTalks))}
      {stat(`Total Funding (${currency})`, totalMoney)}
    </section>
  );
}