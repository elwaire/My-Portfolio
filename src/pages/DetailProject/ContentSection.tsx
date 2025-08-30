import { memo } from "react";
import type { ProjectSection } from "../../types/project";

interface ContentSectionProps {
    section: ProjectSection;
    index: number;
}

const ContentSection: React.FC<ContentSectionProps> = ({ section, index }) => {
    const hasImages = !!(section.images && section.images.length > 0);
    const hasText = !!section.text;
    const isEven = index % 2 === 0;

    // Render multiple images in a grid
    const renderImages = (images: string[]) => {
        if (images.length === 1) {
            return (
                <div className="w-full">
                    <img
                        src={images[0]}
                        alt={section.title}
                        className="w-full rounded-xl h-[420px] shadow-md object-cover"
                        loading="lazy"
                    />
                </div>
            );
        }

        if (images.length === 2) {
            return (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    {images.map((img, imgIndex) => (
                        <img
                            key={imgIndex}
                            src={img}
                            alt={`${section.title} ${imgIndex + 1}`}
                            className="w-full rounded-xl h-[420px] shadow-md object-cover"
                            loading="lazy"
                        />
                    ))}
                </div>
            );
        }

        // For 3 or more images
        return (
            <div className="w-full space-y-4">
                {/* First image full width */}
                <img
                    src={images[0]}
                    alt={`${section.title} 1`}
                    className="w-full rounded-xl h-[420px] shadow-md object-cover"
                    loading="lazy"
                />

                {/* Remaining images in grid */}
                {images.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {images.slice(1).map((img, imgIndex) => (
                            <img
                                key={imgIndex + 1}
                                src={img}
                                alt={`${section.title} ${imgIndex + 2}`}
                                className="w-full rounded-xl h-[300px] shadow-md object-cover"
                                loading="lazy"
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <section id={section.id} className="space-y-6">
            <h2 className="text-2xl font-semibold">{section.title}</h2>

            <div className="space-y-6">
                {hasImages && hasText ? (
                    // Both images and text - vertical layout
                    <div className="flex flex-col items-start gap-6">
                        {isEven ? (
                            <>
                                {renderImages(section.images!)}
                                <div className="w-full">
                                    <p className="text-neutral-600 font-light leading-relaxed max-w-3xl">
                                        {section.text}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-full">
                                    <p className="text-neutral-600 font-light leading-relaxed max-w-3xl">
                                        {section.text}
                                    </p>
                                </div>
                                {renderImages(section.images!)}
                            </>
                        )}
                    </div>
                ) : hasImages ? (
                    // Only images
                    <div className="w-full">{renderImages(section.images!)}</div>
                ) : hasText ? (
                    // Only text
                    <div className="w-full">
                        <p className="text-neutral-600 font-light leading-relaxed max-w-3xl">{section.text}</p>
                    </div>
                ) : null}
            </div>
        </section>
    );
};

export default memo(ContentSection);
