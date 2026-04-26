import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  User,
  Settings,
  LogOut,
  ChevronRight,
  Trophy,
  Leaf,
  Scale,
  History,
  HelpCircle,
  Bell,
  Star
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Usuario");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/app/login");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "transparent",
      fontFamily: "'Inter', sans-serif",
      paddingBottom: "1rem"
    }}>
      {/* Header Splash-like */}
      <div style={{
        background: "linear-gradient(135deg, #6BB865 0%, #4a9444 100%)",
        padding: "3rem 2rem 5rem 2rem",
        borderBottomLeftRadius: "40px",
        borderBottomRightRadius: "40px",
        position: "relative",
        textAlign: "center",
        color: "white"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "700" }}>Perfil</h1>
          <button style={{ background: "none", border: "none", color: "white", cursor: "pointer", padding: "0.5rem" }}>
            <Settings size={28} />
          </button>
        </div>
      </div>

      {/* Tarjeta de Perfil principal flotante */}
      <div style={{
        margin: "-4rem 1.5rem 2rem 1.5rem",
        background: "white",
        borderRadius: "28px",
        padding: "2rem 1.5rem",
        boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        zIndex: 10
      }}>
        <div style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f0faef 0%, #e1f5df 100%)",
          border: "4px solid white",
          boxShadow: "0 8px 16px rgba(107, 184, 101, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
          marginTop: "-4.5rem",
          color: "#2B5729"
        }}>
          <User size={48} />
        </div>
        
        <h2 style={{ margin: "0 0 0.4rem 0", fontSize: "1.8rem", color: "#2B5729", fontWeight: "800" }}>{username}</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#6BB865", fontWeight: "600", fontSize: "0.95rem" }}>
          <Star size={18} fill="#6BB865" /> Nivel 5 - Reciclador Experto
        </div>
      </div>

      {/* Grid de Estadísticas (Bento Style) */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
        padding: "0 1.5rem",
        marginBottom: "2rem"
      }}>
        {/* Stat 1 */}
        <div style={{
          background: "white",
          borderRadius: "24px",
          padding: "1.5rem",
          boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
          display: "flex",flexDirection: "column"
        }}>
          <div style={{ background: "#f0faef", width: "fit-content", padding: "10px", borderRadius: "12px", marginBottom: "0.8rem" }}>
            <Scale color="#6BB865" size={24} />
          </div>
          <span style={{ color: "#666", fontSize: "0.9rem", fontWeight: "600", marginBottom: "0.2rem" }}>Total Reciclado</span>
          <span style={{ color: "#2B5729", fontSize: "1.6rem", fontWeight: "800" }}>244 lb</span>
        </div>

        {/* Stat 2 */}
        <div style={{
          background: "white",
          borderRadius: "24px",
          padding: "1.5rem",
          boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
          display: "flex",flexDirection: "column"
        }}>
          <div style={{ background: "#fff5e6", width: "fit-content", padding: "10px", borderRadius: "12px", marginBottom: "0.8rem" }}>
            <Trophy color="#f59e0b" size={24} />
          </div>
          <span style={{ color: "#666", fontSize: "0.9rem", fontWeight: "600", marginBottom: "0.2rem" }}>Puntos Eco</span>
          <span style={{ color: "#f59e0b", fontSize: "1.6rem", fontWeight: "800" }}>3,450</span>
        </div>

        {/* Stat 3 (Ancho completo) */}
        <div style={{
          gridColumn: "span 2",
          background: "linear-gradient(135deg, #2B5729 0%, #1a3c18 100%)",
          borderRadius: "24px",
          padding: "1.5rem",
          boxShadow: "0 10px 25px rgba(43, 87, 41, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "white"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.5rem", opacity: 0.9 }}>
              <Leaf size={20} /> <span style={{ fontWeight: "600", fontSize: "0.95rem" }}>Impacto Ambiental</span>
            </div>
            <div style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "4px" }}>-45kg de CO₂</div>
            <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>Equivale a plantar 3 árboles</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.15)", width: "65px", height: "65px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Leaf size={34} color="#DDEE8A" />
          </div>
        </div>
      </div>

      {/* Lista de Opciones */}
      <div style={{ padding: "0 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#2B5729", fontSize: "1.2rem", fontWeight: "700" }}>Mi Cuenta</h3>
        
        {/* Item 1 */}
        <button style={{
          background: "white", border: "none", borderRadius: "20px", padding: "1.2rem 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", boxShadow: "0 4px 15px rgba(0,0,0,0.02)", width: "100%", textAlign: "left"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px", color: "#4a4a4a", fontWeight: "600", fontSize: "1.05rem" }}>
            <History size={24} color="#6BB865" /> Historial de entregas
          </div>
          <ChevronRight size={20} color="#ccc" />
        </button>

        {/* Item 2 */}
        <button style={{
          background: "white", border: "none", borderRadius: "20px", padding: "1.2rem 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", boxShadow: "0 4px 15px rgba(0,0,0,0.02)", width: "100%", textAlign: "left"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px", color: "#4a4a4a", fontWeight: "600", fontSize: "1.05rem" }}>
            <Bell size={24} color="#6BB865" /> Notificaciones
          </div>
          <ChevronRight size={20} color="#ccc" />
        </button>
        
        {/* Item 3 */}
        <button style={{
          background: "white", border: "none", borderRadius: "20px", padding: "1.2rem 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", boxShadow: "0 4px 15px rgba(0,0,0,0.02)", width: "100%", textAlign: "left"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px", color: "#4a4a4a", fontWeight: "600", fontSize: "1.05rem" }}>
            <HelpCircle size={24} color="#6BB865" /> Ayuda y soporte
          </div>
          <ChevronRight size={20} color="#ccc" />
        </button>

        {/* Cerrar Sesión */}
        <button onClick={handleLogout} style={{
          background: "#fef1f2", border: "none", borderRadius: "20px", padding: "1.2rem 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", marginTop: "1rem", width: "100%", textAlign: "left",
          boxShadow: "0 4px 15px rgba(0,0,0,0.02)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px", color: "#d94b4b", fontWeight: "700", fontSize: "1.05rem" }}>
            <LogOut size={24} /> Cerrar Sesión
          </div>
        </button>
      </div>
    </div>
  );
}