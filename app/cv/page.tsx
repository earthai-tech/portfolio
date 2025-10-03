'use client';

import { useEffect, useMemo, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import { Eye, Download, FileText, FolderKanban } from "lucide-react";

// --- Types & Storage Helpers ---
type EvType = "view" | "download";
type DocKey = "cv" | "catalog";
type Ev = { ts: number; type: EvType; doc: DocKey };

const STORE_KEYS: Record<DocKey, string> = {
  cv: "metrics/cv/events",
  catalog: "metrics/catalog/events",
};

function readEvents(doc: DocKey): Ev[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORE_KEYS[doc]);
    // Add doc key to each event for easier processing later
    return raw ? (JSON.parse(raw) as Omit<Ev, 'doc'>[]).map(e => ({...e, doc})) : [];
  } catch {
    return [];
  }
}

function pushEvent(doc: DocKey, type: EvType) {
  const key = STORE_KEYS[doc];
  const evs = (JSON.parse(localStorage.getItem(key) || '[]')) as Omit<Ev, 'doc'>[];
  evs.push({ ts: Date.now(), type });
  localStorage.setItem(key, JSON.stringify(evs));
}

// --- Date & Color Helpers ---
const MONTH_LABELS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const COLORS = {
  cv: { base: "hsl(210, 80%, 60%)", empty: "hsl(210, 30%, 95%)", darkEmpty: "hsl(210, 15%, 20%)" },
  catalog: { base: "hsl(140, 60%, 55%)", empty: "hsl(140, 30%, 95%)", darkEmpty: "hsl(140, 15%, 20%)" },
};

// --- Main Page Component ---
export default function CVPage() {
  const [events, setEvents] = useState<Ev[]>([]);

  const loadAndCombineEvents = () => {
    const cvEvs = readEvents("cv");
    const catEvs = readEvents("catalog");
    setEvents([...cvEvs, ...catEvs]);
  };
  
  useEffect(loadAndCombineEvents, []);

  const totals = useMemo(() => {
    const sum = (doc: DocKey, type: EvType) => events.filter(e => e.doc === doc && e.type === type).length;
    return {
      cv: { views: sum("cv", "view"), downloads: sum("cv", "download") },
      catalog: { views: sum("catalog", "view"), downloads: sum("catalog", "download") },
    };
  }, [events]);

  const track = (doc: DocKey, type: EvType) => () => {
    pushEvent(doc, type);
    loadAndCombineEvents(); // Refresh all events
  };

  return (
    <div className="space-y-12">
      <PageHero
        title="CV & Projects Catalog"
        subtitle="An overview of my professional background, publications, and a detailed catalog of my key research projects."
      />
      <div className="grid md:grid-cols-2 gap-8">
        <DocumentCard docKey="cv" title="Curriculum Vitae" href="/cv.pdf" stats={totals.cv} onEvent={track} color="brand" />
        <DocumentCard docKey="catalog" title="Projects Catalog" href="/projects-catalog.pdf" stats={totals.catalog} onEvent={track} color="emerald" />
      </div>
      <StatisticsSection events={events} />
    </div>
  );
}

function DocumentCard({ docKey, title, href, stats, onEvent, color }: any) {
  const icon = docKey === 'cv' ? <FileText className="h-6 w-6 text-gray-400"/> : <FolderKanban className="h-6 w-6 text-gray-400"/>;

  // [NEW] Add logic to determine button classes
  // If the color is 'brand', use the gradient. Otherwise, use the solid color.
  const isBrand = color === 'brand';
  const buttonClasses = isBrand
    ? "bg-gradient-to-r from-brand to-rose-500 hover:opacity-90 transition-opacity"
    : `bg-${color} hover:bg-${color}/90 transition-colors`;

  return (
    <Card
      title={`${title} (PDF)`}
      icon={icon}
      className="flex flex-col text-center hover:shadow-sm hover:translate-y-0 hover:border-gray-100 dark:hover:border-gray-800"
    >
      <div className="my-6 grid grid-cols-2 gap-4 divide-x dark:divide-gray-800">
        <div>
          <div className="text-3xl font-bold text-brand">{stats.views.toLocaleString()}</div>
          <div className="text-sm text-gray-500 uppercase tracking-wider">Views</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-emerald-600">{stats.downloads.toLocaleString()}</div>
          <div className="text-sm text-gray-500 uppercase tracking-wider">Downloads</div>
        </div>
      </div>
      <div className="mt-auto flex gap-3">
        <a href={href} target="_blank" rel="noreferrer" onClick={onEvent(docKey, "view")} className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-800 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 flex-1">
          <Eye className="w-4 h-4" /> View
        </a>
        {/* [MODIFIED] Applied the new conditional button classes */}
        <a href={href} download onClick={onEvent(docKey, "download")} className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold text-white shadow-sm flex-1 ${buttonClasses}`}>
          <Download className="w-4 h-4" /> Download
        </a>
      </div>
    </Card>
  );
}

// --- Statistics Section with Tabs ---
function StatisticsSection({ events }: { events: Ev[] }) {
  const [activeTab, setActiveTab] = useState<'daily' | 'monthly'>('daily');

  return (
    <section className="space-y-4">
      <div className="flex items-center">
        <h2 className="text-2xl font-bold">Activity Statistics</h2>
        <div className="ml-auto flex items-center gap-2 rounded-lg border p-1 dark:border-gray-800">
          <TabButton isActive={activeTab === 'daily'} onClick={() => setActiveTab('daily')}>Daily Activity</TabButton>
          <TabButton isActive={activeTab === 'monthly'} onClick={() => setActiveTab('monthly')}>Monthly Trends</TabButton>
        </div>
      </div>
      <Card title="Statistics Overview" className="hover:shadow-sm hover:translate-y-0 hover:border-gray-100 dark:hover:border-gray-800">
        {activeTab === 'daily' ? <ActivityCalendar events={events} /> : <MonthlyBarChart events={events} />}
      </Card>
    </section>
  );
}
function TabButton({ children, isActive, onClick }: any) {
  return (
    <button onClick={onClick} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${isActive ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100" : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"}`}>
      {children}
    </button>
  );
}


