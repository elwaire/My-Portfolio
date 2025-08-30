import React from "react";
import type { CATEGORIES } from "../../../constants/categories";

type Category = keyof typeof CATEGORIES | "all";

interface CategoryFilterProps {
    activeCategory: Category;
    onCategoryChange: (category: Category) => void;
    projectCounts: Record<Category, number>;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onCategoryChange, projectCounts }) => {
    const categories: { key: Category; label: string; gradient: string }[] = [
        { key: "all", label: "Tất cả", gradient: "from-gray-600 to-gray-700" },
        { key: "uiux", label: "UI/UX", gradient: "from-blue-500 to-blue-600" },
        { key: "graphic", label: "Graphic", gradient: "from-green-500 to-green-600" },
        { key: "art", label: "Art", gradient: "from-purple-500 to-purple-600" },
    ];

    return (
        <div className="flex flex-wrap justify-center gap-4 mb-20">
            {categories.map(({ key, label, gradient }) => (
                <button
                    key={key}
                    onClick={() => onCategoryChange(key)}
                    className={`group relative px-8 py-4 rounded-2xl font-bold transition-all duration-300 transform ${
                        activeCategory === key
                            ? `bg-gradient-to-r ${gradient} text-white shadow-xl scale-105`
                            : "bg-white text-gray-700 hover:shadow-lg hover:scale-102 shadow-md border border-gray-200"
                    }`}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {label}
                        <span
                            className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-300 ${
                                activeCategory === key
                                    ? "bg-white/20 text-white"
                                    : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                            }`}
                        >
                            {projectCounts[key]}
                        </span>
                    </span>

                    {/* Active indicator */}
                    {activeCategory === key && (
                        <div
                            className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-30 animate-pulse`}
                        ></div>
                    )}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
