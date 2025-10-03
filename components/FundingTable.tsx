// components/FundingTable.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import data from "@/data/funding.json";
import { useCurrency } from "@/components/CurrencyProvider";
import { convertFromCNY, formatMoney } from "@/utils/currency";
import Pagination from "@/components/Pagination";
import { Card } from "@/components/Card";
import { Building, Award } from "lucide-react";

type Funding = typeof data[0];
const PAGE_SIZE = 8;

export default function FundingTable() {
  // [STEP 1] Get the live exchange rate from the hook
  const { currency, usdPerCnyRate } = useCurrency();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [type, setType] = useState<'All' | 'Contract' | 'Grant'>(
    (searchParams.get("type") as any) ?? "All"
  );
  const [year, setYear] = useState<'All' | number>(
    Number(searchParams.get("year")) || "All"
  );
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const updateParams = (newParams: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === "" || value === "All" || value === "all" || value === 1) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    const newQuery = `?${params.toString()}`;
    router.replace(`${pathname}${newQuery === '?' ? '' : newQuery}`);
  };

  const items = useMemo(() => data as Funding[], []);
  const years = useMemo(() => 
    Array.from(new Set(items.map(d => new Date(d.period_start).getFullYear())))
      .sort((a, b) => b - a), [items]
  );

  const filtered = useMemo(() => {
    return items.filter((d) => {
      const text = [d.title, d.program, d.organization, d.grant_number].join(" ").toLowerCase();
      return (
        (q === "" || text.includes(q.toLowerCase())) &&
        (type === "All" || d.type === type) &&
        (year === "All" || new Date(d.period_start).getFullYear() === year)
      );
    });
  }, [items, q, type, year]);
  
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const rows = useMemo(() => {
    const currentPage = page > totalPages ? totalPages : page;
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(startIdx, startIdx + PAGE_SIZE);
  }, [filtered, page, totalPages]);

  useEffect(() => {
    const newPage = page > totalPages ? totalPages : 1;
    updateParams({ q, type, year: String(year), page: newPage });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, type, year]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold">Detailed Funding List</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Use the filters below to search the complete list of grants and contracts.
        </p>
      </div>
      <Card className="hover:shadow-sm hover:translate-y-0 hover:border-gray-100 dark:hover:border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            className="md:col-span-2 w-full rounded-lg border bg-transparent px-3 py-2 text-sm focus:border-brand"
            placeholder="Search title, program, grant no..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select value={type} onChange={(e) => setType(e.target.value as any)} className="rounded-lg border bg-transparent px-3 py-2 text-sm focus:border-brand">
            <option>All Types</option><option>Contract</option><option>Grant</option>
          </select>
          <select value={year} onChange={(e) => setYear(e.target.value === "All" ? "All" : Number(e.target.value))} className="rounded-lg border bg-transparent px-3 py-2 text-sm focus:border-brand">
            <option value="All">All Years</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </Card>

      <div className="rounded-2xl border dark:border-gray-800 overflow-x-auto">
        <table className="w-full min-w-[64rem] table-fixed border-collapse">
          <colgroup>
            <col className="w-[38%]" />
            <col className="w-[15%]" />
            <col className="w-[12%]" />
            <col className="w-[15%]" />
            <col className="w-[20%]" />
          </colgroup>
          <thead className="text-left">
            <tr>
              <th className="sticky top-0 p-3 bg-gray-50 dark:bg-gray-900 font-medium">Title & Program</th>
              <th className="sticky top-0 p-3 bg-gray-50 dark:bg-gray-900 font-medium">Period</th>
              <th className="sticky top-0 p-3 bg-gray-50 dark:bg-gray-900 font-medium">Type</th>
              <th className="sticky top-0 p-3 bg-gray-50 dark:bg-gray-900 font-medium text-right">{`Amount (${currency})`}</th>
              <th className="sticky top-0 p-3 bg-gray-50 dark:bg-gray-900 font-medium">Organization</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-800">
            {rows.map((d) => (
              <tr key={d.grant_number || d.title} className="hover:bg-brand-muted/40 dark:hover:bg-gray-800/50 transition-colors">
                <td className="p-3 align-top">
                  <div className="font-semibold">{d.title}</div>
                  <div className="text-gray-600 dark:text-gray-400">{d.program}</div>
                </td>
                <td className="p-3 align-top whitespace-nowrap">{d.period_start} → {d.period_end}</td>
                <td className="p-3 align-top"><TypeBadge type={d.type} /></td>
                <td className="p-3 align-top font-mono text-right">
                  {/* [STEP 2] Pass the live rate to the conversion function */}
                  {formatMoney(convertFromCNY(d.amount_cny ?? 0, currency, usdPerCnyRate), currency)}
                </td>
                <td className="p-3 align-top">{d.organization}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <div className="py-12 text-center text-gray-500">No funding entries match your criteria.</div>}
      </div>

      <Pagination
        className="justify-center"
        page={page} totalPages={totalPages}
        onPageChange={(p) => {
          setPage(p);
          updateParams({ page: p });
        }}
      />
    </div>
  );
}

function TypeBadge({ type }: { type: "Grant" | "Contract" }) {
  const isGrant = type === "Grant";
  const Icon = isGrant ? Award : Building;
  const theme = isGrant 
    ? "border-emerald-400 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-700 dark:text-emerald-300"
    : "border-sky-400 bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:border-sky-700 dark:text-sky-300";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium ${theme}`}>
      <Icon className="h-3.5 w-3.5" />
      {type}
    </span>
  );
}