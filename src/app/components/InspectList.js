import React, { useEffect } from 'react';
import { List } from 'semantic-ui-react';

const InspectList = (props) => {
    
    const findColorName = (color) => {
        const found = props.usedColors.find(c=>c.color===color);
        return found!==undefined&&found.name!==undefined?found.name:"unknown colour";
    };

    const selectDrawingClick = (d) => {
        d.selected=true;
    };

    const RenderListItem = ({drawing}) => {
        return (
            <List.Item active={drawing.selected}
            onClick={() => selectDrawingClick(drawing)} >
                {drawing.drawings!==undefined?
                    <List.Icon name='folder' />
                    :
                    <List.Icon name='circle' />
                }
                <List.Content>
                    <List.Header>
                    {drawing.drawings!==undefined?
                        "group"
                        : findColorName(drawing?.color) +" "+drawing?.shape?.name
                    }
                    </List.Header>
                    {drawing.drawings!==undefined?
                    <List.List>
                        {drawing.drawings
                            .map((d, index) => (
                                <RenderListItem drawing={d} />
                            ))
                        }
                    </List.List>
                    :null}
                </List.Content>
            </List.Item>
        )
    }


    return (
        <div className="modescontainer" >
            <div >   
                <div class="ui divider"></div>
                    {props.drawn.length?
                        <List>
                            {props.drawn
                                .map((d, index) => (
                                    <RenderListItem drawing={d} /> 

                                ))
                            }
                        </List>
                    :null}
            </div>
        </div>
    )

};

export default InspectList;