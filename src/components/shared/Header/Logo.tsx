// components/Logo.tsx
import { memo } from "react";
import { Link } from "react-router-dom";
import { useClientLogoSettings } from "../../../hooks/useLogoSettings";

interface LogoProps {
    className?: string;
}

const Logo = memo(({ className }: LogoProps) => {
    const { settings, isLoading } = useClientLogoSettings();

    if (isLoading) {
        return <div className={`h-8 w-20 bg-neutral-200 animate-pulse rounded ${className}`} />;
    }

    if (!settings) {
        return (
            <Link to="/" className={`font-bold text-lg ${className}`}>
                NM
            </Link>
        );
    }

    return (
        <Link to={settings.logoLink || "/"} className={`flex items-center gap-2 ${className}`}>
            {settings.logoImage && (
                <img src={settings.logoImage} alt={settings.logoText || "Logo"} className="h-8 w-auto object-contain" />
            )}
        </Link>
    );
});

export default Logo;
