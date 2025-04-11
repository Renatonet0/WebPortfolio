import { useEffect, useRef } from "react";

const InfiniteScroll = ({ text, textColor }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0; // Reset do scroll
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="overflow-hidden w-full h-full flex items-center">
      <div
        ref={scrollContainerRef}
        className="flex w-max h-full space-x-4 animate-scroll whitespace-nowrap"
      >
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            style={{ color: textColor }}
            className="text-[7vw] font-semibold font-poppins leading-none text-[#0C0C0C] select-none"
          >
            - {text} - {text} - {text} 
          </span>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;
