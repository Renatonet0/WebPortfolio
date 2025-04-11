import React, { useEffect, useRef } from "react";
import "./InfiniteIconScroll.css";

const InfiniteIconScroll = ({ icons, speed = 10, direction = "left" }) => {
  const trackRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current || !containerRef.current) return;

    const track = trackRef.current;
    const container = containerRef.current;
    
    // Duplica os itens para o efeito de loop contínuo
    const items = Array.from(track.children);
    items.forEach(item => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });

    // Configura a animação
    const animationDuration = items.length * 2; // Ajuste conforme necessário
    track.style.animationDuration = `${animationDuration}s`;
    track.style.animationDirection = direction === "left" ? "normal" : "reverse";

    // Limpeza
    return () => {
      // Remove os clones ao desmontar
      const clones = Array.from(track.children).slice(items.length);
      clones.forEach(clone => track.removeChild(clone));
    };
  }, [icons, direction]);

  return (
    <div className="icon-scroll-container" ref={containerRef}>
      <div 
        className="icon-scroll-track"
        ref={trackRef}
        style={{ '--item-count': icons.length }}
      >
        {icons.map((Icon, index) => (
          <div key={`original-${index}`} className="icon-item">
            {typeof Icon === "function" ? (
              <Icon className="icon-svg" />
            ) : (
              <img src={Icon} alt="" className="icon-img" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteIconScroll;