import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ScanLine, X, AlertTriangle, Leaf, Camera } from "lucide-react";

export default function Scan() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        // Obtenemos la cámara trasera por defecto
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setHasPermission(true);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setHasPermission(false);
      }
    };

    startCamera();

    return () => {
      // Limpiaremos el stream al desmontar el componente (salir de la página)
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleScanClick = () => {
    setIsScanning(true);
    setTimeout(() => {
      navigate("/app/scan/result");
    }, 2500);
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: "65px" /* altura del navbar */,
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Indicador de Carga Inicial */}
      {hasPermission === null && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Camera
            size={48}
            color="#6BB865"
            style={{ marginBottom: "1rem", animation: "pulse 1.5s infinite" }}
          />
          <p>Iniciando cámara inteligente...</p>
        </div>
      )}

      {/* Video Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: hasPermission ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Overlay Oscuro Perimetral */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.3)", // Un oscurecimiento suave
          pointerEvents: "none",
        }}
      ></div>

      {/* Pantalla de Error (Sin Permisos) */}
      {hasPermission === false && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textAlign: "center",
            padding: "2rem",
            width: "100%",
          }}
        >
          <AlertTriangle
            size={56}
            color="#ff4d4f"
            style={{ marginBottom: "1rem" }}
          />
          <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            Cámara no accesible
          </h3>
          <p style={{ opacity: 0.8, lineHeight: "1.5", marginBottom: "2rem" }}>
            Por favor habilita los permisos de cámara en tu navegador o
            dispositivo para poder identificar materiales.
          </p>
          <button
            onClick={() => navigate("/app/home")}
            style={{
              background: "white",
              color: "#111",
              border: "none",
              padding: "0.8rem 2rem",
              borderRadius: "20px",
              fontWeight: "700",
              fontSize: "1rem",
            }}
          >
            Volver al Inicio
          </button>
        </div>
      )}

      {/* Camera UI Overlay */}
      {hasPermission === true && (
        <>
          {/* Header Superior */}
          <div
            style={{
              position: "absolute",
              top: "2rem",
              left: "1.5rem",
              right: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <div
              style={{
                background: "rgba(0,0,0,0.6)",
                padding: "10px 15px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "white",
                backdropFilter: "blur(10px)",
              }}
            >
              <Leaf size={18} color="#6BB865" />
              <span style={{ fontWeight: "600", fontSize: "0.95rem" }}>
                EcoValor AI
              </span>
            </div>
            <button
              onClick={() => navigate("/app/home")}
              style={{
                background: "rgba(0,0,0,0.6)",
                border: "none",
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                backdropFilter: "blur(10px)",
                cursor: "pointer",
              }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Scanner Target Frame Central */}
          <div
            style={{
              position: "absolute",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "280px",
              height: "280px",
              border: "2px solid rgba(255,255,255,0.2)",
              borderRadius: "24px",
              overflow: "hidden",
              zIndex: 5,
              boxShadow: "0 0 0 4000px rgba(0,0,0,0.4)", // Overlay que oscurece el fondo pero deja el centro claro
            }}
          >
            {/* Esquinas (Decoración UI) */}
            <div
              style={{
                position: "absolute",
                top: -2,
                left: -2,
                width: "40px",
                height: "40px",
                borderTop: "5px solid #6BB865",
                borderLeft: "5px solid #6BB865",
                borderTopLeftRadius: "24px",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                top: -2,
                right: -2,
                width: "40px",
                height: "40px",
                borderTop: "5px solid #6BB865",
                borderRight: "5px solid #6BB865",
                borderTopRightRadius: "24px",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: -2,
                left: -2,
                width: "40px",
                height: "40px",
                borderBottom: "5px solid #6BB865",
                borderLeft: "5px solid #6BB865",
                borderBottomLeftRadius: "24px",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: -2,
                right: -2,
                width: "40px",
                height: "40px",
                borderBottom: "5px solid #6BB865",
                borderRight: "5px solid #6BB865",
                borderBottomRightRadius: "24px",
              }}
            ></div>

            {/* Efecto de Escaneo (Rayo Láser) */}
            <style>{`
               @keyframes scanLaser {
                 0% { top: -20%; opacity: 0; }
                 15% { opacity: 1; }
                 85% { opacity: 1; }
                 100% { top: 100%; opacity: 0; }
               }
               @keyframes pulse {
                 0% { transform: scale(1); opacity: 1; }
                 50% { transform: scale(1.1); opacity: 0.7; }
                 100% { transform: scale(1); opacity: 1; }
               }
             `}</style>
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: "120px",
                background:
                  "linear-gradient(to bottom, rgba(107,184,101,0) 0%, rgba(107,184,101,0.5) 100%)",
                borderBottom: "3px solid #6BB865",
                boxShadow: "0 5px 20px rgba(107,184,101,0.6)",
                animation: isScanning
                  ? "scanLaser 1.5s infinite ease-in-out"
                  : "none",
                top: isScanning ? "0" : "-150%",
                display: isScanning ? "block" : "none",
              }}
            ></div>
          </div>

          {/* Controles Inferiores */}
          <div
            style={{
              position: "absolute",
              bottom: "3rem",
              left: 0,
              right: 0,
              textAlign: "center",
              padding: "0 2rem",
              zIndex: 10,
            }}
          >
            <p
              style={{
                color: "white",
                marginBottom: "1.5rem",
                fontSize: "1.05rem",
                textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                fontWeight: "600",
              }}
            >
              {isScanning
                ? "Analizando composición..."
                : "Enfoca el material en el recuadro"}
            </p>
            <button
              onClick={handleScanClick}
              disabled={isScanning}
              style={{
                background: isScanning ? "rgba(255,255,255,0.2)" : "#6BB865",
                color: "white",
                border: isScanning ? "2px solid rgba(255,255,255,0.5)" : "none",
                padding: "1.2rem 3rem",
                borderRadius: "40px",
                fontSize: "1.2rem",
                fontWeight: "800",
                boxShadow: isScanning
                  ? "none"
                  : "0 8px 30px rgba(107, 184, 101, 0.4)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                cursor: isScanning ? "wait" : "pointer",
                transition: "all 0.3s ease",
                width: "80%",
                maxWidth: "300px",
                backdropFilter: isScanning ? "blur(10px)" : "none",
              }}
            >
              <ScanLine
                size={24}
                style={{ animation: isScanning ? "pulse 1s infinite" : "none" }}
              />
              {isScanning ? "Procesando..." : "Identificar"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
