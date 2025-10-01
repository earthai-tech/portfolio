import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <PageHero
        title="Computational geophysicist building physics‑informed AI for subsurface, water, and risk"
        subtitle="I design and open‑source tools that make uncertainty measurable, interpretable, and useful."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/software" className="badge">Software</Link>
          <Link href="/publications" className="badge">Publications</Link>
          <Link href="/research" className="badge">Research</Link>
        </div>
      </PageHero>

      <section>
        <h2 className="text-xl font-semibold mb-4">Highlights</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card title="XTFT (Next‑Gen TFT)">
            <p>
              Temporal Fusion Transformer variant for uncertainty‑rich
              forecasting; modular, physics‑aware; TPAMI submission.
            </p>
            <div className="mt-3 flex gap-2">
              <a className="badge" href="https://github.com/earthai-tech/fusionlab-learn" target="_blank">GitHub</a>
              <Link className="badge" href="/publications">Papers</Link>
            </div>
          </Card>

          <Card title="k‑diagram">
            <p>
              Polar diagnostics for forecast uncertainty: coverage, reliability,
              severity (CAS); gallery of novel evaluation plots.
            </p>
            <div className="mt-3 flex gap-2">
              <a className="badge" href="https://github.com/earthai-tech/k-diagram" target="_blank">GitHub</a>
              <a className="badge" href="https://k-diagram.readthedocs.io/en/latest/" target="_blank">Docs</a>
            </div>
          </Card>

          <Card title="pyCSAMT">
            <p>
              Open‑source electromagnetic toolbox for AFMT/CSAMT processing:
              Zonge compatibility, SEG‑EDI integration, plotting v2.
            </p>
            <div className="mt-3 flex gap-2">
              <a className="badge" href="https://github.com/WEgeophysics/pyCSAMT" target="_blank">GitHub</a>
              <Link className="badge" href="/research">Use cases</Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
