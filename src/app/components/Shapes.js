import React, { useEffect } from 'react';
import {shapes} from '../config/shapes';
import { Button, Icon, Popup } from 'semantic-ui-react'

const getActiveShape = ()=>{
    for (const shapeSet of shapes) {
        for (const s of shapeSet) {
            if (s.active)
                return s;
        }
    }
    return shapes[0][0];
}

const Shapes = (props) => {
    
    const [shape, setShape] = React.useState(getActiveShape())
    
    useEffect(() => {
        props.broadcastShape(shape);
        props.broadcastCommand({"name":"draw"});
    }, [props.broadcastShape, props.broadcastCommand, shape]);
    
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

    const activeShape = (newshape)=>{
        for (const shapeSet of shapes) {
            for (const s of shapeSet) {
                s.active = s.name===newshape.name;    
            }
        }
        setShape(newshape);
    }

    return (
        <div className="modescontainer" >
        
            <div class="ui divider"></div>
            {shapes
                .map((shapeSet, index) => (
                <div >
                {    shapeSet.map((s, index) => (
                        <Button active={s.name===shape?.name} icon key={index} className="shapeBtn" onClick={() => activeShape(s)} >
                            <div className="shape " style={styleInjector(s.style[0])} />
                        </Button>
                    ))}
            </div>
                ))
            }
        </div>
    )

};

export default Shapes;