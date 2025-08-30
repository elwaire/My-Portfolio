import { memo } from "react";
import { motion } from "framer-motion";
import Button from "../../../components/customs/Button";

const Banner = memo(() => {
    const dataImage = "https://i.pinimg.com/1200x/05/12/7b/05127bc276f1f4ca190e45c46e6463c9.jpg";
    // const dataImage = "";

    return (
        <section className="mt-[76px] flex justify-center items-center">
            <div className="w-full max-w-6xl flex flex-col gap-10 lg:flex-row-reverse lg:items-center lg:min-h-[80vh] px-4">
                {/* Image Section */}
                <div className="lg:flex-1 flex justify-center items-center">
                    <div className="h-[45vh]  rounded-xl overflow-hidden bg-muted lg:w-[560px] w-full shadow-3xl">
                        {dataImage ? (
                            <img src={dataImage} alt="Vo Ngoc Min" className="w-full h-full object-cover" />
                        ) : (
                            // Skeleton shimmer
                            <motion.div
                                initial={{ opacity: 0.5 }}
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
                            />
                        )}
                    </div>
                </div>

                {/* Text Section */}
                <div className="flex flex-col gap-8 lg:flex-1">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl  font-bold leading-tight tracking-tight">
                            Hello, I’m <span className="text-primary">Ngoc Min</span>. <br />
                            Product Designer & Solo Entrepreneur.
                        </h1>
                        <p className="text-md font-light max-w-xl text-disabled">
                            I create clean and engaging user experiences that help people enhance their value. My focus
                            is on simplicity, usability, and making designs that people truly love to use.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <Button variant="primary">Contact Me</Button>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Banner;
