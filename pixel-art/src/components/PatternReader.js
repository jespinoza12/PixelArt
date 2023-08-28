import React, { useState, useEffect, useCallback, useRef } from 'react'
import "./Reader.scss"

function PatternReader() {

    const [pattern,setPattern] = useState([])
    const [currentLine,setCurrentLine] = useState(0)
    const [currentSection,setCurrentSection] = useState(0)

    const scrollRef = useRef()

    const handleFile = file => {
        let reader = new FileReader();
        reader.readAsText(file);

        //getting the text and sending it to the update method
        reader.onload = function() {
            let patternText = reader.result;
            patternText = patternText.replaceAll("\r","").replaceAll("{","").replaceAll("}","")
            setPattern(patternText.split("\n").slice(1).map(line => (line.split(","))))
        };

        //logging the error if there is one
        reader.onerror = function() {
            console.log(reader.error);
        };
    }

    useEffect(() => {
        if (scrollRef?.current)
            scrollRef.current.scrollIntoView({ behavior: "smooth", block:"center" });
    },[currentLine])

    useEffect(() => {
        setCurrentLine(0)
        setCurrentSection(0)
        console.log(pattern)
    },[pattern])

    const incrementSection = () => {
        if (currentSection == pattern[currentLine].length-1) {
            if (currentLine < pattern.length-2) {
                setCurrentLine(currentLine+1)
                setCurrentSection(0)
            }
        } else {
            setCurrentSection(currentSection+1)
        }
    }

    const decrementSection = () => {
        if (currentSection == 0) {
            if (currentLine > 0) {
                setCurrentLine(currentLine-1)
                setCurrentSection(pattern[currentLine-1].length-1)
            }
        } else {
            setCurrentSection(currentSection-1)
        }
    }

    const incrementLine = () => {
        if (currentLine < pattern.length-2){
            setCurrentLine(currentLine+1)
            setCurrentSection(0)
        }
    }

    const decrementLine = () => {
        if (currentLine > 0){
            setCurrentLine(currentLine-1)
            setCurrentSection(0)
        }
    }

    const handleKeyPress = useCallback((evt) => {
        console.log(evt.key)
        if (evt.key == "ArrowRight") {
            evt.preventDefault()
            if (pattern[currentLine])
                incrementSection()
        } else if (evt.key == "ArrowLeft") {
            evt.preventDefault()
            decrementSection()
        } else if (evt.key == "ArrowDown") {
            evt.preventDefault()
            incrementLine()
        } else if (evt.key == "ArrowUp") {
            evt.preventDefault()
            decrementLine()
        }
    }, [currentLine,currentSection,pattern]);

    useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
        document.removeEventListener('keydown', handleKeyPress);
    };
    }, [handleKeyPress]);

    return (
        <div className='container'>
            <p>Import pattern file</p>
            <input type="file" id="docpicker" accept=".txt" onChange={(evt) => handleFile(evt.target.files[0])} />
            <div className='pattern-holder'>
                <button className='inline pattern-btn' onClick={decrementSection}>Back (Up)</button>
                <button className='inline pattern-btn' onClick={incrementSection}>Next (Down)</button>
                <button className='inline pattern-btn' onClick={decrementLine}>Previous Line (Left)</button>
                <button className='inline pattern-btn' onClick={incrementLine}>Next Line (Right)</button>
                <ol className='pattern'>
                    {pattern.map((line,lineIndex) => {
                        if (line?.[0].length) {
                            return <li key={lineIndex} ref={lineIndex == currentLine ? scrollRef : null} className={lineIndex == currentLine ? "highlighted-line" : ""}>{line.map((section,i) => (
                                lineIndex == currentLine && i == currentSection ? <strong key={i} className='inline'>{section},</strong> : <p key={i} className='inline'>{section},</p>
                            ))}</li>
                        }
                    })}
                </ol>
                <button className='inline pattern-btn' onClick={decrementSection}>Back (Up)</button>
                <button className='inline pattern-btn' onClick={incrementSection}>Next (Down)</button>
                <button className='inline pattern-btn' onClick={decrementLine}>Previous Line (Left)</button>
                <button className='inline pattern-btn' onClick={incrementLine}>Next Line (Right)</button>
            </div>
        </div>
    )
}

export default PatternReader