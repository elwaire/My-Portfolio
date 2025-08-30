import { memo } from "react";
import type { Project } from "../../../types/project";
import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import PATHS from "../../../constants/paths";

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut", delay: i * 0.15 },
    }),
};

// Map style theo category
const categoryStyles: Record<Project["category"], string> = {
    uiux: "border-blue-200 bg-blue-50 hover:shadow-blue-200/60",
    graphic: "border-pink-200 bg-pink-50 hover:shadow-pink-200/60",
    art: "border-purple-200 bg-purple-50 hover:shadow-purple-200/60",
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    const styleClass = categoryStyles[project.category];

    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`flex flex-col rounded-2xl relative border overflow-hidden shadow-md cursor-pointer transition-all duration-300 ${styleClass}`}
        >
            {/* Wrapper cho ảnh */}
            <div className="relative overflow-hidden">
                <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[320px] object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                />
                <span className="absolute top-4 uppercase right-4 text-xs py-2 px-4 rounded-full bg-black/50 text-white">
                    {project.category}
                </span>
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/70 to-transparent" />
            </div>

            <div className="flex flex-col gap-2 p-4">
                <Link to={`${PATHS.PROJECT}/${project.id}`}>
                    <h3 className="text-lg font-semibold hover:underline">{project.title}</h3>
                </Link>
                <p className="text-gray-600 text-sm">{project.description}</p>
            </div>
        </motion.div>
    );
};

export default memo(ProjectCard);
