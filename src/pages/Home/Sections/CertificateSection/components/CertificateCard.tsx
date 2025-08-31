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
            className="flex-shrink-0 md:snap-center md:w-[calc(33.333%-16px)] w-full rounded-2xl overflow-hidden cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
            onClick={handleCardClick}
        >
            <div className="relative overflow-hidden">
                {/* Loading placeholder */}
                {!imageLoaded && !imageError && (
                    <div className="w-full h-56 bg-gray-200 animate-pulse flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
                    </div>
                )}

                {/* Error fallback */}
                {imageError ? (
                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-4xl">📜</span>
                    </div>
                ) : (
                    <motion.img
                        src={cert.image}
                        alt={cert.title}
                        className={`w-full h-56 object-cover transition-opacity duration-300 ${
                            imageLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        loading="lazy"
                    />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4">
                    <div>
                        <h3 className="font-semibold text-white text-lg">{cert.title}</h3>
                        <p className="text-sm text-gray-200">{cert.issuer}</p>
                        <p className="text-xs text-gray-300">{cert.date}</p>
                        {cert.link && cert.link !== "#" && (
                            <span className="inline-block mt-2 text-sm text-blue-300 hover:underline">
                                View Certificate →
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default memo(CertificateCard);
