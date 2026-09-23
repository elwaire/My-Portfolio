import { memo, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "outline";
    size?: "sm" | "md" | "lg";
    children: ReactNode;
}

const Button = memo(({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center  transition cursor-pointer";

    const variants: Record<string, string> = {
        primary: "bg-gray-200 text-default hover:bg-black hover:text-white",
        outline: "border border-gray-300 text-black hover:bg-black hover:text-white hover:border-black",
    };

    const sizes: Record<string, string> = {
        sm: "px-3 py-2 text-sm ",
        md: "px-4 py-3 text-sm ",
        lg: "px-8 py-4 text-sm",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.5 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={clsx(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </motion.button>
    );
});

export default Button;
