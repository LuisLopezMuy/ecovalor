import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Leaf,
  ScanLine,
  MapPin,
  Users,
  ShieldCheck,
  Zap,
  Camera,
  Target,
  Eye,
  Sparkles,
  TrendingUp,
  Coins,
  Apple,
} from "lucide-react";

export default function Splash() {
  const [scrolled, setScrolled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showIosModal, setShowIosModal] = useState(false);
  const [platform, setPlatform] = useState<"desktop" | "android" | "ios">("desktop");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // Platform detection
    const ua = navigator.userAgent || "";
    const isIos = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isAndroid = /Android/i.test(ua);

    if (isIos) {
      setPlatform("ios");
    } else if (isAndroid) {
      setPlatform("android");
    } else {
      setPlatform("desktop");
    }

    // Capture the PWA install prompt (Android Chrome)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (platform === "ios") {
      setShowIosModal(true);
    } else if (platform === "android" && deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fbfdfb",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Navegación Flotante Glassmorphism */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1000,
          background: scrolled ? "rgba(255, 255, 255, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.05)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#2B5729",
            fontWeight: "800",
            fontSize: "1.4rem",
            letterSpacing: "-0.5px",
          }}
        >
          <Leaf size={28} color="#6BB865" /> EcoValor
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          padding: "7rem 2rem 6rem 2rem",
          textAlign: "center",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-10%",
            width: "60vw",
            height: "60vw",
            minWidth: "500px",
            minHeight: "500px",
            background:
              "radial-gradient(circle, rgba(107,184,101,0.15) 0%, rgba(255,255,255,0) 70%)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "-10%",
            width: "40vw",
            height: "40vw",
            minWidth: "300px",
            minHeight: "300px",
            background:
              "radial-gradient(circle, rgba(245,158,11,0.08) 0%, rgba(255,255,255,0) 70%)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        ></div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "#f0faef",
              color: "#4a8247",
              padding: "0.6rem 1.2rem",
              borderRadius: "30px",
              fontWeight: "700",
              fontSize: "0.95rem",
              marginBottom: "2rem",
              boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
            }}
          >
            ✨ La plataforma líder en gestión inteligente del reciclaje
          </div>

          <h1
            style={{
              fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
              fontWeight: "900",
              color: "#1a3619",
              lineHeight: "1.05",
              letterSpacing: "-2px",
              marginBottom: "1.5rem",
            }}
          >
            Recicla. <span style={{ color: "#6BB865" }}>Gana.</span>
            <br /> Impacta.
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              color: "#666",
              lineHeight: "1.6",
              marginBottom: "3rem",
              maxWidth: "600px",
              margin: "0 auto 3rem auto",
              fontWeight: "500",
            }}
          >
            Transformamos la manera en que percibes los desechos. Usa tecnología
            de punta para identificar materiales, encontrar los mejores precios
            y unirte a la red más activa de líderes ambientales de
            Latinoamérica.
          </p>

          {platform !== "desktop" && (
            <button
              onClick={handleInstallClick}
              style={{
                background: "#2B5729",
                color: "white",
                border: "none",
                padding: "1.2rem 2.5rem",
                borderRadius: "40px",
                fontWeight: "800",
                fontSize: "1.15rem",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(43, 87, 41, 0.25)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "0 auto",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 35px rgba(43, 87, 41, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(43, 87, 41, 0.25)";
              }}
            >
              📲 Descargar la App
            </button>
          )}
        </div>
      </section>

      {/* Franja de Estadísticas del Proyecto */}
      <section
        style={{
          background: "linear-gradient(135deg, #1e3c1d 0%, #2B5729 100%)",
          color: "white",
          padding: "3rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            gap: "2rem",
            textAlign: "center",
          }}
        >
          <div
            style={{ transition: "all 0.3s ease", cursor: "default" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                color: "#DDEE8A",
              }}
            >
              +1.5M Lts
            </div>
            <div style={{ fontSize: "1rem", opacity: 0.9, fontWeight: "600" }}>
              Agua Protegida
            </div>
          </div>
          <div
            style={{ transition: "all 0.3s ease", cursor: "default" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                color: "#DDEE8A",
              }}
            >
              +30
            </div>
            <div style={{ fontSize: "1rem", opacity: 0.9, fontWeight: "600" }}>
              Centros Verificados
            </div>
          </div>
          <div
            style={{ transition: "all 0.3s ease", cursor: "default" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                color: "#DDEE8A",
              }}
            >
              +120 Ton
            </div>
            <div style={{ fontSize: "1rem", opacity: 0.9, fontWeight: "600" }}>
              Material Reciclado
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / Pasos */}
      <section style={{ padding: "6rem 2rem", background: "#ffffff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <Sparkles
              size={40}
              color="#6BB865"
              style={{ marginBottom: "1rem" }}
            />
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                color: "#1a3619",
                fontWeight: "900",
                marginBottom: "1rem",
                letterSpacing: "-1px",
              }}
            >
              ¿Cómo funciona EcoValor?
            </h2>
            <p
              style={{
                color: "#777",
                fontSize: "1.15rem",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Eliminamos las barreras del desconocimiento. Descubre lo fácil que
              es transformar tus desechos en ingresos.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "2rem",
              position: "relative",
            }}
          >
            {/* Step 1 */}
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                transition: "all 0.3s ease",
                borderRadius: "30px",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.background = "#fbfdfb";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0,0,0,0.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  background: "#f0faef",
                  width: "80px",
                  height: "80px",
                  borderRadius: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                }}
              >
                <Camera size={40} color="#2B5729" />
              </div>
              <h3
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "800",
                  color: "#1a3619",
                  marginBottom: "1rem",
                }}
              >
                1. Fotografía
              </h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>
                Simplemente toma una foto del material que deseas desechar
                utilizando nuestra cámara inteligente.
              </p>
            </div>

            {/* Step 2 */}
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                transition: "all 0.3s ease",
                borderRadius: "30px",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.background = "#fbfdfb";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0,0,0,0.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  background: "#f0faef",
                  width: "80px",
                  height: "80px",
                  borderRadius: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                }}
              >
                <Zap size={40} color="#2B5729" />
              </div>
              <h3
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "800",
                  color: "#1a3619",
                  marginBottom: "1rem",
                }}
              >
                2. IA Identifica
              </h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>
                Nuestro módulo de Inteligencia artificial reconoce el material y
                calcula su valor de mercado en tiempo real.
              </p>
            </div>

            {/* Step 3 */}
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                transition: "all 0.3s ease",
                borderRadius: "30px",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.background = "#fbfdfb";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0,0,0,0.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  background: "#f0faef",
                  width: "80px",
                  height: "80px",
                  borderRadius: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                }}
              >
                <MapPin size={40} color="#2B5729" />
              </div>
              <h3
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "800",
                  color: "#1a3619",
                  marginBottom: "1rem",
                }}
              >
                3. Encuentra el Centro
              </h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>
                La geolocalización te muestra los centros de acopio cercanos con
                los mejores precios verificados.
              </p>
            </div>

            {/* Step 4 */}
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                transition: "all 0.3s ease",
                borderRadius: "30px",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.background = "#fbfdfb";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0,0,0,0.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  background: "#f0faef",
                  width: "80px",
                  height: "80px",
                  borderRadius: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem auto",
                }}
              >
                <Coins size={40} color="#2B5729" />
              </div>
              <h3
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "800",
                  color: "#1a3619",
                  marginBottom: "1rem",
                }}
              >
                4. Vende y Gana
              </h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>
                Lleva tus materiales, súmalos a tus estadísticas de impacto y
                recibe tu recompensa económica al instante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid Complejo */}
      <section
        style={{
          padding: "6rem 2rem",
          background: "#f8fbf8",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                color: "#1a3619",
                fontWeight: "900",
                marginBottom: "1rem",
                letterSpacing: "-1px",
              }}
            >
              Tecnología al servicio del planeta
            </h2>
            <p
              style={{
                color: "#777",
                fontSize: "1.15rem",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Integramos múltiples funcionalidades en un ecosistema digital
              poderoso, transparente e interactivo que facilita el proceso de
              reciclaje de pies a cabeza.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            {/* Feature 1 */}
            <div
              style={{
                background: "white",
                padding: "3rem 2.5rem",
                borderRadius: "40px",
                border: "1px solid #eef5ee",
                boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                transition: "transform 0.4s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-10px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div
                style={{
                  background: "#e8f2e8",
                  width: "70px",
                  height: "70px",
                  borderRadius: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "2rem",
                }}
              >
                <ScanLine size={35} color="#2B5729" />
              </div>
              <h3
                style={{
                  fontSize: "1.6rem",
                  color: "#2B5729",
                  fontWeight: "800",
                  marginBottom: "1rem",
                  letterSpacing: "-0.5px",
                }}
              >
                Análisis por Fotos
              </h3>
              <p
                style={{
                  color: "#666",
                  lineHeight: "1.6",
                  fontSize: "1.05rem",
                }}
              >
                Olvida las dudas sobre qué se puede reciclar y qué no. EcoValor
                analiza imágenes instantáneamente y te asesora sobre los
                materiales detectados.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              style={{
                background: "white",
                padding: "3rem 2.5rem",
                borderRadius: "40px",
                border: "1px solid #eef5ee",
                boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                transition: "transform 0.4s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-10px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div
                style={{
                  background: "#e8f2e8",
                  width: "70px",
                  height: "70px",
                  borderRadius: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "2rem",
                }}
              >
                <TrendingUp size={35} color="#2B5729" />
              </div>
              <h3
                style={{
                  fontSize: "1.6rem",
                  color: "#2B5729",
                  fontWeight: "800",
                  marginBottom: "1rem",
                  letterSpacing: "-0.5px",
                }}
              >
                Transparencia de Precios
              </h3>
              <p
                style={{
                  color: "#666",
                  lineHeight: "1.6",
                  fontSize: "1.05rem",
                }}
              >
                Mantén el control. Compara precios actualizados en tiempo real y
                lee las calificaciones reales antes de llevar tus materiales a
                las distintas empresas.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              style={{
                background: "white",
                padding: "3rem 2.5rem",
                borderRadius: "40px",
                border: "1px solid #eef5ee",
                boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                transition: "transform 0.4s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-10px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div
                style={{
                  background: "#e8f2e8",
                  width: "70px",
                  height: "70px",
                  borderRadius: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "2rem",
                }}
              >
                <Users size={35} color="#2B5729" />
              </div>
              <h3
                style={{
                  fontSize: "1.6rem",
                  color: "#2B5729",
                  fontWeight: "800",
                  marginBottom: "1rem",
                  letterSpacing: "-0.5px",
                }}
              >
                Comunidad Dinámica
              </h3>
              <p
                style={{
                  color: "#666",
                  lineHeight: "1.6",
                  fontSize: "1.05rem",
                }}
              >
                Intercambia conocimientos en un muro social lleno de expertos.
                Comparte tus logros, da recomendaciones e inspira a una
                comunidad apasionada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Valores y Filosofia de Empresa */}
      <section style={{ padding: "6rem 2rem", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "#1a3619",
              fontWeight: "900",
              marginBottom: "3rem",
              textAlign: "center",
              letterSpacing: "-1px",
            }}
          >
            El núcleo de nuestra empresa
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {/* Mision */}
            <div
              style={{
                background: "linear-gradient(135deg, #f0faef 0%, #e1f5df 100%)",
                padding: "3rem",
                borderRadius: "30px",
                border: "1px solid #d4ecd1",
                transition: "all 0.4s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 35px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  background: "white",
                  padding: "15px",
                  borderRadius: "20px",
                  display: "inline-block",
                  marginBottom: "1.5rem",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                }}
              >
                <Target size={30} color="#2B5729" />
              </div>
              <h3
                style={{
                  fontSize: "1.8rem",
                  color: "#2B5729",
                  fontWeight: "900",
                  marginBottom: "1rem",
                }}
              >
                Misión
              </h3>
              <p
                style={{
                  color: "#444",
                  lineHeight: "1.7",
                  fontSize: "1.05rem",
                }}
              >
                Brindar una solución tecnológica innovadora que incentive el
                reciclaje mediante la identificación inteligente, promoviendo
                una cultura responsable y generando oportunidades económicas
                accesibles para la población.
              </p>
            </div>

            {/* Vision */}
            <div
              style={{
                background: "linear-gradient(135deg, #f0faef 0%, #e1f5df 100%)",
                padding: "3rem",
                borderRadius: "30px",
                border: "1px solid #d4ecd1",
                transition: "all 0.4s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 35px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  background: "white",
                  padding: "15px",
                  borderRadius: "20px",
                  display: "inline-block",
                  marginBottom: "1.5rem",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                }}
              >
                <Eye size={30} color="#2B5729" />
              </div>
              <h3
                style={{
                  fontSize: "1.8rem",
                  color: "#2B5729",
                  fontWeight: "900",
                  marginBottom: "1rem",
                }}
              >
                Visión
              </h3>
              <p
                style={{
                  color: "#444",
                  lineHeight: "1.7",
                  fontSize: "1.05rem",
                }}
              >
                Convertirnos en la plataforma líder en Latinoamérica en la
                gestión inteligente del reciclaje, siendo reconocidos por
                nuestro impacto social y avance en la innovación tecnológica
                sustentable.
              </p>
            </div>

            {/* Filosofia */}
            <div
              style={{
                background: "linear-gradient(135deg, #f0faef 0%, #e1f5df 100%)",
                padding: "3rem",
                borderRadius: "30px",
                border: "1px solid #d4ecd1",
                transition: "all 0.4s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 35px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  background: "white",
                  padding: "15px",
                  borderRadius: "20px",
                  display: "inline-block",
                  marginBottom: "1.5rem",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                }}
              >
                <ShieldCheck size={30} color="#2B5729" />
              </div>
              <h3
                style={{
                  fontSize: "1.8rem",
                  color: "#2B5729",
                  fontWeight: "900",
                  marginBottom: "1rem",
                }}
              >
                Filosofía
              </h3>
              <p
                style={{
                  color: "#444",
                  lineHeight: "1.7",
                  fontSize: "1.05rem",
                }}
              >
                Nos fundamentamos en la creencia de que la tecnología resolutiva
                es clave en los problemas ambientales modernos, por lo que
                promovemos agresivamente la sostenibilidad y resiliencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Banner Final */}
      <section style={{ padding: "5rem 2rem", background: "white" }}>
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            background: "linear-gradient(135deg, #6BB865 0%, #4a8247 100%)",
            padding: "4rem 2rem",
            borderRadius: "40px",
            color: "white",
            textAlign: "center",
            boxShadow: "0 20px 40px rgba(107, 184, 101, 0.2)",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.03)";
            e.currentTarget.style.boxShadow =
              "0 30px 60px rgba(107, 184, 101, 0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 20px 40px rgba(107, 184, 101, 0.2)";
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: "900",
              marginBottom: "1.5rem",
              letterSpacing: "-1px",
            }}
          >
            El cambio comienza en tus manos.
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              opacity: 0.9,
              maxWidth: "600px",
              margin: "0 auto 2.5rem auto",
            }}
          >
            Únete hoy a los miles de usuarios que están limpiando las ciudades y
            construyendo un mejor futuro.
          </p>
        </div>
      </section>

      {/* Corporate Enchanced Footer */}
      <footer
        style={{
          background: "#112611",
          color: "rgba(255,255,255,0.7)",
          padding: "5rem 2rem 3rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            paddingBottom: "3rem",
            marginBottom: "3rem",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "white",
                fontWeight: "800",
                fontSize: "1.6rem",
                marginBottom: "1.5rem",
              }}
            >
              <Leaf size={30} color="#6BB865" /> EcoValor
            </div>
            <p style={{ lineHeight: "1.6", fontSize: "0.95rem", opacity: 0.8 }}>
              Ingeniería de vanguardia desarrollando soluciones para empoderar
              financieramente a los héroes ambientales.
            </p>
          </div>

          <div>
            <h4
              style={{
                color: "white",
                fontWeight: "700",
                fontSize: "1.1rem",
                marginBottom: "1.5rem",
              }}
            >
              Producto
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                lineHeight: "2.5",
              }}
            >
              <li
                style={{ cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
                }
              >
                Reconocimiento IA
              </li>
              <li
                style={{ cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
                }
              >
                Mapa de Centros
              </li>
              <li
                style={{ cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
                }
              >
                Red Social
              </li>
              <li
                style={{ cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
                }
              >
                Beneficios
              </li>
            </ul>
          </div>

          <div>
            <h4
              style={{
                color: "white",
                fontWeight: "700",
                fontSize: "1.1rem",
                marginBottom: "1.5rem",
              }}
            >
              Empresa
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                lineHeight: "2.5",
              }}
            >
              <li
                style={{ cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
                }
              >
                Misión y Visión
              </li>
              <li
                style={{ cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
                }
              >
                Prensa & Medios
              </li>
              <li
                style={{ cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
                }
              >
                Términos Legales
              </li>
              <li
                style={{ cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
                }
              >
                Políticas de Privacidad
              </li>
            </ul>
          </div>

          <div>
            <h4
              style={{
                color: "white",
                fontWeight: "700",
                fontSize: "1.1rem",
                marginBottom: "1.5rem",
              }}
            >
              Contacto
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                lineHeight: "2.5",
              }}
            >
              <li>
                <a
                  href="mailto:info@ecovalorapp.com"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    borderBottom: "1px dashed rgba(255,255,255,0.5)",
                  }}
                >
                  info@ecovalor.com
                </a>
              </li>
              <li>📍 Guatemala</li>
            </ul>
            <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                In
              </div>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                Fb
              </div>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                X
              </div>
            </div>
          </div>
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.95rem",
            margin: 0,
            opacity: 0.6,
          }}
        >
          © {new Date().getFullYear()} EcoValor. Generando impacto sostenible.
        </p>
      </footer>

      {/* iOS Modal - App en Desarrollo */}
      {showIosModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "2rem",
          }}
          onClick={() => setShowIosModal(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "30px",
              padding: "3rem 2.5rem",
              maxWidth: "400px",
              width: "100%",
              textAlign: "center",
              boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
              animation: "fadeInUp 0.3s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                background: "#f0faef",
                width: "80px",
                height: "80px",
                borderRadius: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem auto",
                fontSize: "2.5rem",
              }}
            >
              <Apple size={40} color="#2B5729" />
            </div>
            <h3
              style={{
                fontSize: "1.6rem",
                fontWeight: "900",
                color: "#1a3619",
                marginBottom: "1rem",
              }}
            >
              App en Desarrollo
            </h3>
            <p
              style={{
                color: "#666",
                lineHeight: "1.6",
                fontSize: "1.05rem",
                marginBottom: "2rem",
              }}
            >
              La versión nativa para iOS se encuentra actualmente en desarrollo.
              ¡Pronto estará disponible en la App Store!
            </p>
            <button
              onClick={() => setShowIosModal(false)}
              style={{
                background: "#2B5729",
                color: "white",
                border: "none",
                padding: "1rem 2.5rem",
                borderRadius: "30px",
                fontWeight: "700",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 20px rgba(43, 87, 41, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 25px rgba(43, 87, 41, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(43, 87, 41, 0.2)";
              }}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
