import { PageHero } from "@/components/PageHero";
import FundingTable from "@/components/FundingTable";

export default function FundingPage() {
  return (
    <div className="space-y-8">
      <PageHero
        title="Funding & Contracts"
        subtitle="Selected grants and industrial contracts across groundwater, EM geophysics, geothermal, and hazard mitigation."
      />
      <FundingTable />
    </div>
  );
}
