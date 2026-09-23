import React, { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxImage {
    url: string;
    alt?: string;
}

interface ImageLightboxProps {
    isOpen: boolean;
    images: LightboxImage[];
    currentIndex: number;
    onClose: () => void;
    onNavigate: (index: number) => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ isOpen, images, currentIndex, onClose, onNavigate }) => {
    const total = images.length;
    const currentImage = images[currentIndex];
    const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
    const activeThumbRef = useRef<HTMLButtonElement>(null);

    const handlePrev = useCallback(
        (e?: React.MouseEvent) => {
            e?.stopPropagation();
            if (total <= 1) return;
            onNavigate((currentIndex - 1 + total) % total);
        },
        [currentIndex, total, onNavigate],
    );

    const handleNext = useCallback(
        (e?: React.MouseEvent) => {
            e?.stopPropagation();
            if (total <= 1) return;
            onNavigate((currentIndex + 1) % total);
        },
        [currentIndex, total, onNavigate],
    );

    // Auto-scroll active thumbnail into view
    useEffect(() => {
        if (isOpen && activeThumbRef.current) {
            activeThumbRef.current.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            });
        }
    }, [currentIndex, isOpen]);

    // Keyboard navigation & lock scroll
    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            } else if (e.key === "ArrowLeft") {
                if (total > 1) {
                    onNavigate((currentIndex - 1 + total) % total);
                }
            } else if (e.key === "ArrowRight") {
                if (total > 1) {
                    onNavigate((currentIndex + 1) % total);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, currentIndex, total, onClose, onNavigate]);

    return (
        <AnimatePresence>
            {isOpen && currentImage && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/92 backdrop-blur-md select-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={onClose}
                >
                    {/* Top Bar: Counter & Close */}
                    <div
                        className="w-full flex items-center justify-between p-4 md:p-6 z-20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {total > 1 ? (
                            <span className="px-3.5 py-1.5 rounded-full text-xs font-light tracking-wide bg-white/10 text-white/90 border border-white/10 backdrop-blur-sm shadow-sm">
                                {currentIndex + 1} / {total}
                            </span>
                        ) : (
                            <div />
                        )}

                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2.5 rounded-full bg-white/10 text-white/90 hover:text-white hover:bg-white/20 border border-white/10 transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" strokeWidth={1.5} />
                        </button>
                    </div>

                    {/* Left Navigation Arrow */}
                    {total > 1 && (
                        <button
                            type="button"
                            onClick={handlePrev}
                            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 border border-white/10 transition-all duration-200 cursor-pointer shadow-xl active:scale-90 hover:scale-105"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
                        </button>
                    )}

                    {/* Right Navigation Arrow */}
                    {total > 1 && (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 border border-white/10 transition-all duration-200 cursor-pointer shadow-xl active:scale-90 hover:scale-105"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
                        </button>
                    )}

                    {/* Main Center Image */}
                    <div
                        className="relative flex-1 w-full flex items-center justify-center p-4 min-h-0"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImage.url}
                                src={currentImage.url}
                                alt={currentImage.alt || "Zoomed project image"}
                                className="max-w-[88vw] max-h-[68vh] md:max-h-[72vh] w-auto h-auto object-contain  shadow-2xl"
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.22, ease: "easeOut" }}
                                draggable={false}
                            />
                        </AnimatePresence>
                    </div>

                    {/* Bottom Thumbnail Strip */}
                    {total > 1 && (
                        <div
                            className="w-full flex justify-center pb-4 md:pb-6 px-4 z-20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                ref={thumbnailsContainerRef}
                                className="max-w-[92vw] overflow-x-auto flex items-center gap-2 md:gap-3 p-2  bg-white/[0.08] backdrop-blur-lg border border-white/10 shadow-2xl scrollbar-none"
                                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                            >
                                {images.map((img, idx) => {
                                    const isActive = idx === currentIndex;
                                    return (
                                        <button
                                            key={`${img.url}-${idx}`}
                                            ref={isActive ? activeThumbRef : null}
                                            type="button"
                                            onClick={() => onNavigate(idx)}
                                            className={`relative shrink-0 w-12 h-12 md:w-16 md:h-16  overflow-hidden cursor-pointer transition-all duration-200 border-2 ${
                                                isActive
                                                    ? "border-white ring-2 ring-white/60 scale-105 opacity-100 shadow-md"
                                                    : "border-transparent opacity-40 hover:opacity-80 hover:scale-100"
                                            }`}
                                            aria-label={`Go to image ${idx + 1}`}
                                        >
                                            <img
                                                src={img.url}
                                                alt={img.alt || `Thumbnail ${idx + 1}`}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                                draggable={false}
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ImageLightbox;
