// services/certificateService.ts
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../configs/firebase";
import type { Certificate } from "../types/certificate";

class CertificateService {
    private readonly collectionName = "certificates";
    private cache = new Map<string, Certificate[]>();

    /**
     * Lấy tất cả certificates
     */
    async getCertificates(): Promise<Certificate[]> {
        if (this.cache.has("all")) {
            return this.cache.get("all")!;
        }

        try {
            const certificatesRef = collection(db, this.collectionName);
            const q = query(certificatesRef, orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);

            const certificates: Certificate[] = querySnapshot.docs.map(
                (doc) =>
                    ({
                        id: doc.id,
                        ...doc.data(),
                    } as Certificate),
            );

            this.cache.set("all", certificates);
            return certificates;
        } catch (error) {
            console.error("Error fetching certificates:", error);
            throw new Error("Failed to fetch certificates");
        }
    }

    /**
     * Lấy certificate theo ID
     */
    async getCertificateById(id: string): Promise<Certificate | null> {
        try {
            const docRef = doc(db, this.collectionName, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return {
                    id: docSnap.id,
                    ...docSnap.data(),
                } as Certificate;
            }

            return null;
        } catch (error) {
            console.error("Error fetching certificate:", error);
            throw new Error("Failed to fetch certificate");
        }
    }

    /**
     * Clear cache
     */
    clearCache(): void {
        this.cache.clear();
    }
}

export const certificateService = new CertificateService();
