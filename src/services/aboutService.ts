// services/aboutService.ts
import { doc, getDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import type { AboutData } from "../types/about";

class AboutService {
    private readonly docId = "about-data"; // Single document for all about data
    private cache: AboutData | null = null;

    async getAboutData(): Promise<AboutData | null> {
        if (this.cache) return this.cache;

        try {
            const docRef = doc(db, "about", this.docId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data() as AboutData;
                this.cache = data;
                return data;
            }

            return null;
        } catch (error) {
            console.error("Error fetching about data:", error);
            throw new Error("Failed to fetch about data");
        }
    }

    clearCache(): void {
        this.cache = null;
    }
}

export const aboutService = new AboutService();
