import { PageHero } from "@/components/PageHero";

export default function CVPage() {
  return (
    <div className="space-y-8">
      <PageHero
        title="CV"
        subtitle="Download a recent copy of my CV."
      />
      <p>
        Add your PDF to <code>/public/cv.pdf</code> and it will be linked here.
      </p>
      <a className="badge" href="/cv.pdf" target="_blank" rel="noreferrer">
        Download CV (PDF)
      </a>
    </div>
  );
}
