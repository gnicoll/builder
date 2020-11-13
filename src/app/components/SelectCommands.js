import React, { useEffect } from 'react';
import {selectCommands, selectActions} from '../config';
import { Button, Icon, Popup } from 'semantic-ui-react'

const SelectCommands = (props) => {
    
    const [command, setCommand] = React.useState(selectCommands[0][0]);

    const commandClick = ((c) => {
        setCommand(JSON.parse(JSON.stringify(c)));
    });

    useEffect(() => {   
        for (const commandSet of selectCommands) {
            for (const c of commandSet) {
                if (props.keyPressed.key===c.key && 
                    (c.ctrlKey===undefined || 
                    props.keyPressed.ctrlKey === c.ctrlKey)) {
                    commandClick(c);
                }
            }    
        }
    }, [props.keyPressed, setCommand]);

    useEffect(() => {
        props.broadcastCommand(command)
    }, [props.broadcastCommand, command, command.time]);
    
    return (
        <div className="modescontainer" >
            <div >   
            <div class="ui divider"></div>
            {selectCommands
                .map((commandSet, index) => (
                    <div>
                    {commandSet
                        .map((c, index) => (
                            <Button 
                                active={c.name===command?.name} 
                                icon 
                                key={index} 
                                className="commandBtn" 
                                onClick={() => commandClick(c)} >
                                <Icon name={c.iconname} className="command " />
                            </Button>
                        ))}
                    </div>
                ))
            }
            </div>
        </div>
    )

};

export default SelectCommands;