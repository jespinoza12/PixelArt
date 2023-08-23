import React, { useState, useRef, useEffect} from "react";
import "../styles/editor.scss";
import { CirclePicker } from "react-color";
import DrawingPanel from "./Canvas/DrawingPanel";
import {colors} from "../Modules/Colors"
import Pattern from "./Pattern";

export default function Editor() {
  const [panelWidth, setPanelWidth] = useState(16);
  const [panelHeight, setPanelHeight] = useState(16);
  const [hideOptions, setHideOptions] = useState(false);
  const [hideDrawingPanel, setHideDrawingPanel] = useState(true);
  const [buttonText, setButtonText] = useState("start drawing");
  const [selectedColor, setColor] = useState("#000000");

  const [importedPattern,setImportedPattern] = useState(null)
  const [file,setFile] = useState()
  
  const [pattern,setPattern] = useState([])

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
    setPattern([])

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
    <div id="main" className={pattern ? "column-2" : "column-1"}><div id="editor">
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
      <DrawingPanel
        width={panelWidth}
        height={panelHeight}
        selectedColor={selectedColor}
        setPattern={setPattern}
        importedPattern={importedPattern}
        pattern={pattern}
      />
    )}
  </div>
  
  {pattern ? <Pattern pattern={pattern} /> : <></>}
  </div>
  );
}
