import { ReactNode } from "react";

export function Card({
  title,
  children,
  footer,
}: {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="card h-full flex flex-col">
      {title && <h3 className="text-lg font-medium mb-3">{title}</h3>}
      <div className="flex-1">{children}</div>
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}
