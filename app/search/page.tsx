// app/search/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";

// Import all data sources
import pubs from "@/data/publications.json";
import software from "@/data/software.json";
import talks from "@/data/talks.json";
import researchPages from "@/utils/research-pages.json"; // Assuming you create this file

import { Book, Code, Mic, FlaskConical, Search, ArrowRight } from "lucide-react";

// --- Main Search Page Component ---
export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  // Perform searches across all data sources
  const results = useMemo(() => {
    if (!query) return null;
    const lowerCaseQuery = query.toLowerCase();

    const publicationResults = (pubs as any[]).filter(p =>
      [p.title, p.authors, p.venue, ...(p.tags || [])].join(" ").toLowerCase().includes(lowerCaseQuery)
    );

    const softwareResults = (software as any[]).filter(s =>
      [s.name, s.description, ...(s.tags || [])].join(" ").toLowerCase().includes(lowerCaseQuery)
    );

    const talkResults = (talks as any[]).filter(t =>
      [t.event, t.title, t.role, t.location].join(" ").toLowerCase().includes(lowerCaseQuery)
    );

    const researchResults = (researchPages as any[]).filter(r =>
        [r.title, r.subtitle, ...(r.tags || [])].join(" ").toLowerCase().includes(lowerCaseQuery)
    );

    return {
      publications: publicationResults,
      software: softwareResults,
      talks: talkResults,
      research: researchResults,
    };
  }, [query]);
  
  const totalResults = results ? Object.values(results).reduce((sum, r) => sum + r.length, 0) : 0;

  return (
    <div className="space-y-8">
      <PageHero
        title="Search Results"
        subtitle={query ? `Found ${totalResults} results for "${query}"` : "Please enter a search term."}
      />

      {results ? (
        totalResults > 0 ? (
          <div className="space-y-8">
            <ResultSection icon={FlaskConical} title="Research Areas" items={results.research} renderItem={renderResearchItem} />
            <ResultSection icon={Book} title="Publications" items={results.publications} renderItem={renderPublicationItem} />
            <ResultSection icon={Code} title="Software" items={results.software} renderItem={renderSoftwareItem} />
            <ResultSection icon={Mic} title="Talks" items={results.talks} renderItem={renderTalkItem} />
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-xl font-semibold">No Results Found</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              We couldn't find anything matching your search. Please try a different term.
            </p>
          </div>
        )
      ) : null}
    </div>
  );
}

// --- Helper Components for Rendering Results ---

function ResultSection({ icon: Icon, title, items, renderItem }: any) {
  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="flex items-center gap-3 text-2xl font-bold border-b pb-2 mb-4">
        <Icon className="h-6 w-6 text-brand" />
        <span>{title}</span>
        <span className="text-sm font-normal text-gray-500">({items.length})</span>
      </h2>
      <div className="space-y-4">
        {items.map((item: any, index: number) => renderItem(item, index))}
      </div>
    </section>
  );
}

// --- Individual Result Item Renderers ---

const renderResearchItem = (item: any, index: number) => (
  <Card key={index}>
    <Link href={item.href} className="group">
      <h3 className="text-lg font-semibold group-hover:text-brand">{item.title}</h3>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.subtitle}</p>
      <div className="mt-2 flex items-center text-xs font-medium text-brand opacity-0 group-hover:opacity-100 transition-opacity">
        View Research Area <ArrowRight className="ml-1 h-3 w-3" />
      </div>
    </Link>
  </Card>
);

const renderPublicationItem = (item: any, index: number) => (
  <Card key={index}>
    <Link href={`/publications?q=${encodeURIComponent(item.title)}`} className="group">
      <h3 className="text-lg font-semibold group-hover:text-brand">{item.title}</h3>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.authors}</p>
      <p className="text-xs text-gray-500">{item.venue}, {item.year}</p>
    </Link>
  </Card>
);

const renderSoftwareItem = (item: any, index: number) => (
  <Card key={index}>
    <Link href={`/software?q=${encodeURIComponent(item.name)}`} className="group">
      <h3 className="text-lg font-semibold group-hover:text-brand">{item.name}</h3>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
    </Link>
  </Card>
);

const renderTalkItem = (item: any, index: number) => (
  <Card key={index}>
     <Link href={`/talks?q=${encodeURIComponent(item.event)}`} className="group">
        <h3 className="text-lg font-semibold group-hover:text-brand">{item.event}</h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{item.title}</p>
        <p className="text-xs text-gray-500">{item.location}, {item.start}</p>
     </Link>
  </Card>
);