import { Suspense } from "react";
import SearchResults from "./SearchResults"; 

export default function SearchPage() {
  return (
    // Wrap the client component that uses the hook
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchResults />
    </Suspense>
  );
}