import { memo } from "react";

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 text-black border-t border-gray-200">
            {/* CTA Section */}
            <div className="container mx-auto px-6 py-20 text-center">
                <p className="text-neutral-400 text-sm font-light uppercase tracking-widest mb-4">
                    Got a project in mind?
                </p>
                <h2 className="text-3xl md:text-3xl font-semibold mb-8">Let's work together</h2>
                <a
                    href="mailto:elwairestudio@gmail.com"
                    className="inline-flex items-center gap-2 text-md  font-light 
                               text-black  transition-colors duration-300 underline hover:text-blue-600
                          "
                >
                    elwairestudio@gmail.com
                    <span className="text-lg">↗</span>
                </a>
            </div>

            {/* Divider */}
            <div className="container mx-auto px-6">
                <div className="border-t border-neutral-300" />
            </div>

            {/* Bottom Section */}
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Left - Copyright */}
                    <p className="text-neutral-500 text-sm">© {currentYear} Ngoc Min. All rights reserved.</p>

                    {/* Center - Social Links */}
                    <div className="flex items-center gap-6">
                        <a
                            href="https://www.linkedin.com/in/kien-vo-ngoc-min-2b3597275/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-400 hover:text-blue-500 hover:underline transition-colors duration-300"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://www.behance.net/nevwyn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-400 hover:text-blue-500 hover:underline transition-colors duration-300"
                        >
                            Behance
                        </a>
                        <a
                            href="https://dribbble.com/Nevwyn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-400 hover:text-blue-500 hover:underline transition-colors duration-300"
                        >
                            Dribbble
                        </a>
                        <a
                            href="https://www.instagram.com/ktys4tt/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-400 hover:text-blue-500 hover:underline transition-colors duration-300"
                        >
                            Instagram
                        </a>
                    </div>

                    {/* Right - Back to top */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="text-neutral-500 hover:text-blue-500 text-sm transition-colors duration-300 
                                   flex items-center gap-1"
                    >
                        Back to top
                        <span>↑</span>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default memo(Footer);
