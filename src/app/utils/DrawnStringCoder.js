import { shapes } from '../config/shapes';

const Coder = {
    charSet: [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        '-',
        '_',
    ]
};

const getShapeBySaveKey = (saveKey)=>{
    for (const shapeSet of shapes) {
        for (const s of shapeSet) {
            if (s.saveKey===saveKey)
                return s;
        }
    }
    return null;
}

function IntToString(int){
    if (int.toString().length===2){
        return int.toString();
    }
    if (int.toString().length===1){
        return "0"+int.toString();
    }
}

function decodeDrawing(m,colors){ 
    const base = Coder.charSet.length;
    //if its a group
    if (m.indexOf('$')>-1) {
        let group = null;
        //split it on '$'
        for (const index in m.split('$')) {
            if (m.split('$').hasOwnProperty(index)) {
                const element = m.split('$')[index];
                if (index === "0") {
                    //first is the group 
                    let decodedInt = 0;
                    const encoded = m.substr(1);
                    for (let index = 0; index < [...encoded].length; index++) {
                        decodedInt += Math.pow(base, index)*Coder.charSet.indexOf([...encoded][index]);
                    }
                    group = {
                        originLeft:parseInt(decodedInt.toString().substr(0,2)),
                        originTop:parseInt(decodedInt.toString().substr(2,2)),
                        destinationLeft:parseInt(decodedInt.toString().substr(4,2)),
                        destinationTop:parseInt(decodedInt.toString().substr(6,2)),
                        drawings: []
                    }
                } else {
                    //then recursively call decodeDrawing to get drawings
                    group.drawings.push(decodeDrawing(element, colors));
                }
            }
        }
        return group;
    } else {   
        let decodedInt = 0;
        const encoded = m.substr(2);
        for (let index = 0; index < [...encoded].length; index++) {
            decodedInt += Math.pow(base, index)*Coder.charSet.indexOf([...encoded][index]);
            
        }
        return {
            color: colors[parseInt(decodedInt.toString().substr(0,1))-1],
            shape: getShapeBySaveKey([...m][0]),
            styleIndex: parseInt([...m][1]),
            originLeft: parseInt(decodedInt.toString().substr(1,2)),
            originTop: parseInt(decodedInt.toString().substr(3,2)),
            destinationLeft: parseInt(decodedInt.toString().substr(5,2)),
            destinationTop: parseInt(decodedInt.toString().substr(7,2))
        };
    }
    return null;
}

function codeDrawing(d, colors){
    let m = "";
    if (d.drawings===undefined){
        let styleIndex = d.styleIndex
        if (styleIndex === undefined) {
            if (d.startTop===d.originTop) {
                if (d.startLeft===d.originLeft) {
                    styleIndex = 0; //00
                }
                else {
                    styleIndex = 1; //01
                }
            }
            else {
                if (d.startLeft===d.originLeft) {
                    styleIndex = 2; //10
                }
                else {
                    styleIndex = 3; //11
                }
            }
        }

        const intString =  
            (colors.indexOf(d.color)+1) +
            IntToString(d.originLeft) +
            IntToString(d.originTop) +
            IntToString(d.destinationLeft)+
            IntToString(d.destinationTop);
        
        let n = parseInt(intString);
        m = convertDecimalToBase(n);
        
        m = d.shape.saveKey + styleIndex + m;
    } else {
        const intString =    
        IntToString(d.originLeft) +
        IntToString(d.originTop) +
        IntToString(d.destinationLeft)+
        IntToString(d.destinationTop);
    
        let n = parseInt(intString);
        m = convertDecimalToBase(n)+"$";

        d.drawings.forEach(gd => {
            m += codeDrawing(gd, colors)+"$";
        });
        m = "G" + m.slice(0, -1);
    } 
    return m;
}

function convertDecimalToBase(number){
    let m = "";
    let n = number;
    const base = Coder.charSet.length;
    while (n>0){
        m = m + Coder.charSet[n % base];
        n =  Math.floor(n/base);
    }
    return m;
}


Coder.Decode = (codeStr) => {
    const drawn = [];
    if (codeStr === "" || codeStr === null || codeStr === undefined) return drawn;
    let colorsArray = [];
    //split on '&' 
    const codesArray = codeStr.split('&');
    for (const index in codesArray) {
        if (codesArray.hasOwnProperty(index)) {
            const element = codesArray[index];
            if (index==="0"){
                // first is the colors array
                const codedColors = element.split('+');
                const newColors = [];
                codedColors.forEach(c=>{
                    if (c!=="")
                        newColors.push("rgba("+c+")");
                });
                colorsArray = newColors;
            } else {
                const d = decodeDrawing(element,colorsArray);
                if (d !== null) {
                    drawn.push(d);
                }
            }
        }
    }
    return drawn;
}

Coder.Encode = (drawn) => {
    if (!drawn.length) return "";
    const colors = [];
    drawn.forEach(d => {
        if (d.color !== undefined && colors.indexOf(d.color)<0){
            colors.push(d.color);
        }
        // add support for recursive groups
        else if (d.drawings !== undefined) {
            d.drawings.forEach(gd => {
                if (gd.color !== undefined && colors.indexOf(gd.color)<0) {
                    colors.push(gd.color);
                }
            });
        }
    });

    let code = "";

    colors.forEach(c=>{
        code = code + c.substr(5,c.lastIndexOf(')')-5).replace(/ /g, '') + "+"
    });
    code += "&";
    drawn.forEach(d => {
        code += codeDrawing(d, colors) + "&";
    });
    return code.slice(0, -1);   
}

export default Coder;