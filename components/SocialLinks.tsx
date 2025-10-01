import Link from "next/link";
import { SITE } from "@/utils/metadata";

export function SocialLinks({ className = "" }: { className?: string }) {
  const links = [
    { href: SITE.orcid, label: "ORCID" },
    { href: SITE.linkedin, label: "LinkedIn" },
    { href: SITE.researchgate, label: "ResearchGate" },
    { href: SITE.scholar, label: "Google Scholar" },
  ].filter(l => !!l.href && l.href.trim().length > 0);

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {links.map((l) => (
        <Link key={l.label} href={l.href} target="_blank" className="badge">
          {l.label}
        </Link>
      ))}
    </div>
  );
}
