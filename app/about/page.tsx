import fs from "fs";
import path from "path";
import { PageHero } from "@/components/PageHero";
import { SocialLinks } from "@/components/SocialLinks";
import ByTheNumbers from "@/components/ByTheNumbers";
import { Card } from "@/components/Card";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Briefcase,
  School,
  Sparkles,
  Atom,
  Cpu,
  AreaChart,
  Leaf,
  Globe,
  Building
} from "lucide-react";

function getAvailableLogos(): string[] {
  try {
    const logosDirectory = path.join(process.cwd(), "public/images/logos");
    return fs.readdirSync(logosDirectory);
  } catch (error) {
    console.error("Could not read logos directory:", error);
    return [];
  }
}

const affiliations = [
  { name: 'Central South University', url: 'https://en.csu.edu.cn/', key: 'csu' },
  { name: 'Félix Houphouët-Boigny University', url: 'https://w.univ-fhb.edu.ci/', key: 'u-fhb' }
];
const memberships = [
  { name: 'Society of Exploration Geophysicists (SEG)', url: 'https://www.seg.org', key: 'seg' },
  { name: 'Intl. Association for Mathematical Geosciences (IAMG)', url: 'https://www.iamg.org', key: 'iamg' },
  { name: 'Association for the Advancement of AI (AAAI)', url: 'https://www.aaai.org', key: 'aaai' }
];
// [NEW] Data for the timeline, now including URLs and logo keys
const timelineData = [
    {
    icon: School,
    title: "Faculty Researcher | Lecturer in AI in Geophysics",
    subtitle: "Central South University (2024 – Present)",
    text: "One of the most meaningful parts of my career began in June 2024, when I was appointed to a faculty role. I now teach 'AI for Geophysics' to undergraduate and master’s students and have the privilege of mentoring their research projects, bridging the gap between academic theory and real-world application.",
    url: 'https://en.csu.edu.cn/',
    logoKey: 'csu'
  },
  {
    icon: Globe,
    title: "International Collaborator",
    subtitle: "Lunar Resource Initiative (2025 – Present)",
    children: (
      <p className="mt-2 text-gray-700 dark:text-gray-300">
        While my work is grounded in terrestrial challenges, I'm also passionate about the next frontier. I'm part of an international initiative to explore titanium resources on the Moon, collaborating with communities linked to{" "}
        <a href="https://www.nasa.gov" target="_blank" rel="noopener noreferrer" className="text-brand underline">NASA</a>,{" "}
        <a href="https://global.jaxa.jp" target="_blank" rel="noopener noreferrer" className="text-brand underline">JAXA</a>, and{" "}
        <a href="http://www.cnsa.gov.cn/english/" target="_blank" rel="noopener noreferrer" className="text-brand underline">CNSA</a>. My focus is on using deep electromagnetic sensing and PINNs to overcome lunar data scarcity.
      </p>
    )
  },
    {
    icon: Briefcase,
    title: "Postdoctoral Fellow",
    subtitle: "Central South University (2022 – 2024)",
    text: "As a postdoctoral fellow, I fully immersed myself at the interface of geophysics and applied AI. This was an intense period of research and collaboration, during which I contributed seven papers to leading SCI-indexed journals and took on leadership roles, including deputy lead of the Geoscience Big-Data Laboratory.",
    url: 'https://en.csu.edu.cn/',
    logoKey: 'csu'
  },
  {
    icon: GraduationCap,
    title: "Doctoral Researcher",
    subtitle: "Zhejiang University (2018 – 2022)",
    text: "My academic journey in China began with a Ph.D. focused on a critical challenge: finding reliable sources of potable water. I explored how coupling electromagnetic methods with machine learning could lead to better exploration strategies. This work culminated in a Ph.D. awarded with Summa Cum Laude honors and laid the foundation for my current research.",
    url: 'https://www.zju.edu.cn/english/',
    logoKey: 'zju'
  }
];

