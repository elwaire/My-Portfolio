import { memo } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { dataNavLink } from "../../../constants/paths";

const NavLinks = memo(({ onClick }: { onClick?: () => void }) => {
    return (
        <motion.div
            className="flex gap-2 p-2 rounded-2xl"
            style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
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
                            className="px-4 py-2 text-sm rounded-md relative"
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="active-pill"
                                    className="absolute inset-0 rounded-xl"
                                    style={{
                                        background: "rgba(255, 255, 255, 0.2)",
                                        backdropFilter: "blur(10px)",
                                        WebkitBackdropFilter: "blur(10px)",
                                        border: "1px solid rgba(255, 255, 255, 0.3)",
                                    }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                            <span
                                className={`relative z-10 ${
                                    isActive ? "text-gray-800 font-semibold" : "text-gray-400 text-light"
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