// --- Activity Calendar Chart (GitHub Style) ---
function ActivityCalendar({ events }: { events: Ev[] }) {
  const [tooltip, setTooltip] = useState<{ x: number, y: number, content: string } | null>(null);

  const { days, maxCount } = useMemo(() => {
    const today = new Date();
    const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 364);
    
    const daysMap = new Map<string, { cv: number, catalog: number }>();
    let maxCount = 0;

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().split('T')[0];
      daysMap.set(key, { cv: 0, catalog: 0 });
    }
    
    events.forEach(event => {
      const key = new Date(event.ts).toISOString().split('T')[0];
      if (daysMap.has(key)) {
        const dayData = daysMap.get(key)!;
        dayData[event.doc]++;
        maxCount = Math.max(maxCount, dayData.cv + dayData.catalog);
      }
    });

    return { days: Array.from(daysMap.entries()), maxCount: Math.max(1, maxCount) };
  }, [events]);
  
  const weeks = Array.from({ length: 53 }, (_, i) => days.slice(i * 7, (i + 1) * 7));

  return (
    <div>
      <div className="relative grid grid-flow-col justify-start gap-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-flow-row gap-1">
            {week.map(([date, counts]) => {
              const total = counts.cv + counts.catalog;
              const opacity = total / maxCount;
              const color = counts.cv > counts.catalog ? COLORS.cv.base : COLORS.catalog.base;

              return (
                <div
                  key={date}
                  className="h-3 w-3 rounded-[2px] bg-gray-100 dark:bg-gray-800"
                  style={{ backgroundColor: total > 0 ? color : undefined, opacity: total > 0 ? opacity : 1 }}
                  onMouseEnter={(e) => setTooltip({ x: e.clientX, y: e.clientY, content: `${date}: ${counts.cv} CV, ${counts.catalog} Catalog` })}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })}
          </div>
        ))}
      </div>
      {tooltip && (
        <div style={{ left: tooltip.x, top: tooltip.y }} className="fixed -translate-x-1/2 -translate-y-[120%] z-10 rounded bg-gray-900 px-2 py-1 text-xs text-white dark:bg-gray-100 dark:text-gray-900">
          {tooltip.content}
        </div>
      )}
    </div>
  );
}

// --- Monthly Bar Chart ---
function MonthlyBarChart({ events }: { events: Ev[] }) {
  const data = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return { key: `${d.getFullYear()}-${d.getMonth()}`, label: MONTH_LABELS[d.getMonth()], cv: 0, catalog: 0 };
    }).reverse();

    events.forEach(event => {
      const d = new Date(event.ts);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const month = months.find(m => m.key === key);
      if (month) {
        month[event.doc]++;
      }
    });
    return months;
  }, [events]);

  const maxCount = Math.max(1, ...data.map(m => m.cv + m.catalog));
  const W = 920, H = 250, P = { t: 20, r: 0, b: 30, l: 30 };
  const chartH = H - P.t - P.b;
  const barW = (W - P.l - P.r) / data.length * 0.6;
  
  return (
    <svg viewBox={`0 0 ${W} ${H}`}>
      {/* Y-axis grid */}
      {Array.from({ length: 5 }).map((_, i) => {
        const y = P.t + (chartH / 4) * i;
        const value = maxCount - (maxCount / 4) * i;
        return (
          <g key={i}>
            <text x={P.l - 8} y={y + 4} className="text-[10px] fill-gray-500" textAnchor="end">{Math.ceil(value)}</text>
            <line x1={P.l} x2={W} y1={y} y2={y} className="stroke-gray-200 dark:stroke-gray-800" />
          </g>
        );
      })}

      {data.map((month, i) => {
        const totalH = (month.cv + month.catalog) / maxCount * chartH;
        const cvH = (month.cv / maxCount) * chartH;
        const catH = (month.catalog / maxCount) * chartH;
        const x = P.l + i * ((W - P.l) / data.length) + ((W - P.l) / data.length - barW) / 2;

        return (
          <g key={month.key}>
            <rect x={x} y={H - P.b - cvH - catH} width={barW} height={catH} fill={COLORS.catalog.base} />
            <rect x={x} y={H - P.b - cvH} width={barW} height={cvH} fill={COLORS.cv.base} />
            <text x={x + barW / 2} y={H - P.b + 15} className="text-xs fill-gray-500" textAnchor="middle">{month.label}</text>
          </g>
        );
      })}
    </svg>
  );
}