import transitionPage from "../../hoc/TransitionPage";
import Banner from "./Sections/Banner";
import Certificate from "./Sections/Certificate";
import Projects from "./Sections/Projects";

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-start">
            <Banner />
            <Projects />
            <Certificate />
        </div>
    );
};

export default transitionPage(HomePage);
