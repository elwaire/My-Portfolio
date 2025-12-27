// pages/ProjectsPage.tsx
import React, { useCallback, useMemo, useState } from "react";
import ProjectCard from "../../components/customs/ProjectCard";
import SkeletonCard from "../../components/customs/SkeletonCard";
import { useProjects } from "../../hooks/useProjects";

type Category = "uiux" | "graphic" | "art";

const CATEGORIES: readonly Category[] = ["uiux", "graphic", "art"] as const;

const CATEGORY_LABELS: Record<Category, string> = {
    uiux: "UI/UX",
    graphic: "Graphic",
    art: "Art",
} as const;

const ProjectsPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<Category>("uiux");

    // Fetch tất cả projects một lần, sau đó filter ở client
    const { projects: allProjects, loading, error, refetch } = useProjects();

    // Memoize filtered projects để tránh re-calculate
    const filteredProjects = useMemo(() => {
        return allProjects.filter((project) => project.category === activeCategory);
    }, [allProjects, activeCategory]);

    // Memoize category change handler
    const handleCategoryChange = useCallback((category: Category) => {
        setActiveCategory(category);
    }, []);

    // Memoize category buttons để tránh re-render
    const categoryButtons = useMemo(() => {
        return CATEGORIES.map((cat) => (
            <CategoryButton
                key={cat}
                category={cat}
                isActive={activeCategory === cat}
                onClick={handleCategoryChange}
                label={CATEGORY_LABELS[cat]}
            />
        ));
    }, [activeCategory, handleCategoryChange]);

    // Show skeleton when loading
    if (loading) {
        return (
            <div className="flex justify-center items-center ">
                <div className="min-h-screen px-6 py-16 max-w-7xl mx-auto  w-full">
                    <div className="h-10 bg-gray-200 rounded-lg w-64 mx-auto mb-12 animate-pulse" />

                    <div className="flex justify-center gap-4 mb-12">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="h-10 bg-gray-200 rounded-full w-20 animate-pulse" />
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
            <div className="min-h-screen px-6 py-16 max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mt-12 mb-12">My Projects</h1>

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-12">{categoryButtons}</div>

                {/* Grid Projects */}
                {filteredProjects.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No projects found in this category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Memoized category button component để tránh re-render
interface CategoryButtonProps {
    category: Category;
    isActive: boolean;
    onClick: (category: Category) => void;
    label: string;
}

const CategoryButton = React.memo<CategoryButtonProps>(({ category, isActive, onClick, label }) => {
    const handleClick = useCallback(() => {
        onClick(category);
    }, [onClick, category]);

    return (
        <button
            onClick={handleClick}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isActive ? "bg-black text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
            {label}
        </button>
    );
});

CategoryButton.displayName = "CategoryButton";

export default ProjectsPage;
