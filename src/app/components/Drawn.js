import React, { useEffect } from 'react';
import Cursor from './Cursor';
import Console from './Console';
import Drawing from './Drawing';

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

export default Drawn;