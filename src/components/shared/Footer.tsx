import { memo } from "react";
import { motion } from "framer-motion";

// ─── Ornaments ─────────────────────────────────────────────────────────────────

const OrnamentalDivider = () => (
    <svg
        viewBox="0 0 320 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: 220, opacity: 0.5, display: "block", margin: "0 auto" }}
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

// Botanical corner — mirrored for left/right
const BottomSprig = ({ flip = false }: { flip?: boolean }) => (
    <svg
        viewBox="0 0 140 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
            width: 120,
            opacity: 0.18,
            transform: flip ? "scaleX(-1)" : undefined,
            display: "block",
            flexShrink: 0,
        }}
    >
        <path d="M10 55 C30 48, 65 38, 130 30" stroke="#5c4f30" strokeWidth="1.3" strokeLinecap="round" fill="none" />
        <path d="M50 45 C48 32, 44 22, 40 14" stroke="#5c4f30" strokeWidth="1" strokeLinecap="round" fill="none" />
        <ellipse cx="39" cy="11" rx="6" ry="9" fill="#8b7040" opacity=".5" transform="rotate(-15 39 11)" />
        <path d="M80 38 C78 26, 75 17, 72 10" stroke="#5c4f30" strokeWidth="1" strokeLinecap="round" fill="none" />
        <ellipse cx="71" cy="7" rx="5" ry="8" fill="#8b7040" opacity=".45" transform="rotate(-10 71 7)" />
        <path d="M107 33 C110 22, 114 14, 118 8" stroke="#5c4f30" strokeWidth="1" strokeLinecap="round" fill="none" />
        <ellipse cx="118" cy="5" rx="4" ry="7" fill="#8b7040" opacity=".4" transform="rotate(5 118 5)" />
        <ellipse cx="30" cy="51" rx="5" ry="3.5" fill="#8b7040" opacity=".3" transform="rotate(-5 30 51)" />
    </svg>
);

const SOCIAL_LINKS = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kien-vo-ngoc-min-2b3597275/" },
    { label: "Behance", href: "https://www.behance.net/nevwyn" },
    { label: "Dribbble", href: "https://dribbble.com/Nevwyn" },
    { label: "Instagram", href: "https://www.instagram.com/ktys4tt/" },
];

// ─── Component ─────────────────────────────────────────────────────────────────

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
                .ft-display { font-family: 'Playfair Display', Georgia, serif; }
                .ft-body    { font-family: 'Cormorant Garamond', Georgia, serif; }

                .ft-social-link {
                    font-family: 'Cormorant Garamond', Georgia, serif;
                    font-size: 11px;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: #8b7355;
                    text-decoration: none;
                    position: relative;
                    padding-bottom: 1px;
                    transition: color 0.2s;
                }
                .ft-social-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0; left: 0;
                    width: 0; height: 0.5px;
                    background: #4a3c28;
                    transition: width 0.25s ease;
                }
                .ft-social-link:hover { color: #2d2418; }
                .ft-social-link:hover::after { width: 100%; }

                .ft-email {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: clamp(22px, 3.5vw, 36px);
                    font-weight: 400;
                    font-style: italic;
                    color: #1e1a12;
                    text-decoration: none;
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    transition: color 0.2s;
                }
                .ft-email::after {
                    content: '';
                    position: absolute;
                    bottom: -2px; left: 0;
                    width: 0; height: 0.5px;
                    background: #8b7355;
                    transition: width 0.4s ease;
                }
                .ft-email:hover { color: #5c4f30; }
                .ft-email:hover::after { width: 100%; }

                .ft-back-top {
                    font-family: 'Cormorant Garamond', Georgia, serif;
                    font-size: 11px;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: #8b7355;
                    background: transparent;
                    border: 0.5px solid #c9b99a;
                    border-radius: 2px;
                    padding: 8px 14px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    transition: border-color 0.2s, color 0.2s, background 0.2s;
                }
                .ft-back-top:hover {
                    border-color: #8b7355;
                    color: #2d2418;
                    background: rgba(139,115,85,0.06);
                }
            `}</style>

            <footer
                style={{
                    background: "linear-gradient(180deg, #ede5d2 0%, #e6dcc8 100%)",
                    borderTop: "0.5px solid #d6c9b0",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Top connector line */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "1px",
                        height: "48px",
                        background: "linear-gradient(to bottom, #8b7355, transparent)",
                        opacity: 0.4,
                        pointerEvents: "none",
                    }}
                />

                {/* ── CTA Section ── */}
                <motion.div
                    className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    {/* Eyebrow */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div style={{ height: "0.5px", width: 40, background: "#8b7355", opacity: 0.45 }} />
                        <span
                            className="ft-body text-[#8b7355] tracking-[0.25em] uppercase"
                            style={{ fontSize: "11px" }}
                        >
                            Got a project in mind?
                        </span>
                        <div style={{ height: "0.5px", width: 40, background: "#8b7355", opacity: 0.45 }} />
                    </div>

                    {/* Headline */}
                    <h2
                        className="ft-display text-[#1e1a12] mb-10"
                        style={{
                            fontSize: "clamp(36px, 6vw, 64px)",
                            fontWeight: 500,
                            lineHeight: 1.1,
                            letterSpacing: "-.01em",
                        }}
                    >
                        Let's work together
                    </h2>

                    {/* Email CTA */}
                    <a href="mailto:elwairestudio@gmail.com" className="ft-email">
                        elwairestudio@gmail.com
                        <svg viewBox="0 0 16 16" fill="none" style={{ width: 18, marginTop: 2 }}>
                            <path
                                d="M3 13 L13 3 M13 3 H6 M13 3 V10"
                                stroke="#8b7355"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </a>
                </motion.div>

                {/* ── Ornamental Divider ── */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="pb-10"
                >
                    <OrnamentalDivider />
                </motion.div>

                {/* ── Bottom bar ── */}
                <motion.div
                    className="max-w-6xl mx-auto px-6 pb-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative">
                        {/* Sprig left */}
                        <div className="absolute left-0 bottom-0 pointer-events-none hidden lg:block">
                            <BottomSprig />
                        </div>
                        {/* Sprig right */}
                        <div className="absolute right-0 bottom-0 pointer-events-none hidden lg:block">
                            <BottomSprig flip />
                        </div>

                        {/* Copyright */}
                        <p className="ft-body text-[#8b7355]" style={{ fontSize: "12px", letterSpacing: "0.08em" }}>
                            © {currentYear} Ngoc Min. All rights reserved.
                        </p>

                        {/* Social links */}
                        <div className="flex items-center gap-6">
                            {SOCIAL_LINKS.map(({ label, href }, i) => (
                                <span key={label} className="flex items-center gap-6">
                                    <a href={href} target="_blank" rel="noopener noreferrer" className="ft-social-link">
                                        {label}
                                    </a>
                                    {i < SOCIAL_LINKS.length - 1 && (
                                        <svg
                                            viewBox="0 0 4 4"
                                            fill="none"
                                            style={{ width: 3, opacity: 0.35, flexShrink: 0 }}
                                        >
                                            <circle cx="2" cy="2" r="1.5" fill="#8b7355" />
                                        </svg>
                                    )}
                                </span>
                            ))}
                        </div>

                        {/* Back to top */}
                        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="ft-back-top">
                            Back to top
                            <svg viewBox="0 0 12 14" fill="none" style={{ width: 10 }}>
                                <path
                                    d="M6 13V2M1 6l5-5 5 5"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </motion.div>
            </footer>
        </>
    );
};

export default memo(Footer);
