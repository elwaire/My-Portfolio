import { motion } from "framer-motion";
import type { AboutSection } from "../../types/about";

interface AboutSidebarProps {
    sections: AboutSection[];
}

const AboutSidebar: React.FC<AboutSidebarProps> = ({ sections }) => (
    <aside className="hidden lg:block w-full lg:w-1/4 lg:sticky lg:top-24 h-fit">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
        >
            <h3 className="font-semibold text-gray-700 mb-4">About Me</h3>
            <ul className="space-y-2 text-gray-600">
                {sections.map((section) => (
                    <li key={section.id}>
                        <a
                            href={`#${section.id}`}
                            className="hover:underline font-light text-sm transition-colors duration-200 block py-1"
                        >
                            {section.title}
                        </a>
                    </li>
                ))}
            </ul>
        </motion.div>
    </aside>
);

export default AboutSidebar;
