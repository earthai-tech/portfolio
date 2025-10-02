"use client";

import pubs from "@/data/publications.json";
import Link from "next/link";

type Props = {
  query?: string;      // text search (title/authors/venue/tags)
  tags?: string[];     // match any tag (case-insensitive)
  max?: number;        // default 5
};

export default function RelatedPubs({ query = "", tags = [], max = 5 }: Props) {
  const q = query.trim().toLowerCase();
  const hasTags = tags.length > 0;
  const tagSet = new Set(tags.map((t) => t.toLowerCase()));

  const filtered = (pubs || []).filter((p) => {
    const hay = [
      p.title, p.authors, p.venue, ...(p.tags || [])
    ].filter(Boolean).join(" ").toLowerCase();

    const matchQ = !q || hay.includes(q);
    const matchTags = !hasTags || (p.tags || []).some((t) => tagSet.has(t.toLowerCase()));
    return matchQ && matchTags;
  });

  // Featured first, then by year desc, then title
  filtered.sort((a, b) =>
    (b.featured ? 1 : 0) - (a.featured ? 1 : 0) ||
    b.year - a.year ||
    a.title.localeCompare(b.title)
  );

  const top = filtered.slice(0, max);

  if (top.length === 0) return null;

  const qParam = encodeURIComponent([query, ...tags].filter(Boolean).join(" ").trim());

  return (
    <div className="space-y-3">
      <h4 className="font-semibold">Related publications</h4>
      <ul className="space-y-2">
        {top.map((p, i) => (
          <li key={`${p.title}-${i}`} className="text-sm">
            <div className="font-medium">{p.title}</div>
            <div className="text-gray-600 dark:text-gray-400">{p.authors} · {p.venue} · {p.year}</div>
          </li>
        ))}
      </ul>
      <div>
        <Link className="badge" href={`/publications${qParam ? `?q=${qParam}` : ""}`}>View all →</Link>
      </div>
    </div>
  );
}
