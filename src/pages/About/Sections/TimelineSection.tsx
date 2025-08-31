import { motion } from "framer-motion";
import type { TimelineItem } from "../../../types/about";

interface TimelineSectionProps {
    timeline: TimelineItem[];
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ timeline }) => (
    <motion.section
        id="timeline"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="space-y-6"
    >
        <h2 className="text-2xl font-semibold text-gray-900">Timeline</h2>
        <div className="space-y-8">
            {timeline.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    className="flex gap-6"
                >
                    <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        {index !== timeline.length - 1 && <div className="w-px h-16 bg-gray-200 mt-2"></div>}
                    </div>
                    <div className="flex-1 pb-8">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-2">
                            <h3 className="font-medium text-gray-900">{item.role}</h3>
                            <span className="text-gray-500">at</span>
                            <span className="font-medium text-blue-600">{item.company}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{item.period}</p>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    </motion.section>
);

export default TimelineSection;
