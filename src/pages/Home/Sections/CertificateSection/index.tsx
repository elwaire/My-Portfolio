// components/sections/Certificate.tsx
import { motion } from "framer-motion";
import { memo } from "react";
import { useCertificates } from "../../../../hooks/useCertificates";
import SkeletonCard from "./components/SkeletonCard";
import CertificateCard from "./components/CertificateCard";

const CertificateSection = memo(() => {
    const { certificates, loading } = useCertificates();

    return (
        <section className="py-16 relative w-full" id="certificates">
            <div className="max-w-6xl mx-auto px-4">
                {/* Heading */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold">Certificates</h2>
                    <p className="text-gray-600 mt-2">
                        Những chứng chỉ đã đạt được trong quá trình học tập và làm việc
                    </p>
                </motion.div>

                {/* Mobile (stacked list) */}
                <div className="md:hidden flex flex-col gap-6">
                    {loading
                        ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} index={i} />)
                        : certificates
                              .slice(0, 6)
                              .map((cert, index) => <CertificateCard key={cert.id} cert={cert} index={index} />)}
                </div>

                {/* Desktop (horizontal carousel) */}
                <div className="hidden md:block relative">
                    {/* Gradient edges */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />

                    <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-hide">
                        {loading
                            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} index={i} />)
                            : certificates
                                  .slice(0, 6)
                                  .map((cert, index) => <CertificateCard key={cert.id} cert={cert} index={index} />)}
                    </div>
                </div>

                {/* Empty State */}
                {!loading && certificates.length === 0 && (
                    <motion.div
                        className="text-center py-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-6xl mb-4">📜</div>
                        <p className="text-gray-500">No certificates available yet.</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
});

CertificateSection.displayName = "Certificate";
export default CertificateSection;
