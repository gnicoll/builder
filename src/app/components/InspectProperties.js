import React, { useEffect } from 'react';
import { Button, Icon, Label, Segment, Popup } from 'semantic-ui-react'

const InspectProperties = (props) => {
    
    return (
        <div className="modescontainer" >
            <div >   
                <div class="ui divider"></div>
                <div class="ui focus input">
                    <input type="text" placeholder="Name"/>
                </div>
                <div class="ui focus input">
                    <input type="text" size='mini' />
                </div>
            </div>
        </div>
    )

};

export default InspectProperties;