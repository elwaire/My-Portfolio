import { memo, useCallback, useState } from "react";
import { motion } from "framer-motion";
import type { Certificate } from "../../../../../types/certificate";

const WaxSeal = () => (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 36, height: 36 }}>
        <circle cx="18" cy="18" r="15" fill="#c9a870" opacity=".22" />
        <circle cx="18" cy="18" r="11" stroke="#8b7040" strokeWidth=".9" fill="none" />
        <circle cx="18" cy="18" r="6" fill="#c9a870" opacity=".30" />
        <path
            d="M15 18 L17.2 20.2 L21 16"
            stroke="#6b5030"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const CertificateCard = ({ cert, index }: { cert: Certificate; index: number }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = useCallback(() => setImageLoaded(true), []);
    const handleImageError = useCallback(() => {
        setImageError(true);
        setImageLoaded(true);
    }, []);
    const handleCardClick = useCallback(() => {
        if (cert.link && cert.link !== "#") window.open(cert.link, "_blank");
    }, [cert.link]);

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-30px" }}
            whileHover={{ y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
            onClick={handleCardClick}
            className="flex-shrink-0 w-full h-full flex flex-col cursor-pointer select-none"
            style={{
                background: "#faf7f0",
                border: "0.5px solid #c9b99a",
                borderRadius: "2px",
                boxShadow: "0 2px 8px rgba(30,26,18,.08)",
                transition: "box-shadow 0.28s ease",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 28px rgba(30,26,18,.13)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(30,26,18,.08)";
            }}
        >
            {/* ── Thumbnail ── */}
            <div className="relative overflow-hidden" style={{ height: "180px", borderRadius: "2px 2px 0 0" }}>
                {/* Loading skeleton */}
                {!imageLoaded && !imageError && (
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ background: "#ede5d2" }}
                    >
                        <motion.div
                            animate={{ opacity: [0.4, 0.9, 0.4] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <WaxSeal />
                        </motion.div>
                    </div>
                )}

                {/* Error fallback */}
                {imageError ? (
                    <div
                        className="w-full h-full flex flex-col items-center justify-center gap-2"
                        style={{ background: "#ede5d2" }}
                    >
                        <WaxSeal />
                        <span
                            style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontSize: "11px",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                color: "#8b7355",
                                opacity: 0.7,
                            }}
                        >
                            No preview
                        </span>
                    </div>
                ) : (
                    <motion.img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover"
                        style={{
                            opacity: imageLoaded ? 1 : 0,
                            transition: "opacity 0.35s ease",
                            display: "block",
                        }}
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        loading="lazy"
                    />
                )}

                {/* Gradient fade bottom */}
                <div
                    className="absolute inset-x-0 bottom-0 pointer-events-none"
                    style={{ height: "64px", background: "linear-gradient(to top, #faf7f0, transparent)" }}
                />
            </div>

            {/* ── Body ── */}
            <div className="flex flex-col gap-2 px-5 pt-4 pb-5">
                {/* Issuer */}
                <div className="flex items-center justify-between">
                    <span
                        style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: "10px",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "#8b7355",
                        }}
                    >
                        {cert.issuer}
                    </span>
                    <WaxSeal />
                </div>

                {/* Divider */}
                <div style={{ height: "0.5px", background: "#c9b99a", opacity: 0.7 }} />

                {/* Title */}
                <h3
                    style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "#1e1a12",
                        lineHeight: 1.35,
                        margin: 0,
                    }}
                >
                    {cert.title}
                </h3>

                {/* Date + link row */}
                <div className="flex items-center justify-between mt-1">
                    <span
                        style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: "12px",
                            fontStyle: "italic",
                            color: "#8b7355",
                        }}
                    >
                        {cert.date}
                    </span>

                    {cert.link && cert.link !== "#" && (
                        <span
                            className="flex items-center gap-1"
                            style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontSize: "10px",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                color: "#5c5040",
                            }}
                        >
                            View
                            <svg viewBox="0 0 16 16" fill="none" style={{ width: 10 }}>
                                <path
                                    d="M3 8h10M9 4l4 4-4 4"
                                    stroke="#5c5040"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    )}
                </div>
            </div>
        </motion.article>
    );
};

export default memo(CertificateCard);
