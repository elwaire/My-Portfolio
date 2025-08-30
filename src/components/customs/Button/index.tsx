import { memo, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "outline";
    size?: "sm" | "md" | "lg";
    children: ReactNode;
}

const Button = memo(({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center font-medium  transition cursor-pointer";

    const variants: Record<string, string> = {
        primary: "bg-gray-200 text-default hover:bg-black hover:text-white",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
    };

    const sizes: Record<string, string> = {
        sm: "px-3 py-2 text-sm rounded-lg",
        md: "px-4 py-2.5 text-base rounded-xl",
        lg: "px-8 py-4 text-lg",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.5 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={clsx(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </motion.button>
    );
});

export default Button;
