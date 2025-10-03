import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import Image from "next/image";
import { BrainCircuit, Lightbulb, GraduationCap, Check, Cpu, AreaChart } from "lucide-react";

export default function TeachingPage() {
  return (
    <div className="space-y-16">
      <PageHero
        title="Teaching & Mentorship"
        subtitle="Fostering the next generation of geoscientists at the intersection of Earth science, data, and artificial intelligence."
      />

      {/* --- Teaching Philosophy Section --- */}
      <section>
        <h2 className="text-3xl font-bold text-center">My Teaching Philosophy</h2>
        <p className="mt-4 max-w-3xl mx-auto text-center text-lg text-gray-600 dark:text-gray-400">
          My goal is to equip students with the skills and forward-thinking mindset needed to lead the transformation in modern geophysics. I foster a collaborative environment where we can tackle complex challenges and push the boundaries of what's possible.
        </p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <PhilosophyCard
            icon={BrainCircuit}
            title="AI & Geophysics Integration"
            description="Fusing foundational geophysics with cutting-edge AI to transform data into actionable insights."
          />
          <PhilosophyCard
            icon={GraduationCap}
            title="Practical, Hands-On Skills"
            description="Emphasizing real-world problem-solving and open-source tool development to prepare students for industry and academia."
          />
          <PhilosophyCard
            icon={Lightbulb}
            title="Fostering Innovation"
            description="Encouraging interdisciplinary thinking and creative solutions for the next generation of geoscience challenges."
          />
        </div>
      </section>

      {/* --- Course Offerings Section --- */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Course Offerings</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <Card className="flex flex-col">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <Cpu className="h-7 w-7 text-brand" />
              <span>AI for Geophysical Exploration</span>
            </h3>
            <span className="mt-2 text-xs font-semibold uppercase text-brand bg-brand-muted dark:bg-gray-800 px-2 py-1 rounded w-fit">
              Graduate Level
            </span>
            <p className="mt-4 text-gray-700 dark:text-gray-300 flex-grow">
              This course covers the practical application of machine learning to enhance geophysical data analysis and interpretation. We move from foundational signal processing to advanced deep learning for electromagnetic (EM) methods.
            </p>
            <div className="mt-6 border-t pt-4 dark:border-gray-800">
              <h4 className="font-semibold">Key Topics Include:</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <TopicItem>Signal Processing for Geophysical Data</TopicItem>
                <TopicItem>Predictive Modeling for Resource Exploration</TopicItem>
                <TopicItem>Deep Learning for EM Inversion</TopicItem>
              </ul>
            </div>
          </Card>
          <Card className="flex flex-col">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <AreaChart className="h-7 w-7 text-brand" />
              <span>Advanced Forecasting with Transformers</span>
            </h3>
             <span className="mt-2 text-xs font-semibold uppercase text-brand bg-brand-muted dark:bg-gray-800 px-2 py-1 rounded w-fit">
              Advanced Seminar
            </span>
            <p className="mt-4 text-gray-700 dark:text-gray-300 flex-grow">
              Focused on the cutting edge of time-series analysis, this course explores the architecture and application of Transformer models. We cover the complete workflow, from building models like TFT/XTFT to rigorously evaluating their performance and uncertainty.
            </p>
             <div className="mt-6 border-t pt-4 dark:border-gray-800">
              <h4 className="font-semibold">Key Topics Include:</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <TopicItem>Temporal Fusion Transformer (TFT/XTFT)</TopicItem>
                <TopicItem>Multi-Horizon Forecasting Techniques</TopicItem>
                <TopicItem>Uncertainty Quantification & Visual Diagnostics</TopicItem>
              </ul>
            </div>
          </Card>
        </div>
      </section>
      
      {/* --- Mentorship Section --- */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Student Research & Mentorship</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Beyond the curriculum, I am dedicated to mentoring undergraduate and master’s students on their research projects. My approach is to guide them in developing innovative solutions that address real-world geophysical problems.
          </p>
          <blockquote className="border-l-4 border-brand pl-4 text-gray-600 dark:text-gray-400 italic">
            "I encourage interdisciplinary thinking, integrating concepts from big data, IoT, and data science to push the boundaries of what's possible in the Earth sciences."
          </blockquote>
        </div>
        <div>
          <Image
            src="/images/teaching.jpeg"
            alt="Students collaborating on a research project"
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
      </section>
    </div>
  );
}

// --- Helper Components for the new design ---

function PhilosophyCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-900/50">
      <div className="inline-block p-3 rounded-full bg-brand-muted dark:bg-gray-800">
        <Icon className="h-8 w-8 text-brand" />
      </div>
      <h3 className="mt-4 text-lg font-bold">{title}</h3>
      <p className="mt-1 text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

function TopicItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <Check className="h-4 w-4 text-green-500" />
      <span>{children}</span>
    </li>
  );
}