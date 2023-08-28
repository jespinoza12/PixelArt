import React from 'react'
import "./Switcher.css"
import Pattern from './Pattern'
import { useState, useEffect } from 'react'
import {getC2CPattern,getScPattern} from "../../Modules/PatternMaker"
import {colors,colorNames} from "../../Modules/Colors"

function PatternSwitcher({canvas,setPixelData,width,height,pixelData}) {

    const [patternType,setPatternType] = useState("c2c")

    useEffect(() => {
        if (canvas[0]?.length)
            createPattern(patternType)
    },[canvas,patternType])

    const getPixelString = () => {
        let output = ""
        for (let r = 0; r < canvas.length; r++) {
            output += canvas[r].join("")
        }
        return output
    }

    const createPattern = (type) => {
    setPixelData({...pixelData,pixels:getPixelString()})
    let pattern = []
    if (type == "c2c")
        pattern = getC2CPattern(canvas,width,height)
    else
        pattern = getScPattern(canvas,type)
    for (let i = 0; i < colors.length; i++) {
        pattern = pattern.map((line) => {
        return line.replaceAll(`{${i.toString(colors.length).toUpperCase()}}`,`{${colorNames[i]}}`).replace(",  "," ")
        })
    }
    setPattern(pattern)
    }

    

    const getPatternURL = () => {
        const blob = new Blob([`${pattern.length} Rows\n`,...pattern])
        return URL.createObjectURL(blob)
    }
    const [pattern,setPattern] = useState([])


    return (
        <div className='pattern-holder'>
            <ul id="pattern-nav">
                <li><button className='switch-nav-btn' onClick={() => setPatternType("c2c")}>c2c</button></li>
                <li><button className='switch-nav-btn' onClick={() => setPatternType(2)}>Single crochet ↑</button></li>
                <li><button className='switch-nav-btn' onClick={() => setPatternType(0)}>Single crochet ↓</button></li>
                <li><button className='switch-nav-btn' onClick={() => setPatternType(1)}>Single crochet →</button></li>
                <li><button className='switch-nav-btn' onClick={() => setPatternType(3)}>Single crochet ←</button></li>
            </ul>
            {pattern ? <Pattern pattern={pattern} /> : <></>}
            <a className="button inline-block" target="blank" download={`test.txt`} href={getPatternURL()}>Export Pattern</a>
        </div>
    )
}

export default PatternSwitcher