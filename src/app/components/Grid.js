import React, { useEffect } from 'react';
import Cursor from './Cursor';
import Console from './Console';
import Drawing from './Drawing';
import Drawn from './Drawn';
import nameColor from '../utils/ColorNamer';
import { shapes } from '../config/shapes';
import Coder from '../utils/DrawnStringCoder';


function coversSquare(drawing, posX, posY, gridPixelBase) {
    return ( drawing.originLeft*gridPixelBase<=posX &&
        drawing.originTop*gridPixelBase<=posY  &&
        drawing.destinationLeft*gridPixelBase>=posX &&
        drawing.destinationTop*gridPixelBase >=posY);
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
    const gridPixelBase = props.gridPixelBase;
    const gridOffsetX = 230;
    const gridOffsetY = 50;
    const gridOnClass = "lines-on";
    const [usedColors, setUsedColors] = React.useState([]);
    const getCodeDrawings = (code) => {
        return Coder.Decode(code);
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
    const [selection, setSelection] = React.useState([]);
    const [moveVector, setMoveVector] = React.useState({});
    
    const sendCodeOfDrawings = (drawings, colors) => {
        props.broadcastCode(Coder.Encode(drawings, colors));      
    };
    
    useEffect(() => {
        props.broadcastUsedColors(usedColors);      
    }, [props.broadcastUsedColors, usedColors]);
    


    useEffect(() => {
        const colors = [];
        const colorsOnly = [];
        drawn.forEach(d => {
            if (d.color !== undefined && colorsOnly.indexOf(d.color)<0){
                colors.push({
                    color: d.color,
                    name: nameColor(d.color)
                });
                colorsOnly.push(d.color);
            }
            else if (d.drawings !== undefined) {
                d.drawings.forEach(gd => {
                    if (gd.color !== undefined && colorsOnly.indexOf(gd.color)<0) {
                        colors.push({
                            color: gd.color,
                            name: nameColor(gd.color)
                        });
                        colorsOnly.push(gd.color);
                    }
                });
            }
        });
        setUsedColors(colors);  
        sendCodeOfDrawings(drawn, colorsOnly);
        props.broadcastDrawn(drawn); 
    }, [setUsedColors, props.broadcastDrawn, drawn]);
    
    //broadcastSelectionLength
    useEffect(() => {
        props.broadcastSelectionLength(selectionLength);      
    }, [props.broadcastSelectionLength, selectionLength]);
    
    useEffect(() => {
        props.broadcastSelection(selection);      
    }, [props.broadcastSelection, selection]);

    useEffect(() => {
        //recolor selected when color changes
        const recolorDrawing = (d, color) => {
            if (d.color !== undefined)
                d.color = color;
            //turn on below to include recoloring groups (not natural behaviour)
            /*else if (d.drawings !== undefined){
                d.drawings.forEach(gd => {
                    recolorDrawing(gd, color);
                });
            }*/
        };
        const drawings = [...drawn];
        drawings.filter((d)=>d.selected).forEach(d => {
            recolorDrawing(d, props.color);
        });
        setDrawn(drawings);
    }, [props.color]);

    useEffect(() => {
        //unselect all  
        const selected = drawn.filter((d)=>d.selected);
        if (selected.length && ((selected.length>1 && props.mode?.name==='select') || props.mode?.name==='draw')){
            const drawings = drawn;
            drawings.forEach(d => {
                d.selected = false;
            });
            setSelectionLength(0);
            setSelection([]);
            
            //setDrawn(drawings);
        }          
    }, [props.mode]);

    useEffect(() => {
        if ((props.action?.name==='duplicate')) {
            const drawings = [...drawn];               
            const selected = drawings.filter((d)=>d.selected);
            if (selected.length > 0) {
                for (const index in selected) {
                    const d = selected[index];
                    const newDrawing = JSON.parse(JSON.stringify(d));
                    newDrawing.startLeft++;
                    newDrawing.originLeft++;
                    newDrawing.destinationLeft++;
                    newDrawing.startTop--;
                    newDrawing.originTop--;
                    newDrawing.destinationTop--;
                    newDrawing.selected=true;
                    drawings.splice(drawings.indexOf(d)+1, 0, newDrawing); 
                    d.selected=false;
                }
                drawings.forEach((d, index) => {
                    d.sort = index;
                }); 
                setDrawn(drawings);
            }   
        }  
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
        if ((props.action?.name==='clearall')) {
            setDrawn([]);  
        }   
        if ((props.action?.name==='delete')) {
            //delete selected
            const notSelected = drawn.filter((d)=>!d.selected);
            setSelectionLength(0);
            setSelection([]);
            setDrawn(notSelected);  
        }  
        if ((props.action?.name==='group')) {
            //TODO: group selected
            const notSelected = drawn.filter((d)=>!d.selected);
            const selected = drawn.filter((d)=>d.selected);
            //group each selected, 
            let groupOriginTop = 0;
            let groupOriginLeft = 0;
            let groupDestinationTop = 0;
            let groupDestinationLeft = 0;
            let groupSort = drawn.length;
            for (const d of selected) {
                //find lowest top and left and sort values
                if (d.originLeft<groupOriginLeft || groupOriginLeft === 0){
                    groupOriginLeft = d.originLeft;
                }
                if (d.originTop<groupOriginTop || groupOriginTop === 0){
                    groupOriginTop = d.originTop;
                }
                if (d.destinationLeft>groupDestinationLeft || groupDestinationLeft === 0){
                    groupDestinationLeft = d.destinationLeft;
                }
                if (d.destinationTop>groupDestinationTop || groupDestinationTop === 0){
                    groupDestinationTop = d.destinationTop;
                }
                if (d.sort>groupSort){
                    groupSort = d.sort;
                }

            }
            for (const index in selected) {
                const d = selected[index];
                d.originLeft = d.originLeft - groupOriginLeft;
                d.originTop = d.originTop - groupOriginTop;
                d.destinationLeft = d.destinationLeft - groupOriginLeft;
                d.destinationTop = d.destinationTop - groupOriginTop;
                d.startLeft = d.startLeft - groupOriginLeft;
                d.startTop = d.startTop - groupOriginTop;
                d.sort = index;
                d.selected = false;
            }
            const group = {
                originLeft: groupOriginLeft,
                originTop: groupOriginTop,
                destinationLeft: groupDestinationLeft,
                destinationTop: groupDestinationTop,
                drawings: selected,
                selected: true,
                sort: groupSort,
            };
            
            const drawings = notSelected;
            drawings.push(group);
            drawings.sort((a,b)=>a.sort-b.sort);
            drawings.forEach((d, index) => {
                d.sort = index;
            });     
            //insert group into notSelected set this as drawn
            setDrawn(drawings);        
        }     
        if ((props.action?.name==='up')) {
            //move selection up
            const notSelected = drawn.filter((d)=>!d.selected);
            const selected = drawn.filter((d)=>d.selected);
            if (selected.length===1) {
                const s = selected[0];
                const drawings = [...drawn];               
                drawings.forEach((d, index) => {
                    if (d.sort === s.sort){
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
        if ((props.action?.name==='top')) {
            //move selection up
            const notSelected = drawn.filter((d)=>!d.selected);
            const selected = drawn.filter((d)=>d.selected);
            if (selected.length===1) {
                const s = selected[0];
                const drawings = notSelected.concat(selected);               
                drawings.forEach((d, index) => {
                    d.sort = index;
                });                    
                setDrawn(drawings);
            }
        }
        if ((props.action?.name==='bottom')) {
            //move selection up
            const notSelected = drawn.filter((d)=>!d.selected);
            const selected = drawn.filter((d)=>d.selected);
            if (selected.length===1) {
                const s = selected[0];
                const drawings = selected.concat(notSelected);               
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
                const s = selected[0];
                const drawings = [...drawn];               
                drawings.forEach((d, index) => {
                    if (d.sort === s.sort){
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
            (selecting.endLeft !== Math.round(posX/gridPixelBase) ||
             selecting.endTop !== Math.round(posY/gridPixelBase) )) {
            let transformLeft = Math.round(posX/gridPixelBase) - selecting.startLeft;
            let transformTop = Math.round(posY/gridPixelBase) - selecting.startTop;
            setMoveVector({
                transformTop:transformTop,
                transformLeft:transformLeft,
            });
            if (transformLeft !== 0 || transformTop !== 0) {           
                const drawings = drawn;
                const selected = drawings.filter((d)=>d.selected);
                for (const d of selected) {
                    d.startLeft = d.startLeft + transformLeft;
                    d.originLeft = d.originLeft + transformLeft;
                    d.destinationLeft = d.destinationLeft + transformLeft;
                    d.startTop = d.startTop + transformTop;
                    d.originTop = d.originTop + transformTop;
                    d.destinationTop = d.destinationTop + transformTop;
                }
                //setDrawn(drawings);
            }
            setSelecting({
                selecting: selecting.selecting,
                selected: selecting.selected,
                startLeft: Math.round(posX/gridPixelBase),
                startTop: Math.round(posY/gridPixelBase),
                endLeft: Math.round(posX/gridPixelBase),
                endTop: Math.round(posY/gridPixelBase),
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
                destinationLeft: Math.round(posX/gridPixelBase),
                destinationTop: Math.round(posY/gridPixelBase),
            };

            if (d.destinationLeft<d.startLeft) {
                if (drawing.shape?.ratio === '1:1') {
                    d.originTop = drawing.startTop - (drawing.destinationLeft-drawing.originLeft);
                }


                d.destinationLeft = drawing.startLeft;
                d.originLeft = Math.round(posX/gridPixelBase);
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
                } else {
                    d.destinationTop = drawing.startTop;
                    d.originTop = Math.round(posY/gridPixelBase);
                }
            } else {
                if (drawing.shape?.ratio === '1:1') {
                    d.originTop = drawing.startTop;
                } else {
                    d.originTop = drawing.startTop;
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
                    startLeft: Math.round(posX/gridPixelBase), 
                    startTop: Math.round(posY/gridPixelBase),
                    endLeft: Math.round(posX/gridPixelBase), 
                    endTop: Math.round(posY/gridPixelBase),
                });
            }
            if ((props.command?.name==='select')) {
                //work out which group or drawing was clicked
                //drawn is referenced (not duplicated here)
                let selectedFound = false; 
                for (let index = drawn.length-1; index >= 0 ; index--) {
                    const d = drawn[index];
                 
                    if (d.selected) {
                        d.selected = false;
                        //selectedFound = true;
                    } 
                    d.selected = (!selectedFound && coversSquare(d, posX, posY, gridPixelBase));
                    selectedFound = selectedFound || d.selected;
                }
                setSelectionLength(drawn.filter((d)=>d.selected).length);
                setSelection(drawn.filter((d)=>d.selected));
                //setDrawn(drawings);
            }

            if (props.command?.name==='multiselect') {
                //work out which group or drawing was clicked
                let clickFound = false; 
                for (let index = drawn.length-1; index >= 0 ; index--) {
                    const d = drawn[index];
                    if (d.selected && (coversSquare(d, posX, posY, gridPixelBase))) {
                        d.selected = false;
                    } else {
                        d.selected =  d.selected || (!clickFound && (coversSquare(d, posX, posY, gridPixelBase)));
                    }
                    clickFound = clickFound || (coversSquare(d, posX, posY, gridPixelBase));
                }
                if (!clickFound){
                    drawn.forEach((d)=>d.selected=false);
                }
                setSelectionLength(drawn.filter((d)=>d.selected).length);
                //setDrawn(drawn);
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
                setDrawn([...drawn]);
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
                        startLeft: Math.round(posX/gridPixelBase), 
                        startTop: Math.round(posY/gridPixelBase),
                        originLeft: Math.round(posX/gridPixelBase), 
                        originTop: Math.round(posY/gridPixelBase),
                        destinationLeft: Math.round(posX/gridPixelBase), 
                        destinationTop: Math.round(posY/gridPixelBase),
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
                        const drawings = [...drawn];
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
            <div 
                style={
                    {
                        backgroundColor:props.bgColor,
                        backgroundImage:"url("+props.bgImage+")",
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        height:props.bgSize.height+"em",
                        width:props.bgSize.width+"em",
                    }
                }
                className={"grid-container "+gridClass} >
                <div className="sub-grid-lines" >
                    <div className="grid-lines" >
                        <div
                            className="grid" 
                            onMouseMove={(ev)=> handleMouseMove(ev)} 
                            onMouseDown={(ev)=> handleMouseClick(ev)} 
                            onMouseUp={(ev)=> handleMouseClick(ev)}
                        >
                            <Drawn moveVector={moveVector} selection={selection} drawn={drawn} />
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