import React, { useState, useEffect, useRef } from 'react';

const CursorBall = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 }); // Posição do cursor
  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 }); // Posição da bola
  const ballSize = window.innerWidth * 0.02; // Tamanho da bola
  const easing = 0.2; // Fator de suavização (quanto menor, mais suave)
  const animationFrameRef = useRef(null); // Referência para o requestAnimationFrame

  // Atualiza a posição do cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Anima a bola para seguir o cursor com delay
  useEffect(() => {
    const animate = () => {
      // Calcula a diferença entre a posição do cursor e a posição da bola
      const dx = cursorPosition.x - ballPosition.x;
      const dy = cursorPosition.y - ballPosition.y;

      // Aplica um efeito de easing para mover a bola suavemente
      setBallPosition((prev) => ({
        x: prev.x + dx * easing,
        y: prev.y + dy * easing,
      }));

      // Continua a animação
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Inicia a animação
    animationFrameRef.current = requestAnimationFrame(animate);

    // Limpa o requestAnimationFrame ao desmontar o componente
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [cursorPosition, ballPosition, easing]);

  return (
    <div
      className="myesr-rotator-cursor z-50"
      style={{
        position: 'fixed',
        top: ballPosition.y - ballSize / 2,
        left: ballPosition.x - ballSize / 2,
        width: ballSize,
        height: ballSize,
        borderRadius: '50%',
        backgroundColor: '#D9D9D9',
        mixBlendMode: 'difference', // Garante contraste com o fundo
        pointerEvents: 'none', // Permite que o mouse interaja com elementos abaixo da bola
        transition: 'transform 0.1s linear', // Movimento suave
      }}
    />
  );
};

export default CursorBall;