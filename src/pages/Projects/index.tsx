// pages/ProjectsPage.tsx
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useMemo, useState } from "react";
import ProjectCard from "../../components/customs/ProjectCard";
import SkeletonCard from "../../components/customs/SkeletonCard";
import { useProjects } from "../../hooks/useProjects";

// Màu gradient cho các category — khớp với ProjectsSection
const CATEGORY_GRADIENTS: Record<string, { gradient: string; badge: string }> = {
    uiux: { gradient: "from-blue-500 to-indigo-600", badge: "bg-white/20 text-white" },
    graphic: { gradient: "from-emerald-500 to-teal-600", badge: "bg-white/20 text-white" },
    art: { gradient: "from-purple-500 to-violet-600", badge: "bg-white/20 text-white" },
    branding: { gradient: "from-orange-500 to-amber-600", badge: "bg-white/20 text-white" },
    motion: { gradient: "from-pink-500 to-rose-600", badge: "bg-white/20 text-white" },
    illustration: { gradient: "from-yellow-500 to-orange-500", badge: "bg-white/20 text-white" },
    web: { gradient: "from-cyan-500 to-sky-600", badge: "bg-white/20 text-white" },
    mobile: { gradient: "from-fuchsia-500 to-purple-600", badge: "bg-white/20 text-white" },
};

const DEFAULT_GRADIENT = { gradient: "from-gray-500 to-gray-700", badge: "bg-white/20 text-white" };

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

const getCategoryStyle = (cat: string) => CATEGORY_GRADIENTS[cat] ?? DEFAULT_GRADIENT;
const getCategoryLabel = (cat: string) => CATEGORY_LABELS[cat] ?? cat.charAt(0).toUpperCase() + cat.slice(1);

const ProjectsPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>("");

    // Fetch tất cả projects một lần, filter ở client
    const { projects: allProjects, loading, error, refetch } = useProjects();

    // Extract categories, sort theo số lượng project giảm dần
    const categories = useMemo(() => {
        const countMap: Record<string, number> = {};
        for (const p of allProjects) {
            if (p.category) {
                countMap[p.category] = (countMap[p.category] ?? 0) + 1;
            }
        }
        return Object.keys(countMap).sort((a, b) => countMap[b] - countMap[a]);
    }, [allProjects]);

    // Số lượng project theo từng category
    const countByCategory = useMemo(() => {
        const map: Record<string, number> = {};
        for (const p of allProjects) {
            map[p.category] = (map[p.category] ?? 0) + 1;
        }
        return map;
    }, [allProjects]);

    // Active category — auto-select cái đầu tiên (nhiều nhất) nếu chưa set
    const resolvedActive = useMemo(() => {
        if (activeCategory && categories.includes(activeCategory)) return activeCategory;
        return categories[0] ?? "";
    }, [activeCategory, categories]);

    const handleCategoryChange = useCallback((cat: string) => {
        setActiveCategory(cat);
    }, []);

    // Filter + sort pinned lên đầu
    const filteredProjects = useMemo(() => {
        if (!resolvedActive) return [];
        return [...allProjects]
            .filter((p) => p.category === resolvedActive)
            .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));
    }, [allProjects, resolvedActive]);

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <div className="min-h-screen px-6 py-16 max-w-7xl mx-auto w-full">
                    <div className="h-10 bg-gray-200 rounded-lg w-64 mx-auto mb-12 animate-pulse" />
                    <div className="flex justify-center gap-3 mb-12">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="h-9 bg-gray-200 rounded-full w-24 animate-pulse" />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }, (_, index) => (
                            <SkeletonCard key={index} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <p className="text-red-500 mb-4">Error: {error}</p>
                    <button onClick={refetch} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center">
            <div className="min-h-screen px-6 py-16 max-w-7xl mx-auto w-full">
                <h1 className="text-4xl font-bold text-center mt-12 mb-12">My Projects</h1>

                {/* Category Filter Tabs */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((cat, i) => {
                            const style = getCategoryStyle(cat);
                            const isActive = cat === resolvedActive;
                            return (
                                <motion.button
                                    key={cat}
                                    onClick={() => handleCategoryChange(cat)}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.06, duration: 0.3 }}
                                    className={`relative group pl-4 pr-2 py-2 cursor-pointer rounded-full font-medium text-xs transition-all duration-300 transform overflow-hidden ${
                                        isActive
                                            ? `bg-[#101010] text-white shadow-lg scale-105`
                                            : "bg-white text-gray-600 hover:shadow-md shadow-sm border border-gray-200 hover:border-gray-300"
                                    }`}
                                    whileHover={{ scale: isActive ? 1.05 : 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    {/* Glow effect khi active */}
                                    {isActive && (
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-r ${style.gradient} rounded-full blur-xl opacity-25 animate-pulse`}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        {getCategoryLabel(cat)}
                                        <span
                                            className={`w-[20px] h-[20px] text-xs font-medium rounded-full transition-all duration-300 flex items-center justify-center ${
                                                isActive
                                                    ? style.badge
                                                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                                            }`}
                                        >
                                            {countByCategory[cat] ?? 0}
                                        </span>
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>
                )}

                {/* Project Grid */}
                <AnimatePresence mode="wait">
                    {filteredProjects.length === 0 ? (
                        <motion.div
                            key="empty"
                            className="text-center py-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="text-6xl mb-4">🎨</div>
                            <p className="text-gray-500">No projects found in this category.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={resolvedActive}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                        >
                            {filteredProjects.map((project, index) => (
                                <ProjectCard key={project.id} project={project} index={index} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProjectsPage;
