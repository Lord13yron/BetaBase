import { Suspense } from "react";
import UploadPageContent from "./UploadPageContent";

export default function UploadPageWrapper() {
  return (
    <Suspense>
      <UploadPageContent />
    </Suspense>
  );
}