export default function AboutPage() {
  const availableLogos = getAvailableLogos();

  return (
    <div className="space-y-12">
      <PageHero
        title="About Me"
        subtitle="I'm a researcher and educator at the intersection of AI and geophysics, dedicated to building open-source tools that help us understand and protect our planet."
        aside={
          <div className="p-1 rounded-full bg-gradient-to-tr from-brand to-rose-500 shadow-xl">
            <div className="rounded-full bg-white dark:bg-gray-900 p-1">
              <Image
                src="/laurent.jpg" alt="Laurent Kouadio" width={220} height={220}
                className="rounded-full object-cover shadow-md" priority
              />
            </div>
          </div>
        }
      >
        <SocialLinks className="mt-4" />
      </PageHero>

      <Card>
        <div className="flex items-center gap-4">
          <Sparkles className="h-8 w-8 text-amber-500" />
          <h2 className="text-2xl font-bold">My Journey in a Nutshell</h2>
        </div>
        <div className="prose prose-lg dark:prose-invert mt-4 max-w-none">
          <p>
            As a Lecturer in "AI in Geophysics" and a developer of cutting-edge tools, my passion lies at the crossroads of computer science and Earth science. My research, which began during my Ph.D. at <a href="https://www.zju.edu.cn/english/" target="_blank" rel="noopener noreferrer">Zhejiang University</a>, is centered on a single mission: to build intelligent systems that solve real-world geophysical challenges.
          </p>
          <p>
            Today, I collaborate with teams at <a href="https://en.csu.edu.cn/" target="_blank" rel="noopener noreferrer">Central South University</a> and <a href="https://w.univ-fhb.edu.ci/" target="_blank" rel="noopener noreferrer">Félix Houphouët-Boigny University</a> to develop AI-powered strategies for deep resource exploration (like groundwater and minerals) and to monitor critical environmental systems, tackling everything from urban land subsidence to mine water management.
          </p>
        </div>
      </Card>
      
      <ByTheNumbers />

      {/* --- Career Timeline --- */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-8">Career Path</h2>
        <div className="space-y-8">
          {/* [MODIFIED] Mapped over data array to render items in descending order */}
          {timelineData.map((item, index) => (
            <TimelineItem
              key={item.title}
              {...item}
              availableLogos={availableLogos}
              isLast={index === timelineData.length - 1}
            />
          ))}
        </div>
      </section>
      
      {/* --- Affiliations & Memberships --- */}
      <section>
         <h2 className="text-2xl font-bold text-center mb-8">Affiliations & Memberships</h2>
         <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2"><Building className="h-5 w-5 text-brand" /> Current Affiliations</h3>
              <div className="mt-4 space-y-2">
                {/* [FIX] Pass props explicitly to resolve React key warning */}
                {affiliations.map(item => (
                  <AffiliationLink
                    key={item.key}
                    itemKey={item.key}
                    name={item.name}
                    url={item.url}
                    availableLogos={availableLogos}
                  />
                ))}
              </div>
            </div>
             <div>
              <h3 className="text-lg font-semibold flex items-center gap-2"><Sparkles className="h-5 w-5 text-brand" /> Professional Memberships</h3>
              <div className="mt-4 space-y-2">
                {memberships.map(item => (
                   <AffiliationLink
                     key={item.key}
                     itemKey={item.key}
                     name={item.name}
                     url={item.url}
                     availableLogos={availableLogos}
                   />
                ))}
              </div>
            </div>
         </div>
      </section>
    </div>
  );
}

// --- Helper Components ---

function ExpertiseCard({ icon: Icon, title }: { icon: React.ElementType, title: string }) { /* ... */ }

// [FIX & IMPROVEMENT] Rebuilt TimelineItem for robustness and to include logos
function TimelineItem({ icon: Icon, title, subtitle, text, children, url, logoKey, availableLogos, isLast = false }: any) {
  const logoFile = availableLogos.find((file: string) => file.startsWith(logoKey + '.'));
  const logoSrc = logoFile ? `/images/logos/${logoFile}` : null;

  return (
    <div className="relative pl-16">
      {/* Icon and vertical line */}
      <div className="absolute left-0 top-0 flex h-full flex-col items-center">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-muted dark:bg-gray-800">
          <Icon className="h-6 w-6 text-brand" />
        </div>
        {!isLast && <div className="mt-2 w-0.5 flex-grow bg-gray-200 dark:bg-gray-800" />}
      </div>

      {/* Content */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-grow">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="font-medium text-brand">{subtitle}</p>
          {text && <p className="mt-2 text-gray-700 dark:text-gray-300">{text}</p>}
          {children}
        </div>
        {logoSrc && url && (
          <Link href={url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
            <Image
              src={logoSrc}
              alt={`${subtitle} logo`}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-contain bg-white transition-transform group-hover:scale-105"
            />
          </Link>
        )}
      </div>
    </div>
  );
}

function AffiliationLink({ name, url, itemKey, availableLogos }: { name: string, url: string, itemKey: string, availableLogos: string[] }) {
  const logoFile = availableLogos.find(file => file.startsWith(itemKey + '.'));
  const logoSrc = logoFile ? `/images/logos/${logoFile}` : null;

  return (
    <Link href={url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      {logoSrc ? (
        <Image
          src={logoSrc}
          alt={`${name} logo`}
          width={40}
          height={40}
          className="h-10 w-10 flex-shrink-0 rounded-full object-contain bg-white"
        />
      ) : (
        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100 dark:bg-gray-800" />
      )}
      <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-brand transition-colors">{name}</span>
    </Link>
  );
}