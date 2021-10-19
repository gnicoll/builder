import React, { useEffect } from 'react';
import { Input, Button, Icon, Label, Segment, Popup } from 'semantic-ui-react'

const BackgroundImage = (props) => {
    
    const [bgImage, setBgImage] = React.useState(null);
    
    useEffect(() => {
        props.broadcastBgImage(bgImage);
    }, [bgImage]);

    return (
        <div className="modescontainer" >
            <div >   
                <div class="ui divider"></div>
                <div class="ui focus input">
                    <Input 
                        icon='image' 
                        size='mini' 
                        value={bgImage} 
                        onChange={e => setBgImage(e.target.value)} 
                        iconPosition='left' 
                        placeholder='Background Image' 
                    />
                </div>
            </div>
        </div>
    )

};

export default BackgroundImage;