// components/Footer.tsx
import Link from "next/link";
import { SITE } from "@/utils/metadata";
import { Mail } from "lucide-react";
import {
  SiGithub,
  SiGooglescholar,
  SiOrcid,
  SiLinkedin,
  SiResearchgate
} from "react-icons/si";

export function Footer() {
  const socialLinks = [
    { href: SITE.github, icon: SiGithub, label: "GitHub" },
    { href: SITE.scholar, icon: SiGooglescholar, label: "Google Scholar" },
    { href: SITE.orcid, icon: SiOrcid, label: "ORCID" },
    { href: SITE.linkedin, icon: SiLinkedin, label: "LinkedIn" },
    { href: SITE.researchgate, icon: SiResearchgate, label: "ResearchGate" },
  ];

  // A curated list of the 6 most important navigation links for the footer
  const footerNav = [
    { href: "/research", label: "Research" },
    { href: "/publications", label: "Publications" },
    { href: "/software", label: "Software" },
    { href: "/about", label: "About" },
    { href: "/cv", label: "CV" },
    { href: "/contact", label: "Contact" },
  ];

  // Split the curated list into two columns of three
  const navCol1 = footerNav.slice(0, 3);
  const navCol2 = footerNav.slice(3, 6);

  return (
    <footer className="relative mt-16 overflow-hidden bg-slate-900 text-slate-300">
      <div className="h-1 bg-gradient-to-r from-brand to-rose-500" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-10" />

      <div className="container relative z-10 py-12">
        <div className="grid gap-8 md:grid-cols-12">
          {/* Column 1: Identity */}
          <div className="md:col-span-5 lg:col-span-4">
            <h3 className="text-lg font-bold text-white">{SITE.name}</h3>
            <p className="mt-2 text-sm text-slate-400">{SITE.title}</p>
            <a href={`mailto:${SITE.emailPrimary}`} className="mt-4 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-brand">
              <Mail className="h-4 w-4" />
              {SITE.emailPrimary}
            </a>
          </div>

          {/* Column 2 & 3: Sitemap */}
          <div className="md:col-span-4 lg:col-span-5">
            <h4 className="font-semibold uppercase tracking-wider text-slate-500">Navigate</h4>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <ul className="space-y-2">
                {navCol1.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-brand">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {navCol2.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-brand">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Connect */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="font-semibold uppercase tracking-wider text-slate-500">Connect</h4>
            <div className="mt-4 flex items-center space-x-5">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="text-slate-400 transition-colors hover:text-brand"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}