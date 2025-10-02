"use client";

type Props = {
  page: number;                 // 1-based
  totalPages: number;
  onPageChange: (p: number) => void;
  className?: string;
};

export default function Pagination({ page, totalPages, onPageChange, className = "" }: Props) {
  if (totalPages <= 1) return null;

  const delta = 2; // how many numbers to show around current
  const pages = new Set<number>([1, totalPages]);
  for (let p = Math.max(1, page - delta); p <= Math.min(totalPages, page + delta); p++) {
    pages.add(p);
  }
  const list = Array.from(pages).sort((a, b) => a - b);

  const items: (number | "...")[] = [];
  for (let i = 0; i < list.length; i++) {
    const curr = list[i];
    const prev = list[i - 1];
    if (i && prev !== undefined && curr - prev > 1) items.push("...");
    items.push(curr);
  }

  const btn = (label: string | number, disabled = false, target?: number) => (
    <button
      key={`${label}-${target ?? label}`}
      className={`px-3 py-1 rounded border text-sm ${
        label === page
          ? "bg-gray-100 dark:bg-gray-900 font-medium"
          : "hover:bg-gray-50 dark:hover:bg-gray-900/50"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={() => !disabled && typeof target === "number" && onPageChange(target)}
      disabled={disabled}
    >
      {label}
    </button>
  );

  return (
    <nav className={`flex items-center gap-2 ${className}`}>
      {btn("Previous", page === 1, page - 1)}
      {items.map((it) =>
        it === "..."
          ? <span key={`${it}-${Math.random()}`} className="px-2 text-sm">…</span>
          : btn(it, false, it)
      )}
      {btn("Next", page === totalPages, page + 1)}
    </nav>
  );
}
