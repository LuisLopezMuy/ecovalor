import { Link, useLocation } from "react-router";
import { ScanLine, ClipboardList, Users, User } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
    const isActive = currentPath.startsWith(to);
    return (
      <Link 
        to={to} 
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          textDecoration: "none",
          color: isActive ? "#fff" : "rgba(255, 255, 255, 0.6)",
          gap: "6px",
          transition: "all 0.2s ease"
        }}
      >
        <div style={{ 
          background: isActive ? "rgba(255, 255, 255, 0.2)" : "transparent",
          padding: "8px", 
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Icon size={27} strokeWidth={2.4} />
        </div>
        <span style={{ fontSize: "0.85rem", fontWeight: isActive ? "800" : "700" }}>{label}</span>
      </Link>
    );
  };

  return (
    <nav style={{ 
      background: "#6BB865", 
      display: "flex", 
      justifyContent: "space-between", 
      padding: "1rem 2rem 1rem 2rem",
      borderTopLeftRadius: "24px",
      borderTopRightRadius: "24px",
      boxShadow: "0 -4px 20px rgba(0,0,0,0.1)",
      zIndex: 100
    }}>
      <NavItem to="/app/scan" icon={ScanLine} label="Escanear" />
      <NavItem to="/app/centers" icon={ClipboardList} label="Centros" />
      <NavItem to="/app/community" icon={Users} label="Comunidad" />
      <NavItem to="/app/profile" icon={User} label="Perfil" />
    </nav>
  );
};

export default Navbar;
