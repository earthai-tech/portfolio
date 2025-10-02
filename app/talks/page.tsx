"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHero } from "@/components/PageHero";
import talks from "@/data/talks.json";
import { Calendar, MapPin, Mic, Layers } from "lucide-react";
import Pagination from "@/components/Pagination";

type Talk = {
  year: number;
  event: string;
  role: string;
  title?: string;
  start: string;  // YYYY-MM-DD or YYYY
  end?: string;   // YYYY-MM-DD or YYYY
  location?: string;
  type?: "conference" | "workshop" | "seminar" | "webinar";
  notes?: string;
};

const TYPES: Array<Talk["type"] | "all"> = ["all", "conference", "workshop", "seminar", "webinar"];
const PAGE_SIZE = 8; // ← show 8 talks per page (change as you like)

export default function TalksPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<"all" | NonNullable<Talk["type"]>>("all");
  const [page, setPage] = useState(1);

  const items = talks as Talk[];

  // filter
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return items.filter((t) => {
      const hay = [
        t.event, t.role, t.title, t.location, t.type, String(t.year), t.notes
      ].filter(Boolean).join(" ").toLowerCase();
      const matchQ = !query || hay.includes(query);
      const matchType = type === "all" || t.type === type;
      return matchQ && matchType;
    });
  }, [items, q, type]);

  // sort newest first by start date, fallback event name
  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const da = (a.start || "").replaceAll("-", "");
      const db = (b.start || "").replaceAll("-", "");
      if (da > db) return -1;
      if (da < db) return 1;
      return a.event.localeCompare(b.event);
    });
    return arr;
  }, [filtered]);

  // reset page when filters change
  useEffect(() => { setPage(1); }, [q, type]);

  // paginate
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;
  const pageItems = sorted.slice(startIdx, startIdx + PAGE_SIZE);

  // regroup current page by year (keeps sticky year headers)
  const byYear = useMemo(() => {
    const map = new Map<number, Talk[]>();
    pageItems.forEach((t) => map.set(t.year, [...(map.get(t.year) || []), t]));
    return Array.from(map.entries())
      .sort(([a], [b]) => b - a)
      .map(([year, list]) => [year, list] as const);
  }, [pageItems]);

  return (
    <div className="space-y-8">
      <PageHero
        title="Talks & Workshops"
        subtitle="Selected seminars, conference talks, and sessions chaired."
      >
        <div className="flex items-center gap-3">
          <input
            className="border rounded-lg px-3 py-2 text-sm w-72"
            placeholder="Search event, title, location…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={type}
            onChange={(e) => setType(e.target.value as any)}
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t === "all" ? "All types" : capitalize(t)}
              </option>
            ))}
          </select>
          <div className="ml-auto text-sm text-gray-600 dark:text-gray-300">
            Showing {pageItems.length} of {sorted.length} result{sorted.length === 1 ? "" : "s"}
          </div>
        </div>
      </PageHero>

      {byYear.map(([year, list]) => (
        <section key={year}>
          <h2 className="sticky top-14 bg-white/80 dark:bg-gray-950/80 backdrop-blur z-10
                         text-lg font-semibold py-2 border-b dark:border-gray-800">
            {year}
          </h2>
          <ul className="mt-4 space-y-4">
            {list.map((t, i) => (
              <TalkItem key={`${year}-${i}`} t={t} />
            ))}
          </ul>
        </section>
      ))}

      {/* Pagination controls */}
      <Pagination
        className="justify-center"
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

/* ---------- components ---------- */

function TalkItem({ t }: { t: Talk }) {
  return (
    <li className="card relative">
      <div className="absolute left-[-10px] top-4 h-4 w-4 rounded-full bg-brand/80"></div>

      <div className="flex flex-col md:flex-row md:items-start md:gap-6">
        <div className="flex-1">
          <div className="font-medium">{t.event}</div>
          <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            {t.title || <span className="italic text-gray-500">—</span>}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
            <span className="badge"><Mic className="w-4 h-4" />{t.role}</span>
            {t.type && <span className="badge"><Layers className="w-4 h-4" />{capitalize(t.type)}</span>}
          </div>
        </div>

        <div className="mt-3 md:mt-0 min-w-[220px] space-y-1 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{fmtRange(t.start, t.end)}</span>
          </div>
          {t.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{t.location}</span>
            </div>
          )}
          {t.notes && <div className="text-xs text-gray-500">{t.notes}</div>}
        </div>
      </div>
    </li>
  );
}

/* ---------- utils ---------- */

function fmtRange(start?: string, end?: string) {
  if (!start && !end) return "—";
  if (start && !end) return start;
  if (!start && end) return end;
  return `${start} → ${end}`;
}
function capitalize(x: string) {
  return x.charAt(0).toUpperCase() + x.slice(1);
}
