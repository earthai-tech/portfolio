import { PageHero } from "@/components/PageHero";
import FundingTable from "@/components/FundingTable";
import FundingTimelineChart from "@/components/FundingTimelineChart";
import { Suspense } from "react"; 

export default function FundingPage() {
  return (
    <div className="space-y-8">
      <PageHero
        title="Funding & Contracts"
        subtitle="Selected grants and industrial contracts across groundwater, EM geophysics, geothermal, and hazard mitigation."
      />
      
      <FundingTimelineChart />

      {/* 2. Wrap the dynamic component in Suspense */}
      <Suspense fallback={<div>Loading table...</div>}>
        <FundingTable />
      </Suspense>
    </div>
  );
}