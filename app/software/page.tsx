import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import software from "@/data/software.json";

export default function SoftwarePage() {
  return (
    <div className="space-y-8">
      <PageHero
        title="Software"
        subtitle="Open‑source tools I build and maintain."
      />
      <div className="grid md:grid-cols-2 gap-6">
        {software.map((s) => (
          <Card key={s.name} title={s.name}>
            <p>{s.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {s.links.map((l: any) => (
                <a key={l.href} className="badge" href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
