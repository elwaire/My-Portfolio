import { memo } from "react";

const Loading = () => {
    return (
        <section className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 py-20">
            <div className="max-w-6xl mx-auto text-center w-full">
                {/* Title skeleton */}
                <div className="mb-12 sm:mb-16">
                    <div className="h-16 bg-gray-200 rounded-lg w-3/4 mx-auto mb-4 animate-pulse" />
                    <div className="h-16 bg-gray-200 rounded-lg w-2/3 mx-auto animate-pulse" />
                </div>

                {/* Cards skeleton */}
                <div className="relative mb-12 sm:mb-16 flex items-center justify-center" style={{ height: "300px" }}>
                    {Array.from({ length: 5 }, (_, i) => (
                        <div
                            key={i}
                            className="absolute w-32 h-32 md:w-48 md:h-48 bg-gray-200 rounded-2xl animate-pulse"
                            style={{
                                left: `${20 + i * 15}%`,
                                transform: `rotate(${-10 + i * 5}deg)`,
                            }}
                        />
                    ))}
                </div>

                {/* Description skeleton */}
                <div className="mb-8 sm:mb-12">
                    <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-2 animate-pulse" />
                    <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto animate-pulse" />
                </div>

                {/* Button skeleton */}
                <div className="h-12 bg-gray-200 rounded-full w-32 mx-auto animate-pulse" />
            </div>
        </section>
    );
};

export default memo(Loading);
