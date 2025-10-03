"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHero } from "@/components/PageHero";
import talks from "@/data/talks.json";
import { Calendar, MapPin, Mic, Layers, Globe, Presentation, Group, BookOpen } from "lucide-react";
import Pagination from "@/components/Pagination";
import { Card } from "@/components/Card";

type Talk = {
  year: number;
  event: string;
  role: string;
  title?: string;
  start: string;
  end?: string;
  location?: string;
  type?: "conference" | "workshop" | "seminar" | "webinar";
  notes?: string;
};

const TYPES: Array<Talk["type"] | "all"> = ["all", "conference", "workshop", "seminar", "webinar"];
const PAGE_SIZE = 10;

export default function TalksPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<"all" | NonNullable<Talk["type"]>>("all");
  const [page, setPage] = useState(1);

  const items = useMemo(() => talks as Talk[], []);

  const stats = useMemo(() => {
    const locations = new Set(items.map(t => t.location?.split(', ').pop()?.trim()).filter(Boolean));
    const chairRoles = items.filter(t => t.role.toLowerCase().includes('chair')).length;
    return {
      total: items.length,
      countries: locations.size,
      chaired: chairRoles,
    };
  }, [items]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return items.filter((t) => {
      const hay = [t.event, t.role, t.title, t.location, t.type, String(t.year), t.notes].filter(Boolean).join(" ").toLowerCase();
      return (!query || hay.includes(query)) && (type === "all" || t.type === type);
    });
  }, [items, q, type]);

  const sorted = useMemo(() => [...filtered].sort((a, b) => (b.start || "").localeCompare(a.start || "") || a.event.localeCompare(b.event)), [filtered]);

  useEffect(() => { setPage(1); }, [q, type]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageItems = useMemo(() => sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [sorted, page]);
  const byYear = useMemo(() => {
    const map = new Map<number, Talk[]>();
    pageItems.forEach((t) => map.set(t.year, [...(map.get(t.year) || []), t]));
    return Array.from(map.entries()).sort(([a], [b]) => b - a);
  }, [pageItems]);

  return (
    <div className="space-y-12">
      <PageHero
        title="Talks & Workshops"
        subtitle="A curated list of my seminars, conference presentations, and sessions chaired over the years."
      />

      {/* --- [NEW] Talks Dashboard --- */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <TalksSummaryChart talks={items} />
        </div>
        <div className="space-y-4">
          <StatCard icon={Presentation} label="Total Talks & Presentations" value={stats.total.toString()} />
          <StatCard icon={Globe} label="Unique Countries/Regions" value={stats.countries.toString()} />
          <StatCard icon={Group} label="Sessions Chaired" value={stats.chaired.toString()} />
        </div>
      </section>

      {/* --- Detailed List --- */}
      <section>
        <Card>
          <div className="flex flex-wrap items-center gap-4">
            <input
              className="flex-grow rounded-lg border bg-transparent px-3 py-2 text-sm md:flex-grow-0 md:w-72"
              placeholder="Search event, title, location…" value={q} onChange={(e) => setQ(e.target.value)}
            />
            <select className="rounded-lg border bg-transparent px-3 py-2 text-sm" value={type} onChange={(e) => setType(e.target.value as any)}>
              {TYPES.map((t) => <option key={t} value={t}>{t === "all" ? "All types" : capitalize(t)}</option>)}
            </select>
            <div className="ml-auto text-sm text-gray-600 dark:text-gray-300">
              Showing {pageItems.length} of {sorted.length} results
            </div>
          </div>
        </Card>
      </section>
      
      {byYear.map(([year, list]) => (
        <section key={year} className="relative pl-8">
          <div className="absolute left-0 h-full w-0.5 bg-gray-200 dark:bg-gray-800" />
          <h2 className="sticky top-14 text-lg font-semibold py-2 z-10 -ml-8 pl-8
            bg-white/80 dark:bg-gray-950/80 backdrop-blur">
            <span className="absolute left-[-6px] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-brand" />
            {year}
          </h2>
          <ul className="mt-4 space-y-6">
            {list.map((t) => <TalkItem key={`${t.start}-${t.event}`} t={t} />)}
          </ul>
        </section>
      ))}

      <Pagination className="justify-center" page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

// --- Helper & Sub-components ---

function StatCard({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) {
  return (
    <div className="card flex items-center gap-4">
      <div className="rounded-full bg-brand-muted p-3 dark:bg-gray-800">
        <Icon className="h-6 w-6 text-brand" />
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
      </div>
    </div>
  );
}

function TalkItem({ t }: { t: Talk }) {
  return (
    <li className="relative">
       <div className="absolute left-[-22px] top-2 h-3 w-3 rounded-full bg-white border-2 border-brand dark:bg-gray-950"></div>
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">{t.event}</h3>
              {t.type && <TypeBadge type={t.type} />}
            </div>
            {t.title && <p className="mt-1 text-gray-700 dark:text-gray-300 italic">“{t.title}”</p>}
          </div>
          <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-400 text-right">
            <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> <span>{fmtRange(t.start, t.end)}</span></div>
            {t.location && <div className="flex items-center gap-2 mt-1"><MapPin className="w-4 h-4" /> <span>{t.location}</span></div>}
          </div>
        </div>
        <div className="mt-3 border-t pt-3 dark:border-gray-800 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
          <span className="flex items-center gap-2"><Mic className="w-4 h-4" /> Role: <strong>{t.role}</strong></span>
        </div>
      </Card>
    </li>
  );
}

const TYPE_THEMES: Record<NonNullable<Talk["type"]>, { icon: React.ElementType, theme: string }> = {
  conference: { icon: Group, theme: "text-sky-800 bg-sky-100 dark:text-sky-300 dark:bg-sky-900/30" },
  workshop: { icon: Layers, theme: "text-amber-800 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/30" },
  seminar: { icon: BookOpen, theme: "text-emerald-800 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/30" },
  webinar: { icon: Globe, theme: "text-violet-800 bg-violet-100 dark:text-violet-300 dark:bg-violet-900/30" },
};

function TypeBadge({ type }: { type: NonNullable<Talk["type"]> }) {
  const { icon: Icon, theme } = TYPE_THEMES[type];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${theme}`}>
      <Icon className="h-3.5 w-3.5" />
      {capitalize(type)}
    </span>
  );
}

function TalksSummaryChart({ talks }: { talks: Talk[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const summary = useMemo(() => {
    const counts: Record<string, number> = {};
    talks.forEach(t => { if (t.type) counts[t.type] = (counts[t.type] || 0) + 1 });
    const total = talks.length;
    return Object.entries(counts).map(([type, count]) => ({ type, count, pct: count / total }));
  }, [talks]);

  const hoveredData = hovered ? summary.find(d => d.type === hovered) : null;
  let accumulatedPct = 0;

  return (
    <Card className="flex items-center gap-6">
      <div className="relative h-40 w-40">
        <svg viewBox="0 0 36 36" className="transform -rotate-90">
          {summary.map(({ type, pct }) => {
            const dasharray = `${pct * 100} ${100 - pct * 100}`;
            const dashoffset = -accumulatedPct * 100;
            accumulatedPct += pct;
            return (
              <circle key={type} cx="18" cy="18" r="15.9" fill="transparent" strokeWidth="3"
                strokeDasharray={dasharray} strokeDashoffset={dashoffset}
                className={`transition-opacity duration-200 ${TYPE_THEMES[type as NonNullable<Talk['type']>].theme.replace('bg', 'stroke').replace(/text-([a-z]+)-[0-9]+/, 'stroke-$1-500')}`}
                onMouseEnter={() => setHovered(type)} onMouseLeave={() => setHovered(null)}
                style={{ opacity: hovered === null || hovered === type ? 1 : 0.3 }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {hoveredData ? (
            <>
              <div className="text-2xl font-bold">{hoveredData.count}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{capitalize(hoveredData.type)}</div>
            </>
          ) : (
            <>
              <div className="text-2xl font-bold">{talks.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Talks</div>
            </>
          )}
        </div>
      </div>
      <div className="flex-1 space-y-2">
        {summary.map(({ type, count, pct }) => (
          <div key={type} className="flex items-center text-sm" onMouseEnter={() => setHovered(type)} onMouseLeave={() => setHovered(null)}>
            <TypeBadge type={type as any} />
            <span className="ml-auto font-semibold">{count}</span>
            <span className="w-12 text-right text-gray-500">{`(${(pct * 100).toFixed(0)}%)`}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function fmtRange(start?: string, end?: string) {
  if (!start && !end) return "—";
  if (start && !end) return start;
  return `${start} → ${end}`;
}

function capitalize(x: string) {
  return x.charAt(0).toUpperCase() + x.slice(1);
}