import React, { useEffect } from 'react';
import Cursor from './Cursor';
import Console from './Console';
import Drawing from './Drawing';
import Drawn from './Drawn';
import { shapes } from '../config/shapes';


function coversSquare(drawing, posX, posY) {
    return ( drawing.originLeft*16<=posX &&
        drawing.originTop*16<=posY  &&
        drawing.destinationLeft*16>=posX &&
        drawing.destinationTop*16 >=posY);
}
const getShapeBySaveKey = (saveKey)=>{
    for (const shapeSet of shapes) {
        for (const s of shapeSet) {
            if (s.saveKey===saveKey)
                return s;
        }
    }
    return null;
}

const Grid = (props) => {
    const gridOffsetX = 230;
    const gridOffsetY = 50;
    const gridOnClass = "lines-on";
    const getCodeDrawings = (code) => {
        const drawings = [];
        if (code === null) return;
        code.split('&').forEach((codedDrawing, index) => {
            const dArray = codedDrawing.split('|');
            if (dArray.length===6) {
                const d = {
                    shape: getShapeBySaveKey(dArray[0]) , //key
                    color: dArray[1],
                    startLeft: dArray[2].split(',')[0],
                    startTop:  dArray[2].split(',')[1],
                    originLeft:  dArray[3].split(',')[0],
                    originTop:  dArray[3].split(',')[1],
                    destinationLeft:  dArray[4].split(',')[0],
                    destinationTop:  dArray[4].split(',')[1],
                    sort: index,
                };
                drawings.push(d);
            }
        });
        return drawings;
    }; 
    const [gridClass, setGridClass] = React.useState(gridOnClass);
    const [consoleOn, setConsoleOn] = React.useState(false);
    const [MousePosition, setMousePosition] = React.useState({
        left: 0,
        top: 0
    });
    const [drawn, setDrawn] = React.useState(getCodeDrawings(props.code));
    const [selecting, setSelecting] = React.useState({
        selecting: false,
        startLeft: 0,
        startTop: 0,
        endLeft: 0,
        endTop: 0,
    });
    const [drawing, setDrawing] = React.useState({
        drawing: false,
        startLeft: 0,
        startTop: 0,
        originLeft: 0,
        originTop: 0,
        destinationLeft: 0,
        destinationTop: 0,
    });

    const [selectionLength, setSelectionLength] = React.useState(0);
    

    //broadcastCode
    useEffect(() => {
        let code = "";
        drawn.forEach(d => {
            code = code  
                + d.shape.saveKey + "|" 
                + d.color + "|" + 
                + d.startLeft + "," + d.startTop + "|" + 
                + d.originLeft + "," + d.originTop + "|" + 
                + d.destinationLeft + "," + d.destinationTop + "|" + 
                "&"; 
        });
        props.broadcastCode(code);      
    }, [props.broadcastCode, drawn]);

    //recieveCode
    useEffect(() => {
        setDrawn(getCodeDrawings(props.code));
    }, [props.code, setDrawn]);
    
    //broadcastSelection
    useEffect(() => {
        props.broadcastSelection(selectionLength);      

    }, [props.broadcastSelection, selectionLength]);
    
    useEffect(() => {
        const drawings = [...drawn];
        drawings.filter((d)=>d.selected).forEach(d => {
            d.color = props.color;
        });
        setDrawn(drawings);
    }, [props.color]);

    useEffect(() => {
        //unselect all  
        const selected = drawn.filter((d)=>d.selected);
        if (selected.length && ((selected.length>1 && props.mode?.name==='select') || props.mode?.name==='draw')){
            const drawings = [...drawn];
            drawings.forEach(d => {
                d.selected = false;
            });
            setSelectionLength(0);
            setDrawn(drawings);
        }          

    }, [props.mode]);

    useEffect(() => {
        if ((props.action?.name==='moveup')) {
            const drawings = [...drawn];               
            const selected = drawings.filter((d)=>d.selected);
            if (selected.length > 0) {
                selected.forEach(d => {
                    d.startTop--;
                    d.originTop--;
                    d.destinationTop--;
                });
                setDrawn(drawings);
            }   
        }  
        if ((props.action?.name==='movedown')) {
            const drawings = [...drawn];               
            const selected = drawings.filter((d)=>d.selected);
            if (selected.length > 0) {
                selected.forEach(d => {
                    d.startTop++;
                    d.originTop++;
                    d.destinationTop++;
                });
                setDrawn(drawings);
            }   
        }  
        if ((props.action?.name==='moveleft')) {
            const drawings = [...drawn];               
            const selected = drawings.filter((d)=>d.selected);
            if (selected.length > 0) {
                selected.forEach(d => {
                    d.startLeft--;
                    d.originLeft--;
                    d.destinationLeft--;
                });
                setDrawn(drawings);
            }   
        }  
        if ((props.action?.name==='moveright')) {
            const drawings = [...drawn];               
            const selected = drawings.filter((d)=>d.selected);
            if (selected.length > 0) {
                selected.forEach(d => {
                    d.startLeft++;
                    d.originLeft++;
                    d.destinationLeft++;
                });
                setDrawn(drawings);
            }   
        }  
        if ((props.action?.name==='delete')) {
            //delete selected
            const notSelected = drawn.filter((d)=>!d.selected);
            setSelectionLength(0);
            setDrawn(notSelected);        
        }  
        if ((props.action?.name==='group')) {
            //TODO: group selected
            const notSelected = drawn.filter((d)=>!d.selected);
            const selected = drawn.filter((d)=>d.selected);
            //setDrawn(selectedDeleted);        
        }     
        if ((props.action?.name==='up')) {
            //move selection up
            const notSelected = drawn.filter((d)=>!d.selected);
            const selected = drawn.filter((d)=>d.selected);
            if (selected.length===1) {
                const selection = selected[0];
                const drawings = [...drawn];               
                drawings.forEach((d, index) => {
                    if (d.sort === selection.sort){
                        if (drawings[index+1]!==undefined) {
                            const newSort = drawings[index+1].sort;
                            drawings[index+1].sort--;
                            drawings[index].sort = newSort;
                        }
                    }
                });
                drawings.sort((a,b)=>a.sort-b.sort);
                drawings.forEach((d, index) => {
                    d.sort = index;
                });                    
                setDrawn(drawings);
            }
        }
        if ((props.action?.name==='down')) {
            //move selection up
            const notSelected = drawn.filter((d)=>!d.selected);
            const selected = drawn.filter((d)=>d.selected);
            if (selected.length===1) {
                const selection = selected[0];
                const drawings = [...drawn];               
                drawings.forEach((d, index) => {
                    if (d.sort === selection.sort){
                        if (drawings[index-1]!==undefined) {
                            const newSort = drawings[index-1].sort;
                            drawings[index-1].sort++;
                            drawings[index].sort = newSort;
                        }
                    }
                });
                drawings.sort((a,b)=>a.sort-b.sort);
                drawings.forEach((d, index) => {
                    d.sort = index;
                });                    
                setDrawn(drawings);
            }
        }
        if ((props.action?.name==='linestoggle')) {
            if (gridClass===gridOnClass)
                setGridClass("");
            else
                setGridClass(gridOnClass);
        }  
        if ((props.action?.name==='console')) {
            setConsoleOn(!consoleOn);
        }  
    }, [props.action]);

    function handleMouseMove(event) { 
        const posX = event.pageX - gridOffsetX;
        const posY = event.pageY - gridOffsetY;

        setMousePosition({left: posX, top: posY}); 

        if (selecting.selecting && 
            (selecting.endLeft !== Math.round(posX/16) ||
             selecting.endTop !== Math.round(posY/16) )) {
            let transformLeft = Math.round(posX/16) - selecting.startLeft;
            let transformTop = Math.round(posY/16) - selecting.startTop;
            if (transformLeft !== 0 || transformTop !== 0) {           
                const drawings = [...drawn];
                const selected = drawings.filter((d)=>d.selected);
                for (const d of selected) {
                    d.startLeft = d.startLeft + transformLeft;
                    d.originLeft = d.originLeft + transformLeft;
                    d.destinationLeft = d.destinationLeft + transformLeft;
                    d.startTop = d.startTop + transformTop;
                    d.originTop = d.originTop + transformTop;
                    d.destinationTop = d.destinationTop + transformTop;
                }
                setDrawn(drawings);
            }
            setSelecting({
                selecting: selecting.selecting,
                selected: selecting.selected,
                startLeft: Math.round(posX/16),
                startTop: Math.round(posY/16),
                endLeft: Math.round(posX/16),
                endTop: Math.round(posY/16),
            });
        }
        if (drawing.drawing) {
            let d ={
                sort:drawn.length,
                drawing: drawing.drawing,
                color: drawing.color,
                shape:drawing.shape,
                startLeft: drawing.startLeft, 
                startTop: drawing.startTop,
                originLeft: drawing.originLeft, 
                originTop: drawing.originTop,
                destinationLeft: Math.round(posX/16),
                destinationTop: Math.round(posY/16),
            };

            if (d.destinationLeft<d.startLeft) {
                if (drawing.shape?.ratio === '1:1') {
                    d.originTop = drawing.startTop - (drawing.destinationLeft-drawing.originLeft);
                }


                d.destinationLeft = drawing.startLeft;
                d.originLeft = Math.round(posX/16);
            } else {
                d.originLeft = drawing.startLeft;
            }

            if (d.destinationTop<d.startTop) {
                if (drawing.shape?.ratio === '1:1') {
                    if (drawing.originLeft < drawing.startLeft){
                        d.originTop = drawing.startTop - (drawing.destinationLeft-drawing.originLeft);
                    } else {
                        d.originTop = drawing.startTop - (drawing.destinationLeft-drawing.startLeft);
                    }

                    d.destinationTop = drawing.startTop;
                    console.log("A");
                } else {
                    d.destinationTop = drawing.startTop;
                    d.originTop = Math.round(posY/16);
                    console.log("B");
                }
            } else {
                if (drawing.shape?.ratio === '1:1') {
                    d.originTop = drawing.startTop;
                    console.log("C");
                    //d.originTop = drawing.startTop - (drawing.destinationLeft-drawing.originLeft);
                } else {
                    d.originTop = drawing.startTop;
                    console.log("D");
                }
            }

            setDrawing(d); 
        }
    }
    function handleMouseClick(event) { 
        const posX = event.pageX - gridOffsetX;
        const posY = event.pageY - gridOffsetY;
        
        if (event.type === "mousedown") {
            if ((props.command?.name==='select') || (props.command?.name==='multiselect')) {
                setSelecting({
                    selecting: true,
                    selected: drawn.filter((d)=>d.selected),
                    startLeft: Math.round(posX/16), 
                    startTop: Math.round(posY/16),
                    endLeft: Math.round(posX/16), 
                    endTop: Math.round(posY/16),
                });
            }
            if ((props.command?.name==='select')) {
                //work out which group or drawing was clicked
                const drawings = [...drawn].sort((a,b)=>b.sort-a.sort);
                let selectedFound = false; 
                drawings.forEach(d => {
                    if (d.selected) {
                        d.selected = false;
                        selectedFound = true;
                    } else {
                        d.selected = (!selectedFound && coversSquare(d, posX, posY));
                    }
                    selectedFound = selectedFound || d.selected;
                });
                setSelectionLength(drawings.filter((d)=>d.selected).length);
                setDrawn(drawings);
            }

            if (props.command?.name==='multiselect') {
                //work out which group or drawing was clicked
                const drawings = [...drawn].sort((a,b)=>b.sort-a.sort);
                drawings.forEach(d => {
                    if (d.selected && (coversSquare(d, posX, posY))) {
                        d.selected = false;
                    } else {
                        d.selected = d.selected || (coversSquare(d, posX, posY));
                    }
                });
                setSelectionLength(drawings.filter((d)=>d.selected).length);
                setDrawn(drawings);
            }
        } else {
            if (selecting.selecting) {

                setSelecting({
                    selecting: false,
                    startLeft: selecting.startLeft, 
                    startTop: selecting.startTop,
                    endLeft: selecting.endLeft,
                    endTop: selecting.endTop,
                });
            }
        }

        if (props.mode?.name === 'draw'){
            if (event.type === "mousedown") {
                if (!drawing.drawing) {
                    setDrawing({
                        sort:drawn.length,
                        drawing: true,
                        color: props.color,
                        shape:props.shape,
                        startLeft: Math.round(posX/16), 
                        startTop: Math.round(posY/16),
                        originLeft: Math.round(posX/16), 
                        originTop: Math.round(posY/16),
                        destinationLeft: Math.round(posX/16), 
                        destinationTop: Math.round(posY/16),
                    }); 
                }
            } else {
                if (drawing.drawing) {

                    setDrawing({
                    sort:drawn.length,
                    drawing: false,
                    color: props.color,
                    shape:drawing.shape,
                    startLeft: drawing.startLeft, 
                    startTop: drawing.startTop,
                    originLeft: drawing.originLeft, 
                    originTop: drawing.originTop,
                    destinationLeft:drawing.destinationLeft, 
                    destinationTop: drawing.destinationLeft,
                }); 
                if (drawing.originLeft!==drawing.destinationLeft &&
                    drawing.originTop!==drawing.destinationTop) {
                        const drawings = drawn;
                        if (drawing.shape.ratio === '1:1') {
                            drawing.destinationTop = drawing.destinationLeft;
                        }
                        drawings.push(drawing)
                        setDrawn(drawings);
                    }
                }
            }
        }
    }

    return (
        <>
        {consoleOn ? 
            <Console 
                drawing={drawing} 
                selecting={selecting} 
                color={props.color} 
                keyPressed={props.keyPressed} 
                drawn={drawn} 
                mode={props.mode} 
                command={props.command} 
                mousePosition={MousePosition} 
            />
        : null}
            <div className={"grid-container "+gridClass} >
                <div className="sub-grid-lines" >
                    <div className="grid-lines" >
                        <div 
                            className="grid" 
                            onMouseMove={(ev)=> handleMouseMove(ev)} 
                            onMouseDown={(ev)=> handleMouseClick(ev)} 
                            onMouseUp={(ev)=> handleMouseClick(ev)}
                        >
                            <Drawn drawn={drawn} />
                            <Drawing drawing={drawing} />
                            <Cursor
                                mode={props.mode}
                                mousePosition={MousePosition} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
        )

};

export default Grid;