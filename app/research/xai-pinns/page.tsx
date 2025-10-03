import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import Link from "next/link";
import RelatedPubs from "@/components/RelatedPubs";
import { ExternalLink, BookOpen, Atom, CheckCircle, BrainCircuit } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="space-y-16">
      <PageHero
        title="Explainable & Physics-Informed AI"
        subtitle="Building trustworthy forecasting systems by uniting transparent uncertainty diagnostics (XAI) with physically-grounded deep learning models (PINNs)."
        aside={
          <div className="p-1 rounded-2xl bg-gradient-to-tr from-brand to-violet-500 shadow-xl">
            <div className="rounded-2xl bg-white p-1">
              {/* NOTE: Make sure an image exists at /public/images/pinn-abstract.png */}
              <Image
                src="/images/pinn-abstract.png"
                alt="Abstract representation of physics and data merging"
                width={360} height={360}
                className="rounded-xl object-cover"
                priority
              />
            </div>
          </div>
        }
      />

      <section className="grid md:grid-cols-2 gap-6 text-center">
        <div className="rounded-lg bg-sky-50 dark:bg-sky-900/20 p-6">
          <BrainCircuit className="mx-auto h-10 w-10 text-sky-500" />
          <h2 className="mt-2 text-xl font-bold">Pillar 1: Making AI Explainable</h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">If a model can't explain itself, it can't be trusted. My work in XAI focuses on creating visual tools that make forecast uncertainty transparent and actionable.</p>
        </div>
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-6">
          <Atom className="mx-auto h-10 w-10 text-emerald-500" />
          <h2 className="mt-2 text-xl font-bold">Pillar 2: Making AI Physical</h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">Predictions must be grounded in reality. My physics-informed models learn from both data and the governing laws of nature for scientifically sound results.</p>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Pillar 1: Seeing Uncertainty with k-diagram</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            My research into explainability led to the creation of <a href="https://k-diagram.readthedocs.io" target="_blank" rel="noreferrer" className="text-brand underline">k-diagram</a>, an open-source toolkit that transforms complex forecast data into intuitive visual stories. Instead of single, misleading scores, its novel polar plots answer critical questions:
          </p>
          <ul className="space-y-2">
            <OutcomeItem><strong>Where are the model's blind spots?</strong></OutcomeItem>
            <OutcomeItem><strong>How does forecast accuracy decay over time?</strong></OutcomeItem>
            <OutcomeItem><strong>Is the model's confidence stable or erratic?</strong></OutcomeItem>
          </ul>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          {/* NOTE: Make sure an image exists at /public/images/k-diagram-example.jpg */}
          <Image src="/images/k-diagram-example.png" alt="Example polar plots from the k-diagram toolkit" width={600} height={400} className="w-full h-auto object-cover" />
        </div>
      </section>

       <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="md:order-last space-y-4">
          <h2 className="text-3xl font-bold">Pillar 2: Grounding Forecasts in Physics</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            To ensure predictions are scientifically rigorous, I developed <em>TransFlowSubsNet</em>, a physics-informed deep learning (PIDL) framework. It combines a powerful data-driven model (HALNet) with the governing PDEs of geomechanics.
          </p>
          <blockquote className="border-l-4 border-brand pl-4 text-gray-600 dark:text-gray-400 italic">
            By minimizing a composite loss function that includes both data fidelity and physical consistency, the model is forced to generate forecasts that are not only accurate but also physically plausible.
          </blockquote>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg border dark:border-gray-800 bg-white">
          {/* NOTE: Make sure an image exists at /public/images/halnet-architecture.png */}
          <Image src="/images/uncertainty.png" alt="Architectural diagram of the HALNet and TransFlowSubsNet framework" width={600} height={300} className="w-full h-auto object-contain" />
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold">From Theory to Practice</h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">This research culminates in practical, accessible tools like the <em>Subsidence PINN MiniForecaster</em> a GUI that allows users to configure and run these complex physics-informed models directly.</p>
        <div className="mt-6 max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl border-4 border-gray-200 dark:border-gray-800">
           {/* NOTE: Make sure an image exists at /public/images/mini-forecaster.png */}
           <Image src="/images/mini-forecaster-2.png" alt="Screenshot of the Subsidence PINN Mini Forecaster GUI" width={1200} height={800} className="w-full h-auto" />
        </div>
      </section>

      <Card>
        <h2 className="text-2xl font-bold mb-4">Key Outputs</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <OutputLink href="https://fusion-lab.readthedocs.io/en/latest/user_guide/pinn_gui_guide.html" text="MiniForecaster GUI Guide" isExternal />
            <OutputLink href="https://fusion-lab.readthedocs.io/en/latest/user_guide/models/pinn/transflow_subnet.html" text="TransFlowSubsNet Docs" isExternal />
            <OutputLink href="https://k-diagram.readthedocs.io" text="k-diagram Docs" isExternal />
            <OutputLink href="/software" text="View All Software" isInternal />
        </div>
      </Card>

      <RelatedPubs tags={["physics-informed", "PINN", "uncertainty", "subsidence", "XTFT"]} max={8} />
    </div>
  );
}

// --- Helper Components ---

function OutcomeItem({ children }: { children: React.ReactNode }) {
  return <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-green-500" /><span>{children}</span></li>;
}

function OutputLink({ href, text, isExternal = false, isInternal = false }: { href: string, text: string, isExternal?: boolean, isInternal?: boolean }) {
    // Correctly assign the icon. Use ExternalLink for internal links too, as it signifies navigation.
    const Icon = isExternal || isInternal ? ExternalLink : BookOpen;
    const LinkComponent = isInternal ? Link : 'a'; 
    const targetProps = !isInternal ? { target: "_blank", rel: "noreferrer" } : {};

    if (isInternal) {
      return (
        <Link href={href} className="block rounded-md bg-gray-50 dark:bg-gray-900/50 p-3 w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Icon className="h-4 w-4" />
                <span>{text}</span>
            </div>
        </Link>
      );
    }
    
    return (
        <a href={href} {...targetProps} className="block rounded-md bg-gray-50 dark:bg-gray-900/50 p-3 w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Icon className="h-4 w-4" />
                <span>{text}</span>
            </div>
        </a>
    );
}