import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

import PATHS from "../constants/paths";
import AboutUsPage from "../pages/About";
import HomePage from "../pages/Home";
import NotFound from "../pages/NotFound";

import ProjectsPage from "../pages/Projects";
import DetailProjectPage from "../pages/DetailProject";

import MainLayout from "../layouts/MainLayout";
import ChildLayout from "../layouts/ChidLayout";

export default function AppRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* Routes có layout */}
                <Route element={<MainLayout />}>
                    <Route path={PATHS.HOME} element={<HomePage />} />
                    <Route path={PATHS.ABOUT_US} element={<AboutUsPage />} />
                    <Route path={PATHS.PROJECT} element={<ProjectsPage />} />
                </Route>

                {/* Route không layout */}
                <Route element={<ChildLayout />}>
                    <Route path={`${PATHS.PROJECT}/:idProject`} element={<DetailProjectPage />} />
                </Route>

                {/* Route 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AnimatePresence>
    );
}
