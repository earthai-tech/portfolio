import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import FundingHighlights from "@/components/FundingHighlights";
import Link from "next/link";
import { Activity, Waves, TrendingDown, Atom } from "lucide-react";

export default function ResearchPage() {
  return (
    <div className="space-y-10">
      <PageHero
        title="My Research"
        subtitle="Developing intelligent systems to understand and protect our planet's critical subsurface resources."
      >
        {/* Anchor pills */}
        <div className="flex flex-wrap gap-2">
          <a href="#core" className="badge">Core areas</a>
          <a href="#methods" className="badge">Methodological focus</a>
        </div>
      </PageHero>

      {/* Narrative intro */}
      <section className="max-w-4xl">
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          My work sits at the nexus of <strong>AI</strong> and <strong>geophysics</strong>. I translate complex subsurface data
          into actionable insights for environmental challenges. Using physics-informed learning and new
          uncertainty diagnostics, I help cities plan for <em>land subsidence</em>, accelerate <em>groundwater exploration</em>,
          and make probabilistic forecasts <em>trustworthy</em>.
        </p>
      </section>

      {/* Two-column: overview content + sticky funding */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Core areas */}
          <section id="core" className="space-y-6">
            <h2 className="text-2xl font-bold">Core Research Areas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card title="Land Subsidence Forecasting" icon={<TrendingDown className="w-5 h-5" />}>
                <p>
                  <strong>Problem:</strong> Rapid urbanization + groundwater extraction threaten infrastructure.
                  <br />
                  <strong>Approach:</strong> Physics-informed deep learning (XTFT/TFT variants) with calibrated
                  uncertainty for early warning and planning.
                </p>
                <div className="mt-3">
                  <Link href="/research/land-subsidence" className="badge">Read more →</Link>
                </div>
              </Card>

              <Card title="Sustainable Groundwater Exploration" icon={<Waves className="w-5 h-5" />}>
                <p>
                  <strong>Problem:</strong> Locating clean water in data-scarce regions is hard.
                  <br />
                  <strong>Approach:</strong> AMT/CSAMT + AI-assisted inversions; open tooling with <code>pyCSAMT</code>.
                </p>
                <div className="mt-3">
                  <Link href="/research/groundwater" className="badge">Read more →</Link>
                </div>
              </Card>
            </div>
          </section>

          {/* Methods */}
          <section id="methods" className="space-y-6">
            <h2 className="text-2xl font-bold">Methodological Focus</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card title="Interpretable Uncertainty Diagnostics" icon={<Activity className="w-5 h-5" />}>
                <p>
                  <strong>Problem:</strong> Decisions need trustworthy uncertainty.
                  <br />
                  <strong>Approach:</strong> <em>k-diagram</em> (polar diagnostics) to analyze coverage, calibration,
                  and severity (CAS) in space and time.
                </p>
                <div className="mt-3">
                  <Link href="/research/uncertainty" className="badge">Read more →</Link>
                </div>
              </Card>

              <Card title="Physics-Informed Machine Learning (PINNs & Hybrids)" icon={<Atom className="w-5 h-5" />}>
                <p>
                  <strong>Problem:</strong> Standard ML can violate physics.
                  <br />
                  <strong>Approach:</strong> Embed physics constraints and priors (PINNs, loss shaping) to
                  boost generalization with less data.
                </p>
                <div className="mt-3">
                  <Link href="/research/xai-pinns" className="badge">Read more →</Link>
                </div>
              </Card>
            </div>
          </section>
        </div>

        {/* Sticky funding */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 space-y-4">
            <h3 className="text-lg font-semibold">Funding highlights</h3>
            <FundingHighlights />
          </div>
        </aside>
      </div>
    </div>
  );
}
