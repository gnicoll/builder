import React, { useEffect } from 'react';
import {modes} from '../config/modes';
import { Button, Icon, Popup } from 'semantic-ui-react'

const BackgroundColor = (props) => {
    
    const [settingColor, setSettingColor] = React.useState(false);
    const [bgColor, setBgColor] = React.useState(null);
    
    useEffect(() => {
        if (settingColor) {
            setBgColor(props.color)
        }

    }, [props.color]);
    useEffect(() => {
        props.broadcastBgColor(bgColor)
        setSettingColor(false);
        
    }, [bgColor]);

   
    return (
        <div className="modescontainer" >
            <div className="modeslist">
                <Button.Group>
                
                    <Popup
                        trigger={
                        <Button active={settingColor} icon  className="bg-color" onClick={() => setSettingColor(!settingColor)} >
                                <Icon name="paint brush" />
                        </Button>
                        }
                        content="Set BG Color"
                        position='bottom left'
                    />
        
                    <Popup
                        trigger={
                        <Button  icon  className="bg-color" onClick={() => setBgColor(null)} >
                                <Icon name="delete" />
                        </Button>
                        }
                        content="No BG Color"
                        position='bottom left'
                    />
        
                </Button.Group>
            </div>
        </div>
        )

};

export default BackgroundColor;