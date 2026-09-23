import React, { useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import PATHS from "../../constants/paths";
import { useProjectDetail } from "../../hooks/useProjectDetail";
import ContentSection from "./Components/ContentSection";
import ImageLightbox, { type LightboxImage } from "./Components/ImageLightbox";
import ProjectDetailSkeleton from "./Components/ProjectDetailSkeleton";
import ProjectHeader from "./Components/ProjectHeader";
import ProjectIntroduction from "./Components/ProjectIntroduction";

const DetailProjectPage: React.FC = () => {
    const { idProject } = useParams<{ idProject: string }>();
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [idProject]);

    // Redirect if no ID
    if (!idProject) {
        return <Navigate to={PATHS.PROJECT} replace />;
    }

    const { projectData, loading, error } = useProjectDetail(idProject);

    // Collect all images in project for lightbox navigation
    const allImages = useMemo<LightboxImage[]>(() => {
        if (!projectData) return [];
        const list: LightboxImage[] = [];

        if (projectData.head?.thumbnail) {
            list.push({
                url: projectData.head.thumbnail,
                alt: projectData.head.title || "Project thumbnail",
            });
        }

        projectData.sections?.forEach((sec) => {
            if ((sec.type === "image" || sec.type === "text-image") && sec.image) {
                list.push({
                    url: sec.image,
                    alt: sec.imageAlt || sec.title || "Project image",
                });
            } else if (sec.type === "gallery" && sec.images) {
                sec.images.forEach((img) => {
                    if (img.url) {
                        list.push({
                            url: img.url,
                            alt: img.alt || sec.title || "Gallery image",
                        });
                    }
                });
            }
        });

        return list;
    }, [projectData]);

    const handleImageClick = (url: string) => {
        const foundIndex = allImages.findIndex((img) => img.url === url);
        if (foundIndex !== -1) {
            setSelectedImageIndex(foundIndex);
        }
    };

    // Show skeleton while loading
    if (loading) {
        return <ProjectDetailSkeleton />;
    }

    // Show error message
    if (error || !projectData) {
        return <div>error{error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center px-4 lg:px-6 py-4">
            <ProjectHeader head={projectData.head} projectId={idProject} onImageClick={handleImageClick} />
            <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-8 lg:gap-12 py-16">
                <ProjectIntroduction introduction={projectData.introduction} projectLink={projectData.projectLink} />

                <main className="w-full lg:w-3/4">
                    {projectData.sections.map((section, index) => (
                        <ContentSection key={index} section={section} index={index} onImageClick={handleImageClick} />
                    ))}
                </main>
            </div>

            {/* Lightbox Modal */}
            <ImageLightbox
                isOpen={selectedImageIndex !== null}
                images={allImages}
                currentIndex={selectedImageIndex ?? 0}
                onClose={() => setSelectedImageIndex(null)}
                onNavigate={(index) => setSelectedImageIndex(index)}
            />
        </div>
    );
};

export default DetailProjectPage;
