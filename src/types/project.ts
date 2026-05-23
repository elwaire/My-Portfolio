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
    projectLink?: string;
}

// Section types
export type SectionType = "text" | "image" | "gallery" | "text-image";

// Gallery image item
export interface GalleryImage {
    url: string;
    alt?: string;
    aspectRatio?: "2/1" | "6/5"; // 2400x1200 hoặc 2400x2000
}

// Định nghĩa cấu trúc từng dòng văn bản trong Text block
export interface ParagraphItem {
    type?: "paragraph" | "list" | "subtitle"; // Thêm type "subtitle" cho tiêu đề nhỏ (tùy chọn)
    content: string;
}

// Project section với các loại content khác nhau
export interface ProjectSection {
    title?: string;
    isSubSection?: boolean; // Thêm trường đánh dấu là Section con (tùy chọn)
    type: SectionType;
    // For type: "text" | "text-image"
    text?: string;
    textStyle?: "paragraph" | "list" | "mixed";
    paragraphs?: ParagraphItem[];
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
    projectLink?: string;
}
