import { useParams, useNavigate } from "react-router";
import centersData from "../../assets/centers.json";
import { ArrowLeft, MapPin, Phone, Mail, Clock, Star, MessageSquare, Recycle, Monitor, FileText, Battery } from "lucide-react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Marcador personalizado para el mini-mapa
const customMarkerIcon = L.divIcon({
  className: "custom-icon",
  html: `
    <div style="
      display: flex;
      justify-content: center;
      align-items: center;
      width: 32px;
      height: 32px;
      background-color: #6BB865;
      color: white;
      border-radius: 50% 50% 50% 0;
      border: 3px solid white;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      transform: rotate(-45deg);
    ">
      <div style="transform: rotate(45deg); margin-top: 2px; margin-right: 2px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
      </div>
    </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Helper para iconos de materiales estéticos
const getMaterialIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'plastic': return <Recycle size={20} color="#3498db" />;
    case 'glass': return <Recycle size={20} color="#2ecc71" />;
    case 'aluminum': return <Battery size={20} color="#7f8c8d" />;
    case 'metal': return <Battery size={20} color="#7f8c8d" />;
    case 'electronics': return <Monitor size={20} color="#9b59b6" />;
    case 'paper': return <FileText size={20} color="#e67e22" />;
    default: return <Recycle size={20} color="#6BB865" />;
  }
};

const getMaterialName = (type: string) => {
  const dict: Record<string, string> = {
    plastic: "Plástico",
    glass: "Vidrio",
    metal: "Metal",
    aluminum: "Aluminio",
    electronics: "Electrónicos",
    paper: "Papel y Cartón"
  };
  return dict[type.toLowerCase()] || type;
};

export default function CenterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Buscar el centro activo usando el ID de los parámetros de la ruta
  const center = centersData.find(c => c.id === id);

  if (!center) {
    return (
      <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "transparent",
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
              <MapPin size={60} color="white" />
          </div>

          <h2 style={{ color: "#2B5729", fontSize: "1.6rem", fontWeight: "800", marginBottom: "0.5rem" }}>
              Centro no encontrado
          </h2>
          <p style={{ color: "#666", fontSize: "1.05rem", marginBottom: "2rem", maxWidth: "350px", lineHeight: "1.5" }}>
              No pudimos localizar la información de este lugar. Es probable que se haya removido de nuestra base de datos.
          </p>

          <button
              onClick={() => navigate("/app/centers")}
              style={{
                  background: "linear-gradient(135deg, #6BB865 0%, #4a8247 100%)",
                  color: "white",
                  border: "none",
                  padding: "1rem 2rem",
                  borderRadius: "30px",
                  fontSize: "1rem",
                  fontWeight: "800",
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(107, 184, 101, 0.3)",
                  transition: "transform 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
              Volver al Directorio
          </button>
      </div>
    );
  }

  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      flexDirection: "column",
      background: "transparent",
      fontFamily: "'Inter', sans-serif",
      overflowY: "auto",
      paddingBottom: "80px", // Margen preventivo para el Navbar inferior
    }}>
      {/* Navbar Superior del Componente */}
      <div style={{
        padding: "1rem 1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        background: "transparent",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <button 
          onClick={() => navigate(-1)} // Regresar a la página anterior
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.6rem",
            borderRadius: "50%",
            backgroundColor: "white",
            boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
            color: "#2B5729",
            transition: "transform 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <ArrowLeft size={24} />
        </button>
        <h2 style={{ margin: 0, color: "#2B5729", fontSize: "1.3rem", fontWeight: "800", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          Detalles del Centro
        </h2>
      </div>

      {/* Contenedor Principal con Scroll Táctil Dinámico */}
      <div style={{ padding: "0.5rem 1.5rem 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        
        {/* Tarjeta de Información Básica */}
        <div style={{ background: "white", borderRadius: "24px", padding: "1.8rem", boxShadow: "0 6px 20px rgba(0,0,0,0.03)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
            <h1 style={{ margin: 0, color: "#2B5729", fontSize: "1.8rem", fontWeight: "800", lineHeight: "1.2" }}>{center.name}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#fff5e6", padding: "6px 10px", borderRadius: "12px", flexShrink: 0 }}>
              <Star size={16} fill="#f59e0b" color="#f59e0b" />
              <span style={{ color: "#f59e0b", fontWeight: "800", fontSize: "0.95rem" }}>{center.rating}</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "#555", fontSize: "0.95rem", fontWeight: "500" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#f0faef", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MapPin size={18} color="#6BB865" />
              </div>
              <span style={{ lineHeight: "1.4" }}>{center.address}</span>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#f0faef", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Phone size={18} color="#6BB865" />
              </div>
              <span>{center.phone}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#f0faef", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Mail size={18} color="#6BB865" />
              </div>
              <span>{center.email}</span>
            </div>
          </div>
        </div>

        {/* Mini Mapa Estático (Para Contexto Rápido) */}
        <div style={{ height: "200px", borderRadius: "24px", overflow: "hidden", border: "4px solid white", boxShadow: "0 6px 20px rgba(0,0,0,0.05)", position: "relative", zIndex: 1 }}>
          <MapContainer 
            center={[center.coordinates.lat, center.coordinates.lng]} 
            zoom={16} 
            scrollWheelZoom={false}
            dragging={false}   // Lo hacemos estático para que funcione como "miniatura de portada"
            zoomControl={false}
            touchZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <Marker 
              position={[center.coordinates.lat, center.coordinates.lng]}
              icon={customMarkerIcon}
            />
          </MapContainer>
        </div>

        {/* Status / Horarios */}
        <div style={{ background: "white", borderRadius: "24px", padding: "1.5rem", boxShadow: "0 6px 20px rgba(0,0,0,0.03)" }}>
          <h3 style={{ margin: "0 0 1.2rem 0", color: "#2B5729", fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "8px" }}>
            <Clock size={20} color="#6BB865" /> Horario de Atención
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ background: "#fafafa", padding: "1rem", borderRadius: "16px", textAlign: "center" }}>
              <span style={{ display: "block", color: "#888", fontSize: "0.80rem", fontWeight: "700", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>Lunes a Viernes</span>
              <span style={{ color: "#333", fontSize: "1.05rem", fontWeight: "700" }}>{center.weekdayHours}</span>
            </div>
            <div style={{ background: "#fef1f2", padding: "1rem", borderRadius: "16px", textAlign: "center" }}>
              <span style={{ display: "block", color: "#d94b4b", fontSize: "0.80rem", fontWeight: "700", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "1px" }}>Fines de Semana</span>
              <span style={{ color: "#b83b3b", fontSize: "1.05rem", fontWeight: "700" }}>{center.weekendHours}</span>
            </div>
          </div>
        </div>

        {/* Lista Dinámica de Materiales */}
        <div style={{ background: "white", borderRadius: "24px", padding: "1.5rem", boxShadow: "0 6px 20px rgba(0,0,0,0.03)" }}>
          <h3 style={{ margin: "0 0 1.2rem 0", color: "#2B5729", fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "8px" }}>
            <Recycle size={20} color="#6BB865" /> Materiales y Precios
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {center.materials.map((mat: any, i: number) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.8rem 1rem", backgroundColor: "#f9fcf9", borderRadius: "14px", border: "1px solid #eef5ee" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", fontWeight: "600", color: "#444" }}>
                  <div style={{ background: "white", padding: "8px", borderRadius: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {getMaterialIcon(mat.type)}
                  </div>
                  {getMaterialName(mat.type)}
                </div>
                <div style={{ fontWeight: "800", color: "#2B5729", fontSize: "1.1rem" }}>
                  Q{mat.pricePerPound.toFixed(2)} <span style={{ fontSize: "0.8rem", color: "#888", fontWeight: "600" }}>/lb</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de Comentarios */}
        <div style={{ background: "white", borderRadius: "24px", padding: "1.5rem", boxShadow: "0 6px 20px rgba(0,0,0,0.03)" }}>
          <h3 style={{ margin: "0 0 1.2rem 0", color: "#2B5729", fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "8px" }}>
            <MessageSquare size={20} color="#6BB865" /> Opiniones recientes
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {center.comments.length > 0 ? (
              center.comments.map((c: any, i: number) => (
                <div key={i} style={{ display: "flex", gap: "12px", borderBottom: i !== center.comments.length -1 ? "1px solid #eee" : "none", paddingBottom: i !== center.comments.length -1 ? "1.2rem" : 0 }}>
                  <div style={{ width: "45px", height: "45px", borderRadius: "50%", background: "linear-gradient(135deg, #d8ead8 0%, #b8d8b8 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2B5729", fontSize: "1.1rem", fontWeight: "700", flexShrink: 0 }}>
                    {c.user.charAt(0).toUpperCase()}
                  </div>
                  <div style={{ paddingTop: "2px" }}>
                    <div style={{ fontWeight: "700", color: "#333", fontSize: "1rem", marginBottom: "4px" }}>{c.user}</div>
                    <div style={{ color: "#666", fontSize: "0.95rem", lineHeight: "1.5" }}>"{c.comment}"</div>
                  </div>
                </div>
              ))
            ) : (
              <span style={{ color: "#888", fontStyle: "italic", textAlign: "center", padding: "1rem 0" }}>No hay opiniones aún.</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
