// components/sections/Projects.tsx
import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import ProjectCard from "../../../../components/customs/ProjectCard";
import SkeletonCard from "../../../../components/customs/SkeletonCard";
import { useProjects } from "../../../../hooks/useProjects";

const ProjectsSection = memo(() => {
    const { projects: allProjects, loading, error } = useProjects();

    // Chỉ lấy 6 projects đầu tiên để show ở home
    const featuredProjects = useMemo(() => {
        return allProjects.slice(0, 6);
    }, [allProjects]);

    const hasProjects = featuredProjects.length > 0;

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

                {/* Loading State */}
                {loading && (
                    <div className="grid md:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }, (_, index) => (
                            <SkeletonCard key={index} index={index} />
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <motion.div
                        className="text-center py-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-red-500 mb-4">Failed to load projects</p>
                        <p className="text-gray-500 text-sm">{error}</p>
                    </motion.div>
                )}

                {/* Success State */}
                {!loading && !error && (
                    <>
                        {/* Project Grid */}
                        <div className="grid md:grid-cols-3 gap-8">
                            {hasProjects &&
                                featuredProjects.map((project, index) => (
                                    <ProjectCard key={project.id} project={project} index={index} />
                                ))}
                        </div>

                        {/* View All Button */}
                        {/* {hasProjects && (
                            <motion.div
                                className="text-center mt-12"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <Link to={PATHS.PROJECT}>
                                    <motion.button
                                        className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-300"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        View All Projects
                                    </motion.button>
                                </Link>
                            </motion.div>
                        )} */}

                        {/* Empty State */}
                        {!hasProjects && (
                            <motion.div
                                className="text-center py-12"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="text-6xl mb-4">🎨</div>
                                <p className="text-gray-500">No projects available yet.</p>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
});

ProjectsSection.displayName = "Projects";
export default ProjectsSection;
