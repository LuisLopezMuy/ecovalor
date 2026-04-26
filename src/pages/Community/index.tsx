import { useState, useRef, useEffect } from "react";
import postsData from "../../assets/posts.json";
import { Image, Send, Heart, MessageCircle } from "lucide-react";

export default function Community() {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPostText, setNewPostText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mezclar posts y agregar estado de like local cada vez que se abre la página
  useEffect(() => {
    const shuffled = [...postsData]
      .map(post => ({ ...post, likedByUser: false }))
      .sort(() => 0.5 - Math.random());
    setPosts(shuffled);
  }, []);

  // Obtener el usuario local
  const currentUser = localStorage.getItem("username") || "Usuario Ecológico";

  // Manejar Like
  const handleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const isNowLiked = !post.likedByUser;
          return {
            ...post,
            likedByUser: isNowLiked,
            likes: isNowLiked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
  };

  const handlePublish = () => {
    if (!newPostText.trim()) return;
    
    const newPost = {
      id: "p" + Date.now(),
      user: currentUser,
      avatar: currentUser.charAt(0).toUpperCase(),
      text: newPostText,
      time: "Justo ahora",
      image: null, // Sin soporte real de imagen aún, tal como pedido
      likes: 0,
      likedByUser: false
    };
    
    // Agregamos el post al tope de la lista
    setPosts([newPost, ...posts]);
    setNewPostText("");
    
    // Scroll instantáneo arriba de forma suave
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Función oficial para cargar los assets dinámicamente usando Vite
  const getImageUrl = (name: string) => {
    try {
      return new URL(`../../assets/comunity-images/${name}`, import.meta.url).href;
    } catch {
      return "";
    }
  };

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#f4fbf4",
      fontFamily: "'Inter', sans-serif",
      overflow: "hidden" // Previene recortes con el layout general
    }}>
      
      {/* Header Fijo */}
      <div style={{
        padding: "1.5rem",
        backgroundColor: "#f4fbf4",
        zIndex: 10,
        boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
      }}>
        <h2 style={{ margin: 0, color: "#2B5729", fontSize: "1.6rem", fontWeight: "800" }}>
          Comunidad EcoValor
        </h2>
        <p style={{ color: "#6BB865", margin: "5px 0 0 0", fontSize: "0.95rem", fontWeight: "600" }}>
          Comparte tus logros e inspira al mundo a reciclar.
        </p>
      </div>

      {/* Feed Social (Desplazable) */}
      <div 
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem 1.5rem",
          paddingBottom: "110px", // Margen vital inferior para que el input bottom no oculte el último post
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}
      >
        {posts.map(post => (
          <div key={post.id} style={{ background: "white", borderRadius: "24px", padding: "1.5rem", boxShadow: "0 6px 20px rgba(0,0,0,0.04)" }}>
            
            {/* Encabezado del Post (Avatar y Usuario) */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
              <div style={{ width: "45px", height: "45px", borderRadius: "50%", background: "linear-gradient(135deg, #d8ead8 0%, #b8d8b8 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2B5729", fontSize: "1.1rem", fontWeight: "800", flexShrink: 0 }}>
                {post.avatar}
              </div>
              <div>
                <div style={{ fontWeight: "800", color: "#333", fontSize: "1.05rem" }}>{post.user}</div>
                <div style={{ color: "#888", fontSize: "0.85rem", fontWeight: "600" }}>{post.time}</div>
              </div>
            </div>

            {/* Texto del Post */}
            <p style={{ color: "#444", fontSize: "0.98rem", lineHeight: "1.6", margin: "0 0 1.2rem 0" }}>
              {post.text}
            </p>

            {/* Imagen del Post (1:1 Aspect Ratio Exacto) */}
            {post.image && (
              <div style={{ width: "100%", aspectRatio: "1/1", borderRadius: "16px", overflow: "hidden", marginBottom: "1.2rem", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                <img 
                  src={getImageUrl(post.image)} 
                  alt="Post en Comunidad" 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
              </div>
            )}

            {/* Botones de Interacción */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", borderTop: "1px solid #f0f0f0", paddingTop: "1.2rem", userSelect: "none" }}>
              <div 
                onClick={() => handleLike(post.id)}
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "6px", 
                  color: post.likedByUser ? "#e74c3c" : "#6BB865", 
                  fontWeight: "800", 
                  cursor: "pointer", 
                  fontSize: "0.95rem",
                  transition: "all 0.2s ease"
                }}
              >
                <Heart 
                  size={20} 
                  color={post.likedByUser ? "#e74c3c" : "#6BB865"} 
                  fill={post.likedByUser ? "#e74c3c" : "transparent"} 
                />
                <span>{post.likes}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#999", fontWeight: "600", cursor: "pointer", fontSize: "0.95rem" }}>
                <MessageCircle size={20} />
                <span>Comentar</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contenedor del Input (Fijado en la parte inferior de este bloque absoluto) */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        boxShadow: "0 -4px 30px rgba(0,0,0,0.08)",
        padding: "1rem 1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        zIndex: 100
      }}>
        {/* Botón estético Falso de Adjuntar Imagen */}
        <button style={{
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#f4fbf4",
          color: "#6BB865",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          flexShrink: 0
        }}>
          <Image size={22} />
        </button>

        {/* Campo de Texto para el Mensaje */}
        <input 
          type="text"
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handlePublish()}
          placeholder="Comparte tu logro para el mundo..."
          style={{
            flex: 1,
            height: "45px",
            borderRadius: "24px",
            border: "1px solid #e1e8e1",
            padding: "0 1rem",
            fontSize: "0.95rem",
            fontFamily: "inherit",
            outline: "none",
            backgroundColor: "#fafafa"
          }}
        />

        {/* Botón Funcional de Enviar Publicación */}
        <button 
          onClick={handlePublish}
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "#6BB865",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            transition: "transform 0.1s"
          }}
          onMouseDown={e => e.currentTarget.style.transform = "scale(0.95)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <Send size={18} style={{ marginLeft: "2px" }} />
        </button>
      </div>

    </div>
  );
}
