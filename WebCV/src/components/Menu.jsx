import React, { useState } from "react";
import { motion } from "framer-motion";

const Menu = ({ scrollToSection }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isHoveredText, setIsHoveredText] = useState(false);

  const items = [
    { id: 1, text: "About", subText: "About", sectionId: "about" }, 
    { id: 2, text: "Work", subText: "Work", sectionId: "work" },
    { id: 3, text: "Social", subText: "Social", sectionId: "social" },
  ];

  return (
    <div>
      <button
        onMouseEnter={() => setIsHoveredText(true)}
        onMouseLeave={() => {
          setIsHoveredText(false);
        }}
        className="bg-[#161616] opacity-95 flex items-center top-4 left-4 rounded-full w-52 h-[66px] absolute"
      >
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: 50,
            opacity: isHoveredText ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          className="bg-[#1d1d1d] justify-start rounded-full absolute left-[65px] w-[135px]"
        />
        <motion.div
          onClick={() => scrollToSection("social")}
          initial={{ opacity: 1 }}
          animate={{
            opacity: isHovered ? 0 : 1,
          }}
          transition={{
            duration: 0.1,
          }}
          className="justify-start pl-[83px] absolute font-poppins"
        >
          Get in touch
        </motion.div>
      </button>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredItem(null);
        }}
        className="rounded-full absolute p-6"
      >
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered ? 200 : 50,
            width: isHovered ? 150 : 50,
            opacity: isHovered ? 1 : 1,
            borderRadius: isHovered ? 30 : 50,
          }}
          transition={{
            duration: 0.8,
            ease: [0.2, 1, 0.3, 1],
          }}
          className="bg-[#D9D9D9] shadow-xl rounded-full absolute"
        ></motion.div>

        <motion.img
          src={"/assets/menuBlack.svg"}
          alt="Menu Icon"
          className="absolute left-[28.5px] top-[32px] w-10 h-8 z-8"
          animate={{ rotate: isHovered ? 90 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />

        {isHovered && (
          <ul className="absolute pl-[72px] pt-20">
            {items.map((item) => (
              <li
                key={item.id}
                className="font-poppins font-medium text-xl text-[#0C0C0C] relative overflow-hidden"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => {
                  if (item.sectionId === "about") {
                    scrollToSection(item.sectionId); 
                  } else {
                    scrollToSection(item.sectionId); 
                  }
                }}
              >
                <motion.div
                  initial={{ y: 0, opacity: 1 }}
                  animate={{
                    y: hoveredItem === item.id ? -20 : 0,
                    opacity: hoveredItem === item.id ? 0 : 1,
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="py-1"
                >
                  {item.text}
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: hoveredItem === item.id ? 0 : 20,
                    opacity: hoveredItem === item.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="py-1 absolute top-0 left-0 w-full whitespace-nowrap"
                >
                  {item.subText}
                </motion.div>
              </li>
            ))}
          </ul>
        )}
      </button>
    </div>
  );
};

export default Menu;