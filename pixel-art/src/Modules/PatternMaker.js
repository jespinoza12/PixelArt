export function getPattern(characters,width,height) {
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
            if (workingR == height) {
                output[row] += " dec";
            } else {
                output[row] += " inc";
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
            if (workingC == width) {
                output[row] += " dec";
            } else {
                output[row] += " inc";
            }
        }
        let length = output[row].length;
        let beginIndex = output[row].indexOf("c ") +2;
        output[row] = output[row].substring(beginIndex-4, beginIndex) + replaceRepeats(output[row].substring(beginIndex, length-4)) + output[row].substring(length-4);
        output[row] += " (" + (length-4-beginIndex) + ")\n";
    }
    return output;
}

const replaceRepeats = (s) => {
    if (s.length == 1) {
        return "1 block of " + s;
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
        output += totalCount + ` block${totalCount == 1 ? "" : "s"} of ` + s.charAt(i) + ", ";
        i+= totalCount-1;
        blocksUsed += totalCount;
    }
    if (blocksUsed < s.length)
        output += "1 block of " + s.charAt(s.length-1);
    return output;
}