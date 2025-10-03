import Link from "next/link";
import { ReactNode } from "react";

type CardProps = {
  title: string;
  children?: ReactNode;
  icon?: ReactNode;
  href?: string;        // when present, the entire card is clickable
  className?: string;
};

export function Card({ title, children, icon, href, className = "" }: CardProps) {
  const inner = (
    <div className={`card transition-shadow group ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon ? <span className="text-gray-700 dark:text-gray-300">{icon}</span> : null}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="text-gray-700 dark:text-gray-300">{children}</div>
      {href && (
        <div className="mt-3 text-sm font-medium text-brand group-hover:underline">
          Read more →
        </div>
      )}
    </div>
  );

  return href ? (
    <Link href={href} aria-label={`${title} — read more`} className="block focus:outline-none focus:ring-2 focus:ring-brand/40 rounded-2xl">
      {inner}
    </Link>
  ) : (
    inner
  );
}
