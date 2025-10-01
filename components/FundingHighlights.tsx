"use client";
import data from "@/data/funding.json";
import { useMemo } from "react";
import Link from "next/link";
import { useCurrency } from "@/components/CurrencyProvider";
import { convertFromCNY, formatMoney } from "@/utils/currency";

export default function FundingHighlights({ count = 3 }: { count?: number }) {
  const { currency } = useCurrency();
  const items = data as Array<{
    title: string; amount_cny?: number | null; period_start: string; period_end: string;
    grant_number?: string; type: "Grant" | "Contract";
  }>;

  const top = useMemo(() => {
    const withAmt = items.filter((x) => typeof x.amount_cny === "number");
    const sorted = withAmt.sort((a, b) => (b.amount_cny! - a.amount_cny!));
    const picks = (sorted.length ? sorted : items).slice(0, count);
    return picks;
  }, [items, count]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Funding highlights</h3>
      <ul className="space-y-3">
        {top.map((d, i) => {
          const amt = d.amount_cny == null ? "—" : formatMoney(convertFromCNY(d.amount_cny, currency), currency);
          return (
            <li key={i} className="card">
              <div className="text-sm text-gray-500">{d.type} • {d.period_start} → {d.period_end}</div>
              <div className="font-medium mt-1">{d.title}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Grant No.: {d.grant_number || "—"}
              </div>
              <div className="mt-2 text-sm">
                Amount: <strong>{amt}</strong>
              </div>
            </li>
          );
        })}
      </ul>
      <Link href="/funding" className="badge w-fit">View all funding →</Link>
    </div>
  );
}
