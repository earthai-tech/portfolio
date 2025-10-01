import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";

export default function TeachingPage() {
  return (
    <div className="space-y-8">
      <PageHero
        title="Teaching"
        subtitle="Courses and mentoring in AI‑driven geophysics and forecasting."
      />
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="AI‑Geophysics (Graduate)">
          <p>From signal processing to deep learning for EM methods.</p>
        </Card>
        <Card title="Forecasting with Transformers">
          <p>Temporal models, calibration, and uncertainty evaluation.</p>
        </Card>
      </div>
    </div>
  );
}
