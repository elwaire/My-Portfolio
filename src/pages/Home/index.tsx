import transitionPage from "../../hoc/TransitionPage";
import BannerSection from "./Sections/BannerSection";
import Certificate from "./Sections/CertificateSection";
import ProjectsSection from "./Sections/ProjectsSection";

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-start">
            <BannerSection />
            <ProjectsSection />
            <Certificate />
        </div>
    );
};

export default transitionPage(HomePage);
