import React, { useEffect } from 'react';
import {commands, selectActions,multiSelectActions} from '../config/commandsAndActions';
import { Button, Icon, Label, Segment, Popup } from 'semantic-ui-react'

const SelectActions = (props) => {
    
    const actionClick = ((a) => {
        props.broadcastAction(JSON.parse(JSON.stringify(a)));
    });

    useEffect(() => {   
        for (const actionSet of selectActions) {
            for (const a of actionSet) {
                if (props.keyPressed.key===a.key && 
                    (a.ctrlKey===undefined || 
                     props.keyPressed.ctrlKey === a.ctrlKey) && 
                    (a.shiftKey===undefined || 
                    props.keyPressed.shiftKey === a.shiftKey)) {
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
                            <Popup
                                trigger={
                                <Button 
                                    icon 
                                    disabled={props.selection===0}
                                    key={index} 
                                    className="actionBtn" 
                                    onClick={() => actionClick(a)} >
                                    <Icon name={a.iconname} className="action " />
                                </Button>
                                }
                                content={a.name +' ('+a.key+')'}
                                position='bottom left'
                            />
                        ))}
                    </div>
                ))
            }  
            <div class="ui divider"></div>         
            {multiSelectActions
                .map((actionSet, index) => (
                    <div>
                    {actionSet
                        .map((a, index) => (
                            <Popup
                                trigger={
                            <Button 
                                icon 
                                disabled={props.selection<=1}
                                key={index} 
                                className="actionBtn" 
                                onClick={() => actionClick(a)} >
                                <Icon name={a.iconname} className="action " />
                            </Button>
                                }
                                content={a.name +' ('+a.key+')'}
                                position='bottom left'
                            />
                        ))}
                    </div>
                ))
            }
            </div>
        </div>
    )

};

export default SelectActions;