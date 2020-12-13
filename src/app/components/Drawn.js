import React, { useEffect } from 'react';
import Cursor from './Cursor';
import Console from './Console';
import Drawing from './Drawing';
import GroupDrawing from './GroupDrawing';

const Drawn = React.memo((props) => {
    console.log("Drawn: drawing "+props.drawn.length+" shapes.")
    const styles = {};
    const drawings = [...props.drawn].sort((a,b)=>a.sort-b.sort);
    return (
        <>
        {drawings
            .map((drawing, index) => (
                drawing.drawings !== undefined ? 
                <GroupDrawing key={index} drawing={drawing} />
                :
                <Drawing key={index} drawing={drawing} color={'red'} drawn={'true'} />
            ))
        }
        </>
        )
});

export default Drawn;