import { useState, useEffect, useCallback } from "react";
import { projectService } from "../services/projectService";

const STORAGE_KEY = "liked_projects";

export const useProjectLike = (projectId: string, initialLikes: number = 0) => {
    const [isLiked, setIsLiked] = useState<boolean>(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            const list: string[] = raw ? JSON.parse(raw) : [];
            return list.includes(projectId);
        } catch {
            return false;
        }
    });

    const [likeCount, setLikeCount] = useState<number>(initialLikes);
    const [isLiking, setIsLiking] = useState<boolean>(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            const list: string[] = raw ? JSON.parse(raw) : [];
            setIsLiked(list.includes(projectId));
        } catch {
            setIsLiked(false);
        }
        setLikeCount(initialLikes);
    }, [projectId, initialLikes]);

    const toggleLike = useCallback(async () => {
        if (!projectId || isLiking) return;

        const nextLikedState = !isLiked;

        // Optimistic UI update
        setIsLiked(nextLikedState);
        setLikeCount((prev) => Math.max(0, prev + (nextLikedState ? 1 : -1)));

        // Persist to LocalStorage
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            const list: string[] = raw ? JSON.parse(raw) : [];
            const updated = nextLikedState
                ? Array.from(new Set([...list, projectId]))
                : list.filter((id) => id !== projectId);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
            console.error("Failed to save like state to localStorage:", e);
        }

        // Persist to Firebase
        try {
            setIsLiking(true);
            await projectService.likeProject(projectId, nextLikedState);
        } catch (error) {
            console.error("Failed to update like in Firebase:", error);
        } finally {
            setIsLiking(false);
        }
    }, [projectId, isLiked, isLiking]);

    return {
        isLiked,
        likeCount,
        isLiking,
        toggleLike,
    };
};
