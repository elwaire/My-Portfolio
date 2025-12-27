// pages/client/BlogPage.tsx
import React, { useState, useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { useBlogs } from "../../hooks/useBlogs";
import type { Blog } from "../../types/blog";

const CATEGORIES = [
    { value: "all", label: "All" },
    { value: "design", label: "Design" },
    { value: "development", label: "Development" },
    { value: "career", label: "Career" },
    { value: "tutorial", label: "Tutorial" },
    { value: "thoughts", label: "Thoughts" },
];

// Animation variants - với type Variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94], // Cubic bezier thay vì string
        },
    },
};

// Format date helper
const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

// Latest Blog Card (Hero style)
const LatestBlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="group"
        >
            <Link to={`/blog/${blog.id}`} className="block">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Thumbnail */}
                    <motion.div
                        className="aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-100"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.img
                            src={blog.thumbnail || "https://placehold.co/800x500?text=Blog"}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                            loading="eager"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                        />
                    </motion.div>

                    {/* Content */}
                    <div className="space-y-4 lg:space-y-6">
                        {/* Badge */}
                        <div className="flex items-center gap-3">
                            <span className="inline-block px-3 py-1 text-xs font-medium bg-neutral-900 text-white rounded-full">
                                Latest
                            </span>
                            <span className="text-sm text-neutral-500 capitalize">{blog.category}</span>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 group-hover:text-neutral-600 transition-colors duration-300 leading-tight">
                            {blog.title}
                        </h2>

                        {/* Description */}
                        <p className="text-neutral-600 font-light text-sm leading-relaxed line-clamp-3">
                            {blog.description}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center gap-4 pt-2">
                            <span className="text-sm text-neutral-500">{formatDate(blog.createdAt)}</span>
                            <span className="text-neutral-300">•</span>
                            <span className="text-sm text-neutral-500">{blog.readTime || 5} min read</span>
                            <span className="text-neutral-300">•</span>
                            <span className="text-sm text-neutral-500">{blog.views || 0} views</span>
                        </div>

                        {/* Read more */}
                        <div className="pt-2">
                            <span className="inline-flex items-center gap-2 text-neutral-900 font-medium group-hover:gap-3 transition-all duration-300">
                                Read article
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
};

// Trong BlogCard component
const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {
    return (
        <motion.article variants={itemVariants} className="group">
            <Link to={`/blog/${blog.id}`} className="block">
                {/* Thumbnail */}
                <motion.div
                    className="aspect-[16/10] overflow-hidden rounded-xl bg-neutral-100 mb-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.img
                        src={blog.thumbnail || "https://placehold.co/800x500?text=Blog"}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                    />
                </motion.div>

                {/* Content */}
                <div className="space-y-2">
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-sm text-neutral-500">
                        <span className="capitalize">{blog.category}</span>
                        <span>·</span>
                        <span>{blog.readTime || 5} min</span>
                        <span>·</span>
                        <span>{blog.views || 0} views</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors duration-300 line-clamp-2">
                        {blog.title}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-600 font-light text-sm line-clamp-2">{blog.description}</p>

                    {/* Date */}
                    <p className="text-xs text-neutral-400 pt-1">{formatDate(blog.createdAt)}</p>
                </div>
            </Link>
        </motion.article>
    );
};

// Loading Skeleton
const LatestBlogSkeleton: React.FC = () => (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-pulse">
        <div className="aspect-[16/10] bg-neutral-200 rounded-2xl" />
        <div className="space-y-4">
            <div className="flex gap-3">
                <div className="h-6 w-16 bg-neutral-200 rounded-full" />
                <div className="h-6 w-20 bg-neutral-200 rounded" />
            </div>
            <div className="h-10 bg-neutral-200 rounded w-full" />
            <div className="h-10 bg-neutral-200 rounded w-3/4" />
            <div className="h-20 bg-neutral-200 rounded w-full" />
            <div className="h-4 bg-neutral-200 rounded w-1/3" />
        </div>
    </div>
);

const BlogSkeleton: React.FC = () => (
    <div className="space-y-4 animate-pulse">
        <div className="aspect-[16/10] bg-neutral-200 rounded-xl" />
        <div className="space-y-2">
            <div className="h-4 bg-neutral-200 rounded w-1/3" />
            <div className="h-5 bg-neutral-200 rounded w-full" />
            <div className="h-4 bg-neutral-200 rounded w-2/3" />
        </div>
    </div>
);

const BlogPage: React.FC = () => {
    const { blogs = [], isLoading } = useBlogs();
    const [activeCategory, setActiveCategory] = useState("all");

    // Latest blog (first one)
    const latestBlog = useMemo(() => {
        if (!blogs || blogs.length === 0) return null;
        return blogs[0];
    }, [blogs]);

    // Other blogs (excluding latest), with category filter
    const otherBlogs = useMemo(() => {
        if (!blogs || blogs.length <= 1) return [];
        const remaining = blogs.slice(1);
        if (activeCategory === "all") return remaining;
        return remaining.filter((blog) => blog?.category === activeCategory);
    }, [blogs, activeCategory]);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <motion.section
                className="pt-32 pb-12 px-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-6xl mx-auto text-center">
                    <motion.p
                        className="text-neutral-500 text-sm uppercase tracking-widest mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Blog
                    </motion.p>
                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Thoughts & Insights
                    </motion.h1>
                    <motion.p
                        className="text-lg text-neutral-600 font-light max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Sharing my knowledge and experiences in design, development, and creative journey.
                    </motion.p>
                </div>
            </motion.section>

            {/* Latest Blog Section */}
            <section className="px-6 pb-16">
                <div className="max-w-6xl mx-auto">
                    {isLoading ? <LatestBlogSkeleton /> : latestBlog ? <LatestBlogCard blog={latestBlog} /> : null}
                </div>
            </section>

            {/* Divider */}
            {(otherBlogs.length > 0 || isLoading) && (
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        className="border-t border-neutral-200"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    />
                </div>
            )}

            {/* More Articles Section */}
            <section className="px-6 py-16">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h2 className="text-2xl font-bold text-neutral-900">More Articles</h2>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((category) => (
                                <motion.button
                                    key={category.value}
                                    onClick={() => setActiveCategory(category.value)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                        activeCategory === category.value
                                            ? "bg-neutral-900 text-white"
                                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {category.label}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Blog Grid */}
                    {isLoading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <BlogSkeleton key={i} />
                            ))}
                        </div>
                    ) : otherBlogs.length === 0 ? (
                        <motion.div className="text-center py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <p className="text-neutral-500">No articles found in this category.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {otherBlogs.map((blog) => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default BlogPage;
