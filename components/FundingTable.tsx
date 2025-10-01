"use client";

import { useCurrency } from "@/components/CurrencyProvider";
import { convertFromCNY, formatMoney } from "@/utils/currency";
import { CurrencyToggle } from "@/components/CurrencyToggle";
import { useMemo, useState } from "react";
import data from "@/data/funding.json";

type Funding = {
  title: string;
  period_start: string; // YYYY-MM
  period_end: string;   // YYYY-MM
  type: "Contract" | "Grant";
  subtype?: string;
  program?: string;
  organization?: string;
  location?: string;
  grant_number?: string;
  funder_id?: string;
  amount_cny?: number | null;
};
const { currency } = useCurrency();

const fmtMoney = (n?: number | null) =>
  n == null ? "—" : new Intl.NumberFormat("en-US", { style: "currency", currency: "CNY", maximumFractionDigits: 0 }).format(n);

export default function FundingTable() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<"All" | "Contract" | "Grant">("All");
  const [year, setYear] = useState<"All" | number>("All");

  const items = data as Funding[];

  const years = useMemo(() => {
    const ys = new Set<number>();
    items.forEach((d) => {
      const y = Number(d.period_start.slice(0, 4));
      if (!Number.isNaN(y)) ys.add(y);
    });
    return Array.from(ys).sort((a, b) => b - a);
  }, [items]);

  const filtered = items.filter((d) => {
    const text = [
      d.title, d.type, d.subtype, d.program, d.organization, d.location, d.grant_number
    ].filter(Boolean).join(" ").toLowerCase();

    const matchQ = q.trim().length === 0 || text.includes(q.toLowerCase());
    const matchType = type === "All" || d.type === type;
    const matchYear = year === "All" || d.period_start.startsWith(String(year));
    return matchQ && matchType && matchYear;
  });

  const totals = useMemo(() => {
    const sum = (arr: Funding[]) => arr.reduce((acc, x) => acc + (x.amount_cny || 0), 0);
    const all = sum(filtered);
    const contracts = sum(filtered.filter((x) => x.type === "Contract"));
    const grants = sum(filtered.filter((x) => x.type === "Grant"));
    return { all, contracts, grants };
  }, [filtered]);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          className="border rounded-lg px-3 py-2 text-sm w-64"
          placeholder="Search title, program, grant no., location…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={type}
          onChange={(e) => setType(e.target.value as any)}
        >
          <option>All</option>
          <option>Contract</option>
          <option>Grant</option>
        </select>
        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={year}
          onChange={(e) => setYear(e.target.value === "All" ? "All" : Number(e.target.value))}
        >
          <option>All</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <div className="ml-auto text-sm text-gray-600 dark:text-gray-300">
          <span className="mr-3">Total (filtered): <strong>{fmtMoney(totals.all)}</strong></span>
          <span className="mr-3">Contracts: <strong>{fmtMoney(totals.contracts)}</strong></span>
          <span>Grants: <strong>{fmtMoney(totals.grants)}</strong></span>
        </div>
        <div className="ml-auto flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
          <CurrencyToggle />
          <span className="hidden sm:inline">Totals reflect current filter</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-2xl dark:border-gray-800">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="text-left p-3">Title & Program</th>
              <th className="text-left p-3">Period</th>
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">Grant No.</th>
              <th className="text-right p-3">Amount (CNY)</th>
              <th className="text-left p-3">Location</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d, i) => (
              <tr key={i} className="border-t dark:border-gray-800 align-top">
                <td className="p-3">
                  <div className="font-medium">{d.title}</div>
                  {d.program && <div className="text-gray-600 dark:text-gray-400">{d.program}</div>}
                  {d.subtype && <div className="text-xs text-gray-500">{d.subtype}</div>}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {d.period_start} → {d.period_end}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {d.type}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {d.grant_number || "—"}
                </td>
                <td className="p-3 text-right whitespace-nowrap">
                  {fmtMoney(d.amount_cny)}
                </td>
                <td className="p-3">
                  <div>{d.organization || "—"}</div>
                  {d.location && <div className="text-gray-600 dark:text-gray-400">{d.location}</div>}
                </td>
                <td className="p-3 text-right whitespace-nowrap">
                  {formatMoney(d.amount_cny == null ? null : convertFromCNY(d.amount_cny, currency), currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Note */}
      <p className="text-xs text-gray-500">
        Amounts shown are contracted/granted totals in CNY; some projects may not disclose amounts.
      </p>
    </div>
  );
}
