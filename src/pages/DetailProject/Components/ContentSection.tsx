import { memo } from "react";
import { motion, type Variants } from "framer-motion";
import type { ProjectSection, GalleryImage } from "../../../types/project";

interface ContentSectionProps {
    section: ProjectSection;
    index: number;
    onImageClick?: (url: string) => void;
}

// Hiệu ứng "tờ giấy bay lên rồi rơi xuống": trượt từ dưới lên, to dần, hơi nghiêng rồi thẳng lại
const paperVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 60,
        scale: 0.9,
    },
    visible: (custom: number = 0) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
            delay: custom,
        },
    }),
};

const ContentSection: React.FC<ContentSectionProps> = ({ section, index, onImageClick }) => {
    const isSub = !!section.isSubSection;

    // Render single image — full width, auto height (natural ratio)
    const renderSingleImage = (url: string, alt?: string, delay = 0) => {
        const imageAlt = alt || section.title || "Project image";
        return (
            <motion.div
                className={`w-full overflow-hidden rounded-xl shadow-md ${
                    onImageClick ? "cursor-zoom-in group" : ""
                }`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={paperVariants}
                custom={delay}
                onClick={() => onImageClick?.(url)}
            >
                <img
                    src={url}
                    alt={imageAlt}
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.015]"
                    loading="lazy"
                />
            </motion.div>
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
                            <motion.div
                                key={imgIndex}
                                className={`overflow-hidden rounded-xl shadow-md ${
                                    onImageClick ? "cursor-zoom-in group" : ""
                                }`}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.25 }}
                                variants={paperVariants}
                                custom={imgIndex * 0.12}
                                onClick={() => onImageClick?.(img.url)}
                            >
                                <img
                                    src={img.url}
                                    alt={imageAlt}
                                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.015]"
                                    loading="lazy"
                                />
                            </motion.div>
                        );
                    })}
                </div>
            );
        }

        // For 3 or more images
        return (
            <div className="w-full space-y-4">
                <motion.div
                    className={`overflow-hidden rounded-xl shadow-md ${
                        onImageClick ? "cursor-zoom-in group" : ""
                    }`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={paperVariants}
                    onClick={() => onImageClick?.(images[0].url)}
                >
                    <img
                        src={images[0].url}
                        alt={images[0].alt || `${section.title} 1`}
                        className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.015]"
                        loading="lazy"
                    />
                </motion.div>

                {images.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {images.slice(1).map((img, imgIndex) => {
                            const imageAlt = img.alt || `${section.title} ${imgIndex + 2}`;
                            return (
                                <motion.div
                                    key={imgIndex + 1}
                                    className={`overflow-hidden rounded-xl shadow-md ${
                                        onImageClick ? "cursor-zoom-in group" : ""
                                    }`}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.25 }}
                                    variants={paperVariants}
                                    custom={imgIndex * 0.12}
                                    onClick={() => onImageClick?.(img.url)}
                                >
                                    <img
                                        src={img.url}
                                        alt={imageAlt}
                                        className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.015]"
                                        loading="lazy"
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    // Render text content
    const renderTextContent = (sec: ProjectSection) => {
        const { textStyle = "paragraph", paragraphs = [], text } = sec;

        if (!paragraphs || paragraphs.length === 0) {
            if (!text) return null;
            return (
                <div className="w-full">
                    <p className="text-neutral-600 font-light leading-relaxed max-w-3xl">{text}</p>
                </div>
            );
        }

        if (textStyle === "paragraph") {
            return (
                <div className="w-full space-y-4">
                    {paragraphs.map((p, idx) => {
                        if (p.type === "subtitle") {
                            return (
                                <h3
                                    key={idx}
                                    className="text-lg md:text-xl font-semibold text-neutral-800 pt-3 pb-1 max-w-3xl"
                                >
                                    {p.content}
                                </h3>
                            );
                        }
                        return (
                            <p key={idx} className="text-neutral-600 font-light leading-relaxed max-w-3xl">
                                {p.content}
                            </p>
                        );
                    })}
                </div>
            );
        }

        if (textStyle === "list") {
            return (
                <div className="w-full">
                    <ul className="list-disc pl-5 space-y-2 text-neutral-600 font-light max-w-3xl">
                        {paragraphs.map((p, idx) => {
                            if (p.type === "subtitle") {
                                return (
                                    <h3
                                        key={idx}
                                        className="text-lg md:text-xl font-semibold text-neutral-800 pt-3 pb-1 -ml-5 max-w-3xl"
                                    >
                                        {p.content}
                                    </h3>
                                );
                            }
                            return (
                                <li key={idx} className="leading-relaxed">
                                    {p.content}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        }

        if (textStyle === "mixed") {
            const groups: ({ type: "paragraph" | "list"; items: string[] } | { type: "subtitle"; content: string })[] =
                [];

            paragraphs.forEach((p) => {
                if (p.type === "subtitle") {
                    groups.push({ type: "subtitle", content: p.content });
                } else {
                    const currentType = p.type === "list" ? "list" : "paragraph";
                    const lastGroup = groups[groups.length - 1];

                    if (lastGroup && lastGroup.type === currentType) {
                        (lastGroup as { type: "paragraph" | "list"; items: string[] }).items.push(p.content);
                    } else {
                        groups.push({ type: currentType, items: [p.content] });
                    }
                }
            });

            return (
                <div className="w-full space-y-4">
                    {groups.map((group, gIdx) => {
                        if (group.type === "subtitle") {
                            return (
                                <h3
                                    key={gIdx}
                                    className="text-lg md:text-xl font-semibold text-neutral-800 pt-3 pb-1 max-w-3xl"
                                >
                                    {group.content}
                                </h3>
                            );
                        }
                        if (group.type === "list") {
                            return (
                                <ul
                                    key={gIdx}
                                    className="list-disc pl-5 space-y-2 text-neutral-600 font-light max-w-3xl"
                                >
                                    {group.items.map((item, itemIdx) => (
                                        <li key={itemIdx} className="leading-relaxed">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            );
                        }
                        return (
                            <div key={gIdx} className="space-y-4">
                                {group.items.map((item, itemIdx) => (
                                    <p key={itemIdx} className="text-neutral-600 font-light leading-relaxed max-w-3xl">
                                        {item}
                                    </p>
                                ))}
                            </div>
                        );
                    })}
                </div>
            );
        }

        return null;
    };

    // Render content based on section type
    const renderContent = () => {
        switch (section.type) {
            case "text":
                return renderTextContent(section);

            case "image":
                return section.image ? renderSingleImage(section.image, section.imageAlt) : null;

            case "gallery":
                return section.images && section.images.length > 0 ? renderGallery(section.images) : null;

            case "text-image":
                const hasText = (section.paragraphs && section.paragraphs.length > 0) || section.text;
                if (!hasText && !section.image) return null;

                return (
                    <div className="flex flex-col items-start gap-6 w-full">
                        {hasText && renderTextContent(section)}
                        {section.image && renderSingleImage(section.image, section.imageAlt)}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <section className={`transition-all duration-300 ${isSub ? "mt-8 " : index === 0 ? "mt-0" : "mt-16"}`}>
            {section.title && (
                <h2
                    className={` tracking-tight text-neutral-900 ${
                        isSub ? "text-base mt-8 font-medium text-neutral-600 mb-4" : "text-2xl font-bold mb-6"
                    }`}
                >
                    {section.title}
                </h2>
            )}
            <div className="space-y-6">{renderContent()}</div>
        </section>
    );
};

export default memo(ContentSection);
