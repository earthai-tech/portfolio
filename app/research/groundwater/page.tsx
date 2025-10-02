import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import Link from "next/link";
import RelatedPubs from "@/components/RelatedPubs";
import FundingHighlights from "@/components/FundingHighlights";

export default function Page() {
  return (
    <div className="space-y-8">
      <PageHero
        title="Sustainable Groundwater Exploration"
        subtitle="AMT/CSAMT acquisition + AI-assisted inversions to locate aquifers in data-scarce regions."
      />
      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card title="Summary">
            <p>
              We couple AMT/CSAMT with ML to map aquifers efficiently and reproducibly, with open pipelines for processing and inversion.
            </p>
          </Card>
          <Card title="Approach">
            <ul className="list-disc list-inside space-y-1">
              <li>SEG-EDI/Zonge-compatible processing and QC.</li>
              <li>Constrained inversion; physics-aware priors.</li>
              <li>Deployment playbooks for karst/mineralized terrains.</li>
            </ul>
          </Card>
          <Card title="Tools & repos">
            <div className="flex flex-wrap gap-2">
              <a className="badge" href="https://pycsamt.readthedocs.io" target="_blank">pyCSAMT docs</a>
              <a className="badge" href="https://github.com/WEgeophysics/pyCSAMT" target="_blank">pyCSAMT GitHub</a>
              <a className="badge" href="https://watex.readthedocs.io/" target="_blank">watex</a>
            </div>
          </Card>
          <RelatedPubs query="AMT CSAMT groundwater" tags={["groundwater"]} max={6} />
        </div>

        <aside className="space-y-4">
          <h3 className="text-lg font-semibold">Funding highlights</h3>
          <FundingHighlights />
        </aside>
      </section>
    </div>
  );
}
