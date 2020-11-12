import React, { useEffect } from 'react';
import {shapes, modes} from '../config';
import { Button, Icon, Popup } from 'semantic-ui-react'

const Shapes = (props) => {
    
    const [shape, setShape] = React.useState(shapes.filter((s)=>s.active)[0])
    
    useEffect(() => {
        props.broadcastShape(shape)
    }, [props.broadcastShape, shape]);
    
    const styleInjector = (style)=>{
        let copiedStyle = JSON.parse(JSON.stringify(style));
        for (const key of Object.keys(copiedStyle)) {
            copiedStyle[key]= copiedStyle[key].replace("{color}",props.color);    
            copiedStyle[key]= copiedStyle[key].replace("{width}",'1em');
            copiedStyle[key]= copiedStyle[key].replace("{width/2}",'.5em');
            copiedStyle[key]= copiedStyle[key].replace("{height}", '1em');
            copiedStyle[key]= copiedStyle[key].replace("{height/2}", '.5em');

        }
        return copiedStyle;
    }

    return (
        <div className="modescontainer" >
        
            <div class="ui divider"></div>
            <div >
            {shapes
                .map((s, index) => (
                    <Button active={s.name===shape?.name} icon key={index} className="shapeBtn" onClick={() => setShape(s)} >
                        <div className="shape " style={styleInjector(s.style[0])} />
                    </Button>
                ))
            }</div>
        </div>
    )

};

export default Shapes;