"use client";

import { useMemo, useState } from "react";
import { PageHero } from "@/components/PageHero";
import software from "@/data/software.json";
import {
  BookOpen,
  Package,
  Github,
  ExternalLink,
  BadgeCheck,
  FileText
} from "lucide-react";

type Link = { label: string; href: string };
type Item = {
  name: string;
  description: string;
  license?: string;
  pypi_status?: "available" | "in-progress" | "not-available";
  docs_status?: "complete" | "in-development";
  tags?: string[];
  links: Link[];
};

export default function SoftwarePage() {
  const [q, setQ] = useState("");

  const items = software as Item[];

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return items;
    return items.filter((s) => {
      const hay = [
        s.name,
        s.description,
        s.license,
        s.pypi_status,
        s.docs_status,
        ...(s.tags || []),
        ...(s.links?.map((l) => l.label) || [])
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(query);
    });
  }, [items, q]);

  return (
    <div className="space-y-8">
      <PageHero
        title="Software"
        subtitle="Open tools for forecasting, uncertainty diagnostics, and hydro-/geo-physics."
      >
        <div className="flex items-center gap-3">
          <input
            className="border rounded-lg px-3 py-2 text-sm w-72"
            placeholder="Search by name, tag, license…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </PageHero>

      <ul className="grid md:grid-cols-2 gap-6">
        {filtered.map((s) => (
          <li key={s.name} className="card">
            <h3 className="text-lg font-semibold">{s.name}</h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{s.description}</p>

            {/* Meta badges */}
            <div className="mt-3 flex flex-wrap gap-2">
              {s.license && (
                <span className="badge">
                  <FileText className="w-4 h-4" />
                  License: {s.license}
                </span>
              )}
              {s.docs_status && (
                <span className={`badge ${docsClass(s.docs_status)}`}>
                  <BookOpen className="w-4 h-4" />
                  Docs: {humanizeDocs(s.docs_status)}
                </span>
              )}
              {s.pypi_status && (
                <span className={`badge ${pypiClass(s.pypi_status)}`}>
                  <Package className="w-4 h-4" />
                  PyPI: {humanizePyPI(s.pypi_status)}
                </span>
              )}
            </div>

            {/* Tags */}
            {s.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
            ) : null}

            {/* Links */}
            <div className="mt-4 flex flex-wrap gap-2">
              {s.links?.map((l) => (
                <a
                  key={`${s.name}-${l.label}`}
                  className="badge"
                  target="_blank"
                  rel="noreferrer"
                  href={l.href}
                >
                  {iconFor(l.label)}
                  {l.label}
                </a>
              ))}
            </div>
          </li>
        ))}
      </ul>

      <p className="text-xs text-gray-500">
        Badges reflect repository metadata you provided; update <code>data/software.json</code> to change status.
      </p>
    </div>
  );
}

/* ---------- helpers ---------- */

function docsClass(s: Item["docs_status"]) {
  return s === "complete"
    ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300"
    : "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300";
}
function pypiClass(s: Item["pypi_status"]) {
  return s === "available"
    ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300"
    : s === "in-progress"
    ? "bg-sky-50 border-sky-200 text-sky-700 dark:bg-sky-900/20 dark:border-sky-800 dark:text-sky-300"
    : "bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-900/40 dark:border-gray-700 dark:text-gray-300";
}
function humanizeDocs(s?: Item["docs_status"]) {
  return s === "complete" ? "Complete" : "In development";
}
function humanizePyPI(s?: Item["pypi_status"]) {
  return s === "available" ? "Available" : s === "in-progress" ? "In progress" : "Not available";
}

function iconFor(label: string) {
  const L = label.toLowerCase();
  if (L.includes("github")) return <Github className="w-4 h-4" />;
  if (L.includes("doc")) return <BookOpen className="w-4 h-4" />;
  if (L.includes("pypi")) return <Package className="w-4 h-4" />;
  if (L.includes("license")) return <BadgeCheck className="w-4 h-4" />;
  return <ExternalLink className="w-4 h-4" />;
}
