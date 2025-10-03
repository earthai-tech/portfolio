"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, SITE } from "@/utils/metadata";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CurrencyToggle } from "@/components/CurrencyToggle";
import { useEffect, useRef, useState } from "react";

const VISIBLE = 6; // show first 6; rest under "More"

export function Header() {
  const pathname = usePathname();
  const primary = NAV.slice(0, VISIBLE);
  const overflow = NAV.slice(VISIBLE);

  const [open, setOpen] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  // Close the popover whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const onEnter = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setOpen(true);
  };
  const onLeave = () => {
    // small delay to avoid flicker when moving pointer
    hoverTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <header className="border-b sticky top-0 z-50 bg-white/80 backdrop-blur
                       border-gray-100
                       dark:bg-gray-950/80 dark:border-gray-800">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          {SITE.name}
        </Link>

        <div className="flex items-center gap-3">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {primary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`navlink ${isActive(item.href) ? "navlink-active" : ""}`}
              >
                {item.label}
              </Link>
            ))}

            {overflow.length > 0 && (
              <div
                className="relative"
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              >
                <button
                  type="button"
                  className="navlink cursor-pointer select-none"
                  aria-haspopup="menu"
                  aria-expanded={open}
                  onClick={() => setOpen((v) => !v)} // tap/click support
                >
                  More{" "}
                  <span className={`ml-1 transition-transform ${open ? "rotate-180" : ""}`}>
                    ▾
                  </span>
                </button>

                {open && (
                  <ul
                    role="menu"
                    className="absolute right-0 mt-2 w-52 rounded-2xl border border-gray-100 bg-white shadow-lg p-1
                               dark:border-gray-800 dark:bg-gray-900"
                  >
                    {overflow.map((item) => (
                      <li key={item.href} role="none">
                        <Link
                          role="menuitem"
                          href={item.href}
                          className={`menuitem ${isActive(item.href) ? "menuitem-active" : ""}`}
                          onClick={() => setOpen(false)} // auto-close on selection
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </nav>

          {/* Toggles */}
          <div className="flex items-center gap-2">
            <CurrencyToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
