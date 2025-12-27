// services/blogService.ts
import {
    collection,
    getDocs,
    getDoc,
    doc,
    query,
    orderBy,
    addDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    increment,
} from "firebase/firestore";
import type { Blog, BlogData } from "../types/blog";
import { db } from "../configs/firebase";

const COLLECTION_NAME = "blogs";

export const blogService = {
    // Get all blogs
    async getAllBlogs(): Promise<Blog[]> {
        const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.head?.title || "",
                description: data.head?.description || "",
                thumbnail: data.head?.thumbnail || "",
                category: data.head?.category || "design",
                tags: data.head?.tags || [],
                readTime: data.head?.readTime || 5,
                views: data.views || 0,
                createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
            };
        }) as Blog[];
    },

    // Get blog by ID
    async getBlogById(id: string): Promise<BlogData | null> {
        const docRef = doc(db, COLLECTION_NAME, id);
        const snapshot = await getDoc(docRef);
        if (!snapshot.exists()) return null;
        return snapshot.data() as BlogData;
    },

    // Increment view count
    async incrementView(id: string): Promise<void> {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, {
            views: increment(1),
        });
    },

    // Create blog
    async createBlog(data: BlogData): Promise<string> {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...data,
            views: 0,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return docRef.id;
    },

    // Update blog
    async updateBlog(id: string, data: BlogData): Promise<void> {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, {
            ...data,
            updatedAt: serverTimestamp(),
        });
    },

    // Delete blog
    async deleteBlog(id: string): Promise<void> {
        const docRef = doc(db, COLLECTION_NAME, id);
        await deleteDoc(docRef);
    },
};
