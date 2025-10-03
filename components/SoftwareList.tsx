"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  Book,
  Package,
  Github,
  ExternalLink,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";

// --- Type Definitions (can be shared from another file if needed) ---
type Link = { label: string; href: string };
export type Item = {
  name: string;
  description: string;
  license?: string;
  pypi_status?: "available" | "in-progress" | "not-available";
  docs_status?: "complete" | "in-development";
  tags?: string[];
  links: Link[];
};

type SoftwareListProps = {
  allSoftware: Item[];
  availableLogos: string[]; // e.g., ['watex.svg', 'k-diagram.png']
};

// --- Main Interactive Component ---
export default function SoftwareList({ allSoftware, availableLogos }: SoftwareListProps) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return allSoftware;
    return allSoftware.filter((s) => {
      const hay = [s.name, s.description, s.license, ...(s.tags || [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(query);
    });
  }, [allSoftware, q]);

  return (
    <div>
      <div className="relative mb-8 max-w-sm">
        {/* Note: Search input is now part of the client component */}
      </div>

      {filtered.length > 0 ? (
        <ul className="grid gap-6 md:grid-cols-2">
          {filtered.map((item) => (
            <SoftwareCard key={item.name} item={item} availableLogos={availableLogos} />
          ))}
        </ul>
      ) : (
        <div className="py-12 text-center text-gray-500">
          <h3 className="text-xl font-semibold">No software found</h3>
          <p>Your search for "{q}" did not match any projects.</p>
        </div>
      )}
    </div>
  );
}

// --- Software Card Component ---
const getItemKey = (name: string) => name.toLowerCase().split(" ")[0].replace(/[/—]/g, "");

function SoftwareCard({ item, availableLogos }: { item: Item, availableLogos: string[] }) {
  // Find the logo dynamically
  const itemKey = getItemKey(item.name);
  const logoFileName = availableLogos.find(
    (fileName) => fileName.startsWith(itemKey)
  );
  const logoSrc = logoFileName ? `/images/software/${logoFileName}` : null;

  return (
    <li className="flex h-full flex-col rounded-lg border bg-white shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/50">
      <div className={`flex flex-col items-start gap-4 p-6 ${logoSrc ? "sm:flex-row" : ""}`}>
        {logoSrc && (
          <div className="flex-shrink-0 rounded-lg bg-white p-3 dark:bg-gray-800">
            <Image
              src={logoSrc}
              alt={`${item.name} logo`}
              width={56}
              height={56}
              className="dark:invert"
              unoptimized //  for SVGs 
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.name}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
            {item.license && <MetaItem icon={FileText} text={item.license} />}
            {item.docs_status && <MetaItem icon={Book} text={`Docs: ${item.docs_status}`} status={item.docs_status === 'complete' ? 'ok' : 'dev'} />}
            {item.pypi_status && <MetaItem icon={Package} text={`PyPI: ${item.pypi_status}`} status={item.pypi_status === 'available' ? 'ok' : item.pypi_status === 'in-progress' ? 'dev' : 'err'} />}
          </div>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">{item.description}</p>
        </div>
      </div>

      <div className="mt-auto space-y-4 p-6 pt-0">
        {item.tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((t) => <span key={t} className="tag-badge">{t}</span>)}
          </div>
        ) : null}
        <div className="flex flex-wrap gap-3 border-t pt-4 dark:border-gray-800">
          {item.links?.map((l) => (
            <a key={l.href} className="action-badge" target="_blank" rel="noreferrer" href={l.href}>
              {iconFor(l.label)}
              <span>{l.label}</span>
            </a>
          ))}
        </div>
      </div>
    </li>
  );
}

// --- Helper Components & Functions ---
// (These are the same as before)
function MetaItem({ icon: Icon, text, status }: { icon: React.ElementType, text: string, status?: 'ok' | 'dev' | 'err' }) {
  const statusColor =
    status === 'ok' ? "text-green-500" :
    status === 'dev' ? "text-amber-500" :
    status === 'err' ? "text-red-500" : "";
  const StatusIcon =
    status === 'ok' ? CheckCircle2 :
    status === 'dev' ? Clock :
    status === 'err' ? AlertCircle : null;
  return (
    <div className="flex items-center gap-1.5">
      {StatusIcon ? <StatusIcon className={`h-3.5 w-3.5 ${statusColor}`} /> : <Icon className="h-3.5 w-3.5" />}
      <span className="capitalize">{text.replace(/-/g, ' ')}</span>
    </div>
  );
}
function iconFor(label: string) {
  const L = label.toLowerCase();
  if (L.includes("github")) return <Github className="h-4 w-4" />;
  if (L.includes("doc")) return <Book className="h-4 w-4" />;
  if (L.includes("pypi")) return <Package className="h-4 w-4" />;
  return <ExternalLink className="h-4 w-4" />;
}