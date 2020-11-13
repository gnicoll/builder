import React, { useEffect } from 'react';
import {commands, selectActions} from '../config';
import { Button, Icon, Popup } from 'semantic-ui-react'

const SelectActions = (props) => {
    
    const actionClick = ((a) => {
        props.broadcastAction(JSON.parse(JSON.stringify(a)));
    });

    useEffect(() => {   
        for (const actionSet of selectActions) {
            for (const a of actionSet) {
                if (props.keyPressed.key===a.key && 
                    (a.ctrlKey===undefined || 
                     props.keyPressed.ctrlKey === a.ctrlKey)) {
                    actionClick(a);
                }    
            }
        }
    }, [props.keyPressed, ]);

    return (
        <div className="modescontainer" >
            <div >   
            <div class="ui divider"></div>
            {selectActions
                .map((actionSet, index) => (
                    <div>
                    {actionSet
                        .map((a, index) => (
                            <Button 
                                icon 
                                disabled={props.selection===0}
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

export default SelectActions;