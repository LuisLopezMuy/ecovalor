import { useNavigate } from "react-router";
import { Leaf } from "lucide-react";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#f4fbf4",
            fontFamily: "'Inter', sans-serif",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            textAlign: "center"
        }}>
            <div style={{
                background: "linear-gradient(135deg, #6BB865 0%, #4a8247 100%)",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "2rem",
                boxShadow: "0 10px 30px rgba(107, 184, 101, 0.3)"
            }}>
                <Leaf size={60} color="white" />
            </div>

            <h1 style={{ color: "#2B5729", fontSize: "2.5rem", fontWeight: "800", marginBottom: "1rem" }}>
                404
            </h1>
            <h2 style={{ color: "#2B5729", fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.5rem" }}>
                ¡Ups! Página no encontrada
            </h2>
            <p style={{ color: "#666", fontSize: "1.1rem", marginBottom: "2rem", maxWidth: "400px" }}>
                Parece que el camino que buscabas no existe. ¡No te preocupes! Volvamos al inicio.
            </p>

            <button
                onClick={() => navigate("/home")}
                style={{
                    background: "linear-gradient(135deg, #6BB865 0%, #4a8247 100%)",
                    color: "white",
                    border: "none",
                    padding: "1rem 2rem",
                    borderRadius: "30px",
                    fontSize: "1rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(107, 184, 101, 0.3)",
                    transition: "transform 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
                Volver al Inicio
            </button>
        </div>
    );
};

export default NotFound;
