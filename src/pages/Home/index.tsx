import { useNavigate } from "react-router";
import { Recycle, ScanLine, ClipboardList, User, Sparkles, Heart, Users } from "lucide-react";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="app-container" style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "hidden"
        }}>
            {/* Iconos de fondo decorativos */}
            <div style={{ position: "absolute", top: "8%", left: "10%", opacity: 0.15, transform: "scaleX(-1)" }}>
                <Recycle size={56} color="#fff" />
            </div>
            <div style={{ position: "absolute", top: "10%", right: "12%", opacity: 0.2 }}>
                <Recycle size={72} color="#DDEE8A" />
            </div>

            <div style={{ position: "absolute", top: "32%", left: "12%", opacity: 0.15 }}>
                <Sparkles size={32} color="#2B5729" />
            </div>
            <div style={{ position: "absolute", top: "35%", right: "15%", opacity: 0.15 }}>
                <Heart size={32} color="#2B5729" />
            </div>

            {/* Gran Logo Central */}
            <div style={{
                marginTop: "20vh",
                zIndex: 1,
                color: "#6BB865",
                filter: "drop-shadow(0px 8px 12px rgba(107, 184, 101, 0.4))",
                opacity: 0.95
            }}>
                <Recycle size={280} strokeWidth={1} style={{ transform: "rotate(-10deg)" }} />
            </div>

            {/* Contenedor Inferior Blanco Translúcido */}
            <div style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                padding: "2rem 1.5rem 3rem 1.5rem",
                background: "rgba(21, 235, 39, 0.38)",
                borderTopLeftRadius: "60px",
                borderTopRightRadius: "60px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                boxSizing: "border-box",
                zIndex: 2,
                backdropFilter: "blur(4px)"
            }}>

                {/* Tarjeta Blanca 1 */}
                <button
                    onClick={() => navigate("/scan")}
                    style={{
                        background: "#fff",
                        border: "none",
                        borderRadius: "20px",
                        padding: "1.2rem 1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.04)",
                        color: "#4a4a4a",
                        fontWeight: "600",
                        fontSize: "1.1rem",
                        marginTop: "5px"
                    }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <ScanLine size={24} color="#6BB865" />
                        Escanear material
                    </div>
                </button>

                {/* Tarjeta Blanca 2 */}
                <button
                    onClick={() => navigate("/centers")}
                    style={{
                        background: "#fff",
                        border: "none",
                        borderRadius: "20px",
                        padding: "1.2rem 1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.04)",
                        color: "#4a4a4a",
                        fontWeight: "600",
                        fontSize: "1.1rem"
                    }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <ClipboardList size={24} color="#6BB865" />
                        Lista de centros
                    </div>
                </button>

                {/* Botón Principal Verde */}
                <button
                    onClick={() => navigate("/community")}
                    style={{
                        background: "#fff",
                        border: "none",
                        borderRadius: "20px",
                        padding: "1.2rem 1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.04)",
                        color: "#4a4a4a",
                        fontWeight: "600",
                        fontSize: "1.1rem"
                    }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <Users size={24} color="#6BB865" />
                        Comunidad
                    </div>
                </button>

                {/* Tarjeta Blanca 3 */}
                <button
                    onClick={() => navigate("/profile")}
                    style={{
                        background: "#fff",
                        border: "none",
                        borderRadius: "20px",
                        padding: "1.2rem 1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.04)",
                        color: "#4a4a4a",
                        fontWeight: "600",
                        fontSize: "1.1rem"
                    }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <User size={24} color="#6BB865" />
                        Perfil
                    </div>
                    <div style={{ width: "20px", height: "20px" }}></div>
                </button>

            </div>
        </div>
    );
};

export default Home;
