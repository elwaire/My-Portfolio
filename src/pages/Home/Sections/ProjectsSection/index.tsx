// components/sections/Projects.tsx
import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import ProjectCard from "../../../../components/customs/ProjectCard";
import SkeletonCard from "../../../../components/customs/SkeletonCard";
import { useProjects } from "../../../../hooks/useProjects";

// ─── Shared ornaments (copy từ BannerSection hoặc tách ra shared/Ornaments.tsx) ──

const OrnamentalDivider = () => (
    <svg
        viewBox="0 0 320 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: 220, opacity: 0.55, display: "block", margin: "0 auto" }}
    >
        <line x1="0" y1="10" x2="128" y2="10" stroke="#8b7355" strokeWidth=".75" />
        <path
            d="M138 10 C141 5,146 3,153 3 C160 3,163 6,158 10 C163 14,160 17,153 17 C146 17,141 15,138 10Z"
            fill="#8b7355"
            opacity=".6"
        />
        <circle cx="158" cy="10" r="3" fill="#8b7355" opacity=".7" />
        <path
            d="M168 10 C171 5,176 3,183 3 C190 3,193 6,188 10 C193 14,190 17,183 17 C176 17,171 15,168 10Z"
            fill="#8b7355"
            opacity=".6"
        />
        <line x1="193" y1="10" x2="320" y2="10" stroke="#8b7355" strokeWidth=".75" />
        <circle cx="0" cy="10" r="2" fill="#8b7355" opacity=".45" />
        <circle cx="320" cy="10" r="2" fill="#8b7355" opacity=".45" />
    </svg>
);

const SmallLeaf = ({ flip = false }: { flip?: boolean }) => (
    <svg
        viewBox="0 0 40 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: 36, opacity: 0.35, transform: flip ? "scaleX(-1)" : undefined, display: "inline-block" }}
    >
        <path d="M2 18 C8 12, 18 6, 38 4" stroke="#6b5e3f" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        <ellipse cx="30" cy="7" rx="7" ry="4" fill="#8b7040" opacity=".5" transform="rotate(-20 30 7)" />
        <ellipse cx="20" cy="11" rx="6" ry="3.5" fill="#8b7040" opacity=".4" transform="rotate(-15 20 11)" />
        <ellipse cx="11" cy="14.5" rx="5" ry="3" fill="#8b7040" opacity=".35" transform="rotate(-10 11 14)" />
    </svg>
);

// ─── Animation variants ────────────────────────────────────────────────────────

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
};

// ─── Main Component ────────────────────────────────────────────────────────────

