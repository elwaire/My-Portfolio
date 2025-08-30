// hooks/useProjects.ts
import { useState, useEffect, useCallback, useMemo } from "react";
import { projectService } from "../services/projectService";
import type { Project } from "../types/project";

type Category = "uiux" | "graphic" | "art";

interface UseProjectsReturn {
    projects: Project[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useProjects = (category?: Category): UseProjectsReturn => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProjects = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await projectService.getProjectsByCategory(category);
            setProjects(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
            setProjects([]);
        } finally {
            setLoading(false);
        }
    }, [category]);

    const refetch = useCallback(async () => {
        await fetchProjects();
    }, [fetchProjects]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return useMemo(
        () => ({
            projects,
            loading,
            error,
            refetch,
        }),
        [projects, loading, error, refetch],
    );
};

// Hook riêng cho việc filter projects theo category từ dữ liệu đã có
export const useFilteredProjects = (projects: Project[], category: Category) => {
    return useMemo(() => {
        return projects.filter((project) => project.category === category);
    }, [projects, category]);
};
