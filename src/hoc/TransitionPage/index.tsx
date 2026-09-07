import { motion } from "framer-motion";
import type { ComponentType } from "react";
import wallpaper from "../../assets/wallpaper.png";

const transitionPage = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const PageWithTransition = (props: P) => {
        return (
            <>
                <WrappedComponent {...props} />

                {/* Left curtain */}
                <motion.div
                    className="fixed top-0 left-0 w-full h-screen z-50 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${wallpaper})`,
                        backgroundPosition: "left center",
                        boxShadow: "inset -20px 0 40px rgba(0,0,0,0.6)",
                    }}
                    initial={{ clipPath: "inset(0 0 0 0)" }} // full hiện
                    animate={{ clipPath: "inset(0 100% 0 0)" }} // ẩn dần từ phải qua
                    exit={{ clipPath: "inset(0 0 0 0)" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                />
            </>
        );
    };

    return PageWithTransition;
};

export default transitionPage;
