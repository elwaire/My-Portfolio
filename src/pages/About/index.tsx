import {
    aboutSections,
    achievements,
    currentLearning,
    currentWork,
    profileData,
    timeline,
} from "../../constants/aboutData";
import transitionPage from "../../hoc/TransitionPage";
import AboutSidebar from "./Sections/AboutSiderBar";
import AchievementsSection from "./Sections/AchievementsSection";
import NowSection from "./Sections/NowSection";
import ProfileSection from "./Sections/ProfileSection";
import TimelineSection from "./Sections/TimelineSection";

const AboutUsPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center px-4 lg:px-6 pb-16 pt-36">
            <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-8 lg:gap-12">
                <AboutSidebar sections={aboutSections} />

                <main className="w-full lg:w-3/4 space-y-16 lg:space-y-20">
                    <ProfileSection data={profileData} />
                    <NowSection currentWork={currentWork} currentLearning={currentLearning} />
                    <AchievementsSection achievements={achievements} />
                    <TimelineSection timeline={timeline} />
                </main>
            </div>
        </div>
    );
};

export default transitionPage(AboutUsPage);
