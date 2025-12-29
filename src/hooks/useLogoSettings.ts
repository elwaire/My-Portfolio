// hooks/useLogoSettings.ts
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import type { LogoSettings } from "../types/settings";

export const useClientLogoSettings = () => {
    const [settings, setSettings] = useState<LogoSettings | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(db, "settings", "logo");
                const snapshot = await getDoc(docRef);
                if (snapshot.exists()) {
                    setSettings(snapshot.data() as LogoSettings);
                }
            } catch (error) {
                console.error("Failed to fetch logo settings:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return { settings, isLoading };
};
