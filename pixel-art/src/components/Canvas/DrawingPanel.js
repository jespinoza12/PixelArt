import React, { useEffect, useRef, useState } from "react";
import "./drawingPanel.scss";
import Row from "./Row/Row";
import { exportComponentAsPNG } from "react-component-export-image";
import axios from "axios";

export default function DrawingPanel({ width, height, selectedColor, canvas, setCanvas, pixelData }) {

  const [showGrid,setShowGrid] = useState(false)
  const [rows,setRows] = useState([])

  const panelRef = useRef()

  

  useEffect(() => {
    let newRows = [];

    for (let i = 0; i < height; i++) {
      newRows.push(<Row row={i} updatePattern={updatePattern} showGrid={showGrid} key={i} width={width} selectedColor={selectedColor} importedPattern={canvas[i]}/>);
    }
    setRows(newRows)
  },[selectedColor,canvas])

  const updatePattern = (r,c,index) => {
    let newCanvas = canvas.map(row => row.map(pixel => (pixel)))
    newCanvas[r][c] = index
    setCanvas(newCanvas)
  }

  const SaveCanvas = async () => {
    console.log("save",pixelData)
    const result = await axios.post("http://localhost:6969/c/create",pixelData)
    console.log(result.data)
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
      <button className="button inline-block" onClick={SaveCanvas}>Save</button>
      </div>
    </div>
  );
}
