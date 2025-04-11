import React from "react";
import "../CubeWave.css"; 

const CubeWave = () => {
  return (
    <div className="canvas">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="group">
        {[...Array(5)].map((_, j) => (
            <div
            key={j}
            className="box"
            style={{ "--scale": 4 - i + 6 - j }} 
            ></div>
        ))}
        </div>
    ))}
    </div>
  );
};

export default CubeWave;