import { SITE } from "@/utils/metadata";
import React from "react";

// --- SVG Icon Components ---
// We're defining simple SVG icons here for each service.

const IconLinkedIn = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.1 1.16 3.1 4.5z"></path>
  </svg>
);

const IconGoogleScholar = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M5.242 13.769L0 9.5L12 0l12 9.5l-5.242 4.269C17.548 11.249 14.978 9 12 9s-5.548 2.249-6.758 4.769zM12 10a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8z"></path>
  </svg>
);

const IconOrcid = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.34c.414 0 .75.336.75.75s-.336.75-.75.75a.75.75 0 1 1 0-1.5zm2.413 3.447V19.5H7.369V7.787h2.413zM12 11.13c-2.438 0-4.042 1.284-4.042 3.447 0 2.164 1.604 3.447 4.042 3.447 2.438 0 4.042-1.283 4.042-3.447 0-2.163-1.604-3.447-4.042-3.447z"></path>
  </svg>
);

const IconResearchGate = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M14.016 11.283c0-2.015.12-3.85.12-4.148H9.324V19.5h1.865v-4.938c0-.985.03-2.19.03-2.528l2.766 7.466h2.22l-3.09-8.156c.15-.09.3-.12.51-.12.42 0 1.259.33 1.259 1.956v4.938h1.864V12.75c0-1.925-1.139-2.85-2.738-2.85-.75 0-1.349.33-1.68.783zM0 0v24h24V0H0zm21.6 21.6H2.4V2.4h19.2V21.6z"></path>
  </svg>
);

// --- The Main SocialLinks Component ---

export function SocialLinks() {
  const links = [
    {
      href: SITE.scholar, //
      label: "Google Scholar",
      Icon: IconGoogleScholar,
    },
    {
      href: SITE.orcid, //
      label: "ORCID",
      Icon: IconOrcid,
    },
    {
      href: SITE.linkedin, //
      label: "LinkedIn",
      Icon: IconLinkedIn,
    },
    {
      href: SITE.researchgate, //
      label: "ResearchGate",
      Icon: IconResearchGate,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {links.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-brand dark:text-gray-400 dark:hover:text-brand"
        >
          <Icon className="h-4 w-4 text-gray-500 transition-colors group-hover:text-brand dark:text-gray-400" />
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
}