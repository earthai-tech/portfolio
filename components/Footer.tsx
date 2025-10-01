import Link from "next/link";
import { SITE } from "@/utils/metadata";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-100">
      <div className="container py-10 text-sm text-gray-600">
        <div className="flex flex-col gap-2">
          <div>
            <strong>{SITE.name}</strong> — {SITE.title}
          </div>
          <div>{SITE.location}</div>
          <div className="flex flex-wrap gap-3">
            <Link href={`mailto:${SITE.emailPrimary}`}>{SITE.emailPrimary}</Link>
            <span>·</span>
            <Link href={`mailto:${SITE.emailAlt}`}>{SITE.emailAlt}</Link>
            <span>·</span>
            <Link href={SITE.github} target="_blank">GitHub</Link>
            <span>·</span>
            <Link href={SITE.scholar} target="_blank">Scholar</Link>
            <span>·</span>
            <Link href={SITE.orcid} target="_blank">ORCID</Link>
            <span>·</span>
            <Link href={SITE.linkedin} target="_blank">LinkedIn</Link>
            <span>·</span>
            <Link href={SITE.researchgate} target="_blank">ResearchGate</Link>
          </div>
          <div className="text-xs text-gray-400">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}


