import { memo } from "react";

const NoData = () => {
    return (
        <section className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 py-20">
            <div className="max-w-6xl mx-auto text-center w-full">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-900 leading-tight mb-4">
                    Welcome
                </h1>
                <p className="text-gray-600 text-lg">Banner content coming soon</p>
            </div>
        </section>
    );
};

export default memo(NoData);
