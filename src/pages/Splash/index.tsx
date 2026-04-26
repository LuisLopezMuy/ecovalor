import {
  Leaf,
  Target,
  Eye,
  Recycle,
  Camera,
  MapPin,
  DollarSign,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Splash = () => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const fadeUp = (delay = 0) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(20px)",
    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  });

  return (
    <div
      style={{
        background: "transparent",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ESTILOS DE BENTO GRID (Responsive) */}
      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1.5rem;
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
        
        .bento-card {
          background: white;
          padding: 2.5rem;
          border-radius: 28px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.03);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          grid-column: span 12; /* Default for mobile */
          cursor: default;
        }

        .bento-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 20px 50px rgba(0,0,0,0.06);
        }

        /* Diseño Tablet */
        @media (min-width: 768px) {
          .b-span-4 { grid-column: span 6; }
          .b-span-5 { grid-column: span 12; }
          .b-span-7 { grid-column: span 12; }
          .b-span-8 { grid-column: span 12; }
          .b-span-12 { grid-column: span 12; }
        }

        /* Diseño Desktop (Layout Interesante) */
        @media (min-width: 1024px) {
          .b-span-4 { grid-column: span 4; }
          .b-span-5 { grid-column: span 5; }
          .b-span-7 { grid-column: span 7; }
          .b-span-8 { grid-column: span 8; }
          .b-span-12 { grid-column: span 12; }
          
          /* Modificando la comunidad para ser un banner horizontal */
          .community-banner {
            flex-direction: row !important;
            align-items: center;
            justify-content: space-between;
          }
        }
      `}</style>

      {/* HERO CENTRADO (Más compacto) */}
      <header
        style={{
          padding: "4rem 2rem 3rem 2rem",
          background: "linear-gradient(135deg, #6BB865 0%, #4a9444 100%)",
          color: "white",
          borderBottomLeftRadius: "50px",
          borderBottomRightRadius: "50px",
          textAlign: "center",
          ...fadeUp(0),
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              padding: "1.2rem",
              borderRadius: "50%",
              backdropFilter: "blur(10px)",
              marginBottom: "1.2rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            }}
          >
            <Recycle size={56} />
          </div>
          <h1
            style={{
              fontSize: "3.2rem",
              fontWeight: "800",
              marginBottom: "0.8rem",
              letterSpacing: "-1px",
              lineHeight: "1.1",
            }}
          >
            EcoValor App
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              opacity: 0.95,
              marginBottom: "0.5rem",
            }}
          >
            Convierte tu reciclaje en dinero mientras ayudas al planeta.
          </p>
          <p
            style={{
              fontSize: "1rem",
              opacity: 0.85,
              marginBottom: "2rem",
              maxWidth: "600px",
            }}
          >
            Identifica materiales reciclables, consulta su valor y encuentra
            centros cercanos fácilmente.
          </p>
          <button
            onClick={() => {}}
            style={{
              background: "white",
              color: "#4a9444",
              border: "none",
              padding: "1.2rem 3rem",
              fontSize: "1.2rem",
              fontWeight: "700",
              borderRadius: "30px",
              cursor: "pointer",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
            }}
          >
            Descarga la App
          </button>
        </div>
      </header>

      {/* BENTO GRID PRINCIPAL */}
      <main className="bento-grid">
        {/* PROBLEMA (Ancho mediano) */}
        <div className="bento-card b-span-5" style={{ ...fadeUp(0.1) }}>
          <div
            style={{
              background: "#fef1f2",
              width: "fit-content",
              padding: "10px",
              borderRadius: "12px",
              marginBottom: "1rem",
            }}
          >
            <Leaf color="#d94b4b" size={24} />
          </div>
          <h2
            style={{
              color: "#2B5729",
              marginBottom: "1rem",
              fontSize: "1.8rem",
            }}
          >
            ¿Por qué reciclar es difícil?
          </h2>
          <ul
            style={{
              color: "#555",
              lineHeight: "1.7",
              marginBottom: "1.5rem",
              paddingLeft: "1.5rem",
            }}
          >
            <li>No sabes qué materiales son reciclables.</li>
            <li>No sabes dónde venderlos.</li>
            <li>No conoces su valor real en tu zona.</li>
          </ul>
          <p
            style={{
              color: "#888",
              fontSize: "0.95rem",
              marginTop: "auto",
              borderTop: "1px solid #eee",
              paddingTop: "1rem",
            }}
          >
            Esto provoca que perdamos oportunidades de generar ingresos y ayudar
            al mundo.
          </p>
        </div>

        {/* SOLUCIÓN (Ancho largo destacado) */}
        <div
          className="bento-card b-span-7"
          style={{
            ...fadeUp(0.2),
            background: "linear-gradient(135deg, #f0faef 0%, #e1f5df 100%)",
            border: "1px solid #d4ecd1",
          }}
        >
          <div
            style={{
              background: "white",
              width: "fit-content",
              padding: "10px",
              borderRadius: "12px",
              marginBottom: "1rem",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            }}
          >
            <Sparkles color="#6BB865" size={24} />
          </div>
          <h2
            style={{ color: "#2B5729", marginBottom: "1rem", fontSize: "2rem" }}
          >
            Nuestra Solución
          </h2>
          <p
            style={{
              color: "#444",
              marginBottom: "2rem",
              lineHeight: "1.6",
              fontSize: "1.1rem",
            }}
          >
            Una aplicación que combina tecnología y sostenibilidad para
            facilitar el reciclaje de forma inteligente, recompensando tu
            esfuerzo verde.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "1rem",
              marginTop: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                background: "white",
                padding: "0.8rem 1rem",
                borderRadius: "12px",
                color: "#2B5729",
                fontWeight: "600",
                boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
              }}
            >
              <Camera size={20} color="#6BB865" /> Escanea
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                background: "white",
                padding: "0.8rem 1rem",
                borderRadius: "12px",
                color: "#2B5729",
                fontWeight: "600",
                boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
              }}
            >
              <DollarSign size={20} color="#6BB865" /> Precios
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                background: "white",
                padding: "0.8rem 1rem",
                borderRadius: "12px",
                color: "#2B5729",
                fontWeight: "600",
                boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
              }}
            >
              <MapPin size={20} color="#6BB865" /> Ubicación
            </div>
          </div>
        </div>

        {/* COMO FUNCIONA (Tercio de pantalla) */}
        <div className="bento-card b-span-4" style={{ ...fadeUp(0.3) }}>
          <h2
            style={{
              color: "#2B5729",
              marginBottom: "1rem",
              fontSize: "1.6rem",
            }}
          >
            ¿Cómo funciona?
          </h2>
          <ol
            style={{
              color: "#555",
              lineHeight: "1.8",
              paddingLeft: "1.5rem",
              fontWeight: "500",
            }}
          >
            <li>Tomas una foto del objeto.</li>
            <li>La IA te dice qué es.</li>
            <li>Revisas su precio real.</li>
            <li>Encuentras dónde venderlo.</li>
          </ol>
        </div>

        {/* BENEFICIOS (Tercio de pantalla) */}
        <div className="bento-card b-span-4" style={{ ...fadeUp(0.25) }}>
          <h2
            style={{
              color: "#2B5729",
              marginBottom: "1rem",
              fontSize: "1.6rem",
            }}
          >
            Beneficios
          </h2>
          <ul
            style={{
              color: "#555",
              lineHeight: "1.8",
              listStyle: "none",
              paddingLeft: 0,
            }}
          >
            <li>💰 Genera ingresos extra</li>
            <li>🌱 Contribuye al cuidado</li>
            <li>📚 Aprende a separar</li>
            <li>⚡ Ahorra tiempo buscando</li>
          </ul>
        </div>

        {/* FUNCIONES (Tercio de Pantalla) */}
        <div className="bento-card b-span-4" style={{ ...fadeUp(0.3) }}>
          <h2
            style={{
              color: "#2B5729",
              marginBottom: "1rem",
              fontSize: "1.6rem",
            }}
          >
            Core Features
          </h2>
          <ul
            style={{ color: "#555", lineHeight: "1.7", paddingLeft: "1.5rem" }}
          >
            <li>Análisis de imágenes con IA</li>
            <li>Precios en tiempo real</li>
            <li>Mapa interactivo</li>
            <li>Verificación de recintos</li>
          </ul>
        </div>

        {/* COMUNIDAD (Ancho Completo Estilo Banner) */}
        <div
          className="bento-card b-span-12 community-banner"
          style={{ ...fadeUp(0.35), gap: "2rem" }}
        >
          <div style={{ flex: "1 1 400px" }}>
            <h2
              style={{
                color: "#2B5729",
                marginBottom: "0.5rem",
                fontSize: "2rem",
              }}
            >
              Una comunidad muy activa
            </h2>
            <p style={{ color: "#555", lineHeight: "1.6" }}>
              EcoValor no es solo una app, es una red de líderes locales donde
              compartimos conocimiento y valiosas experiencias para salvar el
              medio ambiente de forma colectiva.
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <div
              style={{
                background: "#f0faef",
                color: "#4a9444",
                padding: "1rem 1.5rem",
                borderRadius: "16px",
                fontWeight: "600",
              }}
            >
              💬 Chat Grupal
            </div>
            <div
              style={{
                background: "#f0faef",
                color: "#4a9444",
                padding: "1rem 1.5rem",
                borderRadius: "16px",
                fontWeight: "600",
              }}
            >
              📢 Tips diarios
            </div>
            <div
              style={{
                background: "#f0faef",
                color: "#4a9444",
                padding: "1rem 1.5rem",
                borderRadius: "16px",
                fontWeight: "600",
              }}
            >
              ⭐ Calificaciones
            </div>
          </div>
        </div>
      </main>

      {/* TRES PILARES INFERIORES */}
      <section
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
          padding: "0 2rem 4rem 2rem",
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        {[
          {
            icon: <Target size={28} color="#6BB865" />,
            title: "Nuestra Misión",
            text: "Brindar una solución tecnológica que incentive el reciclaje unificando a las comunidades y los centros locales.",
          },
          {
            icon: <Eye size={28} color="#6BB865" />,
            title: "Nuestra Visión",
            text: "Convertirnos en la plataforma ecológica líder reconocida por su impacto social y desarrollo económico.",
          },
          {
            icon: <Leaf size={28} color="#6BB865" />,
            title: "Nuestra Filosofía",
            text: "Creemos fielmente que la innovación tecnológica es clave fundamental para lograr la verdadera sostenibilidad.",
          },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: "linear-gradient(135deg, #f0faef 0%, #e1f5df 100%)",
              border: "2px solid #e1f5df",
              padding: "2rem",
              borderRadius: "24px",
              flex: "1 1 300px",
              ...fadeUp(0.4 + i * 0.1),
            }}
          >
            <div
              style={{
                marginBottom: "1rem",
                background: "white",
                width: "fit-content",
                padding: "0.8rem",
                borderRadius: "16px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              }}
            >
              {item.icon}
            </div>
            <h3
              style={{
                color: "#2B5729",
                fontSize: "1.4rem",
                marginBottom: "0.5rem",
              }}
            >
              {item.title}
            </h3>
            <p style={{ color: "#666", lineHeight: "1.6" }}>{item.text}</p>
          </div>
        ))}
      </section>

      {/* FOOTER AMPLIADO */}
      <footer
        style={{
          background: "#4a9444",
          padding: "2.5rem 2rem 1.5rem 2rem",
          color: "white",
        }}
      >
        <div
          style={{
            maxWidth: "1250px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "3rem",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              <Recycle size={28} />
              <h3 style={{ fontSize: "1.6rem", fontWeight: "800" }}>
                EcoValor App
              </h3>
            </div>
            <p
              style={{ opacity: 0.85, lineHeight: "1.6", fontSize: "0.95rem" }}
            >
              Transformando la percepción del reciclaje para hacerlo una
              actividad ecológica y económicamente beneficiosa para todos con la
              ayuda de la tecnología.
            </p>
          </div>

          <div>
            <h4
              style={{
                fontSize: "1.1rem",
                fontWeight: "700",
                marginBottom: "1.2rem",
                opacity: 0.9,
              }}
            >
              Conócenos
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                opacity: 0.8,
                lineHeight: "2.2",
                fontSize: "0.95rem",
              }}
            >
              <li style={{ cursor: "pointer" }}>Sobre Nosotros</li>
              <li style={{ cursor: "pointer" }}>Términos y Condiciones</li>
              <li style={{ cursor: "pointer" }}>Política de Privacidad</li>
            </ul>
          </div>

          <div>
            <h4
              style={{
                fontSize: "1.1rem",
                fontWeight: "700",
                marginBottom: "1.2rem",
                opacity: 0.9,
              }}
            >
              Contacto y Comunidad
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                opacity: 0.8,
                lineHeight: "2.2",
                fontSize: "0.95rem",
              }}
            >
              <li style={{ cursor: "pointer" }}>📧 info@ecovalorapp.com</li>
              <li style={{ cursor: "pointer" }}>📍 Guatemala</li>
            </ul>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                opacity: 0.9,
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                in
              </div>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                fb
              </div>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                x
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            opacity: 0.7,
            fontSize: "0.9rem",
          }}
        >
          © {new Date().getFullYear()} EcoValor App - Salvando al mundo, un
          material a la vez.
        </div>
      </footer>
    </div>
  );
};

export default Splash;
