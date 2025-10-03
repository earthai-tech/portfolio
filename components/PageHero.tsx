import { ReactNode } from "react";

export function PageHero({
  title,
  subtitle,
  children,
  aside,
  imageLeft = false,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  imageLeft?: boolean;
}) {
  const cols = imageLeft ? "md:grid-cols-[280px,1fr]" : "md:grid-cols-[1fr,280px]";
  return (
    <section className="mb-10">
      <div className={`grid gap-8 ${cols} items-center`}>
        <div className={imageLeft ? "md:order-last" : ""}>
          
          {/* Check if title is a string to apply default styling, otherwise render the passed component directly. */}
          {typeof title === 'string' ? (
            <h1 className="text-4xl md:text-5xl font-semibold">
              {title}
            </h1>
          ) : (
            title
          )}
          {/* --- MODIFICATION END --- */}

          {subtitle && (
            <p className="mt-3 text-lg md:text-xl text-gray-600 dark:text-gray-300 italic">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
        {aside && (
          <div className={`justify-self-end ${imageLeft ? "md:order-first" : ""}`}>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}