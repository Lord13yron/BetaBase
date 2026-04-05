// "use client";

// import { useState } from "react";
// import WallModal from "./WallModal";
// import RouteModal from "./RouteModal";
// import DeleteModal from "./DeleteModal";
// import { deleteWall, deleteRoute, clearWall } from "./actions";

// interface Wall {
//   id: number;
//   name: string;
//   description: string;
// }

// interface Route {
//   id: number;
//   name: string;
//   grade: string;
//   color: string;
//   type?: string;
//   emoji?: string;
//   wall_id: number;
//   video_count: number;
// }

// type ModalState =
//   | { type: "addWall" }
//   | { type: "editWall"; wall: Wall }
//   | { type: "deleteWall"; wall: Wall }
//   | { type: "addRoute"; wallId: number }
//   | { type: "editRoute"; route: Route }
//   | { type: "deleteRoute"; route: Route }
//   | { type: "clearWall"; wall: Wall }
//   | null;

// interface Props {
//   gymId: number;
//   gymSlug: string;
//   walls: Wall[];
//   routes: Route[];
// }

// export default function WallsPanel({ gymId, gymSlug, walls, routes }: Props) {
//   const [expandedWalls, setExpandedWalls] = useState<Set<number>>(new Set());
//   const [modal, setModal] = useState<ModalState>(null);

//   const toggleWall = (wallId: number) => {
//     setExpandedWalls((prev) => {
//       const next = new Set(prev);
//       // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//       next.has(wallId) ? next.delete(wallId) : next.add(wallId);
//       return next;
//     });
//   };

//   const routesForWall = (wallId: number) =>
//     routes.filter((r) => r.wall_id === wallId);

//   return (
//     <>
//       <div className="space-y-3">
//         <div className="flex items-center justify-between mb-2">
//           <h2 className="font-mono text-xs text-stone tracking-widest uppercase">
//             Walls & Routes
//           </h2>
//           <button
//             onClick={() => setModal({ type: "addWall" })}
//             className="bg-clay text-white font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-lg hover:bg-clay/90 transition-colors"
//           >
//             + Add Wall
//           </button>
//         </div>

//         {walls.length === 0 ? (
//           <div className="border border-dashed border-fog rounded-lg py-20 text-center">
//             <p className="font-mono text-stone text-sm">No walls yet.</p>
//             <p className="font-mono text-stone/60 text-xs mt-1">
//               Add your first wall to get started.
//             </p>
//           </div>
//         ) : (
//           walls.map((wall) => {
//             const wallRoutes = routesForWall(wall.id);
//             const isExpanded = expandedWalls.has(wall.id);

//             return (
//               <div
//                 key={wall.id}
//                 className="bg-white border border-fog rounded-lg overflow-hidden"
//               >
//                 <div
//                   className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-chalk/50 transition-colors"
//                   onClick={() => toggleWall(wall.id)}
//                 >
//                   <div className="flex items-center gap-3">
//                     <span className="text-stone text-xs font-mono">
//                       {isExpanded ? "▾" : "▸"}
//                     </span>
//                     <span className="font-mono text-sm text-granite font-medium">
//                       {wall.name}
//                     </span>
//                     <span className="font-mono text-xs text-stone/60 hidden sm:inline">
//                       {wallRoutes.length} route
//                       {wallRoutes.length !== 1 ? "s" : ""}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setModal({ type: "addRoute", wallId: wall.id });
//                       }}
//                       className="font-mono text-xs text-clay tracking-wide hover:text-clay/70 transition-colors px-3 py-1 border border-clay/30 rounded hover:border-clay/60"
//                     >
//                       + Add Route
//                     </button>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setModal({ type: "clearWall", wall });
//                       }}
//                       className="font-mono text-xs text-stone/50 hover:text-amber-500 transition-colors px-2 py-1"
//                     >
//                       Clear
//                     </button>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setModal({ type: "editWall", wall });
//                       }}
//                       className="font-mono text-xs text-stone hover:text-granite transition-colors px-2 py-1"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setModal({ type: "deleteWall", wall });
//                       }}
//                       className="font-mono text-xs text-stone/50 hover:text-red-400 transition-colors px-2 py-1"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>

