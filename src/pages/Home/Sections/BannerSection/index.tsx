// components/sections/BannerSection.tsx
import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { useBanner } from "../../../../hooks/useBanner";
import NoData from "./components/NoData";
import Loading from "./components/Loading";
import Button from "../../../../components/customs/Button";

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
        <section className="min-h-screen md:min-h-[110vh] lg:min-h-[140vh] w-full flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 pb-8 pt-24 sm:pt-28 md:pt-32">
            {/* Header: Title & Description */}
            <div className="w-full max-w-7xl mx-auto text-start pt-4 sm:pt-8 mb-8 sm:mb-12">
                <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 md:gap-8">
                    {/* Main Title */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex justify-start w-full"
                    >
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-snug sm:leading-snug lg:leading-[70px] max-w-full md:max-w-xl">
                            {bannerSettings.title}
                        </h1>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-auto"
                    >
                        <p className="text-sm sm:text-base font-light text-start md:text-end leading-relaxed max-w-full md:max-w-sm text-gray-700">
                            {bannerSettings.description}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Bottom section: Artworks & CTA */}
            <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 w-full">
                {/* Artwork Cards - Horizontal scroll on mobile, flex grid on tablet/desktop */}
                <div className="w-full overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                    <div className="flex gap-2.5 sm:gap-3 max-w-7xl mx-auto min-w-max md:min-w-full pb-2 sm:pb-0">
                        {artworkData.map((artwork, index) => {
                            return (
                                <motion.div
                                    key={artwork.id}
                                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{
                                        duration: 0.7,
                                        delay: 0.2 + index * 0.1,
                                        ease: [0.25, 0.1, 0.25, 1],
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-40 sm:w-48 md:w-auto md:flex-1 flex-shrink-0 group cursor-pointer flex flex-col justify-between relative overflow-hidden rounded-xs shadow-sm hover:shadow-xl transition-shadow duration-300"
                                >
                                    <motion.img
                                        src={artwork.image}
                                        alt={`Artwork ${index + 1}`}
                                        className="w-full h-full object-cover aspect-[3/4]"
                                        loading="lazy"
                                        whileHover={{ scale: 1.06 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    />
                                    <div className="w-full h-full absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 pointer-events-none" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="https://drive.google.com/drive/folders/1RUchOcrtVbB5r7DjFqqHt1f0puRd65xn?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="outline">Download CV</Button>
                    </a>
                </motion.div>
            </div>
        </section>
    );
});

BannerSection.displayName = "BannerSection";
export default BannerSection;
