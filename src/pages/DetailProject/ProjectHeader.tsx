import { memo } from "react";
import type { ProjectHead } from "../../types/project";

const ProjectHeader: React.FC<{ head: ProjectHead }> = ({ head }) => (
    <header className="w-full py-20 max-w-6xl">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">{head.title}</h1>
        {head.description && (
            <p className="text-lg font-light text-neutral-600 mb-6 leading-relaxed">{head.description}</p>
        )}
        {head.thumbnail && (
            <div className="w-full">
                <img
                    src={head.thumbnail}
                    alt="Project thumbnail"
                    className="rounded-2xl w-full shadow-md object-cover"
                    loading="eager"
                />
            </div>
        )}
    </header>
);

export default memo(ProjectHeader);
