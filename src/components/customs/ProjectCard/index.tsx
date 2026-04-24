import { memo } from "react";
import type { Project } from "../../../types/project";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PATHS from "../../../constants/paths";

// ─── Category config ───────────────────────────────────────────────────────────

const categoryConfig: Record<Project["category"], { label: string; accent: string }> = {
    uiux: { label: "UI / UX", accent: "#6a8a9a" },
    graphic: { label: "Graphic", accent: "#8b7355" },
    art: { label: "Fine Art", accent: "#7a6a9a" },
};

// ─── Component ────────────────────────────────────────────────────────────────

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    const config = categoryConfig[project.category] ?? { label: project.category, accent: "#8b7355" };

    return (
        <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
            className="group relative flex flex-col cursor-pointer h-full"
            style={{
                background: "#faf7f0",
                border: "0.5px solid #c9b99a",
                borderRadius: "2px",
                boxShadow: "0 2px 8px rgba(30,26,18,.08)",
                transition: "box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(30,26,18,.14)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(30,26,18,.08)";
            }}
        >
            {/* ── Thumbnail ── */}
            <Link
                to={`${PATHS.PROJECT}/${project.id}`}
                className="relative block overflow-hidden"
                style={{ borderRadius: "2px 2px 0 0" }}
            >
                <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full object-cover"
                    style={{ height: "260px", display: "block" }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />

                {/* Gradient fade bottom */}
                <div
                    className="absolute inset-x-0 bottom-0 pointer-events-none"
                    style={{
                        height: "80px",
                        background: "linear-gradient(to top, #faf7f0, transparent)",
                    }}
                />

                {/* Category badge */}
                <div
                    className="absolute top-3 left-3"
                    style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "10px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        padding: "5px 12px",
                        color: "#f0e8d5",
                        background: "rgba(30,26,18,0.65)",
                        backdropFilter: "blur(4px)",
                        borderRadius: "1px",
                        lineHeight: 1,
                    }}
                >
                    {config.label}
                </div>
            </Link>

            {/* ── Body ── */}
            <div className="flex flex-col gap-2 p-5 pb-6 flex-grow">
                {/* Accent line */}
                <div
                    style={{
                        width: "28px",
                        height: "1px",
                        background: config.accent,
                        opacity: 0.7,
                        marginBottom: "4px",
                    }}
                />

                <Link to={`${PATHS.PROJECT}/${project.id}`} className="no-underline">
                    <h3
                        className="group-hover:opacity-70 transition-opacity duration-200"
                        style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: "17px",
                            fontWeight: 500,
                            color: "#1e1a12",
                            lineHeight: 1.3,
                            margin: 0,
                        }}
                    >
                        {project.title}
                    </h3>
                </Link>

                <p
                    className="line-clamp-2"
                    style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "14px",
                        fontStyle: "italic",
                        color: "#5c5040",
                        lineHeight: 1.65,
                        margin: 0,
                    }}
                >
                    {project.description}
                </p>

                {/* View link */}
                <Link
                    to={`${PATHS.PROJECT}/${project.id}`}
                    className="no-underline mt-auto pt-3 self-start flex items-center gap-1.5 group/link"
                    style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "11px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#8b7355",
                    }}
                >
                    <span className="group-hover/link:underline underline-offset-2">View project</span>
                    <svg viewBox="0 0 16 16" fill="none" style={{ width: 11, marginTop: 1 }}>
                        <path
                            d="M3 8h10M9 4l4 4-4 4"
                            stroke="#8b7355"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
            </div>
        </motion.article>
    );
};

export default memo(ProjectCard);
