import type { ProjectIntroductionType } from "../../types/project";

interface ProjectIntroductionProps {
    introduction: ProjectIntroductionType;
}

const ProjectIntroduction: React.FC<ProjectIntroductionProps> = ({ introduction }) => {
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
        </aside>
    );
};

export default ProjectIntroduction;
