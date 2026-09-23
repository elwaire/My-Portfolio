import { collection, doc, getDoc, getDocs, increment, query, updateDoc, where } from "firebase/firestore";
import type { Project, ProjectData } from "../types/project";
import { db } from "../configs/firebase";

class ProjectService {
    private readonly collectionName = "projects";

    // Cache để tránh fetch lại dữ liệu không cần thiết
    private cache = new Map<string, Project[]>();
    private fullProjectsCache = new Map<string, ProjectData>();

    /**
     * Lấy danh sách projects theo category với caching
     */
    async getProjectsByCategory(category?: string): Promise<Project[]> {
        const cacheKey = category || "all";

        // Kiểm tra cache trước
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey)!;
        }

        try {
            const projectsRef = collection(db, this.collectionName);
            let q = query(projectsRef);

            // Nếu có category thì filter
            if (category) {
                q = query(projectsRef, where("head.category", "==", category));
            }

            const querySnapshot = await getDocs(q);

            const projects: Project[] = querySnapshot.docs.map((doc) => {
                const data = doc.data() as ProjectData;
                return {
                    id: doc.id,
                    title: data.head.title,
                    description: data.head.description,
                    image: data.head.thumbnail,
                    category: data.head.category,
                    isPinned: data.head.isPinned || false,
                };
            });

            // Sắp xếp đưa các dự án được ghim lên đầu danh sách
            projects.sort((a, b) => {
                const aPinned = a.isPinned ? 1 : 0;
                const bPinned = b.isPinned ? 1 : 0;
                return bPinned - aPinned;
            });

            // Lưu vào cache
            this.cache.set(cacheKey, projects);
            return projects;
        } catch (error) {
            console.error("Error fetching projects:", error);
            throw new Error("Failed to fetch projects");
        }
    }

    /**
     * Lấy chi tiết project theo ID
     */
    async getProjectById(id: string): Promise<ProjectData | null> {
        // Kiểm tra cache
        if (this.fullProjectsCache.has(id)) {
            return this.fullProjectsCache.get(id)!;
        }

        try {
            const docRef = doc(db, this.collectionName, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data() as ProjectData;

                // Lưu vào cache
                this.fullProjectsCache.set(id, data);
                return data;
            }

            return null;
        } catch (error) {
            console.error("Error fetching project detail:", error);
            throw new Error("Failed to fetch project detail");
        }
    }

    /**
     * Tăng/giảm lượt like của project trên Firebase
     */
    async likeProject(id: string, isLike: boolean): Promise<void> {
        try {
            const docRef = doc(db, this.collectionName, id);
            await updateDoc(docRef, {
                likes: increment(isLike ? 1 : -1),
            });

            // Cập nhật cache nếu có
            if (this.fullProjectsCache.has(id)) {
                const cached = this.fullProjectsCache.get(id)!;
                const currentLikes = cached.likes || 0;
                this.fullProjectsCache.set(id, {
                    ...cached,
                    likes: Math.max(0, currentLikes + (isLike ? 1 : -1)),
                });
            }
        } catch (error) {
            console.error("Error updating project like:", error);
            throw error;
        }
    }

    /**
     * Tăng lượt view của project trên Firebase
     */
    async incrementView(id: string): Promise<void> {
        try {
            const docRef = doc(db, this.collectionName, id);
            await updateDoc(docRef, {
                views: increment(1),
            });

            // Cập nhật cache nếu có
            if (this.fullProjectsCache.has(id)) {
                const cached = this.fullProjectsCache.get(id)!;
                this.fullProjectsCache.set(id, {
                    ...cached,
                    views: (cached.views || 0) + 1,
                });
            }
        } catch (error) {
            console.error("Error incrementing project view:", error);
        }
    }

    /**
     * Clear cache khi cần
     */
    clearCache(): void {
        this.cache.clear();
        this.fullProjectsCache.clear();
    }
}

export const projectService = new ProjectService();
