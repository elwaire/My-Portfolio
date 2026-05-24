import { memo } from "react";
import type { ProjectHead } from "../../../types/project";

const ProjectHeader: React.FC<{ head: ProjectHead }> = ({ head }) => (
    <header className="w-full py-20 max-w-6xl">
        {head.isPinned && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-200/60 mb-4 shadow-sm">
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
            </div>
        )}
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">{head.title}</h1>
        {head.description && (
            <p className="text-lg font-light text-neutral-600 mb-6 leading-relaxed">{head.description}</p>
        )}
        {head.projectLink && (
            <a
                href={head.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mb-6 underline cursor-pointer hover:text-blue-800"
            >
                View Project
            </a>
        )}
        {head.thumbnail && (
            <div className="w-full aspect-[2/1] mt-6">
                <img
                    src={head.thumbnail}
                    alt="Project thumbnail"
                    className="rounded-2xl w-full h-full shadow-md object-cover"
                    loading="eager"
                />
            </div>
        )}
    </header>
);

export default memo(ProjectHeader);
