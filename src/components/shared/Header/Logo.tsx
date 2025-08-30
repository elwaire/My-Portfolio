import { memo } from "react";

interface LogoProps {
    className?: string;
}

const Logo = memo((props: LogoProps) => {
    return <div className={`font-bold text-lg ${props.className}`}>My Logo</div>;
});

export default Logo;
