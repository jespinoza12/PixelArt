import React, { useEffect, useState } from "react";
import { colors } from "../Modules/Colors";
import "../styles/pixel.scss";

export default function Pixel(props) {
  const { selectedColor,updatePattern,importedColorIndex } = props;

  const [pixelColor, setPixelColor] = useState(importedColorIndex ? colors[parseInt(importedColorIndex,36)] : "#FFF");
  const [oldColor, setOldColor] = useState(pixelColor);
  const [canChangeColor, setCanChangeColor] = useState(true);

  function applyColor() {
    setPixelColor(selectedColor);
    setCanChangeColor(false);
  }

  function changeColorOnHover() {
    setOldColor(pixelColor);
    setPixelColor(selectedColor);
  }

  function resetColor() {
    if (canChangeColor) {
      setPixelColor(oldColor);
    }

    setCanChangeColor(true);
  }

  return (
    <div
      className="pixel"
      onClick={() => {applyColor();updatePattern()}}
      onMouseEnter={changeColorOnHover}
      onMouseLeave={resetColor}
      style={{ backgroundColor: pixelColor }}
    ></div>
  );
}
