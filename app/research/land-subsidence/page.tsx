import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import Link from "next/link";
import Image from "next/image";
import RelatedPubs from "@/components/RelatedPubs";
import { BookOpen, ExternalLink, AlertTriangle, Cpu, ArrowRight, Layers, ShieldCheck, ClipboardList, CheckCircle } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-16">
      <PageHero
        title="Land Subsidence Forecasting"
        subtitle="Physics-aware deep learning (XTFT/TFT) with calibrated uncertainty for urban risk planning."
      />

      {/* --- [NEW] Key Achievements from your papers --- */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <StatItem value="R² > 0.90" label="Model Accuracy" description="Achieved by XGBR model" />
        <StatItem value="~55%"

 label="Driver Importance" description="Of GWL & Building Concentration" />
        <StatItem value="-111 mm"
 label="Potential Reduction" description="With 80% GWL/BC mitigation" />
        <StatItem value="30x"
 label="More Compressible" description="Nansha vs. Zhongshan geology" />
      </section>

      {/* --- [REDESIGNED] Narrative with supporting image --- */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 dark:bg-rose-900/20 px-3 py-1 text-rose-600 dark:text-rose-300">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-semibold text-sm">The Silent Crisis</span>
          </div>
          <h2 className="text-3xl font-bold">Weakening Urban Foundations</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Land subsidence is a relentless geohazard, quietly increasing flood risks and infrastructure vulnerability in cities worldwide. Driven by groundwater over-extraction and urban expansion, this phenomenon poses a critical threat to sustainable development.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          {/* NOTE: Place your subsidence-example.jpg in the /public/images/ folder */}
          <Image
            src="/images/subsidence-example.png"
            alt="Example of land subsidence impacting urban infrastructure"
            width={600}
            height={400}
            layout="responsive"
            objectFit="cover"
          />
        </div>
      </section>

      {/* --- [REDESIGNED] Methodology with GUI image --- */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="md:order-last space-y-4">
           <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 dark:bg-sky-900/20 px-3 py-1 text-sky-600 dark:text-sky-300">
            <Cpu className="h-4 w-4" />
            <span className="font-semibold text-sm">A Physics-Informed Solution</span>
          </div>
          <h2 className="text-3xl font-bold">The Evolution of My Approach</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            My research journey evolved from standard "black box" models (like XGBoost & LSTM) to the development of <strong>TransFlowSubsNet</strong>. This novel physics-informed AI framework learns from both data and the governing laws of geomechanics, resulting in forecasts that are accurate, interpretable, and trustworthy for decision-makers.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
          {/* NOTE: Place your mini-forecaster.png in the /public/images/ folder */}
          <Image
            src="/images/mini-forecaster.png"
            alt="Screenshot of the Subsidence PINN Mini Forecaster GUI"
            width={600}
            height={400}
            layout="responsive"
            objectFit="contain"
          />
          <p className="text-center text-xs text-gray-500 p-2 bg-gray-50 dark:bg-gray-900">The `TransFlowSubsNet` in action: Subsidence PINN Mini Forecaster GUI</p>
        </div>
      </section>

       {/* --- Key Discoveries Section --- */}
      <section>
        <h2 className="text-3xl font-bold text-center">Key Discoveries</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <InsightCard
            icon={Layers}
            title="Uncovered Hidden Properties"
            description="The model revealed Nansha's subsurface is over 30x more compressible than Zhongshan's—a critical insight for future construction and planning."
            color="sky"
          />
          <InsightCard
            icon={ShieldCheck}
            title="Built Trust with Decision-Makers"
            description="By integrating geophysics principles, the model's forecasts became scientifically sound, bridging the gap between AI research and real-world policy."
            color="violet"
          />
          <InsightCard
            icon={ClipboardList}
            title="Enabled Proactive Policy Testing"
            description="The framework allows city planners to simulate different policy scenarios (e.g., water management) to find the most effective strategies for mitigating subsidence."
            color="emerald"
          />
        </div>
      </section>

      <Card>
        <h2 className="text-2xl font-bold mb-4">What You'll Learn (Summary)</h2>
        <ul className="space-y-4">
          <OutcomeItem><strong>Where/when subsidence accelerates:</strong> physics-aware models surface emerging hotspots.</OutcomeItem>
          <OutcomeItem><strong>How confident we are:</strong> calibrated uncertainty clarifies forecast trust and communicates risk.</OutcomeItem>
          <OutcomeItem><strong>What to do about it:</strong> policy scenarios show how planning choices reduce hazard.</OutcomeItem>
        </ul>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold mb-4">Key Outputs & Tooling</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <OutputLink href="https://doi.org/10.1016/j.jenvman.2024.120078" text="J. Env. Management (2024)" />
          <OutputLink href="https://doi.org/10.22541/au.175390529.91420978/v1" text="XTFT preprint" isExternal />
          <OutputLink href="https://fusion-lab.readthedocs.io/en/latest/user_guide/models/pinn/transflow_subnet.html" text="TransFlowSubsNet docs" isExternal />
          <OutputLink href="/software" text="FusionLab-learn Software" isInternal />
        </div>
      </Card>

      <RelatedPubs tags={["subsidence", "forecasting"]} max={6} />
    </div>
  );
}

// --- Helper Components ---

function StatItem({ value, label, description }: { value: string, label: string, description: string }) {
  return (
    <div className="rounded-lg bg-gray-50 dark:bg-gray-900/50 p-4">
      <div className="text-3xl font-bold text-brand">{value}</div>
      <div className="mt-1 font-semibold">{label}</div>
      <div className="text-xs text-gray-500">{description}</div>
    </div>
  );
}

// --- Helper Components for the new design (unchanged) ---

function InsightCard({ icon: Icon, title, description, color }: { icon: React.ElementType, title: string, description: string, color: string }) {
  return (
    <div className={`rounded-lg p-6 bg-${color}-50 dark:bg-${color}-900/20 border border-${color}-200 dark:border-${color}-900`}>
      <Icon className={`h-8 w-8 text-${color}-500`} />
      <h3 className="mt-3 text-lg font-bold">{title}</h3>
      <p className="mt-1 text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

function OutcomeItem({ children }: { children: React.ReactNode }) {
  return <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-green-500" /><span>{children}</span></li>;
}

function OutputLink({ href, text, isExternal = false, isInternal = false }: { href: string, text: string, isExternal?: boolean, isInternal?: boolean }) {
    const Icon = isExternal || isInternal ? ExternalLink : BookOpen;
    // Use Next.js Link component for internal links for client-side routing
    const LinkComponent = isInternal ? Link : 'a'; 
    const targetProps = isExternal ? { target: "_blank", rel: "noreferrer" } : {};

    return (
        <LinkComponent href={href} {...targetProps} className="block rounded-md bg-gray-50 dark:bg-gray-900/50 p-3 w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Icon className="h-4 w-4" />
                <span>{text}</span>
            </div>
        </LinkComponent>
    )
}