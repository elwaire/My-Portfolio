import { motion } from "framer-motion";
import { memo } from "react";
import { projectsData } from "../../../constants/projectData";
import ProjectCard from "../../../components/customs/ProjectCard";

// Main Section
const Projects = memo(() => {
    const hasProjects = projectsData.length > 0;

    return (
        <section className="w-full py-20">
            <div className="max-w-6xl mx-auto px-4">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-center mb-12"
                >
                    My Projects
                </motion.h2>

                {/* Project Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {hasProjects &&
                        projectsData.slice(0, 6).map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
                </div>
            </div>
        </section>
    );
});

Projects.displayName = "Projects";
export default Projects;
