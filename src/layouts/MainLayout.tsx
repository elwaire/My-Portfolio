import { motion } from "framer-motion";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { Outlet } from "react-router-dom";
import londonTown from "../assets/london-town.png";
import bird from "../assets/bird.png";

export default function MainLayout() {
    return (
        <div className="AppWrapper">
            <Header />
            <div className="min-h-screen">
                <Outlet />
            </div>
            <Footer />

            <motion.img
                src={londonTown}
                alt=""
                className="w-[150px] fixed -bottom-3 right-0"
                initial={{ x: 80, opacity: 0, rotate: -12 }}
                animate={{ x: 0, opacity: 1, rotate: -12 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            />

            <motion.img
                src={bird}
                alt=""
                className="w-[150px] fixed top-19 left-0"
                initial={{ x: -80, opacity: 0, rotate: 12 }}
                animate={{ x: 0, opacity: 1, rotate: 12 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1 }}
            />
        </div>
    );
}
