// components/sections/Certificate.tsx
import { motion } from "framer-motion";
import { memo } from "react";
import { useCertificates } from "../../../../hooks/useCertificates";
import SkeletonCard from "./components/SkeletonCard";
import CertificateCard from "./components/CertificateCard";

// ─── Ornaments ─────────────────────────────────────────────────────────────────

const OrnamentalDivider = () => (
    <svg
        viewBox="0 0 320 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: 220, opacity: 0.55, display: "block", margin: "0 auto" }}
    >
        <line x1="0" y1="10" x2="128" y2="10" stroke="#8b7355" strokeWidth=".75" />
        <path
            d="M138 10 C141 5,146 3,153 3 C160 3,163 6,158 10 C163 14,160 17,153 17 C146 17,141 15,138 10Z"
            fill="#8b7355"
            opacity=".6"
        />
        <circle cx="158" cy="10" r="3" fill="#8b7355" opacity=".7" />
        <path
            d="M168 10 C171 5,176 3,183 3 C190 3,193 6,188 10 C193 14,190 17,183 17 C176 17,171 15,168 10Z"
            fill="#8b7355"
            opacity=".6"
        />
        <line x1="193" y1="10" x2="320" y2="10" stroke="#8b7355" strokeWidth=".75" />
        <circle cx="0" cy="10" r="2" fill="#8b7355" opacity=".45" />
        <circle cx="320" cy="10" r="2" fill="#8b7355" opacity=".45" />
    </svg>
);

// Scroll ornament — dùng cho empty state và section icon
const ScrollSvg = () => (
    <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: 52, margin: "0 auto 16px", opacity: 0.32, display: "block" }}
    >
        <rect x="8" y="12" width="48" height="40" rx="3" stroke="#6b5e3f" strokeWidth="1.2" fill="none" />
        <path
            d="M8 18 C8 14, 4 12, 4 16 C4 20, 8 20, 8 24"
            stroke="#6b5e3f"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
        />
        <path
            d="M56 18 C56 14, 60 12, 60 16 C60 20, 56 20, 56 24"
            stroke="#6b5e3f"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
        />
        <line x1="18" y1="28" x2="46" y2="28" stroke="#8b7355" strokeWidth="1" strokeLinecap="round" />
        <line x1="18" y1="34" x2="46" y2="34" stroke="#8b7355" strokeWidth="1" strokeLinecap="round" opacity=".6" />
        <line x1="18" y1="40" x2="36" y2="40" stroke="#8b7355" strokeWidth="1" strokeLinecap="round" opacity=".4" />
        {/* Wax seal */}
        <circle cx="46" cy="42" r="7" fill="#c9a870" opacity=".35" />
        <circle cx="46" cy="42" r="5" stroke="#8b7040" strokeWidth=".8" fill="none" />
        <path d="M43 42 L45 44 L49 40" stroke="#6b5030" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// ─── Main Component ────────────────────────────────────────────────────────────

const CertificateSection = memo(() => {
    const { certificates, loading } = useCertificates();
    const isEmpty = !loading && certificates.length === 0;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
                .cert-title { font-family: 'Playfair Display', Georgia, serif; }
                .cert-body  { font-family: 'Cormorant Garamond', Georgia, serif; }

                /* Hide scrollbar cross-browser */
                .cert-carousel { scrollbar-width: none; -ms-overflow-style: none; }
                .cert-carousel::-webkit-scrollbar { display: none; }
            `}</style>

            <section id="certificates" className="relative w-full py-24 overflow-hidden">
                {/* Top border */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 pointer-events-none"
                    style={{ background: "linear-gradient(to bottom, transparent, #8b7355, transparent)" }}
                />

                <div className="max-w-6xl mx-auto px-4">
                    {/* ── Header ── */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        {/* Eyebrow */}
                        <div className="flex items-center justify-center gap-3 mb-4">
                            {/* Mini wax seal icon */}
                            <svg viewBox="0 0 20 20" fill="none" style={{ width: 16, opacity: 0.45 }}>
                                <circle cx="10" cy="10" r="8" stroke="#8b7355" strokeWidth=".9" fill="none" />
                                <circle cx="10" cy="10" r="4.5" fill="#c9a870" opacity=".4" />
                                <path
                                    d="M8 10 L9.5 11.5 L12.5 8.5"
                                    stroke="#6b5030"
                                    strokeWidth=".9"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span
                                className="cert-body text-[#8b7355] tracking-[0.25em] uppercase"
                                style={{ fontSize: "11px" }}
                            >
                                Credentials
                            </span>
                            <svg
                                viewBox="0 0 20 20"
                                fill="none"
                                style={{ width: 16, opacity: 0.45, transform: "scaleX(-1)" }}
                            >
                                <circle cx="10" cy="10" r="8" stroke="#8b7355" strokeWidth=".9" fill="none" />
                                <circle cx="10" cy="10" r="4.5" fill="#c9a870" opacity=".4" />
                                <path
                                    d="M8 10 L9.5 11.5 L12.5 8.5"
                                    stroke="#6b5030"
                                    strokeWidth=".9"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <h2 className="cert-title text-4xl sm:text-5xl md:text-6xl font-medium text-[#1e1a12] leading-tight mb-5">
                            Certificates
                        </h2>

                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <OrnamentalDivider />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            viewport={{ once: true }}
                            className="cert-body mt-6 text-[#5c5040] italic"
                            style={{ fontSize: "16px", fontWeight: 300 }}
                        >
                            Credentials earned through study and professional practice.
                        </motion.p>
                    </motion.div>

                    {/* ── Grid 3 cột ── */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {loading
                            ? Array.from({ length: 6 }).map((_, i) => (
                                  <motion.div
                                      key={i}
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: i * 0.08 }}
                                      className="h-full"
                                  >
                                      <SkeletonCard index={i} />
                                  </motion.div>
                              ))
                            : certificates.slice(0, 6).map((cert, index) => (
                                  <motion.div
                                      key={cert.id}
                                      className="h-full"
                                      initial={{ opacity: 0, y: 24 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      transition={{
                                          duration: 0.55,
                                          delay: index * 0.1,
                                          ease: [0.22, 1, 0.36, 1] as const,
                                      }}
                                      viewport={{ once: true, margin: "-40px" }}
                                  >
                                      <CertificateCard cert={cert} index={index} />
                                  </motion.div>
                              ))}
                    </div>

                    {/* ── Empty State ── */}
                    {isEmpty && (
                        <motion.div
                            className="text-center py-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <ScrollSvg />
                            <p className="cert-title text-xl text-[#4a3c28] mb-2">No certificates yet</p>
                            <p className="cert-body text-[#8b7355] italic" style={{ fontSize: "15px" }}>
                                In progress — achievements coming soon.
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>
        </>
    );
});

CertificateSection.displayName = "Certificate";
export default CertificateSection;
