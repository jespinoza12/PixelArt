import React, { useState, useRef, useEffect} from "react";
import "../styles/editor.scss";
import { CirclePicker } from "react-color";
import DrawingPanel from "./Canvas/DrawingPanel";
import {colors} from "../Modules/Colors"
import PatternSwitcher from "./Pattern/PatternSwitcher";

export default function Editor() {

  const createArray = (width,height) => {
    let output = []
    for (let r = 0; r < height; r++) {
      output = [...output,[]]
      for (let c = 0; c < width; c++) {
        output[r] = [...output[r],"U"]
      }
    }
    return output
  }

  const [panelWidth, setPanelWidth] = useState(16);
  const [panelHeight, setPanelHeight] = useState(16);
  const [hideOptions, setHideOptions] = useState(false);
  const [hideDrawingPanel, setHideDrawingPanel] = useState(true);
  const [buttonText, setButtonText] = useState("start drawing");
  const [selectedColor, setColor] = useState("#000000");

  const [importedPattern,setImportedPattern] = useState(null)
  const [file,setFile] = useState()
  const [canvas,setCanvas] = useState(importedPattern ? importedPattern : createArray(panelWidth,panelHeight))
  const [pixelData,setPixelData] = useState({pallet: "rainbow",size: {panelWidth,panelHeight},pixels: []})

  const fileInput = useRef();
  const selectFile = () => {
      fileInput.current.click();
  }

  useEffect(() => {
    if (file) {
      let reader = new FileReader();
      reader.readAsText(file);

      //getting the text and sending it to the update method
      reader.onload = function() {
          importPattern(JSON.parse(reader.result))
      };

      //logging the error if there is one
      reader.onerror = function() {
          console.log(reader.error);
      };
    }
  },[file])

  function initializeDrawingPanel() {
    setHideOptions(!hideOptions);
    setHideDrawingPanel(!hideDrawingPanel);
    

    if (buttonText == "startDrawing") {
      setCanvas([[]])
      setButtonText("Reset")
    } else {
      setButtonText("Reset")
      setCanvas(createArray(panelWidth,panelHeight))
    }

    buttonText === "start drawing"
      ? setButtonText("reset")
      : setButtonText("start drawing");
  }

  function changeColor(color) {
    setColor(color.hex);
  }

  const importPattern = (data) => {
    const height = data.size.height
    const width = data.size.width
    setPanelWidth(width)
    setPanelHeight(height)
    let pixels = []
    for (let row = 0; row < data.size.height; row++) {
        pixels = [...pixels,[...data.pixels.substring(width*row,width*row+width)]]
    }
    setImportedPattern(pixels)
    initializeDrawingPanel()
  }

  return (
    <div id="main"><div id="editor">
    <h1>Pixel Editor</h1>
    {hideDrawingPanel && <h2>Enter Panel Dimensions</h2>}
    {hideDrawingPanel && (
      <div id="options">
        <div className="option">
          <input
            type="number"
            className="panelInput"
            defaultValue={panelWidth}
            onChange={(e) => {
              setPanelWidth(e.target.value);
            }}
          />
          <span>Width</span>
        </div>
        <div className="option">
          <input
            type="number"
            className="panelInput"
            defaultValue={panelHeight}
            onChange={(e) => {
              setPanelHeight(e.target.value);
            }}
          />
          <span>Height</span>
        </div>
      </div>
    )}

    <button onClick={initializeDrawingPanel} className="button">
      {buttonText}
    </button>
    
    {!hideOptions && (
      <>
        <input onChange={(evt) => setFile(evt.target.files[0])} accept=".pxl" type="file" style={{ "display": "none" }} ref={fileInput} />
        <button className="button" onClick={selectFile}>Import pattern</button>
      </>
    )}

    {hideOptions && (
      <CirclePicker colors={colors} color={selectedColor} onChangeComplete={changeColor} />
    )}

    {hideOptions && (
        <div>
          <DrawingPanel
          width={panelWidth}
          height={panelHeight}
          selectedColor={selectedColor}
          importedPattern={importedPattern}
          canvas={canvas}
          setCanvas={setCanvas}
          pixelData={pixelData}
        />
        <PatternSwitcher canvas={canvas} setPixelData={setPixelData} width={panelWidth} height={panelHeight} pixelData={pixelData}/>
      </div>
    )}
  </div>
  </div>
  );
}
