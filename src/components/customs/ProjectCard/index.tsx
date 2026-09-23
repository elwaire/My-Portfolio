import { memo } from "react";
import type { Project } from "../../../types/project";
import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import PATHS from "../../../constants/paths";
import { ArrowUpRight } from "lucide-react";

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut", delay: i * 0.15 },
    }),
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`flex flex-col  relative overflow-hidden  cursor-pointer transition-all duration-300 bg-white `}
        >
            {/* Wrapper cho ảnh */}
            <Link
                className="relative group overflow-hidden border border-gray-100"
                to={`${PATHS.PROJECT}/${project.id}`}
            >
                <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[320px] object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                />
                <span
                    className={`absolute top-4 uppercase right-4 text-xs py-2 px-4 rounded-full bg-black/50 text-white`}
                >
                    {project.category}
                </span>
                <div className="w-[44px] h-[44px] flex justify-center items-center rounded-full bg-white absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                    <ArrowUpRight />
                </div>
            </Link>

            <div className="flex flex-col gap-2 py-4">
                <Link to={`${PATHS.PROJECT}/${project.id}`}>
                    <h3 className="text-lg hover:underline">{project.title}</h3>
                </Link>
                <p className="text-gray-400 font-light line-clamp-2">{project.description}</p>
            </div>
        </motion.div>
    );
};

export default memo(ProjectCard);
