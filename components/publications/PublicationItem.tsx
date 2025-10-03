"use client";

import { useState } from "react";
import { Star, Copy, ExternalLink } from "lucide-react";

// --- Type Definitions ---
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
type Status = "Published" | "Under review" | "Submitted" | "In preparation" | "Preprint";

function doiToUrl(doi?: string) {
  if (!doi) return null;
  const d = doi.trim();
  if (d.startsWith("http://") || d.startsWith("https://")) return d;
  return `https://doi.org/${d}`;
}

function StatusBadge({ status }: { status: Status }) {
  const theme =
    status === "Published" ? "bg-green-100 border-green-400 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300"
  : status === "Under review" ? "bg-amber-100 border-amber-400 text-amber-800 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-300"
  : status === "Submitted" ? "bg-sky-100 border-sky-400 text-sky-800 dark:bg-sky-900/30 dark:border-sky-700 dark:text-sky-300"
  : status === "In preparation" ? "bg-gray-100 border-gray-400 text-gray-800 dark:bg-gray-900/30 dark:border-gray-700 dark:text-gray-300"
  : "bg-violet-100 border-violet-400 text-violet-800 dark:bg-violet-900/30 dark:border-violet-700 dark:text-violet-300";
  return <span className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${theme}`}>{status}</span>;
}


interface PublicationItemProps {
  p: Pub & { _status?: Status };
  isSelected: boolean;
  onSelect: () => void;
}

export default function PublicationItem({ p, isSelected, onSelect }: PublicationItemProps) {
  const [copied, setCopied] = useState(false);
  const doiUrl = doiToUrl(p.doi);
  const primaryLink = doiUrl ?? p.url ?? null;
  const citation = `${p.authors} (${p.year}). ${p.title}. *${p.venue}*.${doiUrl ? ` doi:${p.doi}` : ""}`;
  const yearColors = ["border-sky-500", "border-violet-500", /* ... */];
  const yearColor = yearColors[p.year % yearColors.length];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy citation to clipboard:", err);
    }
  };


  return (
    <li className={`flex rounded-lg border bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50 ${yearColor} border-l-4`}>
      <div className="pl-4 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="h-5 w-5 rounded border-gray-300 text-brand focus:ring-brand"
        />
      </div>
      
      <div className="flex-1 p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-3">
              {p.featured && <Star className="h-5 w-5 flex-shrink-0 text-amber-400" fill="currentColor" />}
              <h4 className="text-base font-semibold text-gray-800 dark:text-gray-100">{p.title}</h4>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{p.authors}</div>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
              <span><span className="italic">{p.venue}</span> · {p.year}</span>
              {p._status && <StatusBadge status={p._status} />}
            </div>
          </div>
          <div className="ml-4 mt-1 flex flex-shrink-0 flex-wrap justify-end gap-2 md:flex-col">
            {primaryLink && (
              <a className="action-badge" href={primaryLink} target="_blank" rel="noreferrer">
                <ExternalLink className="h-3 w-3" />
                <span>{doiUrl ? "DOI" : "Link"}</span>
              </a>
            )}
            <button className="action-badge" onClick={copy} title="Copy citation">
              <Copy className="h-3 w-3" />
              <span>{copied ? "Copied!" : "Cite"}</span>
            </button>
          </div>
        </div>
        {p.tags && (
          <div className="mt-3 flex flex-wrap gap-2 border-t pt-3 dark:border-gray-800">
            {p.tags.map((t) => <span key={t} className="tag-badge">{t}</span>)}
          </div>
        )}
      </div>
    </li>
  );
}