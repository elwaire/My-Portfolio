import { memo } from "react";
import { motion, type Variants } from "framer-motion";
import { Heart } from "lucide-react";
import type { ProjectHead } from "../../../types/project";
import { useProjectLike } from "../../../hooks/useProjectLike";

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.05,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

const imageVariants: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

interface ProjectHeaderProps {
    head: ProjectHead;
    projectId?: string;
    onImageClick?: (url: string) => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ head, projectId = "", onImageClick }) => {
    const { isLiked, isLiking, toggleLike } = useProjectLike(projectId, head.likes || 0);

    return (
        <motion.header
            className="w-full py-20 max-w-6xl"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="flex items-center justify-between mb-4 gap-4">
                {head.isPinned ? (
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-200/60 shadow-sm"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="rotate-45"
                        >
                            <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                        </svg>
                        <span>Featured Project</span>
                    </motion.div>
                ) : (
                    <div />
                )}

                {projectId && (
                    <motion.button
                        variants={itemVariants}
                        whileTap={{ scale: 0.88 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={toggleLike}
                        disabled={isLiking}
                        className={`flex justify-center items-center gap-2 w-[44px] h-[44px] rounded-full text-sm font-medium border transition-all duration-300 cursor-pointer select-none shadow-sm active:scale-95 ${
                            isLiked
                                ? "bg-rose-50/90 text-rose-600 border-rose-200 shadow-rose-100 hover:bg-rose-100/90"
                                : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900"
                        }`}
                        aria-label={isLiked ? "Unlike project" : "Like project"}
                    >
                        <Heart
                            className={`w-5 h-5 transition-all duration-300 ${
                                isLiked ? "fill-rose-500 text-rose-500 scale-110" : "text-neutral-400"
                            }`}
                        />
                    </motion.button>
                )}
            </div>

            <motion.h1 variants={itemVariants} className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                {head.title}
            </motion.h1>

            {head.description && (
                <motion.p variants={itemVariants} className="text-lg font-light text-neutral-600 mb-6 leading-relaxed">
                    {head.description}
                </motion.p>
            )}

            {head.projectLink && (
                <motion.a
                    variants={itemVariants}
                    href={head.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline mb-6 underline cursor-pointer hover:text-blue-800 inline-block"
                >
                    View Project
                </motion.a>
            )}

            {head.thumbnail && (
                <motion.div
                    variants={imageVariants}
                    className={`w-full aspect-[2/1] mt-6 overflow-hidden rounded-2xl ${
                        onImageClick ? "cursor-zoom-in group" : ""
                    }`}
                    onClick={() => onImageClick?.(head.thumbnail)}
                >
                    <img
                        src={head.thumbnail}
                        alt={head.title || "Project thumbnail"}
                        className="w-full h-full shadow-md object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                        loading="eager"
                    />
                </motion.div>
            )}
        </motion.header>
    );
};

export default memo(ProjectHeader);
