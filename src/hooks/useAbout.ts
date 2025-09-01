// hooks/useAbout.ts
import { useState, useEffect, useCallback, useMemo } from "react";
import { aboutService } from "../services/aboutService";
import type { AboutData } from "../types/about";

interface UseAboutReturn {
    aboutData: AboutData | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useAbout = (): UseAboutReturn => {
    const [aboutData, setAboutData] = useState<AboutData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAboutData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await aboutService.getAboutData();
            setAboutData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
            setAboutData(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const refetch = useCallback(async () => {
        await fetchAboutData();
    }, [fetchAboutData]);

    useEffect(() => {
        fetchAboutData();
    }, [fetchAboutData]);

    return useMemo(
        () => ({
            aboutData,
            loading,
            error,
            refetch,
        }),
        [aboutData, loading, error, refetch],
    );
};
