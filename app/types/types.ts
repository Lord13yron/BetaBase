export type Route = {
  id: number;
  created_at: string;
  grade: string;
  name: string;
  gym_id: number;
  video_count: number;
  wall_id: number;
  wall_name: string;
  color: string;

  type?: string;
  gym_name: string;
};

export type ClimbType = "Bouldering" | "Lead" | "Top Rope";

export interface Gym {
  id: number;
  name: string;
  city: string;
  province: string;
  route_count: number;
  video_count: number;
  logo_url: string | null;
  tags: ClimbType[];
  slug: string;
}

export interface Wall {
  id: number;
  name: string;
  gym_id: number;
  description: string;
}

export interface Video {
  id: number;
  route_id: number;
  storage_path: string;
  uploaded_by: string;
  created_at: string;
  thumbnail_url: string | null;
  views: number;
  mux_playback_id: string;
  mux_asset_id: string;
  upload_status: "pending" | "processing" | "ready" | "error";
  duration_seconds: number;
  aspect_ratio: string;
  user_id: string;
}

export interface VideoWithDetails extends Video {
  route_name: string;
  route_grade: string;
  wall_name: string;
  gym_name: string;
  uploaded_by_height?: string;
}

export interface UserProfile {
  id: string;
  avatar_url: string | null;
  full_name?: string;
  username: string;
  email: string;
  home_gym?: string;
  created_at: string;
  height?: string;
  is_superuser: boolean;
}

export interface UserProfileWithCounts extends UserProfile {
  upload_count: number;
  total_views: number;
}

export type Status = "idle" | "checking" | "available" | "taken" | "invalid";
export type Step = "gym" | "wall" | "route";

export interface ContactSubmission {
  id: number;
  created_at: string;
  name: string;
  email: string;
  role: string | null;
  message: string;
  read: boolean;
}

export interface GymAdmin {
  user_id: string;
  gym_id: number;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  gym_name: string;
  gym_slug: string;
  created_at: string;
}
