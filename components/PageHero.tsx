import { ReactNode } from "react";

export function PageHero({
  title,
  subtitle,
  children,
  aside,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="grid gap-8 md:grid-cols-[1fr,280px] items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold">{title}</h1>
          {subtitle && <p className="mt-2 text-gray-600 max-w-2xl">{subtitle}</p>}
          {children && <div className="mt-6">{children}</div>}
        </div>
        {aside && <div className="justify-self-end">{aside}</div>}
      </div>
    </section>
  );
}

