import { memo } from "react";

const Loading = () => {
    return (
        <section className="min-h-screen md:min-h-[110vh] lg:min-h-[140vh] w-full flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 pb-8 pt-24 sm:pt-28 md:pt-32">
            {/* Header Skeleton: Title & Description */}
            <div className="w-full max-w-7xl mx-auto text-start pt-4 sm:pt-8 mb-8 sm:mb-12">
                <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 md:gap-8">
                    {/* Main Title Skeleton */}
                    <div className="flex justify-start w-full md:w-auto">
                        <div className="w-72 sm:w-96 lg:w-[460px] space-y-3">
                            <div className="h-10 sm:h-12 lg:h-14 bg-gray-200  animate-pulse" />
                            <div className="h-10 sm:h-12 lg:h-14 bg-gray-200  w-3/4 animate-pulse" />
                        </div>
                    </div>

                    {/* Description Skeleton */}
                    <div className="w-full md:w-auto">
                        <div className="w-full md:w-80 space-y-2.5 flex flex-col items-start md:items-end">
                            <div className="h-4 bg-gray-200  w-full animate-pulse" />
                            <div className="h-4 bg-gray-200  w-5/6 animate-pulse" />
                            <div className="h-4 bg-gray-200  w-2/3 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section Skeleton: Artworks & CTA */}
            <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 w-full">
                {/* Artwork Cards Skeleton */}
                <div className="w-full overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                    <div className="flex gap-2.5 sm:gap-3 max-w-7xl mx-auto min-w-max md:min-w-full pb-2 sm:pb-0">
                        {Array.from({ length: 5 }, (_, i) => (
                            <div
                                key={i}
                                className="w-40 sm:w-48 md:w-auto md:flex-1 flex-shrink-0 aspect-[3/4] bg-gray-200 rounded-xs animate-pulse"
                            />
                        ))}
                    </div>
                </div>

                {/* CTA Button Skeleton */}
                <div className="flex justify-center">
                    <div className="h-11 w-36 bg-gray-200  animate-pulse" />
                </div>
            </div>
        </section>
    );
};

export default memo(Loading);
