import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import Image from "next/image";
import Link from "next/link";
import RelatedPubs from "@/components/RelatedPubs";
import { BookOpen, ExternalLink, Target, Cpu, Layers, CheckCircle, ArrowRight } from "lucide-react";

export default function Page() {
  return (
    <div className="space-y-16">
      <PageHero
        title="Sustainable Groundwater Exploration"
        subtitle="AI-assisted hydrogeophysics for siting productive wells and estimating aquifer properties."
      />

      {/* ---  Key Achievements Section --- */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <StatItem value=">90%" label="Prediction Accuracy" description="Achieved with ensemble models" />
        <StatItem value="30%" label="Sensitivity Increase" description="In leak detection with MADF" />
        <StatItem value="87%" label="Initial SVM Accuracy" description="Predicting successful wells" />
        <StatItem value="2+" label="Open-Source Tools" description="Supporting the community" />
      </section>

      {/* --- Smart Wells Narrative --- */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Smart Wells, Secure Water</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            My research transforms the uncertain quest for groundwater into a science of prediction. By developing novel geo-electrical features and harnessing machine learning, we can significantly reduce the guesswork and risk, ensuring every well counts for the communities that need water most.
          </p>
          <div className="rounded-lg bg-gray-50 dark:bg-gray-900/50 p-4 space-y-3">
            <h4 className="font-semibold">Methodology Progression:</h4>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
              <MethodStep>SVM</MethodStep>
              <ArrowRight className="h-4 w-4 text-gray-400 rotate-90 sm:rotate-0" />
              <MethodStep>Ensemble Learning</MethodStep>
              <ArrowRight className="h-4 w-4 text-gray-400 rotate-90 sm:rotate-0" />
              <MethodStep>Mixture Learning (MXS)</MethodStep>
            </div>
          </div>
        </div>
        <div>
          {/* Replace this with your own image */}
          <Image src="/images/groundwater-1.jpg" alt="Geophysical survey in an arid landscape" width={600} height={400} className="rounded-lg shadow-md" />
        </div>
      </section>

      {/* --- Safeguarding Water Narrative --- */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="md:order-last space-y-4">
          <h2 className="text-3xl font-bold">Environmental Geophysics</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Beyond discovery, my work focuses on protecting our precious groundwater resources. I develop integrated methods to detect, map, and monitor subsurface pollution from industrial and mining activities, providing actionable data to safeguard water for future generations.
          </p>
          <blockquote className="border-l-4 border-brand pl-4 text-gray-600 dark:text-gray-400 italic">
            The Multifaceted Anomaly Detection Framework (MADF) improved leak detection sensitivity by 30% and reduced false positives by 25% at a test site in China.
          </blockquote>
        </div>
        <div>

          <Image src="/images/groundwater-2.jpg" alt="Water quality testing in a lab" width={600} height={400} className="rounded-lg shadow-md" />
        </div>
      </section>

      <Card className="hover:shadow-sm hover:translate-y-0 hover:border-gray-100 dark:hover:border-gray-800">
        <h2 className="text-2xl font-bold mb-4">Key Outcomes</h2>
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
          <OutcomeItem><strong>Reduce dry wells</strong> with predictive models from geo-electrical features.</OutcomeItem>
          <OutcomeItem><strong>Improve decision trust</strong> via robust ensemble learning and smart data imputation (MXS).</OutcomeItem>
          <OutcomeItem><strong>Operationalize workflows</strong> with open-source tools like <code>pyCSAMT</code> and <code>watex</code>.</OutcomeItem>
          <OutcomeItem><strong>Safeguard water quality</strong> by localizing leaks with integrated ML and geophysical surveys.</OutcomeItem>
        </ul>
      </Card>
      
      <Card className="hover:shadow-sm hover:translate-y-0 hover:border-gray-100 dark:hover:border-gray-800">
        <h2 className="text-2xl font-bold mb-4">Key Outputs & Tooling</h2>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            <OutputLink href="https://doi.org/10.1029/2021WR031623" text="Groundwater flow rate via SVM (WRR)" />
            <OutputLink href="https://doi.org/10.1007/s11269-023-03562-5" text="Ensemble learning for flow rate (WRM)" />
            <OutputLink href="https://doi.org/10.1016/j.cageo.2024.105819" text="Mixture learning for aquifer K (C&G)" />
            <OutputLink href="https://doi.org/10.1016/j.jappgeo.2022.104647" text="pyCSAMT toolbox (J. Appl. Geophys.)" />
            <OutputLink href="https://doi.org/10.1111/1365-2478.13385" text="CSAMT reservoir mapping (Geophys. Prospect.)" />
            <OutputLink href="https://doi.org/10.1016/j.jenvman.2024.122130" text="Landfill leachate anomaly detection (JEM)" />
            <OutputLink href="https://doi.org/10.1016/j.softx.2023.101367" text="watex: ML for water exploration (SoftwareX)" />
            <OutputLink href="https://pycsamt.readthedocs.io" text="pyCSAMT docs" isExternal />
            <OutputLink href="https://watex.readthedocs.io/" text="watex docs" isExternal />
        </div>
      </Card>

      <RelatedPubs tags={["groundwater"]} max={6} />
    </div>
  );
}

// --- Helper Components for the new design ---

function StatItem({ value, label, description }: { value: string, label: string, description: string }) {
  return (
    <div className="rounded-lg bg-gray-50 dark:bg-gray-900/50 p-4">
      <div className="text-3xl font-bold text-brand">{value}</div>
      <div className="mt-1 font-semibold">{label}</div>
      <div className="text-xs text-gray-500">{description}</div>
    </div>
  );
}

function MethodStep({ children }: { children: React.ReactNode }) {
  return <div className="rounded-full bg-white dark:bg-gray-800 border dark:border-gray-700 px-3 py-1 font-medium">{children}</div>;
}

function OutcomeItem({ children }: { children: React.ReactNode }) {
  return <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0 text-green-500" /><span>{children}</span></li>;
}

function OutputLink({ href, text, isExternal = false }: { href: string, text: string, isExternal?: boolean }) {
    const Icon = isExternal ? ExternalLink : BookOpen;
    return (
        <a href={href} target="_blank" rel="noreferrer" className="inline-block break-inside-avoid rounded-md bg-gray-50 dark:bg-gray-900/50 p-3 w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Icon className="h-4 w-4" />
                <span>{text}</span>
            </div>
        </a>
    )
}