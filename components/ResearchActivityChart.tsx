// components/ResearchActivityChart.tsx
"use client";

import { useState } from "react";
import pubsData from "@/data/publications.json";
import talksData from "@/data/talks.json";
import fundingData from "@/data/funding.json";
import { convertFromCNY } from "@/utils/currency";
import { useCurrency } from "@/components/CurrencyProvider"; 
import type { Currency } from "@/utils/currency";

// --- Type Definitions ---
type Pub = { year?: number };
type Talk = { year?: number; date?: string };
type Funding = { period_start?: string; amount_cny?: number | null };

type Point = { label: string; value: string };
type Props = {
  variant?: "mini" | "full";
  startYear?: number;
  setHoveredPoint?: (point: Point | null) => void;
};

// --- Helper Functions ---
const talkYear = (t: Talk): number | undefined => {
  if (typeof t.year === "number") return t.year;
  if (t.date && /^\d{4}/.test(t.date)) return Number(t.date.slice(0, 4));
  return undefined;
};

// [NEW] A generic money abbreviator for both USD and CNY
const abbreviateMoney = (n: number, currency: Currency): string => {
  const prefix = currency === "USD" ? "$" : "¥";
  if (Math.abs(n) >= 1e6) return `${prefix}${(n / 1e6).toFixed(1)}M`;
  if (Math.abs(n) >= 1e3) return `${prefix}${(n / 1e3).toFixed(0)}K`;
  return `${prefix}${Math.round(n)}`;
};

const smoothPath = (points: { x: number; y: number }[], tension = 0.4): string => {
  if (points.length < 2) return `M ${points[0]?.x ?? 0} ${points[0]?.y ?? 0}`;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]; const p1 = points[i];
    const p2 = points[i + 1]; const p3 = points[i + 2] ?? p2;
    const cp1x = p1.x + ((p2.x - p0.x) * tension) / 6;
    const cp1y = p1.y + ((p2.y - p0.y) * tension) / 6;
    const cp2x = p2.x - ((p3.x - p1.x) * tension) / 6;
    const cp2y = p2.y - ((p3.y - p1.y) * tension) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
};

