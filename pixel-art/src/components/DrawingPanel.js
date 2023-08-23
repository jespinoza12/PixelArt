import React, { useEffect, useRef, useState } from "react";
import "../styles/drawingPanel.scss";
import Row from "./Row";
import { exportComponentAsPNG } from "react-component-export-image";
import {getPattern} from "../Modules/PatternMaker"
import {colors,colorNames} from "../Modules/Colors"

export default function DrawingPanel(props) {
  const { width, height, selectedColor, setPattern, importedPattern, pattern } = props;

  const [showGrid,setShowGrid] = useState(false)
  const [pixelData,setPixelData] = useState({pallet: "rainbow",size: {width,height},pixels: []})
  const [rows,setRows] = useState([])
  const panelRef = useRef();

  useEffect(() => {
    let newRows = [];

    for (let i = 0; i < height; i++) {
      newRows.push(<Row updatePattern={updatePattern} showGrid={showGrid} key={i} width={width} selectedColor={selectedColor} importedPattern={importedPattern?.[i]}/>);
    }
    setRows(newRows)
  },[])

  useEffect(() => {
    if (rows.length) {
      updatePattern()
    }
  },[rows])

  const updatePattern = () => {
    createPattern(panelRef)
  }

  const getPatternColors = (ref) => {
    
    let patternColors = [];
    if (!ref?.current) {
      for (let r = 0; r < height; r++) {
        patternColors = [...patternColors,[]]
        for (let c = 0; c < width; c++) {
          patternColors[r] = [...patternColors[r],"U"]
        }
      }
      console.log("No ref",patternColors)
    } else {
      for (let r = 0; r < ref.current.children.length; r++) {
        const row = ref.current.children[r]
        patternColors = [...patternColors,[]]
        for (let c = 0; c < row.children.length; c++) {
          const pixel = row.children[c]
          patternColors[r] = [...patternColors[r],colors.indexOf(rgbToHex(pixel.style["background-color"]).toUpperCase()).toString(colors.length).toUpperCase()]
        }
      }
      console.log("ref",patternColors)
    }
    return patternColors
  }
  
  const createPattern = (ref) => {
    let patternColors = getPatternColors(ref)
    setPixelData({...pixelData,pixels:patternColors.toString().replaceAll(",","")})
    let pattern = getPattern(patternColors,width,height)
    for (let i = 0; i < colors.length; i++) {
      pattern = pattern.map((line) => {
        return line.replaceAll(`${i.toString(colors.length).toUpperCase()},`,`{${colorNames[i]}},`).replace(`${i.toString(colors.length).toUpperCase()} inc`,`{${colorNames[i]}} inc`).replace(`${i.toString(colors.length).toUpperCase()} dec`,`{${colorNames[i]}} dec`).replace(",  "," ")
      })
    }
    setPattern(pattern)
  }
  function componentToHex(c) {
    var hex = parseInt(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  function rgbToHex(color) {
    let firstComma = color.indexOf(",")
    let r = color.substring(4,firstComma)
    const secondComma = color.indexOf(",",firstComma+2)
    let g = color.substring(firstComma+2,secondComma)
    let b = color.substring(secondComma+2,color.indexOf(")"))
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  const getPatternURL = () => {
    const blob = new Blob([`${pattern.length} Rows\n`,...pattern])
    return URL.createObjectURL(blob)
  }

  const getJsonURL = () => {
    const blob = new Blob([JSON.stringify(pixelData,null,"    ")])
    return URL.createObjectURL(blob)
  }

  return (
    <div id="drawingPanel">
      <div id="pixels" ref={panelRef}>
        {rows}
      </div>
      <div className="button-panel">
      <button onClick={() => exportComponentAsPNG(panelRef)} className="button inline-block">
        Export as PNG
      </button>
      <button onClick={() => setShowGrid(!showGrid)} className="button inline-block">
        Show Grid
      </button>
      <a className="button inline-block" target="blank" download={`${crypto.randomUUID()}.pxl`} href={getJsonURL()}>Save</a>
      <a className="button inline-block" target="blank" download={`test.txt`} href={getPatternURL()}>Export Pattern</a>
      </div>
    </div>
  );
}
