import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import Link from "next/link";
import RelatedPubs from "@/components/RelatedPubs";
import FundingHighlights from "@/components/FundingHighlights";
import { BookOpen, ExternalLink } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-8">
      <PageHero
        title="Land Subsidence Forecasting"
        subtitle="Physics-aware deep learning (XTFT/TFT) with calibrated uncertainty for urban risk planning."
      />
      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card title="Summary">
            <p>
              We forecast urban land subsidence under rapid development and climate stress.
              Models integrate physics constraints and provide calibrated uncertainty to guide interventions.
            </p>
          </Card>

          <Card title="Key questions">
            <ul className="list-disc list-inside space-y-1">
              <li>Where and when will subsidence accelerate?</li>
              <li>How confident are the forecasts, and why?</li>
              <li>Which interventions minimize risk under uncertainty?</li>
            </ul>
          </Card>

          <Card title="Approach">
            <ul className="list-disc list-inside space-y-1">
              <li>XTFT/TFT with physics-aware hooks and spatiotemporal context.</li>
              <li>Uncertainty diagnostics (coverage, reliability, severity) with k-diagram.</li>
              <li>Hybrid training with sparse sensors and remote-sensing products.</li>
            </ul>
          </Card>

          <Card title="Key outputs">
            <div className="flex flex-wrap gap-2">
              <a className="badge" href="https://doi.org/10.1016/j.jenvman.2024.120078" target="_blank"><BookOpen className="w-4 h-4" /> J. Env. Management (2024)</a>
              <a className="badge" href="https://doi.org/10.22541/au.175390529.91420978/v1" target="_blank"><ExternalLink className="w-4 h-4" /> XTFT preprint</a>
              <Link className="badge" href="/software">FusionLab-learn</Link>
            </div>
          </Card>

          <RelatedPubs tags={["subsidence"]} max={6} />
        </div>

        <aside className="space-y-4">
          <h3 className="text-lg font-semibold">Funding highlights</h3>
          <FundingHighlights />
        </aside>
      </section>
    </div>
  );
}
