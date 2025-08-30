// hooks/useProjectDetail.ts
import { useState, useEffect, useCallback, useMemo } from "react";
import { projectService } from "../services/projectService";
import type { ProjectData } from "../types/project";

interface UseProjectDetailReturn {
    projectData: ProjectData | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useProjectDetail = (projectId: string): UseProjectDetailReturn => {
    const [projectData, setProjectData] = useState<ProjectData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProjectDetail = useCallback(async () => {
        if (!projectId) {
            setError("Project ID is required");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const data = await projectService.getProjectById(projectId);

            if (data) {
                setProjectData(data);
            } else {
                setError("Project not found");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
            setProjectData(null);
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    const refetch = useCallback(async () => {
        await fetchProjectDetail();
    }, [fetchProjectDetail]);

    useEffect(() => {
        fetchProjectDetail();
    }, [fetchProjectDetail]);

    return useMemo(
        () => ({
            projectData,
            loading,
            error,
            refetch,
        }),
        [projectData, loading, error, refetch],
    );
};
