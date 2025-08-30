import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="AppWrapper">
            <Header />
            <div className="min-h-screen">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
