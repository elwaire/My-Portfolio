import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { getThumbnail, getYoutubeId, VIDEO_CATEGORIES, VIDEOS, type Video, type VideoCategory } from "../../lib/videos";

type Filter = "All" | VideoCategory;
const FILTERS: Filter[] = ["All", ...VIDEO_CATEGORIES];
const EASE = [0.22, 1, 0.36, 1] as const;

export default function VideosPage() {
    const [filter, setFilter] = useState<Filter>("All");

    const visible = useMemo(() => (filter === "All" ? VIDEOS : VIDEOS.filter((v) => v.category === filter)), [filter]);

    const counts = useMemo(() => {
        const map = Object.fromEntries(FILTERS.map((f) => [f, 0])) as Record<Filter, number>;
        map.All = VIDEOS.length;
        VIDEOS.forEach((v) => (map[v.category] += 1));
        return map;
    }, []);

    return (
        <MotionConfig reducedMotion="user">
            <main className="mx-auto w-full max-w-7xl pb-32 pt-20  md:pt-28">
                <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <h1 className="text-3xl font-normal uppercase tracking-tight text-black ">My Videos</h1>
                    <p className="max-w-xs text-base leading-relaxed text-neutral-600 font-light md:text-right">
                        Films, motion and edits — each one with the process behind it.
                    </p>
                </header>

                <div role="group" aria-label="Filter videos by category" className="mt-14 flex flex-wrap gap-3">
                    {FILTERS.map((f) => {
                        const isActive = f === filter;
                        return (
                            <button
                                key={f}
                                type="button"
                                aria-pressed={isActive}
                                onClick={() => setFilter(f)}
                                className={[
                                    "border cursor-pointer px-3 py-2 text-sm font-light sm-colors duration-200",
                                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
                                    isActive
                                        ? "border-black bg-black text-white"
                                        : "border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:text-black",
                                ].join(" ")}
                            >
                                {f} <span className="ml-1">({counts[f]})</span>
                            </button>
                        );
                    })}
                </div>

                <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {visible.map((video) => (
                            <motion.li
                                key={video.slug}
                                layout
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: EASE }}
                            >
                                <VideoCard video={video} />
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>
            </main>
        </MotionConfig>
    );
}

function VideoCard({ video }: { video: Video }) {
    const [src, setSrc] = useState(getThumbnail(video));
    const [loaded, setLoaded] = useState(false);

    return (
        <Link
            to={`/videos/${video.slug}`}
            className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        >
            <div className="relative aspect-video overflow-hidden bg-neutral-100">
                <img
                    ref={(el) => {
                        if (el?.complete && el.naturalWidth > 0) setLoaded(true);
                    }}
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setLoaded(true)}
                    onError={() => {
                        // maxresdefault không phải video nào cũng có → lùi về hqdefault
                        const id = getYoutubeId(video.youtubeUrl);
                        if (id && !video.thumbnail && !src.includes("hqdefault")) {
                            setSrc(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
                        }
                    }}
                    className={[
                        "h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out",
                        "group-hover:scale-[1.04]",
                        loaded ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                />

                <span className="absolute font-light right-4 top-4 rounded-full bg-black/60 px-4 py-2 text-xs uppercase tracking-wide text-white backdrop-blur">
                    {video.category}
                </span>

                {/* Nút play: luôn hiện (cho cảm ứng), phóng nhẹ khi hover */}
                <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-black shadow-sm transition-transform duration-300 ease-out group-hover:scale-110">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </span>
                </span>

                <span className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 text-xs font-light text-white backdrop-blur">
                    {video.duration}
                </span>
            </div>

            <div>
                <h2 className="mt-5 text-lg font-base text-black">{video.title}</h2>
                <p className="mt-1 line-clamp-2 text-sm font-light leading-relaxed text-neutral-500">{video.summary}</p>
            </div>
        </Link>
    );
}
