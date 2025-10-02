"use client";

import { useEffect, useMemo, useState } from "react";
import data from "@/data/funding.json";
import { useCurrency } from "@/components/CurrencyProvider";
import { CurrencyToggle } from "@/components/CurrencyToggle";
import { convertFromCNY, formatMoney } from "@/utils/currency";
import Pagination from "@/components/Pagination";

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

const PAGE_SIZE = 8; // how many rows per page

export default function FundingTable() {
  const { currency } = useCurrency();

  const [q, setQ] = useState("");
  const [type, setType] = useState<"All" | "Contract" | "Grant">("All");
  const [year, setYear] = useState<"All" | number>("All");
  const [page, setPage] = useState(1);

  const items = data as Funding[];

  const years = useMemo(() => {
    const ys = new Set<number>();
    items.forEach((d) => {
      const y = Number(d.period_start.slice(0, 4));
      if (!Number.isNaN(y)) ys.add(y);
    });
    return Array.from(ys).sort((a, b) => b - a);
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((d) => {
      const text = [
        d.title, d.type, d.subtype, d.program, d.organization, d.location, d.grant_number
      ].filter(Boolean).join(" ").toLowerCase();
      const matchQ = q.trim().length === 0 || text.includes(q.toLowerCase());
      const matchType = type === "All" || d.type === type;
      const matchYear = year === "All" || d.period_start.startsWith(String(year));
      return matchQ && matchType && matchYear;
    });
  }, [items, q, type, year]);

  // Reset to page 1 whenever filters change
  useEffect(() => { setPage(1); }, [q, type, year]);

  // Totals computed over the filtered set (not per page)
  const totals = useMemo(() => {
    const sumCNY = (arr: Funding[]) => arr.reduce((acc, x) => acc + (x.amount_cny || 0), 0);
    const allCny = sumCNY(filtered);
    const contractsCny = sumCNY(filtered.filter((x) => x.type === "Contract"));
    const grantsCny = sumCNY(filtered.filter((x) => x.type === "Grant"));
    return {
      all: formatMoney(convertFromCNY(allCny, currency), currency),
      contracts: formatMoney(convertFromCNY(contractsCny, currency), currency),
      grants: formatMoney(convertFromCNY(grantsCny, currency), currency),
    };
  }, [filtered, currency]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;
  const rows = filtered.slice(startIdx, startIdx + PAGE_SIZE);
  const rangeFrom = filtered.length ? startIdx + 1 : 0;
  const rangeTo = Math.min(startIdx + PAGE_SIZE, filtered.length);

  const amountHeader = `Amount (${currency})`;
  const renderAmount = (cny?: number | null) =>
    formatMoney(cny == null ? null : convertFromCNY(cny, currency), currency);

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
          onChange={(e) => setType(e.target.value as "All" | "Contract" | "Grant")}
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

        {/* Right-aligned: currency toggle + totals + showing range */}
        <div className="ml-auto flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
          <CurrencyToggle />
          <span>Total: <strong>{totals.all}</strong></span>
          <span>Contracts: <strong>{totals.contracts}</strong></span>
          <span>Grants: <strong>{totals.grants}</strong></span>
          <span className="opacity-70">|</span>
          <span>
            Showing <strong>{rangeFrom}-{rangeTo}</strong> of <strong>{filtered.length}</strong>
          </span>
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
              <th className="text-right p-3">{amountHeader}</th>
              <th className="text-left p-3">Location</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((d, i) => (
              <tr key={`${d.grant_number ?? d.title}-${i}`} className="border-t dark:border-gray-800 align-top">
                <td className="p-3">
                  <div className="font-medium">{d.title}</div>
                  {d.program && <div className="text-gray-600 dark:text-gray-400">{d.program}</div>}
                  {d.subtype && <div className="text-xs text-gray-500">{d.subtype}</div>}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {d.period_start} → {d.period_end}
                </td>
                <td className="p-3 whitespace-nowrap">{d.type}</td>
                <td className="p-3 whitespace-nowrap">{d.grant_number || "—"}</td>
                <td className="p-3 text-right whitespace-nowrap">{renderAmount(d.amount_cny)}</td>
                <td className="p-3">
                  <div>{d.organization || "—"}</div>
                  {d.location && <div className="text-gray-600 dark:text-gray-400">{d.location}</div>}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No results match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <Pagination
        className="justify-center"
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* Note */}
      <p className="text-xs text-gray-500">
        Amounts shown in your selected currency; some projects may not disclose amounts.
      </p>
    </div>
  );
}
