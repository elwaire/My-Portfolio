import type { Project } from "../types/project";

export const getFeaturedProjects = (projects: Project[], count: number = 3): Project[] => {
    return projects.slice(0, count);
};

export const getProjectsByCategory = (projects: Project[], category: string): Project[] => {
    return projects.filter((project) => project.category === category);
};

export const searchProjects = (projects: Project[], searchTerm: string): Project[] => {
    const term = searchTerm.toLowerCase();
    return projects.filter(
        (project) => project.title.toLowerCase().includes(term) || project.description.toLowerCase().includes(term),
    );
};

export const getRandomProjects = (projects: Project[], count: number): Project[] => {
    const shuffled = [...projects].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};
