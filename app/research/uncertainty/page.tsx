import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import Link from "next/link";
import RelatedPubs from "@/components/RelatedPubs";
import { ExternalLink, BookOpen, AlertTriangle, ShieldCheck, ArrowRight, CheckCircle, Target, BarChart, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="space-y-16">
      <PageHero
        title="Interpretable Uncertainty Diagnostics"
        subtitle="Making probabilistic forecasts transparent and decision-ready with a novel visual analytics framework."
        aside={
          <div className="p-1 rounded-2xl bg-gradient-to-tr from-violet-500 to-rose-500 shadow-xl">
            <div className="rounded-2xl bg-white p-1">
              <Image
                src="/images/uncertainty.png"
                alt="k-diagram style polar diagnostics illustration"
                width={340} height={340}
                className="rounded-xl object-cover"
                priority
              />
            </div>
          </div>
        }
      />

      {/* --- [NEW] The Core Problem vs. My Innovations --- */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-lg bg-rose-50 dark:bg-rose-900/20 p-6 space-y-2">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-300">
            <AlertTriangle className="h-6 w-6" />
            <h2 className="text-xl font-bold">The Problem: Hidden Risks</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-400">
            Standard forecast metrics average out performance, hiding dangerous <em>clusters of errors</em>. A model can look good on paper but fail repeatedly when it matters most, leading to depleted resources and broken trust.
          </p>
        </div>
        <div className="rounded-lg bg-sky-50 dark:bg-sky-900/20 p-6 space-y-2">
          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-300">
            <ShieldCheck className="h-6 w-6" />
            <h2 className="text-xl font-bold">My Innovations</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-400">
            I developed two solutions: the <em>CAS score</em> to quantify the risk of error bursts, and the <em>k-diagram</em> toolkit to visualize and diagnose the complex structure of forecast uncertainty.
          </p>
        </div>
      </section>
      
      {/* --- [NEW] Visual Explanation of the CAS Score --- */}
      <section>
        <h2 className="text-3xl font-bold text-center">The CAS Score: Measuring What Matters</h2>
        <p className="mt-2 text-center text-lg text-gray-600 dark:text-gray-400">Instead of treating all errors equally, the Cluster-Aware Severity (CAS) score penalizes failures based on their context.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 items-start gap-4">
          <FlowStep num="1" title="Identify a Failure" text="An observation (black dot) falls outside the predicted interval (gray band)." />
          <FlowStep num="2" title="Measure Local Density" text="The system checks if other failures have occurred recently within a defined window." />
          <FlowStep num="3" title="Assign Severity Score" text="Clustered failures receive a higher penalty than isolated misses, better reflecting real-world operational risk." isLast />
        </div>
      </section>

      {/* --- [NEW] k-diagram Showcase --- */}
      <section className="space-y-6">
        <div className="text-center">
            <h2 className="text-3xl font-bold">k-diagram: A Visual Analytics Toolkit</h2>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">To build trust, decision-makers need to see uncertainty. The <a href="https://k-diagram.readthedocs.io" target="_blank" rel="noreferrer" className="text-brand underline">k-diagram</a> toolkit uses novel polar plots to answer key diagnostic questions.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <KDiagramCard icon={Target} question="Where is the model failing?" description="The Anomaly Magnitude diagram maps the location and severity of prediction interval failures, revealing systematic biases." />
            <KDiagramCard icon={TrendingUp} question="How does accuracy decay?" description="The Forecast Horizon Drift plot visualizes how a model's precision degrades as it predicts further into the future." />
            <KDiagramCard icon={BarChart} question="What is the shape of the error?" description="Polar violins provide a unique way to compare the full error distributions of multiple models at a glance." />
        </div>
      </section>

      <Card>
        <h2 className="text-2xl font-bold mb-4">Summary of Contributions</h2>
        <ul className="space-y-4">
          <OutcomeItem><strong>Why averages mislead:</strong> single scores hide clustered failures that drive real-world risk.</OutcomeItem>
          <OutcomeItem><strong>Risk-focused evaluation:</strong> the CAS score highlights resilience by penalizing dangerous error bursts.</OutcomeItem>
          <OutcomeItem><strong>Clear uncertainty visualization:</strong> k-diagram’s polar views reveal blind spots and horizon drift to guide decisions.</OutcomeItem>
          <OutcomeItem><strong>Building trust in AI:</strong> transparent, visual diagnostics create a shared language between modelers and practitioners.</OutcomeItem>
        </ul>
      </Card>
      
      <Card>
        <h2 className="text-2xl font-bold mb-4">Key Outputs</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <OutputLink href="https://github.com/earthai-tech/k-diagram" text="k-diagram on GitHub" isExternal/>
          <OutputLink href="https://k-diagram.readthedocs.io" text="k-diagram Docs" isExternal/>
          <OutputLink href="https://doi.org/10.5281/zenodo.17051182" text="Technical Report (Zenodo)" />
        </div>
      </Card>

      <RelatedPubs tags={["CAS", "visualization", "k-diagram"]} max={8} />
    </div>
  );
}

// --- Helper Components for the new design ---

function FlowStep({ num, title, text, isLast = false }: { num: string, title: string, text: string, isLast?: boolean }) {
  return (
    <div className="flex items-start md:flex-col md:items-center md:text-center">
      <div className="flex items-center md:flex-col">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand font-bold text-white">{num}</div>
        {!isLast && <div className="ml-4 md:ml-0 md:mt-2 h-px md:h-12 w-12 md:w-px flex-grow bg-gray-300 dark:bg-gray-700" />}
      </div>
      <div className="ml-4 md:ml-0 md:mt-4">
        <h3 className="font-bold">{title}</h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{text}</p>
      </div>
    </div>
  );
}

function KDiagramCard({ icon: Icon, question, description }: { icon: React.ElementType, question: string, description: string }) {
    return (
        <div className="rounded-lg p-6 bg-gray-50 dark:bg-gray-900/50 border dark:border-gray-800">
            <Icon className="h-8 w-8 text-brand" />
            <h3 className="mt-3 text-lg font-bold">"{question}"</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    );
}

function OutcomeItem({ children }: { children: React.ReactNode }) {
  return <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-green-500" /><span>{children}</span></li>;
}

function OutputLink({ href, text, isExternal = false }: { href: string, text: string, isExternal?: boolean }) {
    const Icon = isExternal ? ExternalLink : BookOpen;
    return (
        <a href={href} target="_blank" rel="noreferrer" className="block rounded-md bg-gray-50 dark:bg-gray-900/50 p-3 w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Icon className="h-4 w-4" />
                <span>{text}</span>
            </div>
        </a>
    )
}