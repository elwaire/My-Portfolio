const Footer: React.FC = () => {
    return (
        <footer className=" text-neutral-700 border-t border-neutral-200 mt-16">
            <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Logo */}
                <div>
                    <div className="text-2xl font-bold">NM</div>
                </div>

                {/* Hello */}
                <div>
                    <h4 className="text-sm font-semibold text-neutral-500 uppercase mb-3">Hello</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#about" className="hover:text-black transition">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#newsletter" className="hover:text-black transition">
                                Newsletter
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:text-black transition">
                                Contact
                            </a>
                        </li>
                        <li>
                            <a href="#faq" className="hover:text-black transition">
                                FAQ
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h4 className="text-sm font-semibold text-neutral-500 uppercase mb-3">Services</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#design" className="hover:text-black transition">
                                Product Design
                            </a>
                        </li>
                        <li>
                            <a href="#development" className="hover:text-black transition">
                                Web Development
                            </a>
                        </li>
                        <li>
                            <a href="#speaking" className="hover:text-black transition">
                                Speaking
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h4 className="text-sm font-semibold text-neutral-500 uppercase mb-3">Resources</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#kit" className="hover:text-black transition">
                                The Creative Freelancer Kit
                            </a>
                        </li>
                        <li>
                            <a href="#resume" className="hover:text-black transition">
                                Resume Kit for UI/UX Designers
                            </a>
                        </li>
                        <li>
                            <a href="#roadmap" className="hover:text-black transition">
                                UI/UX Design Learning Roadmap
                            </a>
                        </li>
                        <li>
                            <a href="#wallpaper" className="hover:text-black transition">
                                Glow Wallpaper Pack
                            </a>
                        </li>
                        <li>
                            <a href="#all" className="hover:text-black transition">
                                See all resources →
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-neutral-200 mt-8">
                <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-neutral-500">
                        © {new Date().getFullYear()} Ngoc Min | Built with Elwaire Studio
                    </p>
                    <div className="flex gap-4 text-neutral-500 text-lg">
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-black transition"
                        >
                            YT
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-black transition"
                        >
                            TW
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-black transition"
                        >
                            IN
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-black transition"
                        >
                            IG
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
