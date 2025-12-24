// types/project.ts

export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    category: "uiux" | "graphic" | "art";
}

export interface ProjectIntroductionType {
    client: string;
    industry: string;
    service: string[];
    platform: string;
    myRole: string;
    timeline: string;
}

export interface ProjectHead {
    title: string;
    description: string;
    thumbnail: string;
    category: "uiux" | "graphic" | "art";
}

// Section types
export type SectionType = "text" | "image" | "gallery" | "text-image";

// Gallery image item
export interface GalleryImage {
    url: string;
    alt?: string;
    aspectRatio?: "2/1" | "6/5"; // 2400x1200 hoặc 2400x2000
}

// Project section với các loại content khác nhau
export interface ProjectSection {
    title?: string;
    type: SectionType;
    // For type: "text" | "text-image"
    text?: string;
    // For type: "image" | "text-image"
    image?: string;
    imageAlt?: string;
    imageAspectRatio?: "2/1" | "6/5"; // 2400x1200 hoặc 2400x2000
    // For type: "gallery"
    images?: GalleryImage[];
}

export interface ProjectData {
    head: ProjectHead;
    introduction: ProjectIntroductionType;
    sections: Array<ProjectSection>;
}
