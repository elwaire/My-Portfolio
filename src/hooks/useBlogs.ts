// hooks/useBlogs.ts
import { useState, useEffect, useCallback, useRef } from "react";
import { blogService } from "../services/blogService";
import type { Blog, BlogData } from "../types/blog";

// Hook cho danh sách blogs
export const useBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBlogs = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await blogService.getAllBlogs();
            setBlogs(data || []);
        } catch (err) {
            console.error("Failed to fetch blogs:", err);
            setError("Failed to load blogs");
            setBlogs([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    return {
        blogs,
        isLoading,
        error,
        refetch: fetchBlogs,
    };
};

// Hook cho chi tiết blog (có đếm view)
export const useBlogDetail = (id: string | undefined) => {
    const [blogData, setBlogData] = useState<BlogData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const hasIncrementedView = useRef(false);

    useEffect(() => {
        const fetchBlog = async () => {
            if (!id) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);
            try {
                const data = await blogService.getBlogById(id);
                setBlogData(data);

                // Increment view chỉ 1 lần khi load blog
                if (data && !hasIncrementedView.current) {
                    hasIncrementedView.current = true;
                    await blogService.incrementView(id);
                }
            } catch (err) {
                console.error("Failed to fetch blog:", err);
                setError("Failed to load blog");
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    return {
        blogData,
        isLoading,
        error,
    };
};
