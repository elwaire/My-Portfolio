"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { WORKS, type Work } from "../../constants/artDesignData";

const EASE = [0.22, 1, 0.36, 1] as const;

function useIsDesktop() {
    const [v, setV] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");
        const update = () => setV(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);
    return v;
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function ArtDesignPage() {
    const reduce = !!useReducedMotion();
    const isDesktop = useIsDesktop();
    const [activeId, setActiveId] = useState<string | null>(null);
    const triggerRef = useRef<HTMLElement | null>(null);

    const activeIndex = WORKS.findIndex((w) => w.id === activeId);
    const active = activeIndex >= 0 ? WORKS[activeIndex] : null;

    const open = (id: string, el: HTMLElement) => {
        triggerRef.current = el;
        setActiveId(id);
    };
    const close = useCallback(() => {
        setActiveId(null);
        requestAnimationFrame(() => triggerRef.current?.focus());
    }, []);
    const step = useCallback(
        (dir: 1 | -1) => {
            if (activeIndex < 0) return;
            setActiveId(WORKS[(activeIndex + dir + WORKS.length) % WORKS.length].id);
        },
        [activeIndex],
    );

    useEffect(() => {
        if (!activeId) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
        };
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [activeId, close, step]);

    return (
        <main className="min-h-screen px-6 py-16 max-w-7xl mx-auto w-full">
            {/* Hero: chừa khoảng trống để cuộn xuống là tác phẩm hiện dần */}
            <header className="flex min-h-[52svh] flex-col justify-center gap-6 md:flex-row md:items-center md:justify-between ">
                <motion.h1
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className="text-5xl font-normal uppercase tracking-tight text-black"
                >
                    Art &amp; Design
                </motion.h1>
                <motion.p
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                    className="max-w-xs text-base font-light leading-relaxed text-neutral-600 md:text-right"
                >
                    Posters, illustrations and studies — the work I make when there is no brief. Keep scrolling.
                </motion.p>
            </header>

            {/* Floating collage */}
            <ul className="grid grid-cols-2 gap-x-4 gap-y-16 md:grid-cols-12 md:gap-x-6 md:gap-y-40 items-start">
                {WORKS.map((work, i) => (
                    <Floating key={work.id} work={work} index={i} desktop={isDesktop} reduce={reduce} onOpen={open} />
                ))}
            </ul>

            <AnimatePresence>
                {active && (
                    <Lightbox
                        key="lightbox"
                        work={active}
                        index={activeIndex}
                        total={WORKS.length}
                        reduce={reduce}
                        onClose={close}
                        onStep={step}
                    />
                )}
            </AnimatePresence>
        </main>
    );
}

/* -------------------------------------------------------------------------- */
/*  Một tác phẩm trôi nổi                                                      */
/*  4 lớp, mỗi lớp một việc để các chuyển động không đè nhau:                  */
/*  li (vị trí lưới) → parallax theo cuộn → hiện ra khi vào màn hình → lơ lửng */
/* -------------------------------------------------------------------------- */

function Floating({
    work,
    index,
    desktop,
    reduce,
    onOpen,
}: {
    work: Work;
    index: number;
    desktop: boolean;
    reduce: boolean;
    onOpen: (id: string, el: HTMLElement) => void;
}) {
    const ref = useRef<HTMLLIElement>(null);
    const [loaded, setLoaded] = useState(false);

    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const depth = desktop ? work.speed : work.speed * 0.4;
    const y = useTransform(scrollYProgress, [0, 1], [depth, -depth]);

    // Mobile: 2 cột so le. Desktop: đặt theo lưới 12 cột đã khai báo.
    const placement = desktop
        ? { gridColumn: `${work.start} / span ${work.span}`, gridRow: work.row, marginTop: work.mt }
        : { marginTop: index % 2 === 1 ? "3rem" : "0" };

    return (
        <li ref={ref} style={placement} className="self-start">
            <motion.div style={reduce ? undefined : { y }}>
                <motion.div
                    initial={reduce ? false : { opacity: 0, scale: 0.94, y: 48 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                    transition={{ duration: 1, ease: EASE }}
                >
                    <motion.div
                        animate={reduce ? undefined : { y: [0, -10, 0], rotate: [0, index % 2 ? 0.6 : -0.6, 0] }}
                        transition={{
                            duration: 6 + (index % 4),
                            delay: index * 0.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <button
                            type="button"
                            onClick={(e) => onOpen(work.id, e.currentTarget)}
                            aria-label={`View ${work.title || work.category}`}
                            className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                        >
                            <div className="overflow-hidden bg-neutral-100">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    ref={(el) => {
                                        if (el?.complete && el.naturalWidth > 0) setLoaded(true);
                                    }}
                                    src={work.src}
                                    alt={work.title || work.category}
                                    loading="lazy"
                                    decoding="async"
                                    onLoad={() => setLoaded(true)}
                                    className={[
                                        "w-full h-auto block transition-[opacity,transform] duration-700 ease-out",
                                        "group-hover:scale-[1.04]",
                                        loaded ? "opacity-100" : "opacity-0",
                                    ].join(" ")}
                                />
                            </div>
                            <div className="mt-3 flex items-baseline justify-between gap-3">
                                {work.title && <h2 className="text-base text-black md:text-lg">{work.title}</h2>}
                                <p className="shrink-0 text-xs text-neutral-500 md:text-sm">
                                    {work.category}, {work.year}
                                </p>
                            </div>
                        </button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </li>
    );
}

/* -------------------------------------------------------------------------- */
/*  Lightbox                                                                   */
/* -------------------------------------------------------------------------- */

function Lightbox({
    work,
    index,
    total,
    reduce,
    onClose,
    onStep,
}: {
    work: Work;
    index: number;
    total: number;
    reduce: boolean;
    onClose: () => void;
    onStep: (dir: 1 | -1) => void;
}) {
    const closeRef = useRef<HTMLButtonElement>(null);
    useEffect(() => closeRef.current?.focus(), []);

    return (
        <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={work.title || work.category}
            className="fixed inset-0 z-50 flex flex-col bg-white/95 backdrop-blur-md"
            style={{ touchAction: "pan-y" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
            onPanEnd={(_, info) => {
                if (Math.abs(info.offset.x) < 60 || Math.abs(info.offset.y) > Math.abs(info.offset.x)) return;
                onStep(info.offset.x < 0 ? 1 : -1);
            }}
        >
            <div className="flex items-center justify-between px-6 py-5 md:px-12">
                <p className="text-sm text-neutral-500" aria-live="polite">
                    {index + 1} / {total}
                </p>
                <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    className="border border-neutral-200 px-5 py-2 text-base font-light cursor-pointer text-black transition-colors hover:border-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    Close
                </button>
            </div>

            <div
                className="relative flex min-h-0 flex-1 items-center justify-center px-6 md:px-24"
                onClick={(e) => e.target === e.currentTarget && onClose()}
            >
                <Arrow dir="prev" onClick={() => onStep(-1)} />
                <AnimatePresence mode="wait" initial={false}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <motion.img
                        key={work.id}
                        initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                        src={work.src}
                        alt={work.title || work.category}
                        draggable={false}
                        className="max-h-[calc(100dvh-13rem)] w-auto max-w-full select-none object-contain"
                    />
                </AnimatePresence>
                <Arrow dir="next" onClick={() => onStep(1)} />
            </div>

            <div className="px-6 pb-8 pt-5 text-center md:px-12">
                {work.title && <h2 className="text-lg text-black">{work.title}</h2>}
                <p className="mt-1 text-sm text-neutral-500 font-light">
                    {work.category}, {work.year}
                </p>
            </div>
        </motion.div>
    );
}

function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={dir === "prev" ? "Previous work" : "Next work"}
            className={[
                "absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-black md:flex",
                "border border-transparent transition-colors hover:border-neutral-200",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
                dir === "prev" ? "left-6" : "right-6",
            ].join(" ")}
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
            >
                <path d={dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
            </svg>
        </button>
    );
}
