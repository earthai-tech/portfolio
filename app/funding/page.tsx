import { PageHero } from "@/components/PageHero";
import FundingTable from "@/components/FundingTable";
import FundingTimelineChart from "@/components/FundingTimelineChart"; // Import the new chart

export default function FundingPage() {
  return (
    <div className="space-y-8">
      <PageHero
        title="Funding & Contracts"
        subtitle="Selected grants and industrial contracts across groundwater, EM geophysics, geothermal, and hazard mitigation."
      />
      
      {/* Add the new timeline chart here */}
      <FundingTimelineChart />

      <FundingTable />
    </div>
  );
}