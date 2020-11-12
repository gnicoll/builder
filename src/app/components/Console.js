import React, { useEffect } from 'react';


const Console = (props) => {
    const colorStyle = {color:props.color}

    return (
        <div className="drawing-console">
            <div><strong>{props.mode?.name}</strong></div>
            <div><strong>{props.command?.name}</strong></div>
            <div><strong style={colorStyle}>{props.color}</strong></div>
            <div><strong>shapes</strong></div>
            <div>count : {props.drawn.length}</div>
            <div>selected : {props.drawn.filter((shape)=>shape.selected).length}</div>
            {props.drawn.filter((shape)=>shape.selected).length?
            <>
                <div><strong>selected</strong></div>
                <div>start : {props.drawn.filter((shape)=>shape.selected)[0].startLeft},{props.drawn.filter((shape)=>shape.selected)[0].startTop}</div>
                <div>origin : {props.drawn.filter((shape)=>shape.selected)[0].originLeft},{props.drawn.filter((shape)=>shape.selected)[0].originTop}</div>
                <div>destination : {props.drawn.filter((shape)=>shape.selected)[0].destinationLeft},{props.drawn.filter((shape)=>shape.selected)[0].destinationTop}</div>
            </>
            :null}
            <div><strong>selected</strong></div>
            <div>mouse : {props.mousePosition.left},{props.mousePosition.top}</div>
            <div>mouse : {Math.round(props.mousePosition.left/16)+'em'},{Math.round(props.mousePosition.top/16)+'em'}</div>
            
            
            {props.drawing.drawing?
            <>
                <div><strong>drawing</strong></div>
                <div>start : {props.drawing.startLeft},{props.drawing.startTop}</div>
                <div>origin : {props.drawing.originLeft},{props.drawing.originTop}</div>
                <div>destination : {props.drawing.destinationLeft},{props.drawing.destinationTop}</div>
            </>
            :null}
            {props.keyPressed.key!==undefined?
            <>
            <div>key: <strong>'{props.keyPressed.key}'</strong></div>
            <div>code: <strong>'{props.keyPressed.code}'</strong></div>
            <div>shiftKey: <strong>'{props.keyPressed.shiftKey?'true':'false'}'</strong></div>
            <div>ctrlKey: <strong>'{props.keyPressed.ctrlKey?'true':'false'}'</strong></div>
            </>
            :null}
        </div>
    )
}
export default Console;