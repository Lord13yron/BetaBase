import { Suspense } from "react";
import UploadPageContent from "./UploadPageContent";
import { Spinner } from "@/components/ui/spinner";

function UploadPageSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-chalk">
      <Spinner />
      <p className="mt-4 text-gray-500">Loading upload page...</p>
    </div>
  );
}

export default function UploadPageWrapper() {
  return (
    <Suspense fallback={<UploadPageSkeleton />}>
      <UploadPageContent />
    </Suspense>
  );
}
