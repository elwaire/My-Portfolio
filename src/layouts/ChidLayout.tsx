import Footer from "../components/shared/Footer";
import { Outlet } from "react-router-dom";
import CloseButton from "../components/customs/CloseButton";

export default function ChildLayout() {
    return (
        <div className="AppWrapper">
            <div className="min-h-screen ">
                <div className="fixed top-4 left-1/2 -translate-x-1/2">
                    <CloseButton />
                </div>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
