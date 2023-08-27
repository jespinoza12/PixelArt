import React from "react";
import "./row.scss";
import Pixel from "./Pixel/Pixel";
import { useEffect } from "react";

export default function Row({ row, width, selectedColor,showGrid,updatePattern, importedPattern }) {

  let pixels = [];

  for (let i = 0; i < width; i++) {
    pixels.push(<Pixel row={row} col={i} updatePattern={updatePattern} key={i} selectedColor={selectedColor} importedColorIndex={importedPattern?.[i]}/>);
  }

  return <div className={`row${showGrid ? " grid" : ""}`}>{pixels}</div>;
}
