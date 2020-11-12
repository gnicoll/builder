import React, { useEffect } from 'react';
import Cursor from './Cursor';
import Console from './Console';

const Drawn = (props) => {
    const styles = {};
    const drawings = [...props.drawn].sort((a,b)=>a.sort-b.sort);
    return (
        <>
        {drawings
            .map((drawing, index) => (
                <Drawing key={index} drawing={drawing} color={'red'} drawn={'true'} />
            ))
        }
        </>
        )

};


const Drawing = ({drawing, drawn}) => {
    
    if (!(drawing.drawing || drawn)) return null;
    

    const styleInjector = (drawing, style)=>{
        let height = (drawing.destinationTop-drawing.originTop);
        if (drawing.shape.ratio === '1:1') {
            height =  (drawing.destinationLeft-drawing.originLeft);            
        }
        const width = (drawing.destinationLeft-drawing.originLeft);

        let copiedStyle = JSON.parse(JSON.stringify(style));
        for (const key of Object.keys(copiedStyle)) {
            copiedStyle[key]= copiedStyle[key].replace("{color}",drawing.color);
            copiedStyle[key]= copiedStyle[key].replace("{width}",width+'em');
            copiedStyle[key]= copiedStyle[key].replace("{width/2}",(width/2)+'em');
            copiedStyle[key]= copiedStyle[key].replace("{height}", height+'em');
            copiedStyle[key]= copiedStyle[key].replace("{height/2}", (height/2)+'em');
        }
        return copiedStyle;
    }

    let styleIndex = 0;
    if (drawing.shape.style.length>1) {
        if (drawing.startTop===drawing.originTop) {
            if (drawing.startLeft===drawing.originLeft) {
                styleIndex = 0; //00
            }
            else {
                styleIndex = 1; //01
            }
        }
        else {
            if (drawing.startLeft===drawing.originLeft) {
                styleIndex = 2; //10
            }
            else {
                styleIndex = 3; //11
            }
        }
    }

    const styles = styleInjector(drawing, drawing.shape.style[styleIndex]);
    const placementStyles = {};
    placementStyles.transform = `translate(${drawing.originLeft}em, ${drawing.originTop}em)`;
    placementStyles.width = (drawing.destinationLeft-drawing.originLeft)+'em';
    if (drawing.shape.ratio === '1:1') {
        placementStyles.height = placementStyles.width;            
    } else {
        placementStyles.height = (drawing.destinationTop-drawing.originTop)+'em';
    }
    
    return (
        <div className={"drawing-container "+(drawing.selected?"selected":"")} style={placementStyles} >
            <div className={"drawing shape "+(drawing.selected?"selected":"")} style={styles} >
            </div>
        </div>
        )

};


function coversSquare(drawing, posX, posY) {
    return ( drawing.originLeft*16<=posX &&
        drawing.originTop*16<=posY  &&
        drawing.destinationLeft*16>=posX &&
        drawing.destinationTop*16 >=posY);
}

const Grid = (props) => {
    const gridOffsetX = 230;
    const gridOffsetY = 50;
    const gridOnClass = "lines-on";
    const [gridClass, setGridClass] = React.useState(gridOnClass);
    const [consoleOn, setConsoleOn] = React.useState(false);
    const [MousePosition, setMousePosition] = React.useState({
        left: 0,
        top: 0
    });
    const [drawn, setDrawn] = React.useState([]);
    const [drawing, setDrawing] = React.useState({
        drawing: false,
        startLeft: 0,
        startTop: 0,
        originLeft: 0,
        originTop: 0,
        destinationLeft: 0,
        destinationTop: 0,
    });

    const [selection, setSelection] = React.useState(null);
    //broadcastSelection
    useEffect(() => {
        props.broadcastSelection(selection);      

    }, [props.broadcastSelection, selection]);
    

    useEffect(() => {
        //unselect all  
        const selected = drawn.filter((d)=>d.selected);
        if (selected.length && ((selected.length>1 && props.mode?.name==='select') || props.mode?.name==='draw')){
            const drawings = [...drawn];
            drawings.forEach(d => {
                d.selected = false;
            });
            setSelection(null);
            setDrawn(drawings);
        }          

    }, [props.mode]);

    useEffect(() => {
        if ((props.action?.name==='delete')) {
            //delete selected
            const notSelected = drawn.filter((d)=>!d.selected);
            setSelection(null);
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
                drawings.reverse();
                drawings[selection.sort+1].sort--;
                selection.sort++
                drawings.sort((a,b)=>b.sort-a.sort);
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
                drawings.reverse();
                drawings[selection.sort-1].sort++;
                selection.sort--
                drawings.sort((a,b)=>b.sort-a.sort);
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
    function handleMouseClick(event) { 
        const posX = event.pageX - gridOffsetX;
        const posY = event.pageY - gridOffsetY;
        
        if (event.type === "mousedown") {
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
                setSelection(drawings.filter((d)=>d.selected).length);
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
                setSelection(drawings.filter((d)=>d.selected).length);
                setDrawn(drawings);
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