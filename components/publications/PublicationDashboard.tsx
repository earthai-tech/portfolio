"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/Card";
import { Book, Edit3, Newspaper } from "lucide-react";

// Define the Pub type again here or import from a shared types file
type Pub = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  doi?: string;
  arxiv?: string;
  url?: string;
  featured?: boolean;
  tags?: string[];
};

export default function PublicationDashboard({ allPubs }: { allPubs: Pub[] }) {
  const stats = useMemo(() => {
    const total = allPubs.length;
    const firstAuthor = allPubs.filter(p => p.authors.toLowerCase().startsWith('kouadio')).length;
    const journals = new Set(allPubs.map(p => p.venue.split('(')[0].trim())).size;
    return { total, firstAuthor, journals };
  }, [allPubs]);

  return (
    <section className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card className="hover:shadow-sm hover:translate-y-0 hover:border-gray-100 dark:hover:border-gray-800">
          <h2 className="text-lg font-bold mb-4">Publications Per Year</h2>
          <PubsByYearChart allPubs={allPubs} />
        </Card>
      </div>
      <div className="space-y-4">
        <StatCard icon={Book} label="Total Publications" value={stats.total.toString()} />
        <StatCard icon={Edit3} label="First-Author Papers" value={stats.firstAuthor.toString()} />
        <StatCard icon={Newspaper} label="Unique Journals" value={stats.journals.toString()} />
      </div>
    </section>
  );
}

// --- Helper Components for the Dashboard ---
function StatCard({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) {
  return (
    <div className="card flex items-center gap-4">
      <div className="rounded-full bg-brand-muted p-3 dark:bg-gray-800">
        <Icon className="h-6 w-6 text-brand" />
      </div>
      <div>
        <div className="text-3xl font-bold">{value}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
      </div>
    </div>
  );
}
// Interactive Bar Chart
function PubsByYearChart({ allPubs }: { allPubs: Pub[] }) {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  const data = useMemo(() => {
    const counts = new Map<number, { count: number; journals: string[] }>();
    allPubs.forEach(p => {
      const yearData = counts.get(p.year) || { count: 0, journals: [] };
      yearData.count++;
      yearData.journals.push(p.venue.split('(')[0].trim());
      counts.set(p.year, yearData);
    });
    return Array.from(counts.entries()).sort(([a], [b]) => a - b);
  }, [allPubs]);

  const maxCount = Math.max(1, ...data.map(([, { count }]) => count));
  const W = 920, H = 200, P = { t: 20, r: 0, b: 30, l: 30 };
  const chartH = H - P.t - P.b;
  const barW = (W - P.l - P.r) / data.length * 0.6;
  
  const hoveredData = hoveredYear ? data.find(([year]) => year === hoveredYear)?.[1] : null;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" onMouseLeave={() => setHoveredYear(null)}>
        {/* Y-axis and grid */}
        {Array.from({ length: 5 }).map((_, i) => {
          const y = P.t + (chartH / 4) * i;
          const value = maxCount - (maxCount / 4) * i;
          return ( <g key={i} className="text-[10px] text-gray-500"> {/* ... */} </g> );
        })}
        {/* Bars and X-axis */}
        {data.map(([year, { count }], i) => {
          const barH = (count / maxCount) * chartH;
          const x = P.l + i * ((W - P.l) / data.length) + ((W - P.l) / data.length - barW) / 2;
          const isHovered = year === hoveredYear;
          return (
            <g key={year} onMouseEnter={() => setHoveredYear(year)} className="cursor-pointer">
              <rect x={x} y={H - P.b - barH} width={barW} height={barH} rx={2} className={`fill-brand transition-opacity ${isHovered ? 'opacity-100' : 'opacity-60'}`} />
              <text x={x + barW / 2} y={H - P.b + 15} className="text-xs fill-gray-500" textAnchor="middle">{year}</text>
            </g>
          );
        })}
      </svg>
      {/* Tooltip */}
      {hoveredData && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 p-3 rounded-lg bg-gray-900 text-white shadow-lg pointer-events-none w-64">
          <p className="font-bold text-center">{hoveredYear}: {hoveredData.count} Publication{hoveredData.count > 1 ? 's' : ''}</p>
          <ul className="mt-2 text-xs text-gray-300 list-disc list-inside max-h-24 overflow-y-auto">
            {[...new Set(hoveredData.journals)].map((journal, i) => <li key={i}>{journal}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}