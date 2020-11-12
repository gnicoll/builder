import React from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react'

const Cursor = (props) => {
    
    const styles = { 
        transform: `translate(${Math.round(props.mousePosition.left/16)}em, ${Math.round(props.mousePosition.top/16)}em)` 
    };
    return (
        <div className="cursor-container" style={styles} >
            <Icon className={"cursor "+props.mode?.name}  name={props.mode?.iconname} />
        </div>
        )

};
export default Cursor;