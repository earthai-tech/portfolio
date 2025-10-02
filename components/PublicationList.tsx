"use client";

import { useEffect, useMemo, useState } from "react";
import pubs from "@/data/publications.json";
import Pagination from "@/components/Pagination";

type Pub = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  doi?: string;     // "10.xxxx/..." or full https://doi.org/...
  arxiv?: string;   // full URL
  url?: string;     // fallback link
  featured?: boolean;
  tags?: string[];
};

type Status =
  | "Published"
  | "Under review"
  | "Submitted"
  | "In preparation"
  | "Preprint";

const PAGE_SIZE = 10; // ← how many non-featured items per page

function detectStatus(venue: string): Status {
  const v = venue.toLowerCase();
  if (v.includes("under review")) return "Under review";
  if (v.includes("submitted")) return "Submitted";
  if (v.includes("in preparation") || v.includes("preparation")) return "In preparation";
  if (v.includes("preprint") || v.includes("arxiv")) return "Preprint";
  return "Published";
}

function doiToUrl(doi?: string) {
  if (!doi) return null;
  const d = doi.trim();
  if (d.startsWith("http://") || d.startsWith("https://")) return d;
  return `https://doi.org/${d}`;
}

export default function PublicationList() {
  const [q, setQ] = useState("");
  const [year, setYear] = useState<number | "all">("all");
  const [status, setStatus] = useState<Status | "All">("All");
  const [sort, setSort] = useState<"yearDesc" | "yearAsc" | "titleAsc">("yearDesc");
  const [page, setPage] = useState(1);

  // enrich with status
  const withStatus = useMemo(
    () => pubs.map((p) => ({ ...p, _status: detectStatus(p.venue) as Status })),
    []
  );

  // years for filter
  const years = useMemo(
    () => Array.from(new Set(withStatus.map((p) => p.year))).sort((a, b) => b - a),
    [withStatus]
  );

  // filter
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return withStatus.filter((p) => {
      const matchQ =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.authors.toLowerCase().includes(query) ||
        p.venue.toLowerCase().includes(query) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(query));
      const matchYear = year === "all" || p.year === year;
      const matchStatus = status === "All" || p._status === status;
      return matchQ && matchYear && matchStatus;
    });
  }, [withStatus, q, year, status]);

  // sort
  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "yearDesc") arr.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
    if (sort === "yearAsc") arr.sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
    if (sort === "titleAsc") arr.sort((a, b) => a.title.localeCompare(b.title));
    return arr;
  }, [filtered, sort]);

  // split featured vs rest
  const featured = sorted.filter((p) => p.featured);
  const restAll = sorted.filter((p) => !p.featured);

  // reset page when filters/search/sort change
  useEffect(() => { setPage(1); }, [q, year, status, sort]);

  // paginate the rest
  const totalPages = Math.max(1, Math.ceil(restAll.length / PAGE_SIZE));
  const startIdx = (page - 1) * PAGE_SIZE;
  const rest = restAll.slice(startIdx, startIdx + PAGE_SIZE);

  const totalShown = featured.length + rest.length;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          className="border rounded-lg px-3 py-2 text-sm"
          placeholder="Search title, author, tag..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={year}
          onChange={(e) => setYear(e.target.value === "all" ? "all" : Number(e.target.value))}
        >
          <option value="all">All years</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value as Status | "All")}
        >
          <option>All</option>
          <option>Published</option>
          <option>Under review</option>
          <option>Submitted</option>
          <option>In preparation</option>
          <option>Preprint</option>
        </select>
        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={sort}
          onChange={(e) => setSort(e.target.value as any)}
        >
          <option value="yearDesc">Sort: Year ↓</option>
          <option value="yearAsc">Sort: Year ↑</option>
          <option value="titleAsc">Sort: Title A→Z</option>
        </select>
        <div className="ml-auto text-sm text-gray-600 dark:text-gray-300">
          Showing {totalShown} of {sorted.length} result{sorted.length === 1 ? "" : "s"}
        </div>
      </div>

      {/* Featured (always visible) */}
      {featured.length > 0 && (
        <section>
          <h3 className="font-medium mb-3">Featured</h3>
          <ul className="space-y-4">
            {featured.map((p, i) => (
              <PublicationItem key={`f-${i}`} p={p as any} />
            ))}
          </ul>
        </section>
      )}

      {/* Rest (paginated) */}
      <section>
        {featured.length > 0 && <h3 className="font-medium mb-3">All</h3>}
        <ul className="space-y-4">
          {rest.map((p, i) => (
            <PublicationItem key={`r-${startIdx + i}`} p={p as any} />
          ))}
        </ul>

        <Pagination
          className="mt-4 justify-center"
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </section>
    </div>
  );
}

function PublicationItem({ p }: { p: Pub & { _status?: Status } }) {
  const doiUrl = doiToUrl(p.doi);
  const primaryLink = doiUrl ?? p.arxiv ?? p.url ?? null;
  const primaryLabel = doiUrl ? "DOI" : p.arxiv ? "arXiv" : p.url ? "Link" : null;
  const citation = `${p.authors} (${p.year}). ${p.title}. ${p.venue}.`;

  const copy = async () => {
    try { await navigator.clipboard.writeText(citation); } catch { /* noop */ }
  };

  return (
    <li className="card">
      <div className="flex flex-col md:flex-row md:items-baseline md:gap-4">
        <div className="flex-1">
          <div className="font-medium">{p.title}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">{p.authors}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
            <span>{p.venue} · {p.year}</span>
            {p._status && <StatusBadge status={p._status} />}
          </div>
          {p.tags && (
            <div className="mt-2 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="badge">{t}</span>
              ))}
            </div>
          )}
        </div>
        <div className="mt-3 md:mt-0 flex flex-wrap gap-2">
          {primaryLink && (
            <a className="badge" href={primaryLink} target="_blank" rel="noreferrer">
              {primaryLabel}
            </a>
          )}
          {doiUrl && p.url && p.url !== doiUrl && (
            <a className="badge" href={p.url} target="_blank" rel="noreferrer">Link</a>
          )}
          {p.arxiv && primaryLink !== p.arxiv && (
            <a className="badge" href={p.arxiv} target="_blank" rel="noreferrer">arXiv</a>
          )}
          <button className="badge" onClick={copy} title="Copy citation">Cite</button>
        </div>
      </div>
    </li>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const theme =
    status === "Published" ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300"
  : status === "Under review" ? "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300"
  : status === "Submitted" ? "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300"
  : status === "In preparation" ? "bg-sky-50 border-sky-200 text-sky-700 dark:bg-sky-900/20 dark:border-sky-800 dark:text-sky-300"
  : /* Preprint */ "bg-violet-50 border-violet-200 text-violet-700 dark:bg-violet-900/20 dark:border-violet-800 dark:text-violet-300";

  return <span className={`badge ${theme}`}>{status}</span>;
}
