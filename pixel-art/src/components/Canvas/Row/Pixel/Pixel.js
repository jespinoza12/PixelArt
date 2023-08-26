import React, { useEffect, useState } from "react";
import { colors } from "../../../../Modules/Colors";
import "./pixel.scss";

export default function Pixel({ selectedColor,updatePattern,importedColorIndex, row, col }) {

  const [pixelColor, setPixelColor] = useState(importedColorIndex ? colors[parseInt(importedColorIndex,36)] : "#FFF");

  function applyColor() {
    setPixelColor(selectedColor);
  }
  return (
    <div
      className="pixel"
      onClick={() => {applyColor();updatePattern(row,col,colors.indexOf(selectedColor).toString(36))}}
      style={{ backgroundColor: pixelColor }}
    ></div>
  );
}
