"use client";
import data from "@/data/funding.json";
import { useMemo } from "react";
import { useCurrency } from "@/components/CurrencyProvider";
import { convertFromCNY, formatMoney } from "@/utils/currency";

export default function ByTheNumbers() {
  const { currency } = useCurrency();

  const { total, grants, contracts } = useMemo(() => {
    const items = data as Array<{ type: "Contract" | "Grant"; amount_cny?: number | null }>;
    const sum = (arr: typeof items, t?: "Contract" | "Grant") =>
      arr
        .filter((x) => (t ? x.type === t : true))
        .reduce((acc, x) => acc + (x.amount_cny || 0), 0);

    return {
      total: {
        count: items.length,
        amountCny: sum(items),
      },
      grants: {
        count: items.filter((x) => x.type === "Grant").length,
        amountCny: sum(items, "Grant"),
      },
      contracts: {
        count: items.filter((x) => x.type === "Contract").length,
        amountCny: sum(items, "Contract"),
      },
    };
  }, []);

  const totalFmt = formatMoney(convertFromCNY(total.amountCny, currency), currency);
  const grantsFmt = formatMoney(convertFromCNY(grants.amountCny, currency), currency);
  const contractsFmt = formatMoney(convertFromCNY(contracts.amountCny, currency), currency);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">By the numbers</h2>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard label="Total funding" value={totalFmt} sub={`${total.count} projects`} />
        <StatCard label="Grants" value={grantsFmt} sub={`${grants.count} awards`} />
        <StatCard label="Contracts" value={contractsFmt} sub={`${contracts.count} projects`} />
      </div>
      <p className="text-xs text-gray-500">Displayed in your selected currency (toggle in header or on the Funding page).</p>
    </section>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="card">
      <div className="text-sm text-gray-600 dark:text-gray-300">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      {sub && <div className="text-sm text-gray-500 mt-1">{sub}</div>}
    </div>
  );
}
