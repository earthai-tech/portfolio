"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/utils/metadata";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const pathname = usePathname();
  return (
    <header className="border-b sticky top-0 z-50 bg-white/80 backdrop-blur
                       border-gray-100
                       dark:bg-gray-950/80 dark:border-gray-800">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="font-semibold text-lg">Laurent Kouadio</Link>

        <div className="flex items-center gap-4">
          <nav className="flex gap-4 text-sm">
            {NAV.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2 py-1 rounded-md hover:bg-gray-50
                              dark:hover:bg-gray-900
                              ${active ? "text-brand font-medium" : "text-gray-700 dark:text-gray-300"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
