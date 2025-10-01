import { PageHero } from "@/components/PageHero";
import { SocialLinks } from "@/components/SocialLinks";
import ByTheNumbers from "@/components/ByTheNumbers";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <PageHero
        title="About Laurent Kouadio"
        subtitle="Faculty researcher and lecturer in AI-in-Geophysics, developing physics-informed ML and open tools for subsurface exploration and environmental resilience."
        aside={
          <div className="p-[3px] rounded-full bg-gradient-to-tr from-brand to-rose-500 shadow-xl">
            <div className="rounded-full bg-white p-1">
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
        <SocialLinks className="mt-4" />
      </PageHero>
      
      <ByTheNumbers />
      
      {/* Doctorate */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Doctorate in China & Advanced Research (2018–2022)</h2>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          In October 2018 I began my Ph.D. at the prestigious{" "}
          <Link href="https://www.zju.edu.cn/" target="_blank" className="underline text-brand">Zhejiang University</Link> (Hangzhou, China).
          My research aimed to optimize potable-water exploration by coupling electromagnetic methods with
          machine learning. In 2022 I earned the Ph.D. degree with <em>Summa Cum Laude (Excellent)</em>,
          following an outstanding thesis evaluation (four A+ and one A−).
        </p>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          This work laid the groundwork for new approaches in computational geophysics that combine physical
          modeling and modern ML—foundations I continue to extend today.
        </p>
      </section>

      {/* Postdoc */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Postdoctoral Pathway (2022–2024)</h2>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          From 2022 I joined{" "}
          <Link href="https://en.csu.edu.cn/" target="_blank" className="underline text-brand">
            Central South University
          </Link>{" "}
          (Changsha, Hunan) for a postdoctoral fellowship—an inflection point for my work at the interface
          of geophysics and applied AI. During this period I published <strong>7 SCI-indexed papers</strong>
          in journals such as <em>Computers & Geosciences</em>, <em>Journal of Environmental Management</em>,
          <em>Geophysics</em>, and <em>Earth Science Informatics</em>, highlighting advanced modeling and
          ML for major geophysical challenges.
        </p>
      </section>

      {/* Projects & leadership */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Research Leadership & Large-Scale Projects</h2>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          As the deputy lead of the Geoscience Big-Data Laboratory, I helped deliver{" "}
          <strong>10 research projects (2022–2024)</strong>—governmental and academic—funded by bodies
          including provincial agencies and the National Natural Science Foundation of China.
          Topics spanned underground fracture detection, geothermal reservoir identification, and urban land-subsidence forecasting.
          Our team is currently advancing <strong>4 additional projects</strong> that leverage AI for numerical
          simulation, landslides, and soil-subsidence hazards.
        </p>
      </section>

      {/* Recognition */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Recognition & International Impact</h2>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          In 2023 my presentation on subsurface fracture detection and geothermal targeting received the
          <strong> Best Presentation Report</strong> at a major international conference in environmental and engineering geophysics.
        </p>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          In May 2024, I served as a session chair and gave the opening address at the{" "}
          <strong>International Workshop on Gravity, Electrical, and Electromagnetic Methods (GEM)</strong> in Shenzhen, China.
          My talk—<em>“AI in GEM, What’s Next?”</em>—highlighted pathways for integrating AI with traditional geophysical methods.
        </p>
      </section>

      {/* Responsibility & Teaching */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Leadership, Responsibility & Teaching</h2>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          Following these recognitions, I was entrusted with leading the <strong>AI workstream</strong> of a
          strategic megaproject on land-subsidence prevention in the Greater Bay Area (Guangzhou–Hong Kong–Macao).
          I subsequently served as <strong>Project Lead, AI in Geophysics Research</strong> at the
          Hunan Key Laboratory of Non-ferrous Resources and Geological Hazards Detection.
        </p>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          In June 2024 I was appointed <strong>Lecturer</strong> at Central South University, where I teach
          AI for Geophysics to undergraduate and master’s students and mentor research projects.
        </p>
      </section>

      {/* Publications */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Publications & Recent Submissions</h2>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          To date I have authored <strong>20+</strong> publications in international venues. In September 2025 I submitted:
          <br/>• <em>Forecasting Urban Land Subsidence in the Era of Rapid Urbanization and Climate Stress</em> (to <strong>Nature Communications</strong>);
          <br/>• <em>A Next-Generation Temporal Fusion Transformer for Uncertainty-Rich Time Series Forecasting</em> (to <strong>IEEE TPAMI</strong>).
        </p>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          See selected papers on the{" "}
          <Link href="/publications" className="underline text-brand">Publications</Link> page.
        </p>
      </section>

      {/* Forward-looking: Lunar titanium */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Forward-Looking: Toward Lunar Titanium Prospecting</h2>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          Since April 2025 I have been involved in an international initiative exploring <strong>titanium resources on the Moon</strong>,
          supported by expert communities linked with{" "}
          <Link href="https://www.nasa.gov" target="_blank" className="underline text-brand">NASA</Link>,{" "}
          <Link href="https://global.jaxa.jp" target="_blank" className="underline text-brand">JAXA</Link>, and{" "}
          <Link href="http://www.cnsa.gov.cn" target="_blank" className="underline text-brand">CNSA</Link>.
          At the 17th “AI & Big Data in Space and Earth Sciences” conference (Changsha, 25 Apr 2025),
          I presented an electromagnetics-based strategy that exploits data from <em>Chang’e-3</em> and <em>Apollo 17</em>.
        </p>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          Unlike shallow ground-penetrating radar, EM sensing can probe deeper regolith.
          I also introduced hybrid learning strategies (MXS) and{" "}
          <em>physics-informed neural networks</em> (PINNs) to overcome lunar data scarcity.
          While early, this line of work opens promising avenues; a detailed manuscript is in preparation.
        </p>
      </section>

      {/* Memberships */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Professional Memberships</h2>
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          Active member of the{" "}
          <Link href="https://www.seg.org" target="_blank" className="underline text-brand">Society of Exploration Geophysicists (SEG)</Link> (2023),
          the{" "}
          <Link href="https://www.iamg.org" target="_blank" className="underline text-brand">International Association for Mathematical Geosciences (IAMG)</Link> (2024),
          and the{" "}
          <Link href="https://www.aaai.org" target="_blank" className="underline text-brand">Association for the Advancement of Artificial Intelligence (AAAI)</Link> (Nov 2024).
          Through these communities I help bridge fundamental research, industry applications, and societal needs.
        </p>
      </section>

      {/* Affiliation note */}
      <section className="space-y-3">
        <p className="leading-relaxed text-gray-700 dark:text-gray-300">
          I collaborate with the School of Geosciences and Info-physics at{" "}
          <Link href="https://en.csu.edu.cn/" target="_blank" className="underline text-brand">Central South University</Link> (Hunan, China) and the
          Laboratory of Geology, Mineral Resources and Energy (LGRME) at{" "}
          <Link href="https://w.univ-fhb.edu.ci/" target="_blank" className="underline text-brand">Félix Houphouët-Boigny University</Link> (Abidjan, Côte d’Ivoire).
        </p>
      </section>
    </div>
  );
}
