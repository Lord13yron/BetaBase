// import GymsClient from "@/components/GymsClient";
// import GymsContentSkeleton from "@/components/GymsContentSkeleton";
// import { getGyms } from "@/lib/data-services";

// import { Suspense } from "react";

// async function GymsContent() {
//   const gyms = await getGyms();
//   return <GymsClient gyms={gyms} />;
// }

// export default function GymsPage() {
//   return (
//     <div className="min-h-screen bg-chalk">
//       {/* Header */}
//       <div className="px-10 pt-14">
//         <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-stone mb-3">
//           — Find Your Gym
//         </p>
//         <h1 className="font-serif text-5xl leading-tight text-granite max-w-xl mb-2">
//           Every gym. <span className="italic text-clay">Every route.</span>
//         </h1>
//         <p className="font-mono font-light text-sm text-stone leading-relaxed max-w-md">
//           Select a gym to browse community-uploaded beta videos for every climb.
//         </p>
//       </div>

//       <Suspense fallback={<GymsContentSkeleton />}>
//         <GymsContent />
//       </Suspense>
//     </div>
//   );
// }

import GymsClient from "@/components/GymsClient";

import { getGyms } from "@/lib/data-services";

export default async function GymsPage() {
  const gyms = await getGyms();
  return (
    <div className="min-h-screen bg-chalk">
      {/* Header */}
      <div className="px-10 pt-14">
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-stone mb-3">
          — Find Your Gym
        </p>
        <h1 className="font-serif text-5xl leading-tight text-granite max-w-xl mb-2">
          Every gym. <span className="italic text-clay">Every route.</span>
        </h1>
        <p className="font-mono font-light text-sm text-stone leading-relaxed max-w-md">
          Select a gym to browse community-uploaded beta videos for every climb.
        </p>
      </div>

      <GymsClient gyms={gyms} />
    </div>
  );
}
