import React, { useEffect } from 'react';
import {commands, actions} from '../config/commandsAndActions';
import { Button, Icon, Popup } from 'semantic-ui-react'

const Actions = (props) => {
    
    const actionClick = ((a) => {
        props.broadcastAction(JSON.parse(JSON.stringify(a)));
    });

    useEffect(() => {   
        for (const actionSet of actions) {
            for (const a of actionSet) {
                if (props.keyPressed.key===a.key && 
                    (a.ctrlKey===undefined || 
                     props.keyPressed.ctrlKey === a.ctrlKey)) {
                    actionClick(a);
                }    
            }
        }
    }, [props.keyPressed]);

    return (
        <div className="modescontainer" >
            <div >   
            {props.selection}                 
            <div className="ui divider"></div>

            {actions
                .map((actionSet, index) => (
                    <div>
                    {actionSet
                        .map((a, index) => (
                            <Button 
                                icon 
                                key={index} 
                                className="actionBtn" 
                                onClick={() => actionClick(a)} >
                                <Icon name={a.iconname} className="action " />
                            </Button>
                        ))}
                    </div>

                ))
            }
            </div>
        </div>
    )

};

export default Actions;