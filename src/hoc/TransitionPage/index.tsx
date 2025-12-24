import { motion } from "framer-motion";
import type { ComponentType } from "react";

const transitionPage = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const PageWithTransition = (props: P) => {
        return (
            <>
                <WrappedComponent {...props} />

                {/* Left curtain */}
                <motion.div
                    className="fixed top-0 left-0 w-1/2 h-screen z-50 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://i.pinimg.com/1200x/da/e8/a6/dae8a612de5dbe3b74bb51abda3a8fee.jpg')",
                        backgroundPosition: "left center",
                        boxShadow: "inset -20px 0 40px rgba(0,0,0,0.6)",
                    }}
                    initial={{ clipPath: "inset(0 0 0 0)" }} // full hiện
                    animate={{ clipPath: "inset(0 100% 0 0)" }} // ẩn dần từ phải qua
                    exit={{ clipPath: "inset(0 0 0 0)" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                />

                {/* Right curtain */}
                <motion.div
                    className="fixed top-0 right-0 w-1/2 h-screen z-50 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://i.pinimg.com/1200x/da/e8/a6/dae8a612de5dbe3b74bb51abda3a8fee.jpg')",
                        backgroundPosition: "right center",
                        boxShadow: "inset 20px 0 40px rgba(0,0,0,0.6)",
                    }}
                    initial={{ clipPath: "inset(0 0 0 0)" }}
                    animate={{ clipPath: "inset(0 0 0 100%)" }} // ẩn dần từ trái qua
                    exit={{ clipPath: "inset(0 0 0 0)" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                />
            </>
        );
    };

    return PageWithTransition;
};

export default transitionPage;
