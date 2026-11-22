import { Suspense } from "react";
import ServicesContent from "./ServicesContent";

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-xl font-semibold">Loading services...</p>
        </div>
      }
    >
      <ServicesContent />
    </Suspense>
  );
}