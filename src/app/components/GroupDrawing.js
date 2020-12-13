import React, { useEffect } from 'react';
import Drawn from './Drawn';

const GroupDrawing = ({drawing}) => {
    
    if (!(drawing.drawings)) return null;
    
    const placementStyles = {};
    placementStyles.transform = `translate(${drawing.originLeft}em, ${drawing.originTop}em)`;
    placementStyles.width = (drawing.destinationLeft-drawing.originLeft)+'em';
    placementStyles.height = (drawing.destinationTop-drawing.originTop)+'em';
        
    return (
        <div className={"drawing-container "+(drawing.selected?"selected":"")} style={placementStyles} >
            <Drawn drawn={drawing.drawings} />
        </div>
        )

};

export default GroupDrawing;