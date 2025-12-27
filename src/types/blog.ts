// types/blog.ts

export interface Blog {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    category: "design" | "development" | "career" | "tutorial" | "thoughts";
    tags: string[];
    readTime: number;
    views: number; // Thêm field views
    createdAt: string;
}

export type BlogContentType = "paragraph" | "heading" | "image" | "code" | "quote" | "list";

export interface BlogContentBlock {
    type: BlogContentType;
    // For paragraph
    text?: string;
    // For heading
    heading?: string;
    level?: 2 | 3 | 4;
    // For image
    image?: string;
    imageAlt?: string;
    imageCaption?: string;
    // For code
    code?: string;
    language?: string;
    // For quote
    quote?: string;
    quoteAuthor?: string;
    // For list
    listType?: "ordered" | "unordered";
    listItems?: string[];
}

export interface BlogData {
    head: {
        title: string;
        description: string;
        thumbnail: string;
        category: "design" | "development" | "career" | "tutorial" | "thoughts";
        tags: string[];
        readTime: number;
    };
    content: BlogContentBlock[];
}
