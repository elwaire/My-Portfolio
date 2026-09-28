import React, { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import PATHS from "../../../constants/paths";
import ProjectCard from "../../../components/customs/ProjectCard";
import SkeletonCard from "../../../components/customs/SkeletonCard";
import { useSuggestedProjects } from "../../../hooks/useSuggestedProjects";

interface SuggestedProjectsProps {
    currentProjectId: string;
    category?: string;
    limit?: number;
}

const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
            staggerChildren: 0.1,
        },
    },
};

const SuggestedProjects: React.FC<SuggestedProjectsProps> = ({ currentProjectId, category, limit = 3 }) => {
    const { suggestedProjects, loading } = useSuggestedProjects({
        currentProjectId,
        category,
        limit,
    });

    // Nếu không loading và không có project gợi ý nào thì không hiển thị section
    if (!loading && suggestedProjects.length === 0) {
        return null;
    }

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="w-full max-w-7xl pt-16 pb-20 border-t border-neutral-200 mt-12"
        >
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <h2 className="text-2xl   text-neutral-900 uppercase">Suggested Projects</h2>

                <Link
                    to={PATHS.PROJECT}
                    className="inline-flex items-center gap-2 text-sm font-light text-neutral-600 hover:text-black transition-colors group cursor-pointer w-fit"
                >
                    <span>View all projects</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </div>

            {/* Projects Grid / Skeleton State */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: limit }, (_, index) => (
                        <SkeletonCard key={index} index={index} />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {suggestedProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            )}
        </motion.section>
    );
};

export default memo(SuggestedProjects);
