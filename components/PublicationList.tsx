"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import pubs from "@/data/publications.json";
import Pagination from "@/components/Pagination";
import { Card } from "@/components/Card";
import { Filter } from "lucide-react";

// Import the new components
import PublicationDashboard from "./publications/PublicationDashboard";
import PublicationItem from "./publications/PublicationItem";
import BibtexExportButton from "./publications/BibtexExportButton";

// --- Type Definitions ---
type Pub = {
  title: string;
  authors: string;
  venue: string;
  year: number;
  doi?: string;
  url?: string;
  featured?: boolean;
  tags?: string[];
};
type Status = "Published" | "Under review" | "Submitted" | "In preparation" | "Preprint";
const PAGE_SIZE = 10;

// --- Helper Functions ---
function detectStatus(venue: any): Status {
  if (typeof venue !== 'string' || !venue) {
    return "Published"; // Return a default status
  }
  const v = venue.toLowerCase();
  if (v.includes("under review")) return "Under review";
  if (v.includes("submitted")) return "Submitted";
  if (v.includes("in preparation") || v.includes("preparation")) return "In preparation";
  if (v.includes("preprint") || v.includes("arxiv")) return "Preprint";
  return "Published";
}

// --- Main Component ---
export default function PublicationList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState("");
  const [year, setYear] = useState<number | "all">("all");
  const [sort, setSort] = useState<"yearDesc" | "yearAsc" | "titleAsc">("yearDesc");
  const [page, setPage] = useState(() => Number(searchParams.get("page") || "1"));
  const [selectedPubs, setSelectedPubs] = useState<Set<string>>(new Set());

  const allPubs = useMemo(() =>
    (pubs as Pub[]).map(p => ({ ...p, _status: detectStatus(p as any) })),
    []
  );

  const years = useMemo(() => Array.from(new Set(allPubs.map(p => p.year))).sort((a, b) => b - a), [allPubs]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return allPubs.filter(p => {
      const matchQ = !query || [p.title, p.authors, p.venue, ...(p.tags || [])].join(" ").toLowerCase().includes(query);
      const matchYear = year === "all" || p.year === year;
      return matchQ && matchYear;
    });
  }, [allPubs, q, year]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "yearDesc") arr.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
    if (sort === "yearAsc") arr.sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
    if (sort === "titleAsc") arr.sort((a, b) => a.title.localeCompare(b.title));
    return arr;
  }, [filtered, sort]); // [FIX] 'filtered' was missing here

  const featured = useMemo(() => sorted.filter(p => p.featured), [sorted]);
  const restAll = useMemo(() => sorted.filter(p => !p.featured), [sorted]);
  
  const totalPages = Math.max(1, Math.ceil(restAll.length / PAGE_SIZE));
  const rest = restAll.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Added the missing function
  const updatePageParam = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (p <= 1) params.delete("page");
    else params.set("page", String(p));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [q, year, sort]);
  
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);


  const handleSelect = (pubId: string) => {
    setSelectedPubs(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(pubId)) {
        newSelection.delete(pubId);
      } else {
        newSelection.add(pubId);
      }
      return newSelection;
    });
  };

  const selectedPubObjects = useMemo(() =>
    allPubs.filter(p => selectedPubs.has(p.doi || p.title)),
    [allPubs, selectedPubs]
  );

  return (
    <div className="space-y-12">
      <PublicationDashboard allPubs={allPubs} />
      
      <Card>
        <div className="mb-4 flex items-center gap-3">
          <Filter className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold">Filter & Sort</h2>
          <div className="ml-auto text-sm text-gray-600 dark:text-gray-400">
            Showing {sorted.length} result{sorted.length === 1 ? "" : "s"}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <input
            className="col-span-2 w-full rounded-lg border bg-transparent px-3 py-2 text-sm focus:border-brand"
            placeholder="Search title, author, tag..."
            value={q} onChange={(e) => setQ(e.target.value)}
          />
          <select
            className="rounded-lg border bg-transparent px-3 py-2 text-sm focus:border-brand"
            value={year} onChange={(e) => setYear(e.target.value === "all" ? "all" : Number(e.target.value))}
          >
            <option value="all">All years</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <select
            className="rounded-lg border bg-transparent px-3 py-2 text-sm focus:border-brand"
            value={sort} onChange={(e) => setSort(e.target.value as any)}
          >
            <option value="yearDesc">Sort: Recent First</option>
            <option value="yearAsc">Sort: Oldest First</option>
            <option value="titleAsc">Sort: Title (A-Z)</option>
          </select>
        </div>
      </Card>

      <BibtexExportButton selectedPubs={selectedPubObjects} />

      <div>
        {featured.length > 0 && (
          <section className="mb-8">
            <h3 className="mb-4 border-b pb-2 text-xl font-bold">Featured Publications</h3>
            <ul className="space-y-4">
              {featured.map((p) => (
                <PublicationItem
                  key={p.title}
                  p={p as any}
                  isSelected={selectedPubs.has(p.doi || p.title)}
                  onSelect={() => handleSelect(p.doi || p.title)}
                />
              ))}
            </ul>
          </section>
        )}
        <section>
          {featured.length > 0 && <h3 className="mb-4 border-b pb-2 text-xl font-bold">All Publications</h3>}
          {rest.length > 0 ? (
            <ul className="space-y-4">
              {rest.map((p) => (
                // [FIX] Added isSelected and onSelect props
                <PublicationItem
                  key={p.title}
                  p={p as any}
                  isSelected={selectedPubs.has(p.doi || p.title)}
                  onSelect={() => handleSelect(p.doi || p.title)}
                />
              ))}
            </ul>
          ) : (
            <div className="py-8 text-center text-gray-500">No publications match your criteria.</div>
          )}
          <Pagination
            className="mt-8 justify-center" page={page} totalPages={totalPages}
            onPageChange={(p) => { setPage(p); updatePageParam(p); }}
          />
        </section>
      </div>
    </div>
  );
}