import { useState, useMemo } from "react";
import { CATEGORIES } from "../constants/categories";
import type { Project } from "../types/project";

type Category = keyof typeof CATEGORIES | "all";

export const useProjectFilter = (projects: Project[]) => {
    const [activeCategory, setActiveCategory] = useState<Category>("all");

    // Memoized filtered projects
    const filteredProjects = useMemo(() => {
        if (activeCategory === "all") return projects;
        return projects.filter((project) => project.category === activeCategory);
    }, [projects, activeCategory]);

    // Memoized project counts
    const projectCounts = useMemo(() => {
        const counts = {
            all: projects.length,
            uiux: 0,
            graphic: 0,
            art: 0,
        } as Record<Category, number>;

        projects.forEach((project) => {
            counts[project.category]++;
        });

        return counts;
    }, [projects]);

    return {
        activeCategory,
        setActiveCategory,
        filteredProjects,
        projectCounts,
    };
};
