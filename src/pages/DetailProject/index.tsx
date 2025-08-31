// pages/DetailProjectPage.tsx
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import PATHS from "../../constants/paths";
import transitionPage from "../../hoc/TransitionPage";
import { useProjectDetail } from "../../hooks/useProjectDetail";
import ProjectDetailSkeleton from "./Components/ProjectDetailSkeleton";
import ProjectHeader from "./Components/ProjectHeader";
import ProjectIntroduction from "./Components/ProjectIntroduction";
import ContentSection from "./Components/ContentSection";

const DetailProjectPage: React.FC = () => {
    const { idProject } = useParams<{ idProject: string }>();

    // Redirect if no ID
    if (!idProject) {
        return <Navigate to={PATHS.PROJECT} replace />;
    }

    const { projectData, loading, error } = useProjectDetail(idProject);

    // Show skeleton while loading
    if (loading) {
        return <ProjectDetailSkeleton />;
    }

    // Show error message
    if (error || !projectData) {
        return <div>error{error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center px-4 lg:px-6">
            <ProjectHeader head={projectData.head} />

            <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-8 lg:gap-12 py-16">
                <ProjectIntroduction introduction={projectData.introduction} />

                <main className="w-full lg:w-3/4 space-y-16 lg:space-y-24">
                    {projectData.sections.map((section, index) => (
                        <ContentSection key={section.id} section={section} index={index} />
                    ))}
                </main>
            </div>
        </div>
    );
};

export default transitionPage(DetailProjectPage);
