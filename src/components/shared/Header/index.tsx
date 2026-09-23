import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import NavLinks from "./Navlinks";

NavLinks.displayName = "NavLinks";

const SOCIAL_LINKS = [
    {
        label: "Behance",
        href: "https://www.behance.net/nevwyn",
        icon: "https://cdn-icons-png.flaticon.com/512/51/51916.png",
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/kien-vo-ngoc-min-2b3597275/",
        icon: "https://img.icons8.com/win8/1200/linkedin.jpg",
    },
    {
        label: "TikTok",
        href: "https://www.tiktok.com/@min_ktys4tt",
        icon: "https://i.pinimg.com/736x/55/45/a2/5545a2a9ce938ec70e0941cdd7a82105.jpg",
    },
];

const SocialIcons: React.FC = () => (
    <div className="flex items-center gap-2">
        {SOCIAL_LINKS.map(({ label, href, icon }) => (
            <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className=" overflow-hidden rounded-md opacity-50 hover:opacity-100 transition-opacity duration-300"
            >
                <img src={icon} alt={label} width={28} />
            </a>
        ))}
    </div>
);

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed z-50 w-full transition-all duration-300 border-gray-100 ${
                isScrolled ? "bg-white border-b  shadow-xs" : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 lg:w-full relative flex justify-between lg:justify-center items-center">
                {/* Logo */}
                <Logo />

                {/* Social Icons (Desktop) — right side */}
                <div className="hidden lg:flex lg:absolute lg:right-4">
                    <SocialIcons />
                </div>

                {/* Hamburger (Mobile) */}
                <button className="lg:hidden" onClick={() => setIsOpen(true)} aria-label="Open menu">
                    <Menu />
                </button>

                {/* Nav Desktop */}
                <nav className="hidden lg:flex gap-4 lg:gap-2 lg:absolute lg:left-0">
                    <NavLinks />
                </nav>
            </div>

            {/* Drawer Mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed inset-0 bg-white z-50 flex flex-col"
                    >
                        <div className="flex justify-between items-center p-4 border-b border-stroke-default">
                            <Logo />
                            <button
                                onClick={() => setIsOpen(false)}
                                aria-label="Close menu"
                                className="cursor-pointer duration-150 hover:bg-gray-100 p-2"
                            >
                                <X strokeWidth={1.5} />
                            </button>
                        </div>
                        <div className="flex-1 p-4 flex flex-col gap-4">
                            <NavLinks onClick={() => setIsOpen(false)} mobile />
                        </div>

                        {/* Social Icons (Mobile Drawer) */}
                        <div className="p-4 border-t border-stroke-default">
                            <p className="text-xs uppercase text-gray-400 mb-3">Find me on</p>
                            <SocialIcons />
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
