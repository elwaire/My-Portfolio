import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import NavLinks from "./Navlinks";
import Logo from "./Logo";

NavLinks.displayName = "NavLinks";

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="border-b border-stroke-default bg-background lg:bg-transparent lg:border-none fixed z-50 w-full">
            <div className="max-w-6xl mx-auto px-4 py-4 lg:w-full relative flex justify-between lg:justify-center items-center">
                {/* Menu icon (Mobile) */}
                <Logo className="lg:absolute lg:left-4" />

                <button className="lg:hidden" onClick={() => setIsOpen(true)} aria-label="Open menu">
                    <Menu />
                </button>

                {/* Menu Desktop */}
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
                        className="fixed inset-0 bg-background  z-50 flex flex-col"
                    >
                        <div className="flex justify-between items-center p-4 border-b border-stroke-default">
                            <Logo />
                            <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                                <X className="" />
                            </button>
                        </div>
                        <div className="flex-1 p-4 flex flex-col gap-4 ">
                            <NavLinks onClick={() => setIsOpen(false)} />
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
