// components/sections/Projects.tsx
import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useMemo, useState } from "react";
import ProjectCard from "../../../../components/customs/ProjectCard";
import SkeletonCard from "../../../../components/customs/SkeletonCard";
import { useProjects } from "../../../../hooks/useProjects";

// Label hiển thị cho các category phổ biến
const CATEGORY_LABELS: Record<string, string> = {
    uiux: "UI/UX",
    graphic: "Graphic",
    art: "Art",
    branding: "Branding",
    motion: "Motion",
    illustration: "Illustration",
    web: "Web",
    mobile: "Mobile",
};

const getCategoryLabel = (cat: string) => CATEGORY_LABELS[cat] ?? cat.charAt(0).toUpperCase() + cat.slice(1);

const ProjectsSection = memo(() => {
    // Fetch tất cả projects, filter ở client
    const { projects: allProjects, loading, error } = useProjects();

    // Tự động extract các category có trong dữ liệu, ưu tiên category nhiều sản phẩm trước
    const categories = useMemo(() => {
        const countMap: Record<string, number> = {};
        for (const p of allProjects) {
            if (p.category) {
                countMap[p.category] = (countMap[p.category] ?? 0) + 1;
            }
        }
        return Object.keys(countMap).sort((a, b) => countMap[b] - countMap[a]);
    }, [allProjects]);

    // Active category — mặc định là category đầu tiên trong dữ liệu
    const [activeCategory, setActiveCategory] = useState<string>("");

    // Khi categories load xong, auto-select cái đầu tiên nếu chưa set
    const resolvedActive = useMemo(() => {
        if (activeCategory && categories.includes(activeCategory)) return activeCategory;
        return categories[0] ?? "";
    }, [activeCategory, categories]);

    const handleCategoryChange = useCallback((cat: string) => {
        setActiveCategory(cat);
    }, []);

    // Số lượng project theo từng category
    const countByCategory = useMemo(() => {
        const map: Record<string, number> = {};
        for (const p of allProjects) {
            map[p.category] = (map[p.category] ?? 0) + 1;
        }
        return map;
    }, [allProjects]);

    // Projects sau khi filter + sort pinned lên đầu
    const filteredProjects = useMemo(() => {
        if (!resolvedActive) return [];
        return [...allProjects]
            .filter((p) => p.category === resolvedActive)
            .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
    }, [allProjects, resolvedActive]);

    return (
        <section className="w-full py-20">
            <div className="max-w-7xl mx-auto px-4">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-3xl uppercase text-start mb-12"
                >
                    My Projects
                </motion.h2>

                {/* Loading State */}
                {loading && (
                    <>
                        {/* Skeleton tabs */}
                        <div className="flex flex-wrap justify-start gap-3 mb-10">
                            {Array.from({ length: 3 }, (_, i) => (
                                <div key={i} className="h-11 w-28  bg-gray-200 animate-pulse" />
                            ))}
                        </div>
                        {/* Skeleton cards */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {Array.from({ length: 6 }, (_, index) => (
                                <SkeletonCard key={index} index={index} />
                            ))}
                        </div>
                    </>
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
                        {/* Category Filter Tabs */}
                        {categories.length > 0 && (
                            <motion.div
                                className="flex flex-wrap justify-start font-light gap-3 mb-10"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                viewport={{ once: true }}
                            >
                                {categories.map((cat, i) => {
                                    const isActive = cat === resolvedActive;
                                    return (
                                        <motion.button
                                            key={cat}
                                            onClick={() => handleCategoryChange(cat)}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.06, duration: 0.3 }}
                                            className={`relative group px-4 py-2 cursor-pointer text-sm transition-all duration-300 transform overflow-hidden ${
                                                isActive
                                                    ? `bg-gradient-to-r bg-[#000000] text-white`
                                                    : "bg-white text-gray-600  border border-gray-200 hover:bg-black hover:text-white hover:border-black"
                                            }`}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                {getCategoryLabel(cat)}
                                                <span>({countByCategory[cat] ?? 0})</span>
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </motion.div>
                        )}

                        {/* Project Grid */}
                        <AnimatePresence mode="wait">
                            {filteredProjects.length > 0 ? (
                                <motion.div
                                    key={resolvedActive}
                                    className="grid md:grid-cols-2 gap-8"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -16 }}
                                    transition={{ duration: 0.35, ease: "easeInOut" }}
                                >
                                    {filteredProjects.map((project, index) => (
                                        <ProjectCard key={project.id} project={project} index={index} />
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    className="text-center py-24"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className="text-5xl mb-4">🎨</div>
                                    <p className="text-gray-500 text-sm font-light">
                                        No projects available in this category yet.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </div>
        </section>
    );
});

ProjectsSection.displayName = "Projects";
export default ProjectsSection;
