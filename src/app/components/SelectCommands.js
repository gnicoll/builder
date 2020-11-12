import React, { useEffect } from 'react';
import {commands} from '../config';
import { Button, Icon, Popup } from 'semantic-ui-react'

const SelectCommands = (props) => {
    
    const [command, setCommand] = React.useState(commands[0]);
    
    useEffect(() => {
        props.broadcastCommand(command)
    }, [props.broadcastCommand, command]);
    
    return (
        <div className="modescontainer" >
            <div >                    
            <div class="ui divider"></div>

            {commands
                .map((commandSet, index) => (
                    <div>
                    {commandSet
                        .map((c, index) => (
                            <Button 
                                active={c.name===command?.name} 
                                icon 
                                key={index} 
                                className="commandBtn" 
                                onClick={() => setCommand(c)} >
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