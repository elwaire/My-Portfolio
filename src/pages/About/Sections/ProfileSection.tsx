import { motion } from "framer-motion";
import { memo } from "react";
import type { ProfileData } from "../../../types/about";

interface ProfileSectionProps {
    data: ProfileData;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ data }) => (
    <motion.section
        id="profile"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="space-y-8"
    >
        <div className="flex flex-col  items-start gap-8">
            {/* Profile Image */}
            <div className="w-full ">
                <motion.div transition={{ type: "spring", stiffness: 300 }} className="relative">
                    <img src={data.image} alt="Profile" className="w-full h-80 lg:h-[500px] object-cover " />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
            </div>

            {/* Profile Info */}
            <div className="w-full space-y-6">
                <div>
                    <h1 className="text-3xl uppercase text-gray-900 mb-2">{data.name}</h1>
                    <p className="text-md font-light text-gray-600 mb-4">{data.title}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {data.skills.map((skill) => (
                            <span
                                key={skill}
                                className="px-3 py-1 font-light text-sm bg-gray-100 text-gray-600 rounded-full"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    {data.bio.map((paragraph, index) => (
                        <p key={index} className="text-gray-600 font-light leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    </motion.section>
);

export default memo(ProfileSection);
