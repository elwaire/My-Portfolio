import { useState, useEffect, useCallback, useMemo } from "react";
import type { BannerSettings } from "../types/banner";
import { bannerService } from "../services/bannerService";

interface UseBannerReturn {
    bannerSettings: BannerSettings | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useBanner = (): UseBannerReturn => {
    const [bannerSettings, setBannerSettings] = useState<BannerSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBannerSettings = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await bannerService.getBannerSettings();
            setBannerSettings(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    }, []);

    const refetch = useCallback(async () => {
        await fetchBannerSettings();
    }, [fetchBannerSettings]);

    useEffect(() => {
        fetchBannerSettings();
    }, [fetchBannerSettings]);

    return useMemo(
        () => ({
            bannerSettings,
            loading,
            error,
            refetch,
        }),
        [bannerSettings, loading, error, refetch],
    );
};
