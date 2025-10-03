"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import ResearchActivityChart from "@/components/ResearchActivityChart";
import { Activity, Waves, TrendingDown, Atom, BarChartHorizontal, ArrowRight } from "lucide-react";

type HoveredPoint = { label: string; value: string } | null;

export default function ResearchPage() {
  const [hoveredPoint, setHoveredPoint] = useState<HoveredPoint>(null);

  return (
    <div className="space-y-12">
      <PageHero
        title="My Research"
        subtitle="Developing intelligent systems to understand and protect our planet's critical subsurface resources."
        aside={
          <div className="p-1 rounded-2xl bg-gradient-to-tr from-brand to-rose-500 shadow-xl">
            <div className="rounded-2xl bg-white dark:bg-gray-900/80 p-3">
              <div className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Activity Since 2020</div>
              <ResearchActivityChart variant="mini" startYear={2020} />
            </div>
          </div>
        }
      >
        <div className="mt-4 flex flex-wrap gap-2">
          <a href="#core" className="badge">Core Areas</a>
          <a href="#methods" className="badge">Methodological Focus</a>
        </div>
      </PageHero>

      <section className="max-w-4xl">
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          My work sits at the nexus of <strong>AI</strong> and <strong>geophysics</strong>. I translate complex subsurface data into actionable insights for environmental challenges. Using physics-informed learning and new uncertainty diagnostics, I help cities plan for <em>land subsidence</em>, accelerate <em>groundwater exploration</em>, and make probabilistic forecasts <em>trustworthy</em>.
        </p>
      </section>

      {/* --- Core Research Areas --- */}
      <section id="core" className="space-y-6">
        <h2 className="text-2xl font-bold">Core Research Areas</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <ResearchAreaCard
            icon={TrendingDown}
            title="Land Subsidence Forecasting"
            href="/research/land-subsidence"
            gradient="from-rose-500 to-slate-800"
            problem="Rapid urbanization and groundwater extraction threaten critical infrastructure."
            approach="Physics-informed deep learning (XTFT variants) for early warning and sustainable urban planning."
          />
          <ResearchAreaCard
            icon={Waves}
            title="Sustainable Groundwater Exploration"
            href="/research/groundwater"
            gradient="from-sky-500 to-slate-800"
            problem="Locating clean water in data-scarce regions remains a significant global challenge."
            approach="AI-assisted inversions of AMT/CSAMT data, supported by open-source tooling like pyCSAMT."
          />
        </div>
      </section>

      {/* --- Methodological Focus --- */}
      <section id="methods" className="space-y-6">
        <h2 className="text-2xl font-bold">Methodological Focus</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <ResearchAreaCard
            icon={Activity}
            title="Interpretable Uncertainty Diagnostics"
            href="/research/uncertainty"
            gradient="from-violet-500 to-slate-800"
            problem="Making reliable decisions requires a trustworthy understanding of forecast uncertainty."
            approach="Developing novel polar diagnostics (k-diagram) to analyze forecast coverage, reliability, and severity."
          />
          <ResearchAreaCard
            icon={Atom}
            title="Physics-Informed Machine Learning"
            href="/research/xai-pinns"
            gradient="from-emerald-500 to-slate-800"
            problem="Standard machine learning models can produce physically implausible results."
            approach="Embedding physical laws and constraints into neural networks to improve generalization and data efficiency."
          />
        </div>
      </section>
      
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center text-2xl font-bold">
            <BarChartHorizontal className="mr-3 h-6 w-6 text-brand"/> Research Activity
          </h2>
          <div className="hidden min-h-[20px] text-sm text-gray-500 dark:text-gray-400 md:block">
            {hoveredPoint ? <span>{`${hoveredPoint.label}: ${hoveredPoint.value}`}</span> : <span>Hover for details</span>}
          </div>
        </div>
        <div className="card p-2 sm:p-4"><ResearchActivityChart variant="full" startYear={2020} setHoveredPoint={setHoveredPoint} /></div>
      </section>
    </div>
  );
}

// --- Custom Card Component for Research Areas ---
function ResearchAreaCard({ icon: Icon, title, href, gradient, problem, approach }: any) {
  const pattern = (
    <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
  );

  return (
    <Link
      href={href}
      className={`group relative block h-full overflow-hidden rounded-2xl bg-gradient-to-br p-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${gradient}`}
    >
      {pattern}
      <div className="relative z-10 flex h-full flex-col">
        {/* [MODIFIED] Wrapped Icon and Title in a flex container */}
        <div className="mb-4 flex items-center gap-4">
          <div className="inline-block rounded-lg bg-white/10 p-3">
            <Icon className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        
        <div className="mt-4 flex-grow space-y-3 text-gray-200">
          <div>
            <h4 className="font-semibold text-gray-400">Problem:</h4>
            <p>{problem}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-400">Approach:</h4>
            <p>{approach}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center font-semibold text-sky-300 transition-colors group-hover:text-white">
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}