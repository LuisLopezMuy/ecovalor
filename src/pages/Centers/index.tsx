import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import centersData from "../../assets/centers.json";
import { MapPin, Star, Clock, ChevronUp, ChevronDown } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Creación de un marcador personalizado con CSS
const customMarkerIcon = L.divIcon({
  className: "custom-icon", // Previene comportamientos extraños por defecto
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
  iconAnchor: [16, 32], // ubica la punta inferior exactamente en la lat/lng
  popupAnchor: [0, -32],
});

export default function Centers() {
  const navigate = useNavigate();
  const [centers, setCenters] = useState<any[]>([]);
  const [isMapOpen, setIsMapOpen] = useState(true);

  useEffect(() => {
    // Ordenar al azar los centros (copiando el arreglo para no mutar el json importado)
    const shuffled = [...centersData].sort(() => 0.5 - Math.random());
    setCenters(shuffled);
  }, []);

  // Coordenadas centrales promedio para la Ciudad de Guatemala
  const mapCenter: [number, number] = [14.615, -90.525];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
        background: "transparent",
        boxSizing: "border-box",
        overflow: "hidden"
      }}
    >
      {/* Título Siempre Visible en la parte superior */}
      <div style={{ padding: "1.5rem 1.5rem 0.5rem 1.5rem", zIndex: 10, background: "transparent" }}>
        <h2
          style={{
            color: "#2B5729",
            fontSize: "1.5rem",
            fontWeight: "800",
            margin: 0,
          }}
        >
          Centros de Reciclaje
        </h2>
      </div>

      {/* Contenido Principal: Lista de Tarjetas */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0.5rem 1.5rem 1.5rem 1.5rem",
          paddingBottom: isMapOpen ? "45vh" : "80px", // Margen inferior extra dinámico
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {centers.map((center) => (
            <div
              key={center.id}
              onClick={() => navigate(`/app/centers/${center.id}`)}
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "1.2rem",
                boxShadow: "0 4px 15px rgba(0,0,0,0.04)",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.04)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: "#2B5729",
                    fontSize: "1.15rem",
                    fontWeight: "700",
                  }}
                >
                  {center.name}
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    backgroundColor: "#fff5e6",
                    padding: "4px 8px",
                    borderRadius: "10px",
                  }}
                >
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <span
                    style={{
                      color: "#f59e0b",
                      fontWeight: "700",
                      fontSize: "0.85rem",
                    }}
                  >
                    {center.rating}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#666",
                  fontSize: "0.9rem",
                }}
              >
                <MapPin size={16} color="#6BB865" style={{ flexShrink: 0 }} />
                <span
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {center.address}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#666",
                  fontSize: "0.9rem",
                }}
              >
                <Clock size={16} color="#6BB865" style={{ flexShrink: 0 }} />
                <span>{center.weekdayHours}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mapa Colapsable Tipo Bottom Sheet */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: isMapOpen ? "45%" : "60px", // Se expande o se oculta dejando solo la pestaña
          background: "white",
          transition: "height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          borderTopLeftRadius: "30px",
          borderTopRightRadius: "30px",
          boxShadow: "0 -8px 30px rgba(0,0,0,0.15)", // Sombra prominente
          borderTop: "6px solid #6BB865", // Borde superior grueso resaltado
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }}
      >
        {/* Barra arrastrable / Pestaña interactiva */}
        <div 
          onClick={() => setIsMapOpen(!isMapOpen)}
          style={{
            height: "60px",
            minHeight: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            background: "#fff",
            position: "relative",
            zIndex: 101, // Por encima del render del mapa
            borderBottom: isMapOpen ? "1px solid #eee" : "none"
          }}
        >
           <div style={{ width: "40px", height: "5px", background: "#d1e3d0", borderRadius: "10px", margin: "0 auto" }} />
           
           <div style={{ position: "absolute", right: "20px", display: "flex", alignItems: "center", gap: "6px", color: "#2B5729" }}>
             <span style={{ fontWeight: "700", fontSize: "0.95rem" }}>
               {isMapOpen ? "Ocultar" : "Mapa"}
             </span>
             {isMapOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
           </div>
        </div>

        {/* Contenedor oficial del mapa */}
        <div style={{ flex: 1, position: "relative", paddingBottom: "1rem" }}>
          <MapContainer
            center={mapCenter}
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CartoDB</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {centers.map((center) => (
              <Marker
                key={center.id}
                position={[center.coordinates.lat, center.coordinates.lng]}
                icon={customMarkerIcon}
              >
                <Popup>
                  <div style={{ textAlign: "center" }}>
                    <strong
                      style={{
                        color: "#2B5729",
                        display: "block",
                        marginBottom: "5px",
                      }}
                    >
                      {center.name}
                    </strong>
                    <span style={{ fontSize: "0.9em", color: "#666" }}>
                      {center.weekdayHours}
                    </span>
                    <br />
                    <button
                      onClick={() => navigate(`/app/centers/${center.id}`)}
                      style={{
                        marginTop: "10px",
                        padding: "5px 10px",
                        background: "#6BB865",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Ver Detalles
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
