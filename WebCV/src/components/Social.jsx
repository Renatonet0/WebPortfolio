import React, { useState, useEffect } from 'react';
import InfiniteScroll from "./InfiniteScroll";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const Social = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [maxOffset, setMaxOffset] = useState({ x: 10, y: 10 }); // Valores menores para um botão

  useEffect(() => {
    const updateMaxOffset = () => {
      setMaxOffset({
        x: window.innerWidth * 0.02, 
        y: window.innerHeight * 0.02, 
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

    const offsetX = (x - 0.5) * -maxOffset.x * 1;
    const offsetY = (y - 0.5) * -maxOffset.y * 1;

    setOffset({
      x: offsetX,
      y: offsetY,
    });

    setCursorPosition({ x: e.clientX - left, y: e.clientY - top });
  };

  return (
    <div className="bg-[#0C0C0C] z-40 w-[80vw] h-[30vw] rounded-3xl shadow-md overflow-hidden justify-between">
      <div className="w-full h-[12vw] mt-[1%]">
        <InfiniteScroll text="SOCIAL" textColor="#D9D9D9" />
      </div>

      <div className='flex items-center space-x-[25%]'>
        <div className="flex-col space-y-[1vw] ml-[20%]">
          <a className='flex space-x-[5%] items-center' href="https://www.instagram.com/_renatofneto_/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-[#D9D9D9] text-[2.5vw] hover:scale-110 transition-transform" />
            <span className="text-[#D9D9D9] select-none text-[1.3vw] font-medium">_renatofneto_</span>
          </a>
          <a className='flex space-x-[5%] items-center' href="https://github.com/Renatonet0" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-[#D9D9D9] text-[2vw] hover:scale-110 transition-transform" />
            <span className="text-[#D9D9D9] select-none text-[1.3vw] font-medium">Renatonet0</span>
          </a>
          <a className='flex space-x-[5%] items-center' href="https://www.linkedin.com/in/renatofneto" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-[#D9D9D9] text-[2vw] hover:scale-110 transition-transform" />
            <span className="text-[#D9D9D9] select-none text-[1.3vw] font-medium">renatofneto</span>
          </a>
        </div>
        
        <a href="mailto:renato.f.a.neto@gmail.com" target="_blank" rel="noopener noreferrer">
          <div 
            className="flex justify-center items-center border-[0.1vw] border-[#D9D9D9] rounded-full h-[5vw] w-[15vw] relative cursor-pointer
                      bg-transparent text-[#D9D9D9] 
                      transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                      hover:bg-[#D9D9D9] hover:text-[#0C0C0C]"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setOffset({ x: 0, y: 0 });
            }}
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px)`,
            }}
          >
            <span className="text-[1.6vw] select-none font-medium transition-colors duration-200">Contact me</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Social;