//                 {isExpanded && (
//                   <div className="border-t border-fog">
//                     {wallRoutes.length === 0 ? (
//                       <div className="px-5 py-6 text-center">
//                         <p className="font-mono text-xs text-stone/50">
//                           No routes on this wall yet.
//                         </p>
//                       </div>
//                     ) : (
//                       <div className="divide-y divide-fog">
//                         {wallRoutes.map((route) => (
//                           <div
//                             key={route.id}
//                             className="flex items-center justify-between px-5 py-3"
//                           >
//                             <div className="flex items-center gap-3">
//                               <div
//                                 className="w-3 h-3 rounded-full flex-shrink-0 border border-black/10"
//                                 style={{
//                                   backgroundColor: route.color || "#8C7B6B",
//                                 }}
//                               />
//                               <span className="font-mono text-xs text-clay font-medium w-10">
//                                 {route.grade}
//                               </span>
//                               <span className="font-mono text-sm text-granite">
//                                 {route.emoji && (
//                                   <span className="mr-1">{route.emoji}</span>
//                                 )}
//                                 {route.name}
//                               </span>
//                               {route.type && (
//                                 <span className="font-mono text-xs text-stone/50 tracking-wide">
//                                   {route.type}
//                                 </span>
//                               )}
//                             </div>
//                             <div className="flex items-center gap-4">
//                               <span className="font-mono text-xs text-stone/50">
//                                 {route.video_count ?? 0} video
//                                 {route.video_count !== 1 ? "s" : ""}
//                               </span>
//                               <button
//                                 onClick={() =>
//                                   setModal({ type: "editRoute", route })
//                                 }
//                                 className="font-mono text-xs text-stone hover:text-granite transition-colors"
//                               >
//                                 Edit
//                               </button>
//                               <button
//                                 onClick={() =>
//                                   setModal({ type: "deleteRoute", route })
//                                 }
//                                 className="font-mono text-xs text-stone/50 hover:text-red-400 transition-colors"
//                               >
//                                 Delete
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             );
//           })
//         )}
//       </div>

//       {/* Modals */}
//       {modal?.type === "addWall" && (
//         <WallModal
//           gymId={gymId}
//           gymSlug={gymSlug}
//           onClose={() => setModal(null)}
//         />
//       )}
//       {modal?.type === "editWall" && (
//         <WallModal
//           gymId={gymId}
//           gymSlug={gymSlug}
//           wall={modal.wall}
//           onClose={() => setModal(null)}
//         />
//       )}
//       {modal?.type === "deleteWall" && (
//         <DeleteModal
//           title="Delete Wall"
//           description={`Delete "${modal.wall.name}"? This will permanently delete the wall and all of its routes. This cannot be undone.`}
//           onConfirm={() => deleteWall(gymId, gymSlug, modal.wall.id)}
//           onClose={() => setModal(null)}
//         />
//       )}
//       {modal?.type === "addRoute" && (
//         <RouteModal
//           gymId={gymId}
//           gymSlug={gymSlug}
//           walls={walls}
//           defaultWallId={modal.wallId}
//           onClose={() => setModal(null)}
//         />
//       )}
//       {modal?.type === "editRoute" && (
//         <RouteModal
//           gymId={gymId}
//           gymSlug={gymSlug}
//           walls={walls}
//           route={modal.route}
//           onClose={() => setModal(null)}
//         />
//       )}
//       {modal?.type === "deleteRoute" && (
//         <DeleteModal
//           title="Delete Route"
//           description={`Delete "${modal.route.name}"? All beta videos for this route will also be deleted. This cannot be undone.`}
//           onConfirm={() => deleteRoute(gymId, gymSlug, modal.route.id)}
//           onClose={() => setModal(null)}
//         />
//       )}
//       {modal?.type === "clearWall" && (
//         <DeleteModal
//           title="Clear Wall"
//           description={`Remove all routes from "${modal.wall.name}"? The wall will remain but all of its routes will be permanently deleted. This cannot be undone.`}
//           onConfirm={() => clearWall(gymId, gymSlug, modal.wall.id)}
//           onClose={() => setModal(null)}
//         />
//       )}
//     </>
//   );
// }

"use client";

import { useState } from "react";
import WallModal from "./WallModal";
import RouteModal from "./RouteModal";
import DeleteModal from "./DeleteModal";
import { deleteWall, deleteRoute, clearWall } from "./actions";
import VideosModal from "./VideosModal";

interface Wall {
  id: number;
  name: string;
  description: string;
}

interface Route {
  id: number;
  name: string;
  grade: string;
  color: string;
  type?: string;
  emoji?: string;
  wall_id: number;
  video_count: number;
}

type ModalState =
  | { type: "addWall" }
  | { type: "editWall"; wall: Wall }
  | { type: "deleteWall"; wall: Wall }
  | { type: "addRoute"; wallId: number }
  | { type: "editRoute"; route: Route }
  | { type: "deleteRoute"; route: Route }
  | { type: "clearWall"; wall: Wall }
  | { type: "manageVideos"; route: Route }
  | null;

interface Props {
  gymId: number;
  gymSlug: string;
  walls: Wall[];
  routes: Route[];
}

