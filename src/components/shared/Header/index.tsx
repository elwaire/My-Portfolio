import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";
import NavLinks from "./Navlinks";

NavLinks.displayName = "NavLinks";

// ─── Data ──────────────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
    {
        label: "Behance",
        href: "https://www.behance.net/nevwyn",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_qqzi1BPzHdE3Fbuz4a-qXyqIK7xsmr40lQ&s",
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/kien-vo-ngoc-min-2b3597275/",
        icon: "https://i.pinimg.com/736x/ce/1c/0d/ce1c0d86e2ce3bc78f268f38080d381b.jpg",
    },
    {
        label: "TikTok",
        href: "https://tiktok.com/@YOUR_HANDLE",
        icon: "https://i.pinimg.com/736x/55/45/a2/5545a2a9ce938ec70e0941cdd7a82105.jpg",
    },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

// Ornamental centerpiece trên border bottom header
const HeaderBorderOrnament = () => (
    <svg
        viewBox="0 0 120 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
            position: "absolute",
            bottom: -1,
            left: "50%",
            transform: "translateX(-50%)",
            width: 120,
            pointerEvents: "none",
        }}
    >
        <line x1="0" y1="6" x2="48" y2="6" stroke="#c9b99a" strokeWidth=".75" />
        <path
            d="M52 6 C54 3,57 1,60 1 C63 1,66 3,68 6 C66 9,63 11,60 11 C57 11,54 9,52 6Z"
            fill="#c9b99a"
            opacity=".5"
        />
        <circle cx="60" cy="6" r="2" fill="#8b7355" opacity=".6" />
        <line x1="72" y1="6" x2="120" y2="6" stroke="#c9b99a" strokeWidth=".75" />
    </svg>
);

// Social icon với frame nhất quán
const SocialIcons: React.FC<{ size?: "sm" | "md" }> = ({ size = "md" }) => {
    const dim = size === "sm" ? 26 : 28;
    return (
        <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: dim,
                        height: dim,
                        border: "0.5px solid #c9b99a",
                        borderRadius: "2px",
                        overflow: "hidden",
                        background: "#faf7f0",
                        transition: "border-color 0.2s, box-shadow 0.2s",
                        flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "#8b7355";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(30,26,18,.12)";
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "#c9b99a";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                >
                    <img
                        src={icon}
                        alt={label}
                        style={{ width: dim - 4, height: dim - 4, objectFit: "cover", display: "block" }}
                    />
                </a>
            ))}
        </div>
    );
};

