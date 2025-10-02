import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import Link from "next/link";
import RelatedPubs from "@/components/RelatedPubs";

export default function Page() {
  return (
    <div className="space-y-8">
      <PageHero
        title="Interpretable Uncertainty Diagnostics"
        subtitle="Polar diagnostics (k-diagram) to analyze coverage, calibration, and severity at scale."
      />
      <section className="space-y-6 max-w-4xl">
        <Card title="Why it matters">
          <p>
            Forecasts need calibrated uncertainty and transparent diagnostics. k-diagram summarizes error structure
            in a single polar view to guide trust and improvement.
          </p>
        </Card>
        <Card title="Get started">
          <div className="flex flex-wrap gap-2">
            <a className="badge" href="https://k-diagram.readthedocs.io/en/latest/" target="_blank">Docs</a>
            <a className="badge" href="https://github.com/earthai-tech/k-diagram" target="_blank">GitHub</a>
          </div>
        </Card>
        <RelatedPubs tags={["uncertainty", "visualization", "k-diagram"]} max={8} />
      </section>
    </div>
  );
}
