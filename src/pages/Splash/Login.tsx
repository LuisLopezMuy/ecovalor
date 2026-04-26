import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === "admin" && password === "123") {
      navigate("/home");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div style={{ 
      padding: "3rem 2.5rem", 
      background: "white", 
      borderRadius: "24px", 
      boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
      textAlign: "left" 
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "2.5rem", color: "#2B5729", fontSize: "2rem", fontWeight: "800" }}>Inicia Sesión</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", color: "#666", fontWeight: "600", fontSize: "0.95rem" }}>Usuario</label>
          <input 
            type="text" 
            value={user} 
            onChange={(e) => setUser(e.target.value)} 
            style={{ 
              width: "100%", 
              padding: "1.2rem", 
              boxSizing: "border-box", 
              borderRadius: "14px", 
              border: "2px solid #eee",
              outlineColor: "#6BB865",
              fontSize: "1.05rem",
              background: "#fafafa"
            }} 
            placeholder="admin"
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", color: "#666", fontWeight: "600", fontSize: "0.95rem" }}>Contraseña</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ 
              width: "100%", 
              padding: "1.2rem", 
              boxSizing: "border-box", 
              borderRadius: "14px", 
              border: "2px solid #eee",
              outlineColor: "#6BB865",
              fontSize: "1.05rem",
              background: "#fafafa"
            }} 
            placeholder="123"
          />
        </div>
        <button type="submit" style={{ 
          padding: "1.2rem", 
          background: "#6BB865", 
          color: "white", 
          fontWeight: "700", 
          fontSize: "1.15rem", 
          cursor: "pointer", 
          border: "none", 
          borderRadius: "14px", 
          marginTop: "1.5rem",
          boxShadow: "0 8px 20px rgba(107, 184, 101, 0.4)",
          transition: "transform 0.2s"
        }}>
          Acceder a la App
        </button>
      </form>
    </div>
  );
};

export default Login;
