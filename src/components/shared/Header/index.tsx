import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";
import NavLinks from "./Navlinks";

NavLinks.displayName = "NavLinks";

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
                className="rounded-lg overflow-hidden"
            >
                <img src={icon} alt={label} width={32} />
            </a>
        ))}
    </div>
);

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="border-b border-stroke-default bg-background lg:bg-transparent lg:border-none fixed z-50 w-full">
            <div className="max-w-6xl mx-auto px-4 py-4 lg:w-full relative flex justify-between lg:justify-center items-center">
                {/* Logo */}
                <Logo className="lg:absolute lg:left-4" />

                {/* Social Icons (Desktop) — right side */}
                <div className="hidden lg:flex lg:absolute lg:right-4">
                    <SocialIcons />
                </div>

                {/* Hamburger (Mobile) */}
                <button className="lg:hidden" onClick={() => setIsOpen(true)} aria-label="Open menu">
                    <Menu />
                </button>

                {/* Nav Desktop */}
                <nav className="hidden lg:flex gap-4 lg:gap-2">
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
                        className="fixed inset-0 bg-background z-50 flex flex-col"
                    >
                        <div className="flex justify-between items-center p-4 border-b border-stroke-default">
                            <Logo />
                            <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                                <X />
                            </button>
                        </div>
                        <div className="flex-1 p-4 flex flex-col gap-4">
                            <NavLinks onClick={() => setIsOpen(false)} />
                        </div>

                        {/* Social Icons (Mobile Drawer) */}
                        <div className="p-4 border-t border-stroke-default">
                            <p className="text-xs text-gray-400 mb-3">Find me on</p>
                            <SocialIcons />
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
