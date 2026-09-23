import { memo } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { dataNavLink } from "../../../constants/paths";

interface NavLinksProps {
    onClick?: () => void;
    mobile?: boolean;
}

const NavLinks = memo(({ onClick, mobile }: NavLinksProps) => {
    return (
        <motion.div
            className={`flex gap-2  ${mobile ? "grid" : "flex"}`}
            initial={{
                opacity: 0,
                y: -20,
                scale: 0.8,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.6,
            }}
        >
            {dataNavLink.map((item, index) => (
                <NavLink key={`navlink-${index}`} to={item.path} onClick={onClick} className="relative">
                    {({ isActive }) => (
                        <motion.div
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className={` px-4   duration-150 group text-sm hover:bg-gray-100 relative ${mobile ? "py-3 " : "py-2 "} ${isActive && "bg-gray-100"}`}
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="active-pill"
                                    className="absolute inset-0 "
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <span
                                className={`relative z-10 group-hover:text-black ${
                                    isActive ? "text-black  " : "text-gray-400 text-light"
                                }`}
                            >
                                {item.label}
                            </span>
                        </motion.div>
                    )}
                </NavLink>
            ))}
        </motion.div>
    );
});

export default NavLinks;