// --- Main Chart Component ---
export default function ResearchActivityChart({
  variant = "full",
  startYear = 2020,
  setHoveredPoint,
}: Props) {
  // [NEW] Get currency and rate from the context
  const { currency, usdPerCnyRate } = useCurrency();
  const [activeYear, setActiveYear] = useState<number | null>(null);

  // --- Data Processing ---
  const nowY = new Date("2025-10-03T01:36:27.420Z").getFullYear();
  const years = Array.from({ length: nowY - startYear + 1 }, (_, i) => startYear + i);

  const pubCounts = years.map((y) => (pubsData as Pub[]).filter((p) => p.year === y).length);
  const talkCounts = years.map((y) => (talksData as Talk[]).filter((t) => talkYear(t) === y).length);

  // [MODIFIED] Calculate funding amounts based on the selected currency
  const fundingAmounts = years.map((y) => {
    const totalCNY = (fundingData as Funding[])
      .filter((f) => (f.period_start ?? "").slice(0, 4) === String(y))
      .reduce((acc, f) => acc + (f.amount_cny || 0), 0);
    return convertFromCNY(totalCNY, currency, usdPerCnyRate);
  });

  // --- SVG Layout & Scaling ---
  const W = variant === "mini" ? 340 : 920; const H = variant === "mini" ? 220 : 320;
  const P = { t: 40, r: 56, b: 44, l: 52 };

  const chartW = W - P.l - P.r; const chartH = H - P.t - P.b;
  const maxCount = Math.max(1, ...pubCounts, ...talkCounts);
  const maxFunding = Math.max(1, ...fundingAmounts);
  const groupWidth = chartW / years.length;
  const barWidth = Math.max(6, (groupWidth - 10) / 2 - 6);

  const yLeft = (v: number) => P.t + chartH - (v / maxCount) * chartH;
  const yRight = (v: number) => P.t + chartH - (v / maxFunding) * chartH;
  
  const leftTicks = Array.from({ length: 6 }, (_, i) => Math.round((maxCount * i) / 5));
  const rightTicks = Array.from({ length: 6 }, (_, i) => (maxFunding * i) / 5);
  const labelEvery = variant === "mini" ? Math.ceil(years.length / 6) : 1;

  const fundingPoints = years.map((_, i) => ({
    x: P.l + i * groupWidth + groupWidth / 2,
    y: yRight(fundingAmounts[i]),
  }));

  // --- Interaction Handlers ---
  const handleMouseOver = (year: number, type: string, value: number) => {
    setActiveYear(year);
    if (setHoveredPoint) {
      // [MODIFIED] Use the new generic money formatter
      const formattedValue = type === 'Funding' ? abbreviateMoney(value, currency) : value.toString();
      setHoveredPoint({ label: `${type} in ${year}`, value: formattedValue });
    }
  };

  const handleMouseOut = () => {
    setActiveYear(null);
    if (setHoveredPoint) setHoveredPoint(null);
  };

  const LegendItem = ({ x, y, colorClass, label, isLine = false }: any) => (
     <g transform={`translate(${x},${y})`}>
       {isLine ? (
         <line x1={0} y1={-2} x2={18} y2={-2} className={`stroke-[2.5] ${colorClass}`} strokeLinecap="round" />
       ) : (
         <rect x={0} y={-8} width={12} height={12} rx={2.5} className={colorClass} />
       )}
       <text x={isLine ? 24 : 18} y={2} className="fill-gray-700 dark:fill-gray-300 text-[10px] font-medium">{label}</text>
     </g>
  );

  return (
    <div className="w-full relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" onMouseLeave={handleMouseOut}>
        <g>
          <LegendItem x={P.l} y={P.t - 15} colorClass="fill-blue-600" label="Publications" />
          <LegendItem x={P.l + 90} y={P.t - 15} colorClass="fill-rose-500" label="Talks" />
          {/* [MODIFIED] Dynamic legend label */}
          <LegendItem x={P.l + 150} y={P.t - 15} colorClass="stroke-violet-600" label={`Funding (${currency})`} isLine />
        </g>
        
        {leftTicks.map((t, i) => (
          <g key={`g-${i}`}>
            <line x1={P.l} x2={W - P.r} y1={yLeft(t)} y2={yLeft(t)} className="stroke-gray-200 dark:stroke-gray-800" />
            <text x={P.l - 8} y={yLeft(t) + 4} className="fill-gray-500 dark:fill-gray-400 text-[10px]" textAnchor="end">{t}</text>
          </g>
        ))}
        {rightTicks.map((t, i) => (
          // [MODIFIED] Use the new generic money formatter
          <text key={`r-${i}`} x={W - P.r + 6} y={yRight(t) + 4} className="fill-gray-500 dark:fill-gray-400 text-[10px]" textAnchor="start">{abbreviateMoney(t, currency)}</text>
        ))}
        <line x1={W - P.r} y1={P.t} x2={W - P.r} y2={H - P.b} className="stroke-gray-300 dark:stroke-gray-700" />
        {years.map((y, i) => (
          (i % labelEvery === 0) && <text key={y} x={P.l + i * groupWidth + groupWidth / 2} y={H - 10} className="fill-gray-500 dark:fill-gray-400 text-[10px]" textAnchor="middle">{y}</text>
        ))}

        {years.map((y, i) => {
          const gx = P.l + i * groupWidth + 5;
          const pH = chartH * (pubCounts[i] / maxCount);
          const tH = chartH * (talkCounts[i] / maxCount);
          return (
            <g key={`bars-${y}`}>
              <rect x={gx - 5} y={P.t} width={groupWidth} height={chartH} fill="transparent" onMouseOver={() => setActiveYear(y)} />
              <rect x={gx} y={P.t + chartH - pH} width={barWidth} height={Math.max(0, pH)} rx={3} className="fill-blue-600/80 transition-opacity" style={{ opacity: activeYear === y || activeYear === null ? 1 : 0.25 }} onMouseOver={() => handleMouseOver(y, 'Publications', pubCounts[i])} />
              <rect x={gx + barWidth + 6} y={P.t + chartH - tH} width={barWidth} height={Math.max(0, tH)} rx={3} className="fill-rose-500/80 transition-opacity" style={{ opacity: activeYear === y || activeYear === null ? 1 : 0.25 }} onMouseOver={() => handleMouseOver(y, 'Talks', talkCounts[i])}/>
            </g>
          );
        })}

        <path d={smoothPath(fundingPoints)} className="fill-none stroke-[2.5] stroke-violet-600 transition-opacity" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: activeYear === null ? 1 : 0.25 }} />
        {fundingPoints.map((p, i) => (
          <g key={`fdot-${i}`} onMouseOver={() => handleMouseOver(years[i], 'Funding', fundingAmounts[i])}>
            <circle cx={p.x} cy={p.y} r={activeYear === years[i] ? 6 : 4} className="fill-violet-600 stroke-2 stroke-white dark:stroke-gray-900 transition-all cursor-pointer" />
          </g>
        ))}

        {years.map((y, i) => {
          if (activeYear !== y) return null;
          const gx = P.l + i * groupWidth + 5;
          const pH = chartH * (pubCounts[i] / maxCount);
          const tH = chartH * (talkCounts[i] / maxCount);
          return (
            <g key={`tooltip-${y}`} className="pointer-events-none">
              {pubCounts[i] > 0 && <text x={gx + barWidth/2} y={P.t + chartH - pH - 8} textAnchor="middle" className="text-xs font-bold fill-blue-700 dark:fill-blue-300">{pubCounts[i]}</text>}
              {talkCounts[i] > 0 && <text x={gx + barWidth + 6 + barWidth/2} y={P.t + chartH - tH - 8} textAnchor="middle" className="text-xs font-bold fill-rose-700 dark:fill-rose-300">{talkCounts[i]}</text>}
              {/* [MODIFIED] Use the new generic money formatter for tooltips */}
              {fundingAmounts[i] > 0 && <text x={fundingPoints[i].x} y={fundingPoints[i].y - 12} textAnchor="middle" className="text-xs font-bold fill-violet-700 dark:fill-violet-300">{abbreviateMoney(fundingAmounts[i], currency)}</text>}
            </g>
          )
        })}
      </svg>
    </div>
  );
}