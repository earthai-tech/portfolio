"use client";

import { useMemo, useState } from "react";
import pubs from "@/data/publications.json";

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

export default function PublicationList() {
  const [q, setQ] = useState("");
  const [year, setYear] = useState<number | "all">("all");

  const years = useMemo(() => {
    const ys = Array.from(new Set(pubs.map((p) => p.year))).sort((a, b) => b - a);
    return ys;
  }, []);

  const filtered = pubs.filter((p) => {
    const matchQ =
      q.trim().length === 0 ||
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      p.authors.toLowerCase().includes(q.toLowerCase()) ||
      (p.tags || []).some((t) => t.toLowerCase().includes(q.toLowerCase()));
    const matchYear = year === "all" || p.year === year;
    return matchQ && matchYear;
  });

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <div className="space-y-6">
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
      </div>

      {featured.length > 0 && (
        <section>
          <h3 className="font-medium mb-3">Featured</h3>
          <ul className="space-y-4">
            {featured.map((p, i) => (
              <PublicationItem key={i} p={p} />
            ))}
          </ul>
        </section>
      )}

      <section>
        {featured.length > 0 && <h3 className="font-medium mb-3">All</h3>}
        <ul className="space-y-4">
          {rest.map((p, i) => (
            <PublicationItem key={i} p={p} />
          ))}
        </ul>
      </section>
    </div>
  );
}

function PublicationItem({ p }: { p: Pub }) {
  return (
    <li className="card">
      <div className="flex flex-col md:flex-row md:items-baseline md:gap-4">
        <div className="flex-1">
          <div className="font-medium">{p.title}</div>
          <div className="text-sm text-gray-600">{p.authors}</div>
          <div className="text-sm text-gray-600">{p.venue} · {p.year}</div>
          {p.tags && (
            <div className="mt-2 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="badge">{t}</span>
              ))}
            </div>
          )}
        </div>
        <div className="mt-3 md:mt-0 flex gap-2">
          {p.doi && (
            <a className="badge" href={`https://doi.org/${p.doi}`} target="_blank" rel="noreferrer">DOI</a>
          )}
          {p.arxiv && (
            <a className="badge" href={p.arxiv} target="_blank" rel="noreferrer">arXiv</a>
          )}
          {p.url && (
            <a className="badge" href={p.url} target="_blank" rel="noreferrer">Link</a>
          )}
        </div>
      </div>
    </li>
  );
}
