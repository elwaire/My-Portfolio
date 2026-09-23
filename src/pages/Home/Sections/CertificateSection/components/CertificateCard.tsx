import { memo, useCallback, useState } from "react";
import { motion } from "framer-motion";
import type { Certificate } from "../../../../../types/certificate";

const CertificateCard = ({ cert, index }: { cert: Certificate; index: number }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = useCallback(() => {
        setImageLoaded(true);
    }, []);

    const handleImageError = useCallback(() => {
        setImageError(true);
        setImageLoaded(true);
    }, []);

    const handleCardClick = useCallback(() => {
        if (cert.link && cert.link !== "#") {
            window.open(cert.link, "_blank");
        }
    }, [cert.link]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="w-full"
            onClick={handleCardClick}
        >
            <div className="relative group cursor-pointer">
                <div className="h-[240px] relative border border-gray-100 overflow-hidden">
                    {/* Loading placeholder */}
                    {!imageLoaded && !imageError && (
                        <div className="w-full h-[240px] bg-gray-200 animate-pulse flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
                        </div>
                    )}

                    {/* Error fallback */}
                    {imageError ? (
                        <div className="w-full h-[240px] bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400 text-4xl">📜</span>
                        </div>
                    ) : (
                        <motion.img
                            src={cert.image}
                            alt={cert.title}
                            className={`w-full h-[240px] object-cover transition-opacity duration-100 ${
                                imageLoaded ? "opacity-100" : "opacity-0"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            loading="lazy"
                        />
                    )}
                    {cert.link && cert.link !== "#" && (
                        <span className="opacity-0 group-hover:opacity-100 duration-150 absolute bottom-0 right-0 text-sm w-full h-full bg-black/80 flex underline justify-center items-center text-white">
                            View Certificate
                        </span>
                    )}
                </div>

                {/* Overlay */}
                <div className="flex flex-col items-start gap-1 py-4">
                    <h3 className="font-semibold text-black line-clamp-1 text-lg">{cert.title}</h3>
                    <div className="flex items-center gap-1 font-light">
                        <p className="text-sm text-gray-500 line-clamp-1">{cert.issuer}</p>
                        <span className="text-sm text-gray-500 line-clamp-1">•</span>
                        <p className="text-sm text-gray-500 line-clamp-1">{cert.date}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default memo(CertificateCard);
