// components/HomePubs.tsx
import pubs from "@/data/publications.json";

type Pub = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  doi?: string;
  url?: string;
  featured?: boolean;
};

export default function HomePubs({ max = 2 }: { max?: number }) {
  // Prefer featured; otherwise most recent
  const all = (pubs as Pub[])
    .slice()
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.year - a.year)
    .slice(0, max);

  return (
    <ul className="space-y-3">
      {all.map((p, i) => (
        <li key={i} className="border-b last:border-none pb-3 dark:border-gray-800">
          <div className="font-medium leading-snug">{p.title}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {p.authors} · {p.venue} · {p.year}
          </div>
          <div className="mt-2 flex gap-2">
            {p.doi && (
              <a className="badge" target="_blank" href={`https://doi.org/${p.doi}`}>DOI</a>
            )}
            {p.url && (
              <a className="badge" target="_blank" href={p.url}>Link</a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
