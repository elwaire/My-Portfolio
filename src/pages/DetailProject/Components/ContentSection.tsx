import { memo } from "react";
import type { ProjectSection, GalleryImage } from "../../../types/project";

interface ContentSectionProps {
    section: ProjectSection;
    index: number;
}

const ContentSection: React.FC<ContentSectionProps> = ({ section, index }) => {
    const isEven = index % 2 === 0;

    // Render single image — full width, auto height (natural ratio)
    const renderSingleImage = (url: string, alt?: string) => {
        const imageAlt = alt || section.title || "Project image";
        return (
            <div className="w-full overflow-hidden rounded-xl shadow-md">
                <img
                    src={url}
                    alt={imageAlt}
                    className="w-full h-auto block"
                    loading="lazy"
                />
            </div>
        );
    };

    // Render gallery images — full width, auto height
    const renderGallery = (images: GalleryImage[]) => {
        if (images.length === 1) {
            return renderSingleImage(images[0].url, images[0].alt);
        }

        if (images.length === 2) {
            return (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    {images.map((img, imgIndex) => {
                        const imageAlt = img.alt || `${section.title} ${imgIndex + 1}`;
                        return (
                            <div key={imgIndex} className="overflow-hidden rounded-xl shadow-md">
                                <img
                                    src={img.url}
                                    alt={imageAlt}
                                    className="w-full h-auto block"
                                    loading="lazy"
                                />
                            </div>
                        );
                    })}
                </div>
            );
        }

        // For 3 or more images
        return (
            <div className="w-full space-y-4">
                <div className="overflow-hidden rounded-xl shadow-md">
                    <img
                        src={images[0].url}
                        alt={images[0].alt || `${section.title} 1`}
                        className="w-full h-auto block"
                        loading="lazy"
                    />
                </div>

                {images.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {images.slice(1).map((img, imgIndex) => {
                            const imageAlt = img.alt || `${section.title} ${imgIndex + 2}`;
                            return (
                                <div key={imgIndex + 1} className="overflow-hidden rounded-xl shadow-md">
                                    <img
                                        src={img.url}
                                        alt={imageAlt}
                                        className="w-full h-auto block"
                                        loading="lazy"
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    // Render text content
    const renderText = (text: string) => (
        <div className="w-full">
            <p className="text-neutral-600 font-light leading-relaxed max-w-3xl">{text}</p>
        </div>
    );

    // Render content based on section type
    const renderContent = () => {
        switch (section.type) {
            case "text":
                return section.text ? renderText(section.text) : null;

            case "image":
                return section.image
                    ? renderSingleImage(section.image, section.imageAlt)
                    : null;

            case "gallery":
                return section.images && section.images.length > 0 ? renderGallery(section.images) : null;

            case "text-image":
                if (!section.text && !section.image) return null;

                return (
                    <div className="flex flex-col items-start gap-6">
                        {isEven ? (
                            <>
                                {section.image &&
                                    renderSingleImage(section.image, section.imageAlt)}
                                {section.text && renderText(section.text)}
                            </>
                        ) : (
                            <>
                                {section.text && renderText(section.text)}
                                {section.image &&
                                    renderSingleImage(section.image, section.imageAlt)}
                            </>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <section className="space-y-6">
            {section.title && <h2 className="text-2xl font-semibold">{section.title}</h2>}
            <div className="space-y-6">{renderContent()}</div>
        </section>
    );
};

export default memo(ContentSection);