const ProjectsSection = memo(() => {
    const { projects: allProjects, loading, error } = useProjects();

    const featuredProjects = useMemo(() => allProjects.slice(0, 6), [allProjects]);
    const hasProjects = featuredProjects.length > 0;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
                .projects-title { font-family: 'Playfair Display', Georgia, serif; }
                .projects-body  { font-family: 'Cormorant Garamond', Georgia, serif; }
                .btn-vintage {
                    font-family: 'Cormorant Garamond', Georgia, serif;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    font-size: 0.72rem;
                    font-weight: 400;
                    border-radius: 2px;
                    transition: background 0.25s, color 0.25s, border-color 0.25s;
                }
            `}</style>

            <section className="relative w-full py-24 overflow-hidden">
                {/* Subtle top border */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 pointer-events-none"
                    style={{ background: "linear-gradient(to bottom, transparent, #8b7355, transparent)" }}
                />

                {/* Section header */}
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        {/* Eyebrow */}
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <SmallLeaf flip />
                            <span
                                className="projects-body text-[#8b7355] tracking-[0.25em] uppercase"
                                style={{ fontSize: "11px" }}
                            >
                                Selected Work
                            </span>
                            <SmallLeaf />
                        </div>

                        {/* Title */}
                        <h2 className="projects-title text-4xl sm:text-5xl md:text-6xl font-medium text-[#1e1a12] leading-tight mb-5">
                            My Projects
                        </h2>

                        {/* Divider */}
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <OrnamentalDivider />
                        </motion.div>
                    </motion.div>

                    {/* ── Loading State ── */}
                    {loading && (
                        <div className="grid md:grid-cols-3 gap-8">
                            {Array.from({ length: 6 }, (_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.08 }}
                                >
                                    <SkeletonCard index={i} />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* ── Error State ── */}
                    {error && !loading && (
                        <motion.div
                            className="text-center py-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Ornamental line */}
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <div className="h-px w-16" style={{ background: "#c9b99a" }} />
                                <svg viewBox="0 0 20 20" fill="none" style={{ width: 18, opacity: 0.5 }}>
                                    <circle cx="10" cy="10" r="8" stroke="#8b7355" strokeWidth="1" />
                                    <line
                                        x1="10"
                                        y1="6"
                                        x2="10"
                                        y2="11"
                                        stroke="#8b7355"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                    <circle cx="10" cy="14" r="1" fill="#8b7355" />
                                </svg>
                                <div className="h-px w-16" style={{ background: "#c9b99a" }} />
                            </div>
                            <p className="projects-title text-xl text-[#4a3c28] mb-2">Could not load projects</p>
                            <p className="projects-body text-[#8b7355] italic" style={{ fontSize: "15px" }}>
                                {error}
                            </p>
                        </motion.div>
                    )}

                    {/* ── Success State ── */}
                    {!loading && !error && (
                        <>
                            {hasProjects ? (
                                <>
                                    {/* Project Grid */}
                                    <motion.div
                                        className="grid md:grid-cols-3 gap-8"
                                        variants={containerVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-60px" }}
                                    >
                                        {featuredProjects.map((project, index) => (
                                            <motion.div key={project.id} variants={cardVariants} className="h-full">
                                                <ProjectCard project={project} index={index} />
                                            </motion.div>
                                        ))}
                                    </motion.div>

                                    {/* View All Button */}
                                    <motion.div
                                        className="text-center mt-16"
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                        viewport={{ once: true }}
                                    >
                                        {/* Mini ornamental accent */}
                                        <div className="flex items-center justify-center gap-4 mb-6">
                                            <div className="h-px w-12" style={{ background: "#c9b99a" }} />
                                            <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, opacity: 0.5 }}>
                                                <circle cx="8" cy="8" r="3" fill="#8b7355" />
                                                <circle cx="8" cy="8" r="6" stroke="#8b7355" strokeWidth="0.8" />
                                            </svg>
                                            <div className="h-px w-12" style={{ background: "#c9b99a" }} />
                                        </div>

                                        <a
                                            href="/projects"
                                            className="btn-vintage inline-block px-10 py-3.5 no-underline"
                                            style={{
                                                background: "transparent",
                                                color: "#4a3c28",
                                                border: "1px solid #8b7355",
                                            }}
                                            onMouseEnter={(e) => {
                                                (e.currentTarget as HTMLElement).style.background = "#2d2418";
                                                (e.currentTarget as HTMLElement).style.color = "#f0e8d5";
                                                (e.currentTarget as HTMLElement).style.borderColor = "#2d2418";
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.currentTarget as HTMLElement).style.background = "transparent";
                                                (e.currentTarget as HTMLElement).style.color = "#4a3c28";
                                                (e.currentTarget as HTMLElement).style.borderColor = "#8b7355";
                                            }}
                                        >
                                            View All Projects
                                        </a>
                                    </motion.div>
                                </>
                            ) : (
                                /* ── Empty State ── */
                                <motion.div
                                    className="text-center py-20"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    {/* Botanical empty illustration */}
                                    <svg
                                        viewBox="0 0 80 80"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        style={{ width: 64, margin: "0 auto 20px", opacity: 0.35 }}
                                    >
                                        <circle
                                            cx="40"
                                            cy="40"
                                            r="36"
                                            stroke="#8b7355"
                                            strokeWidth="1"
                                            strokeDasharray="4 3"
                                        />
                                        <path
                                            d="M40 55 C40 42, 40 32, 40 22"
                                            stroke="#6b5e3f"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                        <ellipse
                                            cx="33"
                                            cy="32"
                                            rx="8"
                                            ry="5"
                                            fill="#8b7040"
                                            opacity=".5"
                                            transform="rotate(-25 33 32)"
                                        />
                                        <ellipse
                                            cx="47"
                                            cy="27"
                                            rx="8"
                                            ry="5"
                                            fill="#8b7040"
                                            opacity=".5"
                                            transform="rotate(20 47 27)"
                                        />
                                        <ellipse cx="40" cy="22" rx="6" ry="4" fill="#a08050" opacity=".4" />
                                    </svg>

                                    <p className="projects-title text-xl text-[#4a3c28] mb-2">No projects yet</p>
                                    <p className="projects-body text-[#8b7355] italic" style={{ fontSize: "15px" }}>
                                        Works in progress — check back soon.
                                    </p>
                                </motion.div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
});

ProjectsSection.displayName = "Projects";
export default ProjectsSection;
