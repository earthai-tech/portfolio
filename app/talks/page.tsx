import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";

export default function TalksPage() {
  return (
    <div className="space-y-8">
      <PageHero
        title="Talks"
        subtitle="Invited talks, tutorials, and seminars."
      />
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Physics‑Informed AI for Subsurface (2025)">
          <p>Seminar — Forecast uncertainty, CAS, and subsurface intelligence.</p>
        </Card>
        <Card title="k‑diagram: Visualizing Uncertainty (2024)">
          <p>Workshop — Novel polar diagnostics for predictive models.</p>
        </Card>
      </div>
    </div>
  );
}
