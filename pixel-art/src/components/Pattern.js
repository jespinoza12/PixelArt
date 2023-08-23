import React from 'react'
import {colors,colorNames} from "../Modules/Colors"

function Pattern({pattern}) {

    //for matching the text of the symbol
    const symbolRegex = /\{[a-z]+\}/g
    //for matching the text within the braces for the symbols
    const textRegex = /[a-z]+(?=})/g

    //style={{ backgroundColor: pixelColor }}
    const getColorStyle = (colorName) => {
		const index = colorNames.indexOf(colorName)
        return <p className='inline' style={{ color: colors[index] }}> {colorName} </p>
    }

    return (
        <div className='pattern-holder'>
            <h2>{pattern.length} Rows</h2>
            <ol className='pattern'>{pattern.map(line => {
                //all of the symbol texts in an array (empty if there isn't one)
                const colorWords = line.match(textRegex) || []
                //all of the text not including the symbols
                const patternWords = line.split(symbolRegex) || []
                return <li className='line'>{patternWords.map((segment,segmentIndex) => (
                    <><p className='inline'>{segment}</p>{(colorWords[segmentIndex] != null ? getColorStyle(colorWords[segmentIndex]) : "" )}</>
                ))}</li>
            })}</ol>
        </div>
    )
}

export default Pattern