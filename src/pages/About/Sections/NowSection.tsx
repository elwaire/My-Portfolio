// components/sections/NowSection.tsx
import { motion } from "framer-motion";
import type { CurrentActivity } from "../../../types/about";
import { memo, useMemo } from "react";

interface NowSectionProps {
    currentData: CurrentActivity[];
}

const ActivityList: React.FC<{ title: string; activities: CurrentActivity[] }> = ({ title, activities }) => (
    <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <ul className="space-y-3 text-gray-600 font-light">
            {activities.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                    <span className={`w-[6px] h-[6px] bg-blue-500 rounded-full mt-2 flex-shrink-0`}></span>
                    <span>{item.activity}</span>
                </li>
            ))}
        </ul>
    </div>
);

const NowSection: React.FC<NowSectionProps> = ({ currentData }) => {
    // Filter activities by type
    const { workActivities, learningActivities } = useMemo(() => {
        const work = currentData.filter((activity) => activity.type === "work");
        const learning = currentData.filter((activity) => activity.type === "learning");

        return {
            workActivities: work,
            learningActivities: learning,
        };
    }, [currentData]);

    return (
        <motion.section
            id="now"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
        >
            <h2 className="text-2xl font-semibold text-gray-900">Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ActivityList title="What I'm doing" activities={workActivities} />
                <ActivityList title="Learning & Growing" activities={learningActivities} />
            </div>
        </motion.section>
    );
};

export default memo(NowSection);
