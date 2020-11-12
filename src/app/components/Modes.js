import React, { useEffect } from 'react';
import {modes} from '../config';
import { Button, Icon, Popup } from 'semantic-ui-react'

const Modes = (props) => {
    
    const [mode, setMode] = React.useState(modes.filter((m)=>m.active)[0])
    
    useEffect(() => {
        modes.forEach(mode => {
            if (mode.key === props.keyPressed.key) {
                setMode(mode);
            }
        });

    }, [props.keyPressed]);

    useEffect(() => {
        modes.forEach(mode => {
            if (mode.key === 'd') {
                setMode(mode);
            }
        });  
    }, [props.color]);

    useEffect(() => {
        props.broadcastMode(mode)
    }, [props, mode]);
    
    return (
        <div className="modescontainer" >
            <div className="modeslist">
                <Button.Group>
                {modes
                    .map((m, index) => (
                        <Button active={m.key===mode?.key} icon key={index} className="mode" onClick={() => setMode(m)} >
                            <Popup
                                trigger={<Icon name={m.iconname} />}
                                content={m.name +' ('+m.key+')'}
                                position='bottom left'
                            />
                        </Button>
                    ))
                }
                </Button.Group>
            </div>
        </div>
        )

};

export default Modes;