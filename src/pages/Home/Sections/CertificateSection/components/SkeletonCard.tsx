import { memo } from "react";
import { motion } from "framer-motion";

const SkeletonCard = ({ index }: { index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="flex-shrink-0 snap-center w-[calc(33.333%-16px)] md:rounded-2xl rounded-xl overflow-hidden bg-gray-200 animate-pulse"
    >
        <div className="w-full h-56 bg-gray-300" />
        <div className="p-4">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-300 rounded w-1/2 mb-1" />
            <div className="h-3 bg-gray-300 rounded w-1/4" />
        </div>
    </motion.div>
);

export default memo(SkeletonCard);
