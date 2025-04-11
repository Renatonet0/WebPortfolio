import React, { useEffect, useRef, useState } from "react";
import Menu from "./components/Menu";
import ScrambleText from "./components/ScrambleText";
import MovableImage from "./components/MovableImage";
import InfiniteScroll from "./components/InfiniteScroll";
import CursorBall from "./components/CursorBall";
import Card from "./components/Card";
import InfiniteIconScroll from "./components/InfiniteIconScroll";
import Social from "./components/Social";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from "framer-motion";
import "./Wave.css";

import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const sectionsRef = useRef([]);
  const scrollTriggersRef = useRef([]);
  const lenisRef = useRef(null);
  const movableImageRef = useRef(null);
  const cardsContainerRef = useRef(null);

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const [isHoveredRight, setIsHoveredRight] = useState(false);
  const [isHoveredCv, setIsHoveredCv] = useState(false);
  const [isHoveredCvBotton, setIsHoveredCvBotton] = useState(false);

  useEffect(() => {
    const imageRight = document.getElementById('image-right');
    if (imageRight) {
      gsap.to(imageRight, {
        x: cursorPos.x,
        y: cursorPos.y,
        duration: 1, 
        ease: "power2.out",
      });
    }
  }, [cursorPos]);
  
  useEffect(() => {
    const studyHoverBg = document.getElementById('study-hover-bg');
    const imageRight = document.getElementById('image-right');
    
    if (isHoveredRight) {
      studyHoverBg.style.opacity = '1';
      imageRight.style.opacity = '1';
    } else {
      studyHoverBg.style.opacity = '0';
      imageRight.style.opacity = '0';
      
    }
  }, [isHoveredRight]);

  const scrollLeft = () => {
    if (cardsContainerRef.current) {
      gsap.to(cardsContainerRef.current, {
        scrollLeft: cardsContainerRef.current.scrollLeft - 800,
        duration: 0.01,
        ease: "power2.out",
        overwrite: true
      });
    }
  };
  
  const scrollRight = () => {
    if (cardsContainerRef.current) {
      gsap.to(cardsContainerRef.current, {
        scrollLeft: cardsContainerRef.current.scrollLeft + 800,
        duration: 0.01,
        ease: "power2.out",
        overwrite: true
      });
    }
  };

  const svgIcons = 
  [
    "./assets/logos/c.svg", "./assets/logos/java.svg", "./assets/logos/javascript.svg",
    "./assets/logos/python.svg", "./assets/logos/react.svg", "./assets/logos/photoshop.svg",  "./assets/logos/c++.svg",
    "./assets/logos/c.svg", "./assets/logos/java.svg", "./assets/logos/javascript.svg",
    "./assets/logos/python.svg", "./assets/logos/react.svg", "./assets/logos/photoshop.svg",  "./assets/logos/c++.svg",
  ];

  useEffect(() => {

    if (!customElements.get("a-waves")) {
      import("./components/Waves");
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    sectionsRef.current.forEach((section, index) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=80%",
        pin: true,
        scrub: 0.1,
      });
      scrollTriggersRef.current.push(trigger);
    });

    gsap.fromTo(
      "#volunteer-image",
      {
        height: "50%",
        x: "50%",
        opacity: 0,
      },
      {
        height: "100%",
        x: "0%",
        opacity: 1,
        scrollTrigger: {
          trigger: "#about",
          start: "top center",
          end: "top center",
          scrub: 1,           
        },
      }
    );

    gsap.fromTo(
      "#about-text",
      {
        y: "100%",
        opacity: 0,
      },
      {
        y: "0%",
        opacity: 1,
        scrollTrigger: {
          trigger: "#about",
          start: "top center",
          end: "bottom bottom",
          scrub: 1,
        },
      }
    );

    gsap.to(movableImageRef.current, {
      y: "-30%",
      scrollTrigger: {
        trigger: "#about",
        start: "top center", 
        end: "bottom bottom",  
        scrub: 1,            
      },
    });

    const timer = setTimeout(() => {
      setupHorizontalScroll();
    }, 500);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, []);

  const scrollToSection = (id, offset) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(`#${id}`, { offset });
    }
  };

  return (
    <div className="min-h-screen">
      <CursorBall />

      <div className="z-40">
        <p className="select-none absolute z-40 top-0 right-0 p-10 font-poppins text-[#D9D9D9] text-4xl text-right">
          RN
        </p>
      </div>

      <div className="fixed top-4 left-4 z-40">
        <Menu scrollToSection={scrollToSection} />
      </div>

      <div className="z-30 relative mt-[35vh]">
        <div className="flex flex-col items-center">
          <ScrambleText text="WEB" />
          <ScrambleText text="DEVELOPMENT" />
        </div>

        <div className="flex flex-col items-center mt-[2%]">
          <ScrambleText text="COMPUTER" />
          <ScrambleText text="SCIENCE" />
        </div>
      </div>

      <div className="z-40 relative">
        <MovableImage ref={movableImageRef}/>
      </div>

      <div 
        className="absolute z-40 mt-[43vw] mr-[10vw] w-[30%] right-0 flex justify-end items-center"
        onMouseEnter={() => setIsVolunteerHovered(true)}
        onMouseLeave={() => setIsVolunteerHovered(false)}
      >
        <div id="volunteer-image" className="relative w-full h-full">
          <MovableImage
            imageSrc="/assets/voluntariado.jpg"
            caption="Volunteer"
            width="100%"
            left="left-[50%]"
            height="95%"
            round = "rounded-[0px]"
            containerWidth="80%"
            containerHeight="35vw"
            captionClassName="bg-[#0C0C0C] text-[#D9D9D9] font-poppins text-sm px-[1vw] py-[0.5vw] rounded-lg"
          />
        </div>
      </div>

      <div
        id="about"
        className="flex w-full z-30 bg-[#D9D9D9] mt-[28%] relative"
        style={{ 
          height: "60vw",
          background: `
            linear-gradient(#D9D9D9, #D9D9D9),
            linear-gradient(#FF0000, #FF0000)
          `,
          backgroundPosition: `
            0 0,
            calc(50% - 12.5vw) calc(50% - 7.5vw)
          `,
          backgroundSize: `
            100% 100%,
            25vw 15vw
          `,
          backgroundRepeat: 'no-repeat',
          mask: `
            linear-gradient(white, white),
            linear-gradient(white, white)
          `,
          maskPosition: `
            0 0,
            calc(95% - 12.5vw) calc(60% - 7.5vw)
          `,
          maskSize: `
            100% 100%,
            25vw 25vw
          `,
          maskRepeat: 'no-repeat',
          maskComposite: 'exclude'  ,
        }}
      >

        <InfiniteScroll text="ABOUT" />

        <div 
          className="absolute top-[30%] left-0 h-[16vw] z-40"
          onMouseEnter={() => setIsHoveredCv(true)}
          onMouseLeave={() => setIsHoveredCv(false)}
        >
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isHoveredCv ? "16vw" : "16vw",
              width: isHoveredCv ? "6vw" : "3vw",
              opacity: isHoveredCv ? 1 : 1,
            }}
            transition={{
              duration: 0.8,
              ease: [0.2, 1, 0.3, 1],
            }}
            className="flex items-end justify-end relative rounded-tr-xl rounded-br-xl z-40 bg-[#0C0C0C]"
          >
            
          <motion.a
            onMouseEnter={() => setIsHoveredCvBotton(true)}
            onMouseLeave={() => setIsHoveredCvBotton(false)}
            href="/cv.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            initial={{ height: 0, opacity: 0 }}
            animate={{
            height: isHoveredCv ? "8vw" : "8vw",
            width: isHoveredCv ? "5vw" : "2vw",
            opacity: isHoveredCv ? 1 : 0,
            borderColor: isHoveredCvBotton ? "#D9D9D9" : "#4a4a4a",
            }}
            transition={{
              duration: 0.8,
              ease: [0.2, 1, 0.3, 1],
            }}
            className="absolute border-[0.2vw] border-[#4a4a4a] flex justify-center items-center top-[1vw] left-[0.4vw] bg-[#000000] text-[#0C0C0C] text-sm rounded-xl shadow-md"
          >
            <img
              src="/assets/arrowcv.svg"
              alt="CV"
              className={`w-[3.5vw] h-[3.5vw] ${isHoveredCv ? (isHoveredCvBotton ? "opacity-100" : "opacity-30") : "opacity-0"} rounded-xl`}
            />
          </motion.a>

            <p className="font-poppins font-medium absolute -mr-[0.6vw] mb-[3vw] text-[#D9D9D9] text-[1.5vw] -rotate-90 whitespace-nowrap">
              my cv
            </p>
          </motion.div>
        </div>

        <div className="w-full flex items-center h-full ml-[15%] absolute">
          <div
            id="about-text"
            className="select-none text-center justify-center text-[1vw] font-poppins text-[#0C0C0C] w-[35%] leading-tight md:leading-normal lg:leading-relaxed"
          >
            <p className="text-[1.5vw] font-poppins font-semibold">
              Get to know me
            </p>
            <br />
            <p>
              I am an engineering and computer science student at Lisbon's Instituto Superior Técnico.
              I'm passionate about technology and innovation, and as I've studied, I've been
              especially interested in web development and artificial intelligence, two areas
              where I'm always looking to learn more.
            </p>
            <br />
            <p>
              I'm constantly searching for fresh challenges that will let me use what I've learned
              and grow in dynamic settings, helping to progress technology and develop meaningful solutions.
            </p>
            <br />
            <p className="mt-[8%] text-[1.3vw] font-poppins font-semibold">
              Studies
            </p>

            <div className="flex absolute mt-[0.5%] w-full h-[0.1%] bg-[#A4A4A4]"></div>

            <div 
              className="relative mt-[4%]"
              onMouseEnter={() => setIsHoveredRight(true)}
              onMouseLeave={() => setIsHoveredRight(false)}
              onMouseMove={(e) => {
                setCursorPos({ x: e.clientX, y: e.clientY });
              }}
            >
              <motion.div
                id="study-hover-bg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: isHoveredRight ? 1.2 : 0, scale: isHoveredRight ? 1.2 : 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute inset-0 mx-auto my-auto bg-[#0C0C0C] rounded-xl"
              />
              
              <div className={`flex justify-between items-center relative z-10 ${isHoveredRight ? 'text-[#D9D9D9]' : 'text-[#0C0C0C]'}`}>
                <div>
                  <p className="text-[1.1vw] text-start font-poppins font-medium">
                    Computer Science and Engineering
                  </p>
                  <p className="text-[1vw] text-start font-poppins font-normal">
                    Instituto Superior Técnico - IST
                  </p>
                </div>
                <div className="text-center text-[1.2vw] font-poppins font-normal">
                  2023 - Now
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <img
              src="/assets/ist.jpg"
              alt="Imagem da direita"
              className="fixed z-40 shadow-xl w-[20%] rounded-2xl h-auto opacity-0 pointer-events-none transition-transform duration-100"
              id="image-right"
              style={{
                transform: "translate(0%, -20%) scale(0.8)",
                left: "0%",
                top: "-4%"
              }}
            />
          </div>
        </div>
      </div>

      <div className="relative py-2"> 
        <div className="absolute -rotate-90 z-20 left-[5%] w-[90%] top-[100%] origin-left">
          <InfiniteScroll text="WORK" textColor="#D9D9D9" />
        </div>

        <div id="work" className="font-['Poppins'] rounded-tl-3xl rounded-bl-3xl mb-[1.5%] ml-[15%] mt-[5%] z-30 relative bg-[#080808]">
          <div className="flex flex-wrap rounded-tl-3xl rounded-bl-3xl max-w-full mx-auto">
            {/* Card 1 */}
            <div className="relative rounded-tl-3xl rounded-bl-3xl overflow-hidden flex-1 will-change-[flex] transition-[flex] duration-[0.8s] ease-[cubic-bezier(0.30,0,0.2,1)] hover:flex-[2] group">
              <img 
                src="/assets/rides.jpg" 
                alt="Rides" 
                className="w-full object-cover align-middle h-[85vh]" 
              />
              <div className="absolute left-5 right-5 bottom-5 z-[111] opacity-0 group-hover:opacity-100 px-[1vw] py-[2vw] rounded-xl bg-black transition-all duration-500 ease-in-out">
                <h3 className="text-white font-poppins font-semibold text-[1.2vw]">Rides</h3>
                <p className="text-white">A mobile application for organizing or joining car rides.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative overflow-hidden flex-1 will-change-[flex] transition-[flex] duration-[0.8s] ease-[cubic-bezier(0.30,0,0.2,1)] hover:flex-[2] group">
              <img 
                src="/assets/empty.png" 
                alt="" 
                className="w-full object-cover align-middle h-[60vh]" 
              />
              <div className="absolute left-5 right-5 bottom-5 z-[111] opacity-0 group-hover:opacity-100 px-[1vw] py-[2vw] rounded-xl bg-black transition-all duration-500 ease-in-out">
                <h3 className="text-white">Card Title</h3>
                <p className="text-white">Card description</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative overflow-hidden flex-1 will-change-[flex] transition-[flex] duration-[0.8s] ease-[cubic-bezier(0.30,0,0.2,1)] hover:flex-[2] group">
              <img 
                src="/assets/empty.png" 
                alt="" 
                className="w-full object-cover align-middle h-[60vh]" 
              />
              <div className="absolute left-5 right-5 bottom-5 z-[111] opacity-0 group-hover:opacity-100 px-[1vw] py-[2vw] rounded-xl bg-black transition-all duration-500 ease-in-out">
                <h3 className="text-white">Card Title</h3>
                <p className="text-white">Card description</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center z-30 relative bg-[#D9D9D9] mt-[3.5%]">
        <div className="flex absolute z-30 w-full mt-[5%] h-[9vw] justify-center">
          <div className="select-none opacity-45 font-poppins text-center z-30 text-[#0C0C0C] absolute text-[2vw]">
            Experience In
          </div>
          <div className="absolute mt-[1%] z-40">
            <InfiniteIconScroll icons={svgIcons} speed={15} direction="right" />
          </div>
        </div>

        <div id="social" className="z-30 flex mt-[20vw] mb-[6vw] justify-center">
          <Social/>
        </div>
      </div>

      <div className="bg-[#0C0C0C] relative">
        <a-waves>
          <canvas className="js-canvas"></canvas>
        </a-waves>
      </div>
    </div>
  );
};

export default App;