import React, { useState } from "react";
import { motion } from "framer-motion";

const Card = ({ imageSrc, text, description, imageAlt = "Imagem do card", className = "", lineHeight = "1.5" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredCard, setIsHoveredCard] = useState(false);

  return (
    <div className="relative pt-[1vh] pb-[1vh]">
      <motion.div 
        initial={false}
        animate={{
          scale: isHoveredCard ? 1.02 : 1,
          transition: { duration: 0.2 }
        }}
        onMouseEnter={() => setIsHoveredCard(true)}
        onMouseLeave={() => setIsHoveredCard(false)}
        className={`relative bg-[#0f0f0f] z-30 w-[50vh] h-[70vh] mt-[1%] rounded-[2vh] shadow-md overflow-hidden flex flex-col ${className}`}
        >
        {/* Image with hover effect */}
        <motion.div
          initial={false}
          animate={{
            scale: isHovered ? 1.02 : 1,
            transition: { duration: 0.2 }
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-[46vh] mt-[4%] h-[40vh] opacity-70 rounded-[1vh] flex justify-center mx-auto"
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full shadow-lg h-full object-cover rounded-[5%]"
            />
          ) : (
            <div className="w-[50vh] h-full bg-[#090909] shadow-lg rounded-[5%]"></div>
          )}
        </motion.div>

        {/* Text content */}
        <div className="px-[5%] pt-[3%] flex-grow">
          <p className="select-none opacity-70 text-[#D9D9D9] text-[3vh] font-semibold font-poppins mb-[2%]">
            {text}
          </p>
          
          {description && (
            <div 
              className="text-[#D9D9D9] opacity-50 select-none mt-[1vh] text-[2vh] font-poppins whitespace-pre-line break-words"
              style={{ lineHeight: lineHeight }}
            >
              {description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-2 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Arrow in bottom right corner */}
        <div className="absolute opacity-25 bottom-[1%] right-[2%]">
          <img
            src="/assets/arrow.svg"
            className="w-[6vw] h-auto"
            alt="Seta"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Card;