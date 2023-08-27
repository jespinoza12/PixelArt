import React, { useState } from "react";
import { colors } from "../../../../Modules/Colors";
import "./pixel.scss";

export default function Pixel({ selectedColor,updatePattern,importedColorIndex, row, col }) {

  const [pixelColor, setPixelColor] = useState(importedColorIndex ? colors[parseInt(importedColorIndex,36)] : "#FFF");

  function applyColor() {
    setPixelColor(selectedColor);
    console.log(selectedColor,colors.indexOf(selectedColor.toUpperCase()).toString(36).toUpperCase())
  }
  return (
    <div
      className="pixel"
      onClick={() => {applyColor();updatePattern(row,col,colors.indexOf(selectedColor.toUpperCase()).toString(36).toUpperCase())}}
      style={{ backgroundColor: pixelColor }}
    ></div>
  );
}
