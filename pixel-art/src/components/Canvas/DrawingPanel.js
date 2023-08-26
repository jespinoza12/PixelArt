import React, { useEffect, useRef, useState } from "react";
import "./drawingPanel.scss";
import Row from "./Row/Row";
import { exportComponentAsPNG } from "react-component-export-image";
import {getPattern} from "../../Modules/PatternMaker"
import {colors,colorNames} from "../../Modules/Colors"

export default function DrawingPanel({ width, height, selectedColor, setPattern, importedPattern, pattern }) {

  const [showGrid,setShowGrid] = useState(false)
  const [pixelData,setPixelData] = useState({pallet: "rainbow",size: {width,height},pixels: []})
  const [rows,setRows] = useState([])

  const [canvas,setCanvas] = useState(importedPattern || new Array(width).fill(new Array(height).fill("u")))
  const panelRef = useRef()

  useEffect(() => {
    let newRows = [];

    for (let i = 0; i < height; i++) {
      newRows.push(<Row row={i} updatePattern={updatePattern} showGrid={showGrid} key={i} width={width} selectedColor={selectedColor} importedPattern={canvas[i]}/>);
    }
    setRows(newRows)
  },[selectedColor])

  useEffect(() => {
    if (canvas[0]?.length)
      createPattern()
  },[canvas])

  const getPixelString = () => {
    let output = ""
    for (let r = 0; r < canvas.length; r++) {
      output += canvas[r].join("")
    }
    return output
  }

  const createPattern = () => {
    setPixelData({...pixelData,pixels:getPixelString()})
    console.log(canvas)
    let pattern = getPattern(canvas,width,height)
    for (let i = 0; i < colors.length; i++) {
      pattern = pattern.map((line) => {
        return line.replaceAll(`${i.toString(colors.length).toUpperCase()},`,`{${colorNames[i]}},`).replace(`${i.toString(colors.length).toUpperCase()} inc`,`{${colorNames[i]}} inc`).replace(`${i.toString(colors.length).toUpperCase()} dec`,`{${colorNames[i]}} dec`).replace(",  "," ")
      })
    }
    setPattern(pattern)
  }

  const updatePattern = (r,c,index) => {
    if (canvas[0].length)
      setCanvas(canvas.splice(r,1,canvas[r].splice(c,1,index)))
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
