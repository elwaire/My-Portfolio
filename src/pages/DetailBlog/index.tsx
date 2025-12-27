// pages/client/DetailBlogPage.tsx
import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useBlogDetail } from "../../hooks/useBlogs";
import type { BlogContentBlock } from "../../types/blog";
import PATHS from "../../constants/paths";

// Content Block Renderer
const ContentBlock: React.FC<{ block: BlogContentBlock }> = ({ block }) => {
    switch (block.type) {
        case "paragraph":
            return <p className="text-neutral-700 leading-relaxed">{block.text}</p>;

        case "heading":
            if (block.level === 3) {
                return <h3 className="text-xl font-semibold text-neutral-900 mt-8 mb-4">{block.heading}</h3>;
            }
            if (block.level === 4) {
                return <h4 className="text-lg font-semibold text-neutral-900 mt-6 mb-3">{block.heading}</h4>;
            }
            return <h2 className="text-2xl font-bold text-neutral-900 mt-10 mb-4">{block.heading}</h2>;

        case "image":
            return (
                <figure className="my-8">
                    <img src={block.image} alt={block.imageAlt || ""} className="w-full rounded-lg" loading="lazy" />
                    {block.imageCaption && (
                        <figcaption className="text-center text-sm text-neutral-500 mt-2">
                            {block.imageCaption}
                        </figcaption>
                    )}
                </figure>
            );

        case "code":
            return (
                <pre className="my-6 p-4 bg-neutral-900 text-neutral-100 rounded-lg overflow-x-auto">
                    <code className="text-sm font-mono">{block.code}</code>
                </pre>
            );

        case "quote":
            return (
                <blockquote className="my-8 pl-4 border-l-2 border-neutral-300">
                    <p className="text-neutral-600 italic">"{block.quote}"</p>
                    {block.quoteAuthor && (
                        <cite className="block mt-2 text-sm text-neutral-500">— {block.quoteAuthor}</cite>
                    )}
                </blockquote>
            );

        case "list":
            const ListTag = block.listType === "ordered" ? "ol" : "ul";
            const listStyle = block.listType === "ordered" ? "list-decimal" : "list-disc";
            return (
                <ListTag className={`${listStyle} pl-5 space-y-1 text-neutral-700`}>
                    {block.listItems?.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ListTag>
            );

        default:
            return null;
    }
};

// Loading Skeleton
const Skeleton: React.FC = () => (
    <div className="max-w-2xl mx-auto px-6 pt-32 animate-pulse">
        <div className="h-4 w-20 bg-neutral-200 rounded mb-8" />
        <div className="h-10 bg-neutral-200 rounded w-full mb-3" />
        <div className="h-10 bg-neutral-200 rounded w-2/3 mb-6" />
        <div className="h-4 bg-neutral-200 rounded w-1/4 mb-12" />
        <div className="aspect-[2/1] bg-neutral-200 rounded-lg mb-12" />
        <div className="space-y-3">
            <div className="h-4 bg-neutral-200 rounded w-full" />
            <div className="h-4 bg-neutral-200 rounded w-full" />
            <div className="h-4 bg-neutral-200 rounded w-3/4" />
        </div>
    </div>
);

const DetailBlogPage: React.FC = () => {
    const { idBlog } = useParams<{ idBlog: string }>();

    if (!idBlog) {
        return <Navigate to={PATHS.BLOG} replace />;
    }

    const { blogData, isLoading, error } = useBlogDetail(idBlog);

    if (isLoading) {
        return <Skeleton />;
    }

    if (error || !blogData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-2">Blog not found</h2>
                <Link to={PATHS.BLOG} className="text-neutral-500 hover:text-neutral-900">
                    ← Back to Blog
                </Link>
            </div>
        );
    }

    const { head, content } = blogData;

    return (
        <article className="min-h-screen pb-20">
            {/* Header */}
            <header className="max-w-2xl mx-auto px-6 pt-32 pb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-8 mb-4 leading-tight">
                    {head.title}
                </h1>

                <div className="flex items-center gap-3 text-sm text-neutral-500">
                    <span className="capitalize">{head.category}</span>
                    <span>·</span>
                    <span>{head.readTime || 5} min read</span>
                </div>
            </header>

            {/* Thumbnail */}
            {head.thumbnail && (
                <div className="max-w-3xl mx-auto px-6 mb-12">
                    <img
                        src={head.thumbnail}
                        alt={head.title}
                        className="w-full aspect-[2/1] object-cover rounded-lg"
                    />
                </div>
            )}

            {/* Content */}
            <div className="max-w-2xl mx-auto px-6">
                <div className="space-y-5">
                    {content?.map((block, index) => (
                        <ContentBlock key={index} block={block} />
                    ))}
                </div>

                {/* Tags */}
                {head.tags && head.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-neutral-200">
                        <div className="flex flex-wrap gap-2">
                            {head.tags.map((tag, index) => (
                                <span key={index} className="text-sm text-neutral-500">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
};

export default DetailBlogPage;