// ─── Main Header ──────────────────────────────────────────────────────────────

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

                .nav-link-botanical {
                    font-family: 'Cormorant Garamond', Georgia, serif;
                    font-size: 11px;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: #4a3c28;
                    text-decoration: none;
                    padding: 4px 0;
                    position: relative;
                    transition: color 0.2s;
                }
                .nav-link-botanical::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 0.5px;
                    background: #8b7355;
                    transition: width 0.25s ease;
                }
                .nav-link-botanical:hover { color: #1e1a12; }
                .nav-link-botanical:hover::after { width: 100%; }

                .drawer-link-botanical {
                    font-family: 'Cormorant Garamond', Georgia, serif;
                    font-size: 22px;
                    font-weight: 400;
                    letter-spacing: 0.06em;
                    color: #2d2418;
                    text-decoration: none;
                    padding: 10px 0;
                    border-bottom: 0.5px solid #e8dece;
                    display: block;
                    transition: color 0.2s, padding-left 0.2s;
                }
                .drawer-link-botanical:hover {
                    color: #8b7355;
                    padding-left: 8px;
                }
            `}</style>

            <header
                className="fixed z-50 w-full"
                style={{
                    background: "rgba(247, 241, 232, 0.92)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    borderBottom: "0.5px solid #d6c9b0",
                }}
            >
                <div className="max-w-6xl mx-auto px-5 py-3.5 relative flex justify-between lg:justify-center items-center">
                    {/* Logo */}
                    <Logo className="lg:absolute lg:left-5" />

                    {/* Social Icons — desktop right */}
                    <div className="hidden lg:flex lg:absolute lg:right-5 items-center gap-3">
                        {/* Mini ornament before socials */}
                        <div style={{ height: "12px", width: "0.5px", background: "#c9b99a", opacity: 0.8 }} />
                        <SocialIcons />
                    </div>

                    {/* Hamburger — mobile */}
                    <motion.button
                        className="lg:hidden flex items-center justify-center"
                        onClick={() => setIsOpen(true)}
                        aria-label="Open menu"
                        whileTap={{ scale: 0.9 }}
                        style={{
                            width: 36,
                            height: 36,
                            border: "0.5px solid #c9b99a",
                            borderRadius: "2px",
                            background: "#faf7f0",
                            color: "#4a3c28",
                        }}
                    >
                        <Menu size={16} />
                    </motion.button>

                    {/* Nav Desktop */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {/* NavLinks nhận className để style, hoặc wrap ngoài */}
                        <NavLinks />
                    </nav>
                </div>
            </header>

            {/* ── Mobile Drawer ── */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40"
                            style={{ background: "rgba(30,26,18,0.35)", backdropFilter: "blur(2px)" }}
                        />

                        {/* Drawer */}
                        <motion.aside
                            key="drawer"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed inset-y-0 left-0 z-50 flex flex-col"
                            style={{
                                width: "min(320px, 85vw)",
                                background: "#f7f1e8",
                                borderRight: "0.5px solid #d6c9b0",
                                boxShadow: "4px 0 24px rgba(30,26,18,.15)",
                            }}
                        >
                            {/* Drawer header */}
                            <div
                                className="flex justify-between items-center px-5 py-4"
                                style={{ borderBottom: "0.5px solid #e0d4bc" }}
                            >
                                <Logo />
                                <motion.button
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Close menu"
                                    whileTap={{ scale: 0.9 }}
                                    style={{
                                        width: 32,
                                        height: 32,
                                        border: "0.5px solid #c9b99a",
                                        borderRadius: "2px",
                                        background: "transparent",
                                        color: "#4a3c28",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <X size={14} />
                                </motion.button>
                            </div>
                            {/* Nav links */}
                            <nav className="flex-1 px-5 pt-8 pb-4 flex flex-col">
                                {/* Eyebrow */}
                                <span
                                    style={{
                                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                                        fontSize: "10px",
                                        letterSpacing: "0.22em",
                                        textTransform: "uppercase",
                                        color: "#8b7355",
                                        marginBottom: "16px",
                                        display: "block",
                                    }}
                                >
                                    Navigation
                                </span>
                                <NavLinks onClick={() => setIsOpen(false)} />
                            </nav>
                            {/* Social footer */}
                            <div className="px-5 py-5" style={{ borderTop: "0.5px solid #e0d4bc" }}>
                                {/* Ornament */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div style={{ height: "0.5px", flex: 1, background: "#c9b99a", opacity: 0.6 }} />
                                    <svg viewBox="0 0 12 12" fill="none" style={{ width: 10, opacity: 0.5 }}>
                                        <circle cx="6" cy="6" r="2.5" fill="#8b7355" />
                                        <circle cx="6" cy="6" r="5" stroke="#8b7355" strokeWidth=".7" />
                                    </svg>
                                    <div style={{ height: "0.5px", flex: 1, background: "#c9b99a", opacity: 0.6 }} />
                                </div>
                                <p
                                    style={{
                                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                                        fontSize: "10px",
                                        letterSpacing: "0.2em",
                                        textTransform: "uppercase",
                                        color: "#8b7355",
                                        marginBottom: "10px",
                                    }}
                                >
                                    Find me on
                                </p>
                                <SocialIcons size="sm" />
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
