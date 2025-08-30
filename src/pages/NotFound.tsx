import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const goHome = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6">
            <div className="max-w-2xl mx-auto text-center">
                {/* Main heading with fade in */}
                <div
                    className={`mb-8 transition-all duration-1000 ${
                        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 leading-tight">
                        Looks like you're lost...
                    </h1>
                </div>

                {/* Description with delayed fade in */}
                <div
                    className={`mb-12 transition-all duration-700 delay-300 ${
                        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                >
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto">
                        We couldn't find the page you are looking for. Let us bring you home.
                    </p>
                </div>

                {/* Primary action button with delayed fade in */}
                <div
                    className={`mb-20 transition-all duration-700 delay-500 ${
                        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                >
                    <button
                        onClick={goHome}
                        className="group relative px-12 py-4 bg-black text-white text-lg font-medium rounded-full overflow-hidden transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5"
                    >
                        <span className="relative z-10">Go back home</span>
                        <div className="absolute inset-0 bg-gray-800 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                    </button>
                </div>

                {/* Email contact with delayed fade in */}
                <div
                    className={`transition-all duration-700 delay-700 ${
                        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                >
                    <p className="text-gray-600">
                        If this is a broken link, you can let me know via{" "}
                        <button
                            onClick={() => navigate("/contact")}
                            className="text-black font-medium hover:text-gray-700 transition-colors duration-200 underline decoration-1 underline-offset-4 hover:decoration-2"
                        >
                            email
                        </button>
                        .
                    </p>
                </div>

                {/* Subtle floating animation elements */}
                <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                    <div className="absolute top-1/3 left-1/6 w-1 h-1 bg-gray-200 rounded-full animate-float-gentle opacity-40"></div>
                    <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-gray-300 rounded-full animate-float-gentle-delayed opacity-30"></div>
                    <div className="absolute top-1/2 right-1/6 w-0.5 h-0.5 bg-gray-400 rounded-full animate-float-gentle-slow opacity-20"></div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
