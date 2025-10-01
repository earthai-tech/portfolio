import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";

export default function ResearchPage() {
  return (
    <div className="space-y-8">
      <PageHero
        title="Research"
        subtitle="AI‑driven geophysics for groundwater, land subsidence, and geohazard risk."
      />

      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Land Subsidence Forecasting">
          <p>
            Physics‑informed deep learning (XTFT, TFT variants) with
            uncertainty quantification to forecast subsidence in rapidly
            urbanizing regions.
          </p>
        </Card>

        <Card title="Groundwater Exploration">
          <p>
            AFMT/CSAMT acquisition + AI‑assisted inversions to locate aquifers
            efficiently in data‑scarce regions, with open toolchains (pyCSAMT).
          </p>
        </Card>

        <Card title="Uncertainty Diagnostics">
          <p>
            Polar diagnostics (k‑diagram) for coverage, calibration, and severity
            with interpretable visual analytics in spatiotemporal settings.
          </p>
        </Card>

        <Card title="Physics‑Informed Learning">
          <p>
            PINNs and hybrid models to enforce physical consistency and improve
            generalization in environmental forecasting.
          </p>
        </Card>
      </div>
    </div>
  );
}
