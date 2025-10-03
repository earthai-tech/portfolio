"use client";

import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import { SocialLinks } from "@/components/SocialLinks";
import ResearchActivityChart from "@/components/ResearchActivityChart";
import StatsStrip from "@/components/StatsStrip";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import Link from "next/link";
import Image from "next/image";
import {
  Rocket,
  BookOpenText,
  BarChartHorizontal,
  Bot,
  FlaskConical,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

const featuredPublications = [
  {
    title: "XTFT: A Next-Generation Temporal Fusion Transformer for Uncertainty-Rich Time Series Forecasting",
    journal: "IEEE TPAMI (Preprint)",
    year: 2025,
    href: "/research/xai-pinns",
    externalUrl: "https://authorea.com/users/643438/articles/711823-xtft-a-next-generation-temporal-fusion-transformer-for-uncertainty-rich-time-series-forecasting",
  },
  {
    title: "An Integrated Approach for sewage diversion: Case of Huayuan mine, Hunan Province, China",
    journal: "Geophysics",
    year: 2024,
    href: "/research/groundwater",
    externalUrl: "https://chooser.crossref.org/?doi=10.1190%2Fgeo2023-0332.1",
  },
];

export default function HomePage() {
  const [hoveredPoint, setHoveredPoint] = useState<{ label: string; value: string } | null>(null);

  return (
    <div className="space-y-16">
      <PageHero
        title={
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl">
            <span className="bg-gradient-to-r from-brand to-rose-500 bg-clip-text text-transparent">
              Computational
            </span>
            <br />
            Geophysicist
          </h1>
        }
        subtitle={
          <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl">
            Hi, I'm a researcher passionate about decoding Earth's subsurface. My work combines physics-informed AI and open-source software to tackle critical environmental challenges, from predicting geohazards to sustainably managing our planet's resources.
          </p>
        }
        aside={
          <div className="p-1 rounded-full bg-gradient-to-tr from-brand to-rose-500 shadow-xl">
            <div className="rounded-full bg-white dark:bg-gray-900 p-1">
              <Image
                src="/laurent.jpg"
                alt="Laurent Kouadio"
                width={220}
                height={220}
                className="rounded-full object-cover shadow-md"
                priority
              />
            </div>
          </div>
        }
      >
        <div className="flex flex-wrap gap-x-6 gap-y-4 items-center mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-brand/90 focus:ring-4 focus:ring-brand/50"
          >
            <Rocket className="h-4 w-4" />
            Get in Touch
          </Link>
          <SocialLinks />
        </div>
      </PageHero>

      <StatsStrip />

      {/* --- Research Activity Section --- */}
      <section>
        <CollapsibleSection
          // [REVISED] The title now includes the dynamic hover text for a cleaner layout
          title={
            <div className="w-full flex items-center justify-between">
              <h2 className="flex items-center text-2xl font-bold">
                <BarChartHorizontal className="mr-3 h-6 w-6 text-brand" />
                Research Activity
              </h2>
              <div className="hidden min-h-[20px] text-sm text-gray-500 dark:text-gray-400 md:block">
                {hoveredPoint ? (
                  <span className="font-semibold">{`${hoveredPoint.label}: ${hoveredPoint.value}`}</span>
                ) : (
                  <span> Get the chart for details here </span>
                )}
              </div>
            </div>
          }
        >
          <Card className="hover:shadow-sm hover:translate-y-0 hover:border-gray-100 dark:hover:border-gray-800">
            <ResearchActivityChart variant="full" startYear={2020} setHoveredPoint={setHoveredPoint} />
          </Card>
        </CollapsibleSection>
      </section>

      {/* --- Featured Projects Section --- */}
      <section>
        <CollapsibleSection
          title={
            <h2 className="flex items-center text-2xl font-bold">
              <Bot className="mr-3 h-6 w-6 text-brand" />
              Featured Projects & Software
            </h2>
          }
        >
          <div className="grid gap-6 md:grid-cols-3">
            <Card title="XTFT: Next-Gen Forecasting">
              <p className="flex-grow text-sm text-gray-600 dark:text-gray-400">
                An enhanced Temporal Fusion Transformer for uncertainty-rich forecasting, featuring physics-aware hooks and calibrated outputs.
              </p>
              <div className="mt-4 flex gap-2">
                <a className="badge" href="https://github.com/earthai-tech/fusionlab-learn" target="_blank" rel="noopener noreferrer">GitHub</a>
                <Link className="badge" href="/research/xai-pinns">Learn More</Link>
              </div>
            </Card>
            <Card title="k-diagram: Visual Analytics">
              <p className="flex-grow text-sm text-gray-600 dark:text-gray-400">
                A Python library for polar diagnostics to make probabilistic forecasts interpretable at scale.
              </p>
              <div className="mt-4 flex gap-2">
                <a className="badge" href="https://github.com/earthai-tech/k-diagram" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a className="badge" href="https://k-diagram.readthedocs.io" target="_blank" rel="noopener noreferrer">Docs</a>
              </div>
            </Card>
            <Card title="pyCSAMT: Open EM Toolbox">
              <p className="flex-grow text-sm text-gray-600 dark:text-gray-400">
                Open-source tools for AMT/CSAMT processing, Zonge compatibility, SEG-EDI integration, and modern plotting.
              </p>
              <div className="mt-4 flex gap-2">
                <a className="badge" href="https://github.com/earthai-tech/pyCSAMT" target="_blank" rel="noopener noreferrer">GitHub</a>
                <Link className="badge" href="/research/groundwater">Use Cases</Link>
              </div>
            </Card>
          </div>
        </CollapsibleSection>
      </section>

      {/* --- Featured Publications Section --- */}
      <section>
        <CollapsibleSection
          title={
            <h2 className="flex items-center text-2xl font-bold">
              <BookOpenText className="mr-3 h-6 w-6 text-brand" />
              Featured Publications
            </h2>
          }
        >
          <div className="space-y-6">
            {featuredPublications.map((pub) => (
              <Card key={pub.title} className="hover:shadow-sm hover:translate-y-0 hover:border-gray-100 dark:hover:border-gray-800">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{pub.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{pub.journal}, {pub.year}</p>
                  </div>
                  <div className="mt-4 flex flex-shrink-0 gap-4 md:mt-0">
                    <Link href={pub.href} className="inline-flex items-center text-sm font-medium text-brand hover:underline">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                    {pub.externalUrl && (
                      <a href={pub.externalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-brand dark:text-gray-400 dark:hover:text-brand-light">
                        <ExternalLink className="mr-1.5 h-4 w-4" />
                        View Paper
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CollapsibleSection>
      </section>
      
      {/* --- Explore My Work Section --- */}
      <section>
        <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-900 dark:text-gray-100">
          <FlaskConical className="mr-3 h-6 w-6 text-brand" />
          Explore My Work
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Link href="/about" className="group rounded-lg bg-gray-50 p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800/50 dark:hover:bg-gray-800">
                <span className="font-semibold text-gray-800 dark:text-gray-200">About Me</span>
            </Link>
            <Link href="/publications" className="group rounded-lg bg-gray-50 p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800/50 dark:hover:bg-gray-800">
                <span className="font-semibold text-gray-800 dark:text-gray-200">All Publications</span>
            </Link>
            <Link href="/research" className="group rounded-lg bg-gray-50 p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800/50 dark:hover:bg-gray-800">
                 <span className="font-semibold text-gray-800 dark:text-gray-200">All Research</span>
            </Link>
            <Link href="/cv" className="group rounded-lg bg-gray-50 p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800/50 dark:hover:bg-gray-800">
                 <span className="font-semibold text-gray-800 dark:text-gray-200">Download CV</span>
            </Link>
        </div>
      </section>
    </div>
  );
}