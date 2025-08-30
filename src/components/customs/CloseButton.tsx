import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface CloseButtonProps {
    className?: string;
    size?: "sm" | "md" | "lg";
    variant?: "default";
    onClick?: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ className = "", size = "md", variant = "default", onClick }) => {
    const navigate = useNavigate();

    const sizeClasses = {
        sm: "p-2",
        md: "p-4",
        lg: "p-6",
    };

    const variantClasses = {
        default: "bg-neutral-200 hover:bg-neutral-300",
    };

    const iconSizes = {
        sm: 16,
        md: 24,
        lg: 32,
    };

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate(-1); // Go back to previous page
        }
    };

    return (
        <motion.button
            onClick={handleClick}
            className={`
                rounded-full 
                ${sizeClasses[size]} 
                ${variantClasses[variant]}
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2
                ${className}
            `}
            whileHover={{
                scale: 1.05,
                rotate: 90,
            }}
            whileTap={{
                scale: 0.95,
                rotate: 180,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
            }}
        >
            <motion.div whileHover={{ rotate: 90 }} whileTap={{ rotate: 180 }} transition={{ duration: 0.2 }}>
                <X size={iconSizes[size]} />
            </motion.div>
        </motion.button>
    );
};

export default CloseButton;
