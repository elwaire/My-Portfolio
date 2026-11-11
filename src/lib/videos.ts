/* -------------------------------------------------------------------------- */
/*  Dữ liệu video — chỉ cần sửa file này để thêm/bớt video.                    */
/*  - youtubeUrl: dán link YouTube bất kỳ (watch / youtu.be / embed / shorts)  */
/*  - thumbnail:  tuỳ chọn. Bỏ trống sẽ tự lấy ảnh bìa từ YouTube              */
/*  - process:    các bước làm, mỗi bước gồm text + (tuỳ chọn) ảnh link ngoài  */
/* -------------------------------------------------------------------------- */

export const VIDEO_CATEGORIES = ["Motion graphics", "Brand film", "Product demo", "Editing", "AI Video"] as const;
export type VideoCategory = (typeof VIDEO_CATEGORIES)[number];

export type ProcessImage = {
    src: string;
    alt: string;
    caption?: string;
    /** width / height, giúp giữ chỗ trước khi ảnh tải xong */
    ratio?: number;
};

export type ProcessStep = {
    title: string;
    text: string;
    images?: ProcessImage[];
};

export type Video = {
    slug: string;
    title: string;
    category: VideoCategory;
    year: number;
    duration: string;
    role: string;
    tools: string[];
    summary: string;
    youtubeUrl: string;
    thumbnail?: string;
    process: ProcessStep[];
};

export const VIDEOS: Video[] = [
    {
        slug: "short-video-ai-girl-with-white-bonnet-and-flowers-oil-painting",
        title: "Short Video AI | Girl with white bonnet and flowers oil painting",
        category: "AI Video",
        year: 2026,
        duration: "30",
        role: "Direction, editing, colour",
        tools: ["Chat GPT Pro", "Seedance 2.5", "Capcut"],
        summary: "A slow, calm film about the small rituals that make a studio feel like home.",
        youtubeUrl: "https://www.youtube.com/watch?v=GISObsGCTJk",
        process: [
            {
                title: "Analyzing the original painting",
                text: "Analyze the original work to identify and select the elements that should be retained throughout the video—for instance, characters, props, settings, textures, and emotions.",
                images: [
                    {
                        src: "https://i.pinimg.com/736x/e4/a1/7a/e4a17af018c492840e47a745c3a3701b.jpg",
                        alt: "Analyzing the original painting",
                        ratio: 2 / 2,
                    },
                ],
            },
            {
                title: "Building a story",
                text: "Craft a narrative for the image, lasting about 30 seconds, using a three-act structure. The core story: In a tranquil garden, a young woman discovers a bouquet tied to an old memory. As the flower petals drift away on the breeze, she realizes that even though the past has faded, its beauty still lingers in her mind.",
            },
            {
                title: "Break the story down into a storyboard",
                text: "Divide the content into 6 scenes corresponding to 6 frames, with each scene lasting approximately 4–6 seconds.",
            },
            {
                title: "Prepare images",
                text: "For each planned scene, a prompt—accompanied by the original image—will be prepared to generate the setting for that scene using Seedance.",
                images: [
                    {
                        src: "https://cdn.dribbble.com/userupload/49588763/file/6f5ce46d50c460e2de1e0881eaf158e6.png?resize=2048x1152&vertical=center",
                        alt: "Frame 1",
                        ratio: 4 / 2,
                    },
                    {
                        src: "https://cdn.dribbble.com/userupload/49588761/file/4e7fcd09e9eb9caa531de4bde05ce14e.png?resize=1504x846&vertical=center",
                        alt: "Frame 2",
                        ratio: 4 / 2,
                    },
                    {
                        src: "https://cdn.dribbble.com/userupload/49588762/file/4a6d0e53421dd033c988a3b5dd9c3152.png?resize=1504x846&vertical=center",
                        alt: "Frame 3",
                        ratio: 4 / 2,
                    },
                    {
                        src: "https://cdn.dribbble.com/userupload/49588759/file/2afc6f31c706a45b199846a19f078a47.png?resize=1504x846&vertical=center",
                        alt: "Frame 4",
                        ratio: 4 / 2,
                    },
                    {
                        src: "https://cdn.dribbble.com/userupload/49588760/file/b4793105c3945765d80f87324e46b142.png?resize=1504x846&vertical=center",
                        alt: "Frame 5",
                        ratio: 4 / 2,
                    },
                    {
                        src: "https://cdn.dribbble.com/userupload/49588764/file/31b2ae719e138cb1168dbfdf2c8608e1.png?resize=1504x846&vertical=center",
                        alt: "Frame 6",
                        ratio: 4 / 2,
                    },
                ],
            },
            {
                title: "Generate video",
                text: "Use the newly created scenes along with a video-generation prompt to produce the result.",
            },
        ],
    },
];

/* ------------------------------- Helpers ---------------------------------- */

export function getYoutubeId(url: string): string | null {
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([\w-]{11})/);
    return m ? m[1] : null;
}

export function getThumbnail(video: Video): string {
    if (video.thumbnail) return video.thumbnail;
    const id = getYoutubeId(video.youtubeUrl);
    return id ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : "";
}

export function getVideo(slug: string) {
    if (!slug) return undefined;
    return VIDEOS.find((v) => v.slug.toLowerCase() === slug.trim().toLowerCase());
}
