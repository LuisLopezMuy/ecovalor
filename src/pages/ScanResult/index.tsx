import { useMemo } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, CheckCircle2, ChevronRight, MapPin, Star, ScanLine, Info, Sparkles } from "lucide-react";
import * as LucideIcons from "lucide-react";
import materialsData from "../../assets/materials.json";
import centersData from "../../assets/centers.json";

export default function ScanResult() {
  const navigate = useNavigate();

  // Selecciones Pseudo-Aleatorias inmutables durante el render
  const { material, suggestedCenters } = useMemo(() => {
    const randomMaterial = materialsData[Math.floor(Math.random() * materialsData.length)];
    
    // Mezclamos los centros aleatoriamente y tomamos los primeros 2
    const shuffledCenters = [...centersData].sort(() => 0.5 - Math.random());
    const selectedCenters = shuffledCenters.slice(0, 2);

    return {
      material: randomMaterial,
      suggestedCenters: selectedCenters
    };
  }, []);

  // Extraemos el icono usando la key de Lucide (Casteo a any para dinamismo seguro o HelpCircle por defecto)
  const DynamicIcon = (LucideIcons as any)[material.icon] || LucideIcons.HelpCircle;

  return (
    <div style={{
      minHeight: "100%", 
      paddingBottom: "20px", // Espacio para el navbar
      fontFamily: "'Inter', sans-serif"
    }}>
      
      {/* Header (Sticky) */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "10px", 
        position: "sticky",
        top: "-1rem", 
        padding: "1rem",
        margin: "-1rem -1rem 1.5rem -1rem",
        background: "rgba(251, 253, 251, 0.9)", // Color parecido al fondo general
        backdropFilter: "blur(10px)",
        zIndex: 50,
        borderBottom: "1px solid rgba(0,0,0,0.02)"
      }}>
        <button onClick={() => navigate("/scan")} style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0 }}>
          <ArrowLeft size={24} color="#1a3619" />
        </button>
        <h1 style={{ margin: 0, fontSize: "1.6rem", color: "#1a3619", fontWeight: "900", letterSpacing: "-0.5px" }}>Análisis Completado</h1>
      </div>

      {/* Main Material Card (Success Status) */}
      <div style={{ 
        background: "linear-gradient(135deg, #1e3c1d 0%, #2B5729 100%)", 
        borderRadius: "30px", 
        padding: "2rem", 
        color: "white", 
        marginBottom: "2rem", 
        position: "relative", 
        overflow: "hidden", 
        boxShadow: "0 15px 30px rgba(43, 87, 41, 0.25)" 
      }}>
        {/* Decoración de fondo de la tarjeta */}
        <div style={{ position: "absolute", top: "-20px", right: "-20px", opacity: 0.1, transform: "rotate(15deg)" }}>
          <DynamicIcon size={120} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", position: "relative", zIndex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(5px)", width: "60px", height: "60px", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <DynamicIcon size={30} color="#DDEE8A" />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#DDEE8A", fontWeight: "700", fontSize: "0.9rem", marginBottom: "5px" }}>
              <CheckCircle2 size={16} /> Alta Probabilidad ({material.confidence}%)
            </div>
            <h2 style={{ margin: 0, fontSize: "1.8rem", fontWeight: "900", lineHeight: "1.2" }}>{material.name}</h2>
          </div>
        </div>

        <p style={{ margin: 0, lineHeight: "1.6", fontSize: "1.05rem", opacity: 0.9, position: "relative", zIndex: 1 }}>
          {material.description}
        </p>

        <div style={{ marginTop: "1.5rem", padding: "15px", background: "rgba(0,0,0,0.2)", borderRadius: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "0.9rem", opacity: 0.8, fontWeight: "600" }}>Valor Estimado:</div>
          <div style={{ fontSize: "1.2rem", fontWeight: "900", color: "#DDEE8A" }}>
            Q{material.basePriceMin} - Q{material.basePriceMax} <span style={{ fontSize: "0.8rem", fontWeight: "500" }}>/ lb</span>
          </div>
        </div>
      </div>

      {/* Tarjeta de Datos Curiosos */}
      <div style={{ 
        background: "#f0faef", 
        border: "1px solid #d4ecd1", 
        borderRadius: "24px", 
        padding: "1.5rem", 
        marginBottom: "2.5rem",
        display: "flex", 
        gap: "1rem",
        alignItems: "flex-start" 
      }}>
        <div style={{ background: "white", padding: "10px", borderRadius: "15px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", display: "flex" }}>
          <Sparkles size={24} color="#6BB865" />
        </div>
        <div>
          <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", color: "#1a3619", fontWeight: "800" }}>Dato Curioso</h3>
          <p style={{ margin: 0, color: "#555", lineHeight: "1.6", fontSize: "0.95rem" }}>
            {material.curiosity}
          </p>
        </div>
      </div>

      {/* Suggested Centers */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h3 style={{ margin: 0, fontSize: "1.3rem", color: "#1a3619", fontWeight: "900" }}>Lugares Recomendados</h3>
        <button onClick={() => navigate("/centers")} style={{ background: "transparent", border: "none", color: "#6BB865", fontWeight: "700", cursor: "pointer", fontSize: "0.9rem" }}>
          Ver en Mapa
        </button>
      </div>
      <p style={{ color: "#777", fontSize: "0.95rem", marginBottom: "1.5rem", lineHeight: "1.5" }}>
        Según tu escaneo, estos centros locales compran este material a excelentes precios:
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {suggestedCenters.map((center) => (
          <div 
            key={center.id}
            onClick={() => navigate(`/centers/${center.id}`)}
            style={{ 
              background: "white", 
              borderRadius: "24px", 
              padding: "1.2rem", 
              boxShadow: "0 4px 15px rgba(0,0,0,0.03)", 
              border: "1px solid #f0f0f0",
              display: "flex", 
              alignItems: "center", 
              gap: "15px",
              cursor: "pointer",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{ width: "60px", height: "60px", background: "#e8f2e8", borderRadius: "18px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <MapPin size={28} color="#2B5729" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "5px" }}>
                <h4 style={{ margin: 0, fontSize: "1.1rem", color: "#1a3619", fontWeight: "800", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "160px" }}>
                  {center.name}
                </h4>
                <div style={{ display: "flex", alignItems: "center", gap: "3px", color: "#f59e0b", fontSize: "0.9rem", fontWeight: "700" }}>
                  <Star size={14} fill="#f59e0b" /> {center.rating}
                </div>
              </div>
              <p style={{ margin: 0, color: "#666", fontSize: "0.85rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "200px" }}>
                {center.address}
              </p>
              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                 <span style={{ fontSize: "0.75rem", background: "#f0faef", color: "#4a8247", padding: "4px 8px", borderRadius: "10px", fontWeight: "600" }}>Abierto Hoy</span>
                 <span style={{ fontSize: "0.75rem", background: "#f8f9fa", color: "#666", padding: "4px 8px", borderRadius: "10px", fontWeight: "600" }}>A 3.5 km</span>
              </div>
            </div>
            <ChevronRight size={24} color="#ccc" />
          </div>
        ))}
      </div>

      <button 
        onClick={() => navigate("/scan")}
        style={{
          width: "100%",
          padding: "1.2rem",
          background: "white",
          border: "2px dashed #6BB865",
          borderRadius: "20px",
          color: "#4a8247",
          fontSize: "1.1rem",
          fontWeight: "800",
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer"
        }}
      >
        <ScanLine size={20} /> Escanear Nuevo Material
      </button>

    </div>
  );
}
