// components/sections/BannerSection.tsx
import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useBanner } from "../../../../hooks/useBanner";
import NoData from "./components/NoData";
import Loading from "./components/Loading";

// ─── Botanical SVG Ornaments ─────────────────────────────────────────────────

const BranchLeft = () => (
    <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-36 md:w-48 opacity-60">
        <path
            d="M150 70 C120 65, 80 50, 40 55 C20 58, 5 65, 2 70"
            stroke="#6b5e3f"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
        />
        <path d="M80 55 C75 40, 65 28, 55 20" stroke="#6b5e3f" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M55 20 C50 15, 42 12, 38 8" stroke="#6b5e3f" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M55 20 C60 14, 65 10, 70 6" stroke="#6b5e3f" strokeWidth="1" strokeLinecap="round" fill="none" />
        <ellipse cx="38" cy="7" rx="6" ry="9" fill="#8b7355" opacity="0.5" transform="rotate(-20 38 7)" />
        <ellipse cx="70" cy="5" rx="5" ry="8" fill="#8b7355" opacity="0.5" transform="rotate(15 70 5)" />
        <path d="M110 58 C105 45, 95 35, 88 28" stroke="#6b5e3f" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <ellipse cx="87" cy="25" rx="5" ry="8" fill="#8b7355" opacity="0.4" transform="rotate(-10 87 25)" />
        <path d="M40 57 C35 44, 28 34, 22 26" stroke="#6b5e3f" strokeWidth="1" strokeLinecap="round" fill="none" />
        <ellipse cx="20" cy="23" rx="4" ry="7" fill="#8b7355" opacity="0.4" transform="rotate(5 20 23)" />
        <circle cx="2" cy="70" r="3" fill="#8b7355" opacity="0.4" />
        <circle cx="10" cy="68" r="2.5" fill="#a09060" opacity="0.35" />
    </svg>
);

const BranchRight = () => (
    <svg
        viewBox="0 0 160 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-36 md:w-48 opacity-60 scale-x-[-1]"
    >
        <path
            d="M150 70 C120 65, 80 50, 40 55 C20 58, 5 65, 2 70"
            stroke="#6b5e3f"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
        />
        <path d="M80 55 C75 40, 65 28, 55 20" stroke="#6b5e3f" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <path d="M55 20 C50 15, 42 12, 38 8" stroke="#6b5e3f" strokeWidth="1" strokeLinecap="round" fill="none" />
        <path d="M55 20 C60 14, 65 10, 70 6" stroke="#6b5e3f" strokeWidth="1" strokeLinecap="round" fill="none" />
        <ellipse cx="38" cy="7" rx="6" ry="9" fill="#8b7355" opacity="0.5" transform="rotate(-20 38 7)" />
        <ellipse cx="70" cy="5" rx="5" ry="8" fill="#8b7355" opacity="0.5" transform="rotate(15 70 5)" />
        <path d="M110 58 C105 45, 95 35, 88 28" stroke="#6b5e3f" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <ellipse cx="87" cy="25" rx="5" ry="8" fill="#8b7355" opacity="0.4" transform="rotate(-10 87 25)" />
        <path d="M40 57 C35 44, 28 34, 22 26" stroke="#6b5e3f" strokeWidth="1" strokeLinecap="round" fill="none" />
        <ellipse cx="20" cy="23" rx="4" ry="7" fill="#8b7355" opacity="0.4" transform="rotate(5 20 23)" />
        <circle cx="2" cy="70" r="3" fill="#8b7355" opacity="0.4" />
        <circle cx="10" cy="68" r="2.5" fill="#a09060" opacity="0.35" />
    </svg>
);

