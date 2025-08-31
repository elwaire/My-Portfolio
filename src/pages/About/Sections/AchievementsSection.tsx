import { motion } from "framer-motion";
import type { Achievement } from "../../../types/about";

interface AchievementsSectionProps {
    achievements: Achievement[];
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements }) => (
    <motion.section
        id="achievements"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="space-y-6"
    >
        <h2 className="text-2xl font-semibold text-gray-900">Achievements</h2>
        <div className="space-y-6">
            {achievements.map((achievement, index) => (
                <motion.div
                    key={achievement.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    className="flex gap-6 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <div className="text-lg font-semibold text-gray-500 min-w-[60px]">{achievement.year}</div>
                    <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{achievement.title}</h3>
                        <p className="text-gray-600 font-light text-sm">{achievement.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    </motion.section>
);

export default AchievementsSection;
