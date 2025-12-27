import { memo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectSection, GalleryImage } from "../../../types/project";

interface ContentSectionProps {
    section: ProjectSection;
    index: number;
}

// Lightbox Component với Framer Motion
const Lightbox: React.FC<{
    src: string;
    alt: string;
    onClose: () => void;
}> = ({ src, alt, onClose }) => {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center h-screen justify-center bg-[#00000077] p-4 cursor-zoom-out"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Close button */}
            <motion.button
                className="absolute top-4 right-4 text-white/80 hover:text-white text-4xl font-light z-10 w-12 h-12 flex items-center justify-center"
                onClick={onClose}
                aria-label="Close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                ×
            </motion.button>

            {/* Image */}
            <motion.img
                src={src}
                alt={alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.5, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: 50 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                }}
            />
        </motion.div>
    );
};

// Aspect ratio class mapping
const ASPECT_CLASSES = {
    "2/1": "aspect-[2/1]",
    "6/5": "aspect-[6/5]",
} as const;

const ContentSection: React.FC<ContentSectionProps> = ({ section, index }) => {
    const isEven = index % 2 === 0;
    const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

    const openLightbox = useCallback((src: string, alt: string) => {
        setLightboxImage({ src, alt });
        document.body.style.overflow = "hidden";
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxImage(null);
        document.body.style.overflow = "";
    }, []);

    const getAspectClass = (ratio?: "2/1" | "6/5") => {
        return ASPECT_CLASSES[ratio || "2/1"];
    };

    // Render single image với motion
    const renderSingleImage = (url: string, alt?: string, aspectRatio?: "2/1" | "6/5") => {
        const imageAlt = alt || section.title || "Project image";
        return (
            <motion.div
                className={`w-full ${getAspectClass(aspectRatio)} overflow-hidden rounded-xl shadow-md`}
                transition={{ duration: 0.3 }}
            >
                <motion.img
                    src={url}
                    alt={imageAlt}
                    className="w-full h-full object-cover cursor-zoom-in"
                    loading="lazy"
                    onClick={() => openLightbox(url, imageAlt)}
                    transition={{ duration: 0.4 }}
                />
            </motion.div>
        );
    };

    // Render gallery images
    const renderGallery = (images: GalleryImage[]) => {
        if (images.length === 1) {
            return renderSingleImage(images[0].url, images[0].alt, images[0].aspectRatio);
        }

        if (images.length === 2) {
            return (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    {images.map((img, imgIndex) => {
                        const imageAlt = img.alt || `${section.title} ${imgIndex + 1}`;
                        return (
                            <motion.div
                                key={imgIndex}
                                className={`${getAspectClass(img.aspectRatio)} overflow-hidden rounded-xl shadow-md`}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.img
                                    src={img.url}
                                    alt={imageAlt}
                                    className="w-full h-full object-cover cursor-zoom-in"
                                    loading="lazy"
                                    onClick={() => openLightbox(img.url, imageAlt)}
                                    transition={{ duration: 0.4 }}
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
                    className={`${getAspectClass(images[0].aspectRatio)} overflow-hidden rounded-xl shadow-md`}
                    transition={{ duration: 0.3 }}
                >
                    <motion.img
                        src={images[0].url}
                        alt={images[0].alt || `${section.title} 1`}
                        className="w-full h-full object-cover cursor-zoom-in"
                        loading="lazy"
                        onClick={() => openLightbox(images[0].url, images[0].alt || `${section.title} 1`)}
                        transition={{ duration: 0.4 }}
                    />
                </motion.div>

                {images.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {images.slice(1).map((img, imgIndex) => {
                            const imageAlt = img.alt || `${section.title} ${imgIndex + 2}`;
                            return (
                                <motion.div
                                    key={imgIndex + 1}
                                    className={`${getAspectClass(
                                        img.aspectRatio,
                                    )} overflow-hidden rounded-xl shadow-md`}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.img
                                        src={img.url}
                                        alt={imageAlt}
                                        className="w-full h-full object-cover cursor-zoom-in"
                                        loading="lazy"
                                        onClick={() => openLightbox(img.url, imageAlt)}
                                        transition={{ duration: 0.4 }}
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
                    ? renderSingleImage(section.image, section.imageAlt, section.imageAspectRatio)
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
                                    renderSingleImage(section.image, section.imageAlt, section.imageAspectRatio)}
                                {section.text && renderText(section.text)}
                            </>
                        ) : (
                            <>
                                {section.text && renderText(section.text)}
                                {section.image &&
                                    renderSingleImage(section.image, section.imageAlt, section.imageAspectRatio)}
                            </>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <section className="space-y-6">
                {section.title && <h2 className="text-2xl font-semibold">{section.title}</h2>}
                <div className="space-y-6">{renderContent()}</div>
            </section>

            {/* Lightbox với AnimatePresence */}
            <AnimatePresence>
                {lightboxImage && <Lightbox src={lightboxImage.src} alt={lightboxImage.alt} onClose={closeLightbox} />}
            </AnimatePresence>
        </>
    );
};

export default memo(ContentSection);
