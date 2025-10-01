import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import { SocialLinks } from "@/components/SocialLinks";        
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <PageHero
        title="Computational geophysicist advancing physics-informed AI for subsurface forecasting, groundwater, and geohazard risk"
        subtitle="Exploring the Earth with open-source ML, uncertainty diagnostics, and geophysics to turn data into actionable resilience."
        aside={
          // Outer gradient ring → inner white ring → circular photo
          <div className="p-[3px] rounded-full bg-gradient-to-tr from-brand to-rose-500 shadow-xl">
            <div className="rounded-full bg-white p-1">
              <Image
                src="/laurent.jpg"
                alt="Laurent Kouadio"
                width={260}
                height={260}
                className="rounded-full object-cover shadow-md"
                priority
              />
            </div>
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/about" className="badge">About</Link>
          <Link href="/software" className="badge">Software</Link>
          <Link href="/publications" className="badge">Publications</Link>
          <Link href="/research" className="badge">Research</Link>
          <Link href="/cv" className="badge">CV</Link>
          <Link href="/contact" className="badge">Contact</Link>
        </div>
        <SocialLinks className="mt-4" />
      </PageHero>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Highlights</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card title="XTFT (Next-Gen TFT)">
            <p>
              Temporal Fusion Transformer variant for uncertainty-rich
              forecasting with physics-aware hooks and calibrated outputs.
            </p>
            <div className="mt-3 flex gap-2">
              <a className="badge" href="https://github.com/earthai-tech/fusionlab-learn" target="_blank">GitHub</a>
              <Link className="badge" href="/publications">Papers</Link>
            </div>
          </Card>

          <Card title="k-diagram">
            <p>
              Polar diagnostics for uncertainty—coverage, reliability, severity (CAS)—
              to make probabilistic forecasts interpretable at scale.
            </p>
            <div className="mt-3 flex gap-2">
              <a className="badge" href="https://github.com/earthai-tech/k-diagram" target="_blank">GitHub</a>
              <a className="badge" href="https://k-diagram.readthedocs.io/en/latest/" target="_blank">Docs</a>
            </div>
          </Card>

          <Card title="pyCSAMT">
            <p>
              Open EM toolbox for AMT/CSAMT: processing pipelines, Zonge compatibility,
              SEG-EDI integration, and modern plotting (v2).
            </p>
            <div className="mt-3 flex gap-2">
              <a className="badge" href="https://github.com/earthai-tech/pyCSAMT" target="_blank">GitHub</a>
              <Link className="badge" href="/research">Use cases</Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
