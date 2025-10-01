"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/utils/metadata";

export function Header() {
  const pathname = usePathname();
  return (
    <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur z-50">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="font-semibold text-lg">
          Laurent Kouadio
        </Link>
        <nav className="flex gap-4 text-sm">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 py-1 rounded-md hover:bg-gray-50 ${
                  active ? "text-brand font-medium" : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