export default function WallsPanel({ gymId, gymSlug, walls, routes }: Props) {
  const [expandedWalls, setExpandedWalls] = useState<Set<number>>(new Set());
  const [modal, setModal] = useState<ModalState>(null);

  const toggleWall = (wallId: number) => {
    setExpandedWalls((prev) => {
      const next = new Set(prev);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      next.has(wallId) ? next.delete(wallId) : next.add(wallId);
      return next;
    });
  };

  const routesForWall = (wallId: number) =>
    routes.filter((r) => r.wall_id === wallId);

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-mono text-xs text-stone tracking-widest uppercase">
            Walls & Routes
          </h2>
          <button
            onClick={() => setModal({ type: "addWall" })}
            className="bg-clay text-white font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-lg hover:bg-clay/90 transition-colors"
          >
            + Add Wall
          </button>
        </div>

        {walls.length === 0 ? (
          <div className="border border-dashed border-fog rounded-lg py-20 text-center">
            <p className="font-mono text-stone text-sm">No walls yet.</p>
            <p className="font-mono text-stone/60 text-xs mt-1">
              Add your first wall to get started.
            </p>
          </div>
        ) : (
          walls.map((wall) => {
            const wallRoutes = routesForWall(wall.id);
            const isExpanded = expandedWalls.has(wall.id);

            return (
              <div
                key={wall.id}
                className="bg-white border border-fog rounded-lg overflow-hidden"
              >
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-chalk/50 transition-colors"
                  onClick={() => toggleWall(wall.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-stone text-xs font-mono">
                      {isExpanded ? "▾" : "▸"}
                    </span>
                    <span className="font-mono text-sm text-granite font-medium">
                      {wall.name}
                    </span>
                    <span className="font-mono text-xs text-stone/60 hidden sm:inline">
                      {wallRoutes.length} route
                      {wallRoutes.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setModal({ type: "addRoute", wallId: wall.id });
                      }}
                      className="font-mono text-xs text-clay tracking-wide hover:text-clay/70 transition-colors px-3 py-1 border border-clay/30 rounded hover:border-clay/60"
                    >
                      + Add Route
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setModal({ type: "clearWall", wall });
                      }}
                      className="font-mono text-xs text-stone/50 hover:text-amber-500 transition-colors px-2 py-1"
                    >
                      Clear
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setModal({ type: "editWall", wall });
                      }}
                      className="font-mono text-xs text-stone hover:text-granite transition-colors px-2 py-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setModal({ type: "deleteWall", wall });
                      }}
                      className="font-mono text-xs text-stone/50 hover:text-red-400 transition-colors px-2 py-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-fog">
                    {wallRoutes.length === 0 ? (
                      <div className="px-5 py-6 text-center">
                        <p className="font-mono text-xs text-stone/50">
                          No routes on this wall yet.
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y divide-fog">
                        {wallRoutes.map((route) => (
                          <div
                            key={route.id}
                            className="flex items-center justify-between px-5 py-3"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="w-3 h-3 rounded-full flex-shrink-0 border border-black/10"
                                style={{
                                  backgroundColor: route.color || "#8C7B6B",
                                }}
                              />
                              <span className="font-mono text-xs text-clay font-medium w-10">
                                {route.grade}
                              </span>
                              <span className="font-mono text-sm text-granite">
                                {route.name}
                              </span>
                              {route.type && (
                                <span className="font-mono text-xs text-stone/50 tracking-wide">
                                  {route.type}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() =>
                                  setModal({ type: "manageVideos", route })
                                }
                                className="font-mono text-xs text-stone/50 hover:text-clay transition-colors"
                              >
                                {route.video_count ?? 0} video
                                {route.video_count !== 1 ? "s" : ""}
                              </button>
                              <button
                                onClick={() =>
                                  setModal({ type: "editRoute", route })
                                }
                                className="font-mono text-xs text-stone hover:text-granite transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  setModal({ type: "deleteRoute", route })
                                }
                                className="font-mono text-xs text-stone/50 hover:text-red-400 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modals */}
      {modal?.type === "addWall" && (
        <WallModal
          gymId={gymId}
          gymSlug={gymSlug}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "editWall" && (
        <WallModal
          gymId={gymId}
          gymSlug={gymSlug}
          wall={modal.wall}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "deleteWall" && (
        <DeleteModal
          title="Delete Wall"
          description={`Delete "${modal.wall.name}"? This will permanently delete the wall and all of its routes. This cannot be undone.`}
          onConfirm={() => deleteWall(gymId, gymSlug, modal.wall.id)}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "addRoute" && (
        <RouteModal
          gymId={gymId}
          gymSlug={gymSlug}
          walls={walls}
          defaultWallId={modal.wallId}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "editRoute" && (
        <RouteModal
          gymId={gymId}
          gymSlug={gymSlug}
          walls={walls}
          route={modal.route}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "deleteRoute" && (
        <DeleteModal
          title="Delete Route"
          description={`Delete "${modal.route.name}"? All beta videos for this route will also be deleted. This cannot be undone.`}
          onConfirm={() => deleteRoute(gymId, gymSlug, modal.route.id)}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "clearWall" && (
        <DeleteModal
          title="Clear Wall"
          description={`Remove all routes from "${modal.wall.name}"? The wall will remain but all of its routes will be permanently deleted. This cannot be undone.`}
          onConfirm={() => clearWall(gymId, gymSlug, modal.wall.id)}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "manageVideos" && (
        <VideosModal
          gymId={gymId}
          gymSlug={gymSlug}
          route={modal.route}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
