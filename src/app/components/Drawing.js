import React, { useEffect } from 'react';

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
    if (drawing.shape.style.length>1 && drawing.styleIndex !== undefined) {
        styleIndex = drawing.styleIndex;
    } else if (drawing.shape.style.length>1) {
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

export default Drawing;