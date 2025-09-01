// types/about.ts (update to match client structure)
export interface Achievement {
    id: string;
    year: string;
    title: string;
    description: string;
}

export interface TimelineItem {
    id: string;
    period: string;
    role: string;
    company: string;
    description: string;
}

export interface AboutSection {
    id: string;
    title: string;
}

export interface CurrentActivity {
    id: string;
    color: string;
    activity: string;
    type: "work" | "learning"; // Keep type for admin filtering
}

export interface ProfileData {
    name: string;
    title: string;
    image: string; // Changed from avatar to image to match client
    bio: string[]; // Array of bio paragraphs
    skills: string[]; // Skills array
    email?: string; // Optional for backward compatibility
    location?: string; // Optional for backward compatibility
}

export interface AboutData {
    profile: ProfileData;
    achievements: Achievement[];
    timeline: TimelineItem[];
    currentActivities: CurrentActivity[];
}
