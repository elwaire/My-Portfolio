import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";

type Certificate = {
    id: number;
    title: string;
    issuer: string;
    date: string;
    image: string;
    link?: string;
};

const certificates: Certificate[] = [
    {
        id: 1,
        title: "UX Design Fundamentals",
        issuer: "Google",
        date: "Jun 2023",
        image: "https://i.pinimg.com/736x/54/29/af/5429afc2b6315c4169d1c80179b18b75.jpg",
        link: "#",
    },
    {
        id: 2,
        title: "Human-Centered Design",
        issuer: "IDEO U",
        date: "Sep 2023",
        image: "https://i.pinimg.com/736x/99/37/a6/9937a6de56f9aaa980f9ab3f0f6ed18c.jpg",
        link: "#",
    },
    {
        id: 3,
        title: "Web Accessibility (WCAG)",
        issuer: "W3C",
        date: "Dec 2023",
        image: "https://i.pinimg.com/736x/54/29/af/5429afc2b6315c4169d1c80179b18b75.jpg",
        link: "#",
    },
    {
        id: 4,
        title: "Design Thinking",
        issuer: "Stanford d.school",
        date: "Jan 2024",
        image: "https://i.pinimg.com/736x/92/fb/ae/92fbae2ba0e81da9e18af1249c47bf2c.jpg",
        link: "#",
    },
];

const SkeletonCard = () => (
    <div className="flex-shrink-0 snap-center w-[calc(33.333%-16px)] md:rounded-2xl rounded-xl overflow-hidden bg-gray-200 animate-pulse">
        <div className="w-full h-56 bg-gray-300" />
        <div className="p-4">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-300 rounded w-1/2 mb-1" />
            <div className="h-3 bg-gray-300 rounded w-1/4" />
        </div>
    </div>
);

const CertificateCard = ({ cert, index }: { cert: Certificate; index: number }) => (
    <motion.div
        key={cert.id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="flex-shrink-0 md:snap-center md:w-[calc(33.333%-16px)] w-full rounded-2xl overflow-hidden cursor-pointer bg-gray-50"
    >
        <div className="relative overflow-hidden">
            {/* Image */}
            <motion.img
                src={cert.image}
                alt={cert.title}
                className="w-full h-56 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4">
                <div>
                    <h3 className="font-semibold text-white text-lg">{cert.title}</h3>
                    <p className="text-sm text-gray-200">{cert.issuer}</p>
                    <p className="text-xs text-gray-300">{cert.date}</p>
                    {cert.link && (
                        <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-2 text-sm text-blue-300 hover:underline"
                        >
                            View Certificate →
                        </a>
                    )}
                </div>
            </div>
        </div>
    </motion.div>
);

const Certificate = memo(() => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="py-16 relative w-full" id="certificates">
            <div className="max-w-6xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold">Certificates</h2>
                    <p className="text-gray-600 mt-2">
                        Những chứng chỉ đã đạt được trong quá trình học tập và làm việc
                    </p>
                </div>

                {/* Mobile (stacked list) */}
                <div className="md:hidden flex flex-col gap-6">
                    {isLoading
                        ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
                        : certificates.map((cert, index) => (
                              <CertificateCard key={cert.id} cert={cert} index={index} />
                          ))}
                </div>

                {/* Desktop (horizontal carousel) */}
                <div className="hidden md:block relative">
                    {/* Gradient edges */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />

                    <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-hide">
                        {isLoading
                            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
                            : certificates.map((cert, index) => (
                                  <CertificateCard key={cert.id} cert={cert} index={index} />
                              ))}
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Certificate;
