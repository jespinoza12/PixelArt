import React, { useEffect, useState } from "react";
import { colors } from "../Modules/Colors";
import "../styles/pixel.scss";

export default function Pixel({ selectedColor,updatePattern,importedColorIndex }) {

  const [pixelColor, setPixelColor] = useState(importedColorIndex ? colors[parseInt(importedColorIndex,36)] : "#FFF");

  function applyColor() {
    setPixelColor(selectedColor);
    console.log("pixel",selectedColor)
  }

  useEffect(() => {
    console.log("Pixel",selectedColor)
  },[selectedColor])
  return (
    <div
      className="pixel"
      onClick={() => {applyColor();updatePattern()}}
      style={{ backgroundColor: pixelColor }}
    ></div>
  );
}
