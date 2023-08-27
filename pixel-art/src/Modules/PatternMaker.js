export function getC2CPattern(characters,width,height) {
    width = parseInt(width)
    height = parseInt(height)
    let rows = width+height-1;
    let output = new Array(rows);
    for (let row = 0; row < rows; row++) {
        output[row] = (row+1) + ": ";
        let workingC = 0;
        let workingR = 0;
        if (row % 2 == 0) {
            if (row < width) {
                output[row] += "inc ";
                workingC = row;
                workingR = 0;
            } else {
                output[row] += "dec ";
                workingC = width-1;
                workingR = row-width+1;
            }
            do {
                output[row] += characters[workingR][workingC];
                workingC--;
                workingR++;
            }while (workingC >= 0 && workingR < height);
            if (row < height) {
                output[row] += " inc";
            } else {
                output[row] += " dec";
            }
        } else {
            if (row < height) {
                output[row] += "inc ";
                workingR = row;
                workingC = 0;
            } else {
                output[row] += "dec ";
                workingR = height-1;
                workingC = row-height+1;
            }
            do {
                output[row] += characters[workingR][workingC];
                workingR--;
                workingC++;
            }while (workingR >= 0 && workingC < width);
            if (row < width) {
                output[row] += " inc";
            } else {
                output[row] += " dec";
            }
        }
        let length = output[row].length;
        let beginIndex = output[row].indexOf("c ") +2;
        output[row] = output[row].substring(beginIndex-4, beginIndex) + replaceRepeats(output[row].substring(beginIndex, length-4)) + output[row].substring(length-4);
        output[row] += " (" + (length-4-beginIndex) + ")\n";
    }
    return output;
}

export function getScPattern(canvas,direction) {
    if (direction)
        canvas = rotateMatrix(canvas,direction)
    return formatScPattern(canvas)
}

const rotateMatrix = (arr,amount) => {
    let newArr = arr.map(row => ([...row]))
    for (let i = 0; i < amount; i++) {
        newArr = newArr[0].map((val, index) => newArr.map(row => row[index]).reverse())
    }
    console.log("rotated",newArr)
    return newArr
}

const formatScPattern = (canvas) => {
    let output = [`1: chain ${canvas[0].length+1}`]
    for (let r = 0; r < canvas.length; r++) {
        let rowData;
        if (r % 2 == 0)
            rowData = replaceRepeats(canvas[r].join(""),"stitch","stitches")
        else 
            rowData = replaceRepeats(canvas[r].reverse().join(""),"stitch","stitches")
        let newRow = `${r+1}: ${rowData} ch 1, turn`
        output = [...output,newRow]
    }
    return output;
}

const replaceRepeats = (s,stitchType,stitchTypePlural) => {
    console.log(s)
    if (!stitchType) {
        stitchType = "block"
    }
    if (!stitchTypePlural) {
        stitchTypePlural = "blocks"
    }
    if (s.length == 1) {
        return `1 ${stitchType} of ${s}`;
    }
    let output = "";
    let blocksUsed = 0;
    for (let i = 0; i < s.length-1; i++) {
        let totalCount = 1;
        while (s.charAt(i) ==  s.charAt(i+totalCount)) {
            totalCount++;
            if (i+totalCount == s.length){
                break;
            }
        }
        output += totalCount + ` ${totalCount == 1 ? stitchType : stitchTypePlural} of ` + s.charAt(i) + ", ";
        i+= totalCount-1;
        blocksUsed += totalCount;
    }
    if (blocksUsed < s.length)
        output += `1 ${stitchType} of ${s.charAt(s.length-1)}`;
    console.log(output)
    return output;
}