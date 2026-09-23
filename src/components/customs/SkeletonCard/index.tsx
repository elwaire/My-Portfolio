// components/ui/SkeletonCard.tsx
import { motion, type Variants } from "framer-motion";

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut", delay: i * 0.15 },
    }),
};

const SkeletonCard = ({ index }: { index: number }) => {
    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col relative  overflow-hidden "
        >
            {/* Image skeleton */}
            <div className="relative overflow-hidden">
                <div className="w-full h-[320px] bg-gray-200 animate-pulse" />
            </div>

            {/* Content skeleton */}
            <div className="flex flex-col gap-2 py-4">
                <div className="h-6 bg-gray-200  w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-100  w-full animate-pulse" />
            </div>
        </motion.div>
    );
};

export default SkeletonCard;
