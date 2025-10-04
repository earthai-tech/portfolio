"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SITE } from "@/utils/metadata";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CurrencyToggle } from "@/components/CurrencyToggle";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, X, Menu } from "lucide-react";

// Data structure is unchanged and reused for both menus
const navStructure = [
  {
    label: "Research",
    items: [
      { href: "/research", label: "All Research" },
      { href: "/research/land-subsidence", label: "Geohazards & Disaster Risk" },
      { href: "/research/groundwater", label: "Groundwater Exploration" },
      { href: "/research/uncertainty", label: "Uncertainty Diagnostics" },
      { href: "/research/xai-pinns", label: "XAI & PINNs" },
    ],
  },
  {
    label: "Projects & Outputs",
    items: [
      { href: "/publications", label: "Publications" },
      { href: "/software", label: "Software" },
      { href: "/talks", label: "Talks" },
      { href: "/funding", label: "Funding" },
    ],
  },
  {
    label: "About",
    items: [
      { href: "/about", label: "About Me" },
      { href: "/teaching", label: "Teaching & Mentorship" },
      { href: "/cv", label: "Downloads" },
    ],
  },
  { href: "/contact", label: "Contact" },
];

// --- MAIN HEADER COMPONENT ---
export function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
        <div className="container grid h-16 grid-cols-2 items-center md:grid-cols-3">
          <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 justify-self-start">
            {SITE.name}
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <nav className="hidden items-center gap-2 md:flex justify-self-center">
            {navStructure.map((item) =>
              item.items ? (
                <DropdownMenu key={item.label} label={item.label} items={item.items} pathname={pathname} />
              ) : (
                <Link key={item.href} href={item.href!} className="navlink">
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
            {/* --- DESKTOP CONTROLS --- */}
            <div className="hidden items-center gap-2 md:flex">
                <CurrencyToggle />
                <ThemeToggle />
                <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Open search"
                >
                    <Search className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
            </div>
            {/* --- HAMBURGER BUTTON (Mobile only) --- */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    aria-label="Open menu"
                >
                    <Menu className="h-6 w-6" />
                </button>
            </div>
          </div>
        </div>
      </header>
      
      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
      {isMobileMenuOpen && <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />}
    </>
  );
}

// --- MOBILE MENU COMPONENT (Vertical layout) ---
function MobileMenu({ onClose }: { onClose: () => void }) {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-gray-950 md:hidden">
        {/* Menu Header */}
        <div className="container flex h-16 items-center justify-between border-b border-gray-100 dark:border-gray-800">
          <Link href="/" onClick={onClose} className="text-xl font-bold tracking-tight">
            {SITE.name}
          </Link>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
  
        {/* Navigation Links */}
        <nav className="container mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-200 dark:divide-gray-800">
            <div className="space-y-2 py-6">
              {navStructure.map((item) =>
                item.items ? (
                  <MobileAccordion key={item.label} label={item.label} items={item.items} onLinkClick={onClose} />
                ) : (
                  <Link
                    key={item.href}
                    href={item.href!}
                    onClick={onClose}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
            <div className="py-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Theme:</span>
                    <ThemeToggle />
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Funding:</span>
                    <CurrencyToggle />
                </div>
            </div>
          </div>
        </nav>
      </div>
    );
}
  
// --- MOBILE ACCORDION (For nested links on mobile) ---
function MobileAccordion({ label, items, onLinkClick }: { label: string; items: { href: string; label: string }[]; onLinkClick: () => void;}) {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="-mx-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          {label}
          <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
        {isOpen && (
          <div className="mt-2 space-y-2 pl-6">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onLinkClick}
                className="block rounded-lg py-2 pl-3 pr-3 text-sm leading-7 text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
}

// --- DESKTOP DROPDOWN MENU (Multi-column grid layout) ---
function DropdownMenu({ label, items, pathname }: { label: string; items: { href: string; label: string }[]; pathname: string | null; }) {
  const [isOpen, setIsOpen] = useState(false);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const primaryLink = items[0]?.href;

  const onMouseEnter = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setIsOpen(true);
  };

  const onMouseLeave = () => {
    hoverTimer.current = setTimeout(() => setIsOpen(false), 70);
  };
  
  useEffect(() => { setIsOpen(false); }, [pathname]);
  
  // [RESTORED] This line creates your preferred multi-column layout for desktop
  const numColumns = Math.ceil(items.length / 2);

  return (
    <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <button
        onClick={() => { if (primaryLink) router.push(primaryLink); }}
        className="navlink flex items-center gap-1 whitespace-nowrap"
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="dropdown-panel-animated absolute top-full mt-2 w-max origin-top rounded-xl border border-gray-100 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-900">
          <ul role="menu" className="grid gap-1" style={{ gridTemplateColumns: `repeat(${numColumns}, minmax(0, 1fr))` }}>
            {items.map((item) => (
              <li key={item.href} role="none">
                <Link href={item.href} role="menuitem" className={`menuitem whitespace-nowrap ${pathname?.startsWith(item.href) ? "menuitem-active" : ""}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// --- Search Modal Component (Unchanged) ---
function SearchModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = inputRef.current?.value;
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-lg bg-white p-4 shadow-lg dark:bg-gray-900 dark:border dark:border-gray-800">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search publications, software, topics..."
            className="w-full rounded-md border-gray-300 py-3 pl-10 pr-4 text-lg focus:border-brand focus:ring-brand dark:bg-gray-800 dark:border-gray-700"
          />
        </form>
        <button onClick={onClose} className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <X className="h-5 w-5"/>
        </button>
      </div>
    </div>
  );
}