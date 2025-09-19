// components/sections/BannerSection.tsx
import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useBanner } from "../../../../hooks/useBanner";
import NoData from "./components/NoData";
import Loading from "./components/Loading";

const BannerSection = memo(() => {
    const { bannerSettings, loading } = useBanner();

    // Transform data for artwork cards
    const artworkData = useMemo(() => {
        if (!bannerSettings?.images) return [];

        const rotations = [-12, -8, -4, 2, 6]; // Predefined rotations for visual appeal

        return bannerSettings.images.map((image, index) => ({
            id: index + 1,
            image,
            rotation: rotations[index] || 0,
        }));
    }, [bannerSettings?.images]);

    if (loading) {
        return <Loading />;
    }

    if (!bannerSettings) {
        return <NoData />;
    }

    return (
        <section className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 py-20">
            <div className="max-w-6xl mx-auto text-center w-full">
                {/* Main Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 sm:mb-16 flex justify-center"
                >
                    <h1 className="text-4xl sm:text-5xl lg:max-w-[720px] md:text-6xl font-semibold text-gray-900 leading-tight mb-4 lg:mt-12">
                        {bannerSettings.title}
                    </h1>
                </motion.div>

                {/* Artwork Cards Stack */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative mb-12 sm:mb-16 flex items-center justify-center w-full overflow-hidden md:overflow-visible"
                    style={{
                        height: "300px",
                        minWidth: "320px",
                    }}
                >
                    {artworkData.map((artwork, index) => {
                        const centerIndex = Math.floor(artworkData.length / 2);
                        const offsetFromCenter = index - centerIndex;

                        // Desktop spacing
                        const desktopX = offsetFromCenter * 160;
                        // Mobile spacing
                        const mobileX = offsetFromCenter * 80;

                        return (
                            <motion.div
                                key={artwork.id}
                                initial={{
                                    opacity: 0,
                                    y: 50,
                                    rotate: 0,
                                    scale: 0.8,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    rotate: artwork.rotation,
                                    x: typeof window !== "undefined" && window.innerWidth >= 768 ? desktopX : mobileX,
                                    scale: 1,
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.4 + index * 0.1,
                                    type: "spring",
                                    stiffness: 100,
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    rotate: 0,
                                    zIndex: 10,
                                    y: -15,
                                    transition: { duration: 0.2 },
                                }}
                                className="absolute cursor-pointer rounded-2xl shadow-xl"
                                style={{
                                    zIndex: artworkData.length - Math.abs(offsetFromCenter),
                                    width:
                                        typeof window !== "undefined" && window.innerWidth >= 768 ? "192px" : "120px",
                                    height:
                                        typeof window !== "undefined" && window.innerWidth >= 768 ? "192px" : "120px",
                                }}
                            >
                                <div className="w-full h-full rounded-2xl flex flex-col justify-between relative overflow-hidden">
                                    <img
                                        src={artwork.image}
                                        alt={`Artwork ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="mb-8 sm:mb-12"
                >
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto px-4">
                        {bannerSettings.description}
                    </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
                >
                    <motion.a
                        href={bannerSettings.buttonLink}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg inline-block text-center no-underline"
                    >
                        {bannerSettings.buttonLabel}
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
});

BannerSection.displayName = "BannerSection";
export default BannerSection;
