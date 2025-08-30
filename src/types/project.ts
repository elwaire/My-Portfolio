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

export interface ProjectSection {
    id: string;
    title: string;
    text?: string;
    images?: string[];
}

export interface ProjectData {
    head: ProjectHead;
    introduction: ProjectIntroductionType;
    sections: Array<ProjectSection>;
}
