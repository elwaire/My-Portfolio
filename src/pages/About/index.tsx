import { memo } from "react";
import { aboutSections } from "../../constants/aboutData";
import { useAbout } from "../../hooks/useAbout";
import AboutSidebar from "./Sections/AboutSiderBar";
import AchievementsSection from "./Sections/AchievementsSection";
import NowSection from "./Sections/NowSection";
import ProfileSection from "./Sections/ProfileSection";
import TimelineSection from "./Sections/TimelineSection";

const AboutUsPage: React.FC = () => {
    const { aboutData, loading } = useAbout();

    if (loading) {
        return (
            <div className="p-6">
                <div className="h-8 bg-gray-200 rounded w-64 mb-6 animate-pulse" />
                Loading
            </div>
        );
    }

    if (!aboutData) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">About Management</h1>
                <div className="text-center py-8">
                    <p className="text-gray-500">No about data found</p>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen flex flex-col items-center px-4 lg:px-6 pb-16 pt-36">
            <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-8 lg:gap-12">
                <AboutSidebar sections={aboutSections} />

                <main className="w-full lg:w-3/4 space-y-16 lg:space-y-20">
                    <ProfileSection data={aboutData?.profile} />
                    <NowSection currentData={aboutData?.currentActivities} />
                    <AchievementsSection achievements={aboutData?.achievements} />
                    <TimelineSection timeline={aboutData?.timeline} />
                </main>
            </div>
        </div>
    );
};

export default memo(AboutUsPage);
