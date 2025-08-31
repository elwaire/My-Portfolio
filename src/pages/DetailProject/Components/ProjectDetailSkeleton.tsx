// components/ui/ProjectDetailSkeleton.tsx
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const ProjectDetailSkeleton: React.FC = () => {
    return (
        <motion.div
            className="min-h-screen flex flex-col items-center px-4 lg:px-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header Skeleton */}
            <motion.div className="w-full max-w-6xl py-16 text-center" variants={itemVariants}>
                {/* Title */}
                <div className="h-12 bg-gray-200 rounded-lg w-3/4 mx-auto mb-6 animate-pulse" />
                {/* Description */}
                <div className="space-y-3">
                    <div className="h-6 bg-gray-100 rounded w-5/6 mx-auto animate-pulse" />
                    <div className="h-6 bg-gray-100 rounded w-2/3 mx-auto animate-pulse" />
                </div>
                {/* Hero Image */}
                <div className="w-full h-96 bg-gray-200 rounded-2xl mt-8 animate-pulse" />
            </motion.div>

            <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-8 lg:gap-12 py-16">
                {/* Sidebar Skeleton */}
                <motion.aside className="w-full lg:w-1/4 space-y-6" variants={itemVariants}>
                    <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
                                <div className="h-5 bg-gray-300 rounded w-2/3 animate-pulse" />
                            </div>
                        ))}
                    </div>
                </motion.aside>

                {/* Main Content Skeleton */}
                <motion.main className="w-full lg:w-3/4 space-y-16" variants={itemVariants}>
                    {[1, 2, 3, 4].map((section) => (
                        <div key={section} className="space-y-6">
                            {/* Section Title */}
                            <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />

                            {/* Section Text */}
                            <div className="space-y-3">
                                <div className="h-5 bg-gray-100 rounded w-full animate-pulse" />
                                <div className="h-5 bg-gray-100 rounded w-5/6 animate-pulse" />
                                <div className="h-5 bg-gray-100 rounded w-4/5 animate-pulse" />
                            </div>

                            {/* Section Images */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[1, 2].map((img) => (
                                    <div key={img} className="h-64 bg-gray-200 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.main>
            </div>
        </motion.div>
    );
};

export default ProjectDetailSkeleton;
