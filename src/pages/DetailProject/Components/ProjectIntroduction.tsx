import type { ProjectIntroductionType } from "../../../types/project";

interface ProjectIntroductionProps {
    introduction: ProjectIntroductionType;
    projectLink?: string;
}

const ProjectIntroduction: React.FC<ProjectIntroductionProps> = ({ introduction, projectLink }) => {
    const infoItems = [
        { label: "Client", value: introduction.client },
        { label: "Industry", value: introduction.industry },
        { label: "Service", value: introduction.service.join(", ") },
        { label: "Platform", value: introduction.platform },
        { label: "My Role", value: introduction.myRole },
        { label: "Timeline", value: introduction.timeline },
    ];

    return (
        <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 h-fit">
            <h3 className="font-medium text-neutral-700 mb-4">Project Info</h3>
            <div className="space-y-4 text-gray-600">
                {infoItems.map((item, index) => (
                    <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                        <dt className="text-sm font-light text-neutral-400 mb-1">{item.label}</dt>
                        <dd className="text-gray-900 font-light">{item.value}</dd>
                    </div>
                ))}
            </div>

            {projectLink && (
                <a
                    href={projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-700 transition-colors duration-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    View Project
                </a>
            )}
        </aside>
    );
};

export default ProjectIntroduction;
