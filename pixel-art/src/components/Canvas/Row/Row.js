import React from "react";
import "./row.scss";
import Pixel from "./Pixel/Pixel";
import { useEffect } from "react";

export default function Row({ width, selectedColor,showGrid,updatePattern, importedPattern }) {

  let pixels = [];

  useEffect(() => {
    console.log("Row",selectedColor)
  },[selectedColor])

  for (let i = 0; i < width; i++) {
    pixels.push(<Pixel updatePattern={updatePattern} key={i} selectedColor={selectedColor} importedColorIndex={importedPattern?.[i]}/>);
  }

  return <div className={`row${showGrid ? " grid" : ""}`}>{pixels}</div>;
}
