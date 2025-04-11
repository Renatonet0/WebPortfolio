import React, { useState, useEffect } from 'react';

const MovableImage = React.forwardRef(({
  className = "",
  imageSrc = "/assets/profile.jpg",
  caption = "Renato Neto",
  width = "60%",
  height = "30vw",
  left = "left-1/2",
  round = "rounded-[30px]",
  containerWidth = "90%",
  containerHeight = "40vw",
  captionClassName = "bg-[#0C0C0C] text-[#D9D9D9] font-poppins text-sm px-[1vw] py-[0.5vw] rounded-lg"
}, ref) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredImage, setIsHoveredImage] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [maxOffset, setMaxOffset] = useState({ x: 20, y: 20 });

  useEffect(() => {
    const updateMaxOffset = () => {
      setMaxOffset({
        x: window.innerWidth * 0.05,
        y: window.innerHeight * 0.05,
      });
    };

    updateMaxOffset();
    window.addEventListener('resize', updateMaxOffset);

    return () => window.removeEventListener('resize', updateMaxOffset);
  }, []);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const offsetX = (x - 0.5) * -maxOffset.x * 2;
    const offsetY = (y - 0.5) * -maxOffset.y * 2;

    setOffset({
      x: offsetX,
      y: offsetY,
    });

    setCursorPosition({ x: e.clientX - left, y: e.clientY - top });
  };

  return (
    <div
      ref={ref}
      className={`absolute ${left} mt-[2%] flex justify-center items-center transform -translate-x-1/2 z-30 ${className}`}
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setOffset({ x: 0, y: 0 });
      }}
    >
      {/* Imagem */}
      <img
        onMouseEnter={() => setIsHoveredImage(true)}
        onMouseLeave={() => setIsHoveredImage(false)}
        className={`transition-transform duration-300 overflow-hidden ${round}`}
        style={{
          width: width,
          height: height,
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
        src={imageSrc}
        alt={caption}
      />

      {/* Legenda */}
      {isHoveredImage && (
        <div
          className={`absolute z-50 ${captionClassName}`}
          style={{
            top: cursorPosition.y - 40,
            left: cursorPosition.x + 70,
            transform: 'translateX(-50%)',
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
});

export default MovableImage;