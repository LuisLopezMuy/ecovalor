import { useState } from "react";
import { useNavigate } from "react-router";
import { Leaf, ArrowRight, User, Lock } from "lucide-react";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password === "12345") {
      localStorage.setItem("username", user);
      navigate("/app/home");
    } else {
      setError("Contraseña incorrecta. Intenta '12345'.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #1e3c1d 0%, #2B5729 100%)", // Fondo oscuro que empata con Splash y cabecera de Home
      padding: "1.5rem",
      boxSizing: "border-box",
      fontFamily: "'Inter', sans-serif",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Hoja Decorativa Gigante en el Fondo */}
      <div style={{ position: "absolute", top: "-50px", left: "-50px", opacity: 0.1 }}>
          <Leaf size={300} color="#fff" style={{ transform: "rotate(-15deg)" }} />
      </div>
      <div style={{ position: "absolute", bottom: "-30px", right: "-30px", opacity: 0.05 }}>
          <Leaf size={250} color="#fff" style={{ transform: "rotate(160deg)" }} />
      </div>

      <div style={{ 
        width: "100%",
        maxWidth: "400px",
        padding: "3rem 2.5rem", 
        background: "rgba(255, 255, 255, 0.98)", 
        borderRadius: "32px", 
        boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
        position: "relative",
        zIndex: 1,
        boxSizing: "border-box"
      }}>
        {/* Cabecera del Tarjetón */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{
              background: "linear-gradient(135deg, #6BB865 0%, #4a8247 100%)",
              width: "70px",
              height: "70px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem auto",
              boxShadow: "0 10px 20px rgba(107, 184, 101, 0.3)",
              transform: "rotate(-10deg)"
          }}>
              <Leaf size={35} color="white" />
          </div>
          <h2 style={{ color: "#2B5729", fontSize: "2.3rem", fontWeight: "800", margin: "0 0 0.5rem 0", letterSpacing: "-1px" }}>EcoValor</h2>
          <p style={{ color: "#666", fontSize: "1rem", margin: 0, fontWeight: "500" }}>Inicia sesión para continuar</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          
          {/* Input de Usuario */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#aaa" }}>
                <User size={20} />
            </div>
            <input 
              type="text" 
              value={user} 
              onChange={(e) => setUser(e.target.value)} 
              style={{ 
                width: "100%", 
                padding: "1.2rem 1.2rem 1.2rem 3.2rem", 
                boxSizing: "border-box", 
                borderRadius: "20px", 
                border: "2px solid #e1e8e1",
                outline: "none",
                fontSize: "1.05rem",
                background: "#fafafa",
                color: "#333",
                transition: "all 0.2s ease"
              }} 
              placeholder="Nombre de Usuario"
              onFocus={(e) => { e.target.style.borderColor = "#6BB865"; e.target.style.background = "#fff"; }}
              onBlur={(e) => { e.target.style.borderColor = "#e1e8e1"; e.target.style.background = "#fafafa"; }}
              required
            />
          </div>

          {/* Input de Contraseña */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#aaa" }}>
                <Lock size={20} />
            </div>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={{ 
                width: "100%", 
                padding: "1.2rem 1.2rem 1.2rem 3.2rem", 
                boxSizing: "border-box", 
                borderRadius: "20px", 
                border: "2px solid #e1e8e1",
                outline: "none",
                fontSize: "1.05rem",
                background: "#fafafa",
                color: "#333",
                transition: "all 0.2s ease"
              }} 
              placeholder="Contraseña"
              onFocus={(e) => { e.target.style.borderColor = "#6BB865"; e.target.style.background = "#fff"; }}
              onBlur={(e) => { e.target.style.borderColor = "#e1e8e1"; e.target.style.background = "#fafafa"; }}
              required
            />
          </div>

          {/* Alerta de Error */}
          {error && (
              <div style={{ background: "#fef1f2", color: "#d94b4b", padding: "12px", borderRadius: "14px", textAlign: "center", fontSize: "0.9rem", fontWeight: "600", marginTop: "4px" }}>
                  {error}
              </div>
          )}

          {/* Botón de Acceso */}
          <button type="submit" style={{ 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "1.3rem", 
            background: "linear-gradient(135deg, #6BB865 0%, #4a8247 100%)", 
            color: "white", 
            fontWeight: "800", 
            fontSize: "1.15rem", 
            cursor: "pointer", 
            border: "none", 
            borderRadius: "24px", 
            marginTop: "1.5rem",
            boxShadow: "0 8px 25px rgba(107, 184, 101, 0.35)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 12px 30px rgba(107, 184, 101, 0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(107, 184, 101, 0.35)";
          }}
          >
            Acceder <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
