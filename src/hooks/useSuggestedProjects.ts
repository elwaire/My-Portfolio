import { useCallback, useEffect, useMemo, useState } from "react";
import { projectService } from "../services/projectService";
import type { Project } from "../types/project";

interface UseSuggestedProjectsOptions {
    currentProjectId: string;
    category?: string;
    limit?: number;
}

interface UseSuggestedProjectsReturn {
    suggestedProjects: Project[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useSuggestedProjects = ({
    currentProjectId,
    category,
    limit = 3,
}: UseSuggestedProjectsOptions): UseSuggestedProjectsReturn => {
    const [suggestedProjects, setSuggestedProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSuggestedProjects = useCallback(async () => {
        if (!currentProjectId) {
            setSuggestedProjects([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            let results: Project[] = [];

            // 1. Ưu tiên lấy các project cùng category (nếu có category)
            if (category) {
                const categoryProjects = await projectService.getProjectsByCategory(category);
                results = categoryProjects.filter((p) => p.id !== currentProjectId);
            }

            // 2. Nếu chưa đủ limit, lấy thêm từ tất cả project
            if (results.length < limit) {
                const allProjects = await projectService.getProjectsByCategory();
                const existingIds = new Set([currentProjectId, ...results.map((p) => p.id)]);
                const additionalProjects = allProjects.filter((p) => !existingIds.has(p.id));

                results = [...results, ...additionalProjects];
            }

            // 3. Giới hạn đúng số lượng cần lấy
            setSuggestedProjects(results.slice(0, limit));
        } catch (err) {
            console.error("Error fetching suggested projects:", err);
            setError(err instanceof Error ? err.message : "Failed to load suggested projects");
            setSuggestedProjects([]);
        } finally {
            setLoading(false);
        }
    }, [currentProjectId, category, limit]);

    const refetch = useCallback(async () => {
        await fetchSuggestedProjects();
    }, [fetchSuggestedProjects]);

    useEffect(() => {
        fetchSuggestedProjects();
    }, [fetchSuggestedProjects]);

    return useMemo(
        () => ({
            suggestedProjects,
            loading,
            error,
            refetch,
        }),
        [suggestedProjects, loading, error, refetch],
    );
};
