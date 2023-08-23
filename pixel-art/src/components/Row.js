import React from "react";
import "../styles/row.scss";
import Pixel from "./Pixel";

export default function Row(props) {
  const { width, selectedColor,showGrid,updatePattern, importedPattern } = props;

  let pixels = [];

  for (let i = 0; i < width; i++) {
    pixels.push(<Pixel updatePattern={updatePattern} key={i} selectedColor={selectedColor} importedColorIndex={importedPattern?.[i]}/>);
  }

  return <div className={`row${showGrid ? " grid" : ""}`}>{pixels}</div>;
}
