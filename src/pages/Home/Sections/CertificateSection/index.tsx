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
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-3xl uppercase text-start mb-12"
                >
                    Certificates
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4">
                    {loading
                        ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} index={i} />)
                        : certificates
                              .slice(0, 6)
                              .map((cert, index) => <CertificateCard key={cert.id} cert={cert} index={index} />)}
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
