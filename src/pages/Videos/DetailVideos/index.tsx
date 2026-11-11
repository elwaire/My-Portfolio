import { motion, MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getThumbnail, getVideo, getYoutubeId, VIDEOS, type ProcessImage, type Video } from "../../../lib/videos";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function DetailVideosPage() {
    const { slug = "" } = useParams<{ slug: string }>();

    // React Router không tự cuộn lên đầu khi đổi trang → làm thủ công.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    const video = getVideo(slug);
    if (!video) return <Navigate to="/videos" replace />;

    const index = VIDEOS.findIndex((v) => v.slug === video.slug);
    const next = VIDEOS[(index + 1) % VIDEOS.length];

    return (
        <MotionConfig reducedMotion="user">
            <Detail key={video.slug} video={video} next={next} />
        </MotionConfig>
    );
}

/* -------------------------------------------------------------------------- */

function Detail({ video }: { video: Video; next: Video }) {
    const activeStep = useActiveStep(video.process?.length ?? 0);

    return (
        <main className="mx-auto w-full max-w-6xl pb-32 pt-12  md:pt-16">
            {/* Title */}
            <motion.header
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="mt-10"
            >
                <p className="text-sm uppercase font-light tracking-wide text-neutral-500">{video.category}</p>
                <h1 className="mt-3 max-w-4xl text-4xl font-normal tracking-tight text-black ">{video.title}</h1>
                <p className="mt-3 max-w-2xl text-base font-light leading-relaxed text-neutral-600">{video.summary}</p>
            </motion.header>

            {/* Player */}
            <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
                className="mt-12"
            >
                <Player video={video} />
            </motion.div>

            {/* Info + Process */}
            <div className="mt-24 grid gap-16 lg:grid-cols-[280px_1fr] lg:gap-24">
                <aside className="lg:sticky lg:top-28 lg:self-start">
                    <dl className="space-y-6 text-base">
                        <Meta label="Role" value={video.role} />
                        <Meta label="Year" value={String(video.year)} />
                        <Meta label="Duration" value={video.duration} />
                        <Meta label="Tools" value={video.tools.join(", ")} />
                    </dl>

                    {video.process.length > 1 && (
                        <nav aria-label="Process steps" className="mt-12 hidden lg:block">
                            <p className="text-sm uppercase tracking-wide font-light text-neutral-500">Process</p>
                            <ol className="mt-4 space-y-3">
                                {video.process.map((step, i) => (
                                    <li key={step.title}>
                                        <a
                                            href={`#step-${i}`}
                                            aria-current={activeStep === i ? "step" : undefined}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document
                                                    .getElementById(`step-${i}`)
                                                    ?.scrollIntoView({ behavior: "smooth" });
                                            }}
                                            className={[
                                                "flex items-baseline gap-3 transition-colors duration-200",
                                                activeStep === i
                                                    ? "text-black"
                                                    : "text-neutral-400 hover:text-neutral-700",
                                            ].join(" ")}
                                        >
                                            <span className="w-6 text-sm">{String(i + 1).padStart(2, "0")}</span>
                                            <span className="text-base font-light">{step.title}</span>
                                        </a>
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    )}
                </aside>

                <div>
                    <h2 className="text-sm uppercase font-light tracking-wide text-neutral-500 lg:sr-only">Process</h2>
                    {video.process.map((step, i) => (
                        <motion.section
                            key={step.title}
                            id={`step-${i}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                            transition={{ duration: 0.8, ease: EASE }}
                            className="scroll-mt-28  pb-20 first:mt-4 lg:first:mt-0"
                        >
                            <p className="text-sm text-neutral-500">{String(i + 1).padStart(2, "0")}</p>
                            <h3 className="mt-2 text-2xl text-black ">{step.title}</h3>
                            <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-neutral-600">
                                {step.text}
                            </p>

                            {step.images && step.images.length > 0 && (
                                <div
                                    className={[
                                        "mt-10 grid gap-6",
                                        step.images.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2",
                                    ].join(" ")}
                                >
                                    {step.images.map((img) => (
                                        <Figure key={img.src} image={img} />
                                    ))}
                                </div>
                            )}
                        </motion.section>
                    ))}
                </div>
            </div>
        </main>
    );
}

/* -------------------------------------------------------------------------- */
/*  Player — hiện ảnh bìa trước, chỉ tải iframe YouTube khi bấm play (nhẹ hơn) */
/* -------------------------------------------------------------------------- */

function Player({ video }: { video: Video }) {
    const [playing, setPlaying] = useState(false);
    const [thumbSrc, setThumbSrc] = useState(getThumbnail(video));
    const id = getYoutubeId(video.youtubeUrl);

    return (
        <div className="relative aspect-video w-full overflow-hidden bg-black">
            {playing && id ? (
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
                    title={video.title}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                />
            ) : (
                <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label={`Play ${video.title}`}
                    className="group absolute inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
                >
                    <img
                        src={thumbSrc}
                        alt=""
                        onError={() => {
                            if (id && !video.thumbnail && !thumbSrc.includes("hqdefault")) {
                                setThumbSrc(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
                            }
                        }}
                        className="h-full w-full object-cover opacity-90 transition-[opacity,transform] duration-700 group-hover:scale-[1.02] group-hover:opacity-100"
                    />
                    <span className="absolute inset-0 grid place-items-center">
                        <span className="grid h-20 w-20 place-items-center rounded-full bg-white/90 text-black transition-transform duration-300 group-hover:scale-110">
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </span>
                    </span>
                </button>
            )}
        </div>
    );
}

function Meta({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <dt className="text-sm uppercase font-light tracking-wide text-neutral-500">{label}</dt>
            <dd className="mt-1 text-black font-base">{value}</dd>
        </div>
    );
}

function Figure({ image }: { image: ProcessImage }) {
    const [loaded, setLoaded] = useState(false);
    return (
        <figure>
            <div
                className="overflow-hidden bg-neutral-100"
                style={image.ratio ? { aspectRatio: image.ratio } : undefined}
            >
                <img
                    ref={(el) => {
                        if (el?.complete && el.naturalWidth > 0) setLoaded(true);
                    }}
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setLoaded(true)}
                    className={[
                        "block w-full transition-opacity duration-700",
                        image.ratio ? "h-full object-cover" : "h-auto",
                        loaded ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                />
            </div>
            {image.caption && (
                <figcaption className="mt-3 font-light text-sm text-neutral-500">{image.caption}</figcaption>
            )}
        </figure>
    );
}

/* -------------------------------------------------------------------------- */
/*  Theo dõi bước nào đang ở giữa màn hình để tô đậm trong mục lục             */
/* -------------------------------------------------------------------------- */

function useActiveStep(count: number) {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const els = Array.from({ length: count }, (_, i) => document.getElementById(`step-${i}`)).filter(
            (el): el is HTMLElement => !!el,
        );
        if (!els.length) return;

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive(Number(e.target.id.replace("step-", "")));
                });
            },
            { rootMargin: "-30% 0px -60% 0px" },
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [count]);

    return active;
}
