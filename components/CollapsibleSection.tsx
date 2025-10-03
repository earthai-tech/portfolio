import { ChevronRight } from "lucide-react";
import React from "react";

type Props = {
  title: React.ReactNode;
  children: React.ReactNode;
  // By default, the section will be closed. Set this to true for it to be open on page load.
  startOpen?: boolean;
};

export function CollapsibleSection({ title, children, startOpen = false }: Props) {
  return (
    <details open={startOpen} className="group">
      <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-lg font-medium text-gray-800 transition-colors hover:text-brand dark:text-gray-200 dark:hover:text-brand">
        {title}
        <ChevronRight className="h-5 w-5 transition-transform duration-200 group-open:rotate-90" />
      </summary>
      <div className="pt-4">{children}</div>
    </details>
  );
}