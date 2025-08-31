// hooks/useCertificates.ts
import { useCallback, useEffect, useMemo, useState } from "react";
import { certificateService } from "../services/certificateService";
import type { Certificate } from "../types/certificate";

interface UseCertificatesReturn {
    certificates: Certificate[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useCertificates = (): UseCertificatesReturn => {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCertificates = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await certificateService.getCertificates();
            setCertificates(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
            setCertificates([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const refetch = useCallback(async () => {
        await fetchCertificates();
    }, [fetchCertificates]);

    useEffect(() => {
        fetchCertificates();
    }, [fetchCertificates]);

    return useMemo(
        () => ({
            certificates,
            loading,
            error,
            refetch,
        }),
        [certificates, loading, error, refetch],
    );
};
