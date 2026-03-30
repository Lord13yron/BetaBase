import { getGyms } from "@/lib/data-services";
import GymSectionMainContent from "./gym-section-main-content";

export default async function GymSectionMain() {
  const gyms = await getGyms();
  return <GymSectionMainContent GYMS={gyms} />;
}
