import { doc, getDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import type { BannerSettings } from "../types/banner";

class BannerService {
    private readonly docId = "banner-settings";
    private cache: BannerSettings | null = null;

    async getBannerSettings(): Promise<BannerSettings | null> {
        if (this.cache) return this.cache;

        try {
            const docRef = doc(db, "settings", this.docId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data() as BannerSettings;
                this.cache = data;
                return data;
            }

            return null;
        } catch (error) {
            console.error("Error fetching banner settings:", error);
            throw new Error("Failed to fetch banner settings");
        }
    }

    clearCache(): void {
        this.cache = null;
    }
}

export const bannerService = new BannerService();
