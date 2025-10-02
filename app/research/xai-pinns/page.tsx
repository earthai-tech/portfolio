import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import Link from "next/link";
import RelatedPubs from "@/components/RelatedPubs";

export default function Page() {
  return (
    <div className="space-y-8">
      <PageHero
        title="Physics-Informed Machine Learning"
        subtitle="Hybrid learning with constraints and priors for physically consistent predictions."
      />
      <section className="space-y-6 max-w-4xl">
        <Card title="Approach">
          <ul className="list-disc list-inside space-y-1">
            <li>Encode governing equations (PINNs) and conservation in the loss.</li>
            <li>Leverage simulations + sparse sensors + remote sensing (mixed regimes).</li>
            <li>Improve generalization, reduce data needs, and avoid nonphysical artifacts.</li>
          </ul>
        </Card>
        <Card title="Applications">
          <div className="flex flex-wrap gap-2">
            <Link className="badge" href="/research/land-subsidence">Subsidence</Link>
            <Link className="badge" href="/research/groundwater">Groundwater</Link>
          </div>
        </Card>
        <RelatedPubs tags={["physics-informed", "PINNs"]} max={8} />
      </section>
    </div>
  );
}