const OrnamentalDivider = () => (
    <svg
        viewBox="0 0 320 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-48 md:w-64 opacity-50 mx-auto"
    >
        <line x1="0" y1="10" x2="130" y2="10" stroke="#8b7355" strokeWidth="0.75" />
        <path
            d="M140 10 C143 5, 148 3, 155 3 C162 3, 165 5, 160 10 C165 15, 162 17, 155 17 C148 17, 143 15, 140 10Z"
            fill="#8b7355"
            opacity="0.6"
        />
        <circle cx="160" cy="10" r="3" fill="#8b7355" opacity="0.7" />
        <path
            d="M165 10 C168 5, 173 3, 180 3 C187 3, 190 5, 185 10 C190 15, 187 17, 180 17 C173 17, 168 15, 165 10Z"
            fill="#8b7355"
            opacity="0.6"
            transform="scale(-1,1) translate(-320,0)"
        />
        <line x1="190" y1="10" x2="320" y2="10" stroke="#8b7355" strokeWidth="0.75" />
        <circle cx="0" cy="10" r="2" fill="#8b7355" opacity="0.5" />
        <circle cx="320" cy="10" r="2" fill="#8b7355" opacity="0.5" />
    </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const BannerSection = memo(() => {
    const { bannerSettings, loading } = useBanner();

    const artworkData = useMemo(() => {
        if (!bannerSettings?.images) return [];
        const rotations = [-12, -7, -2, 4, 9];
        return bannerSettings.images.map((image, index) => ({
            id: index + 1,
            image,
            rotation: rotations[index] ?? 0,
        }));
    }, [bannerSettings?.images]);

    if (loading) return <Loading />;
    if (!bannerSettings) return <NoData />;

    const centerIndex = Math.floor(artworkData.length / 2);

    return (
        <>
            {/* Google Fonts */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
                .hero-title { font-family: 'Playfair Display', Georgia, serif; }
                .hero-body  { font-family: 'Cormorant Garamond', Georgia, serif; }
                .btn-primary {
                    font-family: 'Cormorant Garamond', Georgia, serif;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    font-size: 0.75rem;
                    font-weight: 400;
                }
            `}</style>

            <section className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 py-24 overflow-hidden">
                {/* Main content */}
                <div className="relative max-w-5xl mx-auto text-center w-full z-10">
                    {/* Badge / Label */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="mb-6 flex items-center justify-center gap-3"
                    >
                        <div className="h-px w-12 bg-[#8b7355]/40" />
                        <span className="hero-body text-[#8b7355] tracking-[0.25em] uppercase text-xs">Portfolio</span>
                        <div className="h-px w-12 bg-[#8b7355]/40" />
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.35 }}
                        className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-[#1e1a12] leading-[1.05] tracking-tight mb-2"
                    >
                        {bannerSettings.title}
                    </motion.h1>

                    {/* Ornamental Divider */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.65 }}
                        className="mt-6 mb-10"
                    >
                        <OrnamentalDivider />
                    </motion.div>

                    {/* Artwork Cards Stack */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="relative mb-14 flex items-center justify-center w-full"
                        style={{ height: "260px" }}
                    >
                        {artworkData.map((artwork, index) => {
                            const offset = index - centerIndex;
                            const desktopX = offset * 150;
                            const mobileX = offset * 75;
                            const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

                            return (
                                <motion.div
                                    key={artwork.id}
                                    initial={{ opacity: 0, y: 60, rotate: 0, scale: 0.7 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        rotate: artwork.rotation,
                                        x: isMobile ? mobileX : desktopX,
                                        scale: 1,
                                    }}
                                    transition={{
                                        duration: 0.7,
                                        delay: 0.9 + index * 0.1,
                                        type: "spring",
                                        stiffness: 80,
                                        damping: 14,
                                    }}
                                    whileHover={{
                                        scale: 1.08,
                                        rotate: 0,
                                        zIndex: 20,
                                        y: -18,
                                        transition: { duration: 0.25, ease: "easeOut" },
                                    }}
                                    className="absolute cursor-pointer"
                                    style={{
                                        zIndex: artworkData.length - Math.abs(offset),
                                        width: isMobile ? "110px" : "176px",
                                        height: isMobile ? "110px" : "176px",
                                    }}
                                >
                                    {/* Polaroid-style frame */}
                                    <div
                                        className="w-full h-full flex flex-col rounded-sm overflow-hidden"
                                        style={{
                                            background: "#faf7f0",
                                            padding: "6px 6px 22px 6px",
                                            boxShadow: "0 4px 12px rgba(30,26,18,0.18), 0 1px 3px rgba(30,26,18,0.12)",
                                        }}
                                    >
                                        <img
                                            src={artwork.image}
                                            alt={`Artwork ${index + 1}`}
                                            className="w-full flex-1 object-cover h-full"
                                            loading="lazy"
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.3 }}
                        className="hero-body text-[#5c5040] text-lg sm:text-xl leading-relaxed max-w-xl mx-auto mb-10 italic font-light"
                    >
                        {bannerSettings.description}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <a
                            href="#contact"
                            className="btn-primary w-full sm:w-auto px-8 py-3.5 inline-block text-center no-underline transition-all duration-300"
                            style={{
                                background: "#2d2418",
                                color: "#f0e8d5",
                                border: "1px solid #2d2418",
                                borderRadius: "2px",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "#4a3c28";
                                (e.currentTarget as HTMLElement).style.borderColor = "#4a3c28";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "#2d2418";
                                (e.currentTarget as HTMLElement).style.borderColor = "#2d2418";
                            }}
                        >
                            Contact Me
                        </a>

                        <a
                            href="https://drive.google.com/drive/folders/1RUchOcrtVbB5r7DjFqqHt1f0puRd65xn?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary w-full sm:w-auto px-8 py-3.5 inline-block text-center no-underline transition-all duration-300"
                            style={{
                                background: "transparent",
                                color: "#4a3c28",
                                border: "1px solid #8b7355",
                                borderRadius: "2px",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "#2d2418";
                                (e.currentTarget as HTMLElement).style.color = "#f0e8d5";
                                (e.currentTarget as HTMLElement).style.borderColor = "#2d2418";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.background = "transparent";
                                (e.currentTarget as HTMLElement).style.color = "#4a3c28";
                                (e.currentTarget as HTMLElement).style.borderColor = "#8b7355";
                            }}
                        >
                            Download CV
                        </a>
                    </motion.div>
                </div>
            </section>
        </>
    );
});

BannerSection.displayName = "BannerSection";
export default BannerSection;
