import React, { useEffect } from 'react';
import {modes} from '../config/modes';
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


    useEffect(() => {/*
        modes.forEach(mode => {
            if (mode.key === 'd') {
                setMode(mode);
            }
        });  */
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
                            <Popup
                                trigger={
                        <Button active={m.key===mode?.key} icon key={index} className="mode" onClick={() => setMode(m)} >
                                <Icon name={m.iconname} />
                        </Button>
                                }
                                content={m.name +' ('+m.key+')'}
                                position='bottom left'
                            />
                    ))
                }
                </Button.Group>
            </div>
        </div>
        )

};

export default Modes;