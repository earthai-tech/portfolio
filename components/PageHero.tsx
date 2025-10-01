import { ReactNode } from "react";

export function PageHero({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="mb-10">
      <h1 className="text-3xl md:text-4xl font-semibold">{title}</h1>
      {subtitle && (
        <p className="mt-2 text-gray-600 max-w-2xl">{subtitle}</p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </section>
  );
}
