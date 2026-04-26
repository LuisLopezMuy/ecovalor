import { useNavigate } from "react-router";
import { Recycle, ScanLine, MapPin, User, Sparkles, Users, ArrowRight, Leaf } from "lucide-react";

export default function Home() {
    const navigate = useNavigate();
    const currentUser = localStorage.getItem("username") || "Héroe Ecológico";

    // Extraer inicial para el avatar falso si acaso quisieramos
    // const init = currentUser.charAt(0).toUpperCase();

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#f4fbf4",
            fontFamily: "'Inter', sans-serif",
            paddingBottom: "2rem", // Reducido ya que NO hay Navbar en esta ruta
            display: "flex",
            flexDirection: "column",
        }}>
            {/* Header / Saludo */}
            <div style={{
                background: "linear-gradient(135deg, #2B5729 0%, #4a8247 100%)",
                padding: "3rem 1.5rem 4rem 1.5rem",
                borderBottomLeftRadius: "35px",
                borderBottomRightRadius: "35px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(43, 87, 41, 0.15)"
            }}>
                <div style={{ position: "absolute", top: "-20px", right: "-20px", opacity: 0.1 }}>
                    <Leaf size={180} color="#fff" />
                </div>
                {/* Saludo */}
                <h1 style={{ color: "white", margin: "0 0 6px 0", fontSize: "2rem", fontWeight: "800", position: "relative", zIndex: 1 }}>
                    ¡Hola, {currentUser}!
                </h1>
                <p style={{ color: "#d1ead0", margin: 0, fontSize: "1.05rem", fontWeight: "500", position: "relative", zIndex: 1 }}>
                    ¿Qué vamos a reciclar el día de hoy?
                </p>
            </div>

            {/* Tarjeta Flotante de Estadísticas (EcoPuntos) */}
            <div style={{
                margin: "-35px 1.5rem 1.5rem 1.5rem",
                background: "white",
                borderRadius: "24px",
                padding: "1.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                position: "relative",
                zIndex: 2
            }}>
                {/* Meta 1: Puntos */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, justifyContent: "center" }}>
                    <div style={{ background: "#fff5e6", padding: "12px", borderRadius: "16px" }}>
                        <Sparkles size={24} color="#f59e0b" />
                    </div>
                    <div>
                        <div style={{ color: "#888", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>EcoPuntos</div>
                        <div style={{ color: "#2B5729", fontSize: "1.4rem", fontWeight: "800" }}>2,450</div>
                    </div>
                </div>
                
                {/* Divisor Vertical */}
                <div style={{ height: "50px", width: "1px", background: "#f0f0f0" }}></div>
                
                {/* Meta 2: Impacto */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, justifyContent: "center" }}>
                    <div style={{ background: "#f0faef", padding: "12px", borderRadius: "16px" }}>
                        <Recycle size={24} color="#6BB865" />
                    </div>
                    <div>
                        <div style={{ color: "#888", fontSize: "0.85rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>Impacto</div>
                        <div style={{ color: "#2B5729", fontSize: "1.4rem", fontWeight: "800" }}>244 lb</div>
                    </div>
                </div>
            </div>

            {/* Menu de Acciones (Grid) */}
            <div style={{ padding: "0.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <h3 style={{ color: "#2B5729", margin: "0.5rem 0 0.5rem 0", fontSize: "1.3rem", fontWeight: "800" }}>
                    Acciones Rápidas
                </h3>

                {/* Botón Call-To-Action Principal: Escanear */}
                <div 
                    onClick={() => navigate("/app/scan")}
                    style={{
                        background: "linear-gradient(135deg, #6BB865 0%, #4a8247 100%)",
                        borderRadius: "24px",
                        padding: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        boxShadow: "0 8px 25px rgba(107, 184, 101, 0.3)",
                        transition: "transform 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                    <div>
                        <h4 style={{ color: "white", margin: "0 0 5px 0", fontSize: "1.3rem", fontWeight: "800" }}>Escanear Material</h4>
                        <p style={{ color: "#e1efe0", margin: 0, fontSize: "0.95rem" }}>Usa la IA para identificar desechos</p>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.25)", padding: "16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
                        <ScanLine size={32} color="white" />
                    </div>
                </div>

                {/* Grid de navegación secundaria */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    {/* Centros Cercanos */}
                    <div 
                        onClick={() => navigate("/app/centers")}
                        style={{
                            background: "white",
                            borderRadius: "24px",
                            padding: "1.5rem 1.2rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            gap: "12px",
                            cursor: "pointer",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                            transition: "transform 0.2s"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                    >
                        <div style={{ background: "#f0faef", padding: "12px", borderRadius: "50%", width: "fit-content" }}>
                            <MapPin size={24} color="#6BB865" />
                        </div>
                        <span style={{ color: "#333", fontWeight: "800", fontSize: "1.1rem" }}>Directorio</span>
                    </div>

                    {/* Comunidad */}
                    <div 
                        onClick={() => navigate("/app/community")}
                        style={{
                            background: "white",
                            borderRadius: "24px",
                            padding: "1.5rem 1.2rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            gap: "12px",
                            cursor: "pointer",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                            transition: "transform 0.2s"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                    >
                        <div style={{ background: "#f0faef", padding: "12px", borderRadius: "50%", width: "fit-content" }}>
                            <Users size={24} color="#6BB865" />
                        </div>
                        <span style={{ color: "#333", fontWeight: "800", fontSize: "1.1rem" }}>Comunidad</span>
                    </div>
                </div>

                {/* Perfil en formato Lista */}
                <div 
                    onClick={() => navigate("/app/profile")}
                    style={{
                        background: "white",
                        borderRadius: "20px",
                        padding: "1.2rem 1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                        marginTop: "0.2rem",
                        transition: "transform 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(5px)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "translateX(0)"}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ background: "#f0faef", padding: "10px", borderRadius: "50%" }}>
                            <User size={20} color="#6BB865" />
                        </div>
                        <span style={{ color: "#333", fontWeight: "700", fontSize: "1.05rem" }}>Mi Perfil</span>
                    </div>
                    <ArrowRight size={20} color="#ccc" />
                </div>
            </div>

        </div>
    );
}
