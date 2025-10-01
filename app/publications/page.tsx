import { PageHero } from "@/components/PageHero";
import PublicationList from "@/components/PublicationList";

export default function PublicationsPage() {
  return (
    <div className="space-y-8">
      <PageHero
        title="Publications"
        subtitle="Selected work and recent papers. Use the filter to search by year, tag, or author."
      />
      <PublicationList />
    </div>
  );
}
