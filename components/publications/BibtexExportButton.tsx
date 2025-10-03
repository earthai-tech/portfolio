"use client";

import { generateBibtex } from "@/utils/bibtex";
import { Download } from "lucide-react";

export default function BibtexExportButton({ selectedPubs }: { selectedPubs: any[] }) {
  if (selectedPubs.length === 0) {
    return null;
  }

  const handleExport = () => {
    const bibtexString = generateBibtex(selectedPubs);
    const blob = new Blob([bibtexString], { type: 'application/x-bibtex' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'publications.bib';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="text-center">
      <button onClick={handleExport} className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 font-semibold text-white shadow-sm transition-colors hover:bg-brand/90">
        <Download className="h-4 w-4" />
        Export ({selectedPubs.length}) selected as BibTeX
      </button>
    </div>
  );
}