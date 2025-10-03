import fs from "fs";
import path from "path";
import { PageHero } from "@/components/PageHero";
import allSoftware from "@/data/software.json";
import SoftwareList, { type Item } from "@/components/SoftwareList"; 
import { Search } from 'lucide-react';

// This function runs on the server to get the list of logo files
function getAvailableLogos(): string[] {
  try {
    // Corrected path to your logos directory
    const logosDirectory = path.join(process.cwd(), "public/images/software");
    const filenames = fs.readdirSync(logosDirectory);
    // Filter for only .svg and .png files
    return filenames.filter(
      (file) => file.endsWith(".svg") || file.endsWith(".png")
    );
  } catch (error) {
    console.error("Could not read logos directory:", error);
    return []; // Return an empty array if the directory doesn't exist
  }
}

// This is now a Server Component
export default function SoftwarePage() {
  const availableLogos = getAvailableLogos();

  return (
    <div className="space-y-8">
      <PageHero
        title="Software & Tooling"
        subtitle="My open-source projects for forecasting, uncertainty diagnostics, and hydro-/geo-physics."
      >
        {/* The search input is now visually part of the hero, but its logic is in the client component */}
         <div className="relative mt-4 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
            className="w-full rounded-lg border bg-gray-50 dark:bg-gray-900/50 py-2 pl-9 pr-3 text-sm focus:border-brand focus:ring-brand/50"
            placeholder="Search by name or tag..."
            disabled // The actual input is handled by the client component, this is for layout
            />
        </div>
      </PageHero>

      {/* Render the client component with the necessary data */}
      <SoftwareList allSoftware={allSoftware as Item[]} availableLogos={availableLogos} />
    </div>
  );
}