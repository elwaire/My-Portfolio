import { memo } from "react";
import { NavLink } from "react-router-dom";
import { dataNavLink } from "../../../constants/paths";

const NavLinks = memo(({ onClick, className }: { onClick?: () => void; className?: string }) => {
    return (
        <>
            {dataNavLink.map((item, index) => (
                <NavLink
                    key={`navlink-${index}`}
                    to={item.path}
                    onClick={onClick}
                    className={className}
                    style={({ isActive }) => ({
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: isActive ? "12.5px" : "11px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase" as const,
                        color: isActive ? "#1e1a12" : "#4a3c28",
                        textDecoration: "none",
                        padding: "4px 0",
                        position: "relative" as const,
                        borderBottom: isActive ? "1.5px solid #8b7355" : "1.5px solid transparent",
                        transition: "color 0.2s, font-size 0.2s, border-color 0.2s",
                        fontWeight: isActive ? 500 : 400,
                    })}
                >
                    {item.label}
                </NavLink>
            ))}
        </>
    );
});

NavLinks.displayName = "NavLinks";
export default NavLinks;
