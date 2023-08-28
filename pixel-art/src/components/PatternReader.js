import React, { useState } from 'react'
import Pattern from './Pattern';

function PatternReader() {

    const [pattern,setPattern] = useState([])

    const handleFile = file => {
        let reader = new FileReader();
        reader.readAsText(file);

        //getting the text and sending it to the update method
        reader.onload = function() {
            let patternText = reader.result;
            patternText = patternText.replace("\r","").replace("{","").replace("}","")
            setPattern(reader.result.replace("\r","").replace("{","").replace("}","").split("\n"))
        };

        //logging the error if there is one
        reader.onerror = function() {
            console.log(reader.error);
        };
    }
    return (
        <div className='container'>
            <input type="file" id="docpicker" accept=".txt" onChange={(evt) => handleFile(evt.target.files[0])} />
            <div className='pattern-holder'>
                <ol className='pattern'>
                    {pattern.map(line => {
                        if (line?.length)
                            return <li>{line}</li>
                    })}
                </ol>
            </div>
        </div>
    )
}

export default PatternReader