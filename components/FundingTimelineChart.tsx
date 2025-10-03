// components/FundingTimelineChart.tsx
"use client";

import { useState, useMemo } from "react";
import data from "@/data/funding.json";
import { useCurrency } from "@/components/CurrencyProvider";
import { convertFromCNY, formatMoney } from "@/utils/currency";
import { Card } from "@/components/Card";

type Funding = typeof data[0];

export default function FundingTimelineChart() {
  const { currency } = useCurrency();
  const [hovered, setHovered] = useState<Funding | null>(null);

  const sortedData = useMemo(() => 
    [...data].sort((a, b) =>
      new Date(a.period_start).getTime() - new Date(b.period_start).getTime()
    ), 
  []);

  if (sortedData.length === 0) return null;

  const startYear = new Date(sortedData[0].period_start).getFullYear();
  const endYear = Math.max(...sortedData.map(d => new Date(d.period_end).getFullYear()));
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

  // --- SVG Dimensions & Scales ---
  const P = { t: 40, r: 20, b: 30, l: 20 };
  const barH = 12;
  const barGap = 8;
  
  // [FIX] Dynamically calculate the chart height based on content
  const contentHeight = sortedData.length * (barH + barGap);
  const W = 920;
  const H = P.t + contentHeight + P.b;

  const chartW = W - P.l - P.r;

  const totalTime = new Date(`${endYear + 1}-01-01`).getTime() - new Date(`${startYear}-01-01`).getTime();
  const timeToX = (dateStr: string) => {
    const date = new Date(dateStr);
    return P.l + ((date.getTime() - new Date(`${startYear}-01-01`).getTime()) / totalTime) * chartW;
  };

  const y = (i: number) => P.t + i * (barH + barGap);

  return (
    <Card>
      <div className="flex justify-between items-start mb-4 min-h-[40px]">
        <h2 className="text-lg font-bold">Funding Timeline</h2>
        {hovered && (
          <div className="text-sm text-right">
            <div className="font-bold">{hovered.title}</div>
            <div className="text-gray-600 dark:text-gray-400">
              {hovered.period_start} → {hovered.period_end} ({formatMoney(convertFromCNY(hovered.amount_cny ?? 0, currency), currency)})
            </div>
          </div>
        )}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" onMouseLeave={() => setHovered(null)}>
        {/* Year markers and grid lines */}
        {years.map(year => (
          <g key={year}>
            <line
              x1={timeToX(`${year}-01-01`)} y1={P.t - 10}
              x2={timeToX(`${year}-01-01`)} y2={H - P.b}
              className="stroke-gray-200 dark:stroke-gray-800"
            />
            <text x={timeToX(`${year}-01-01`) + 5} y={P.t - 5} className="text-xs fill-gray-500">{year}</text>
          </g>
        ))}

        {/* Grant & Contract bars */}
        {sortedData.map((d, i) => {
          const x1 = timeToX(d.period_start);
          const x2 = timeToX(d.period_end);
          const isGrant = d.type === "Grant";
          const color = isGrant ? "fill-emerald-500" : "fill-brand";
          const isHovered = hovered?.title === d.title;

          return (
            <g key={d.title} onMouseEnter={() => setHovered(d)} className="cursor-pointer">
              <rect
                x={x1}
                y={y(i)}
                width={Math.max(2, x2 - x1)}
                height={barH}
                rx={4}
                className={`${color} transition-all duration-150`}
                style={{ opacity: isHovered || hovered === null ? 1 : 0.4 }}
              />
            </g>
          );
        })}
      </svg>
    </Card>
  );
}