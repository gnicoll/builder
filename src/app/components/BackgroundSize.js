import React, { useEffect } from 'react';
import { Input, Grid, Form, Icon, Label, Segment, Popup } from 'semantic-ui-react';
import { Slider } from "react-semantic-ui-range";

const BackgroundSize = (props) => {
    const maxHeight = 100;
    const maxWidth = 100;
    
    const [width, setWidth] = React.useState(maxWidth);
    const [height, setHeight] = React.useState(maxHeight);
    const [widthMax, setWidthMax] = React.useState(maxWidth);
    const [heightMax, setHeightMax] = React.useState(maxHeight);
    const [widthMin, setWidthMin] = React.useState(0);
    const [heightMin, setHeightMin] = React.useState(0);
    
    const widthSettings = {
        start: [widthMin,maxWidth],
        min: widthMin,
        max: maxWidth,
        step: 1,
        onChange: w => {
            setWidth(w[1]);
            setWidthMin(w[0]);
        }
    };
    const heightSettings = {
        start: [heightMin,maxHeight],
        min: heightMin,
        max: maxHeight,
        step: 1,
        onChange: w => {
            setHeight(w[1]);
            setHeightMin(w[0]);
        }
    };

    useEffect(() => {
        let maxLeft = 1;
        let maxTop = 1;
        let minLeft = 1;
        let minTop = 1;
        for (const drawing of props.drawn) {
            maxLeft =  drawing.destinationLeft>maxLeft?drawing.destinationLeft:maxLeft;
            maxTop =  drawing.destinationTop>maxTop?drawing.destinationTop:maxTop;
            minLeft =  drawing.destinationLeft<minLeft?drawing.destinationLeft:minLeft;
            minTop =  drawing.destinationTop<minTop?drawing.destinationTop:minTop;
        }
        setWidthMax(maxLeft);
        setHeightMax(minTop);
    }, [props.drawn]);
   
    useEffect(() => {
        props.broadcastBgSize(
            {
                height: height,
                width: width,
            }
        );
    }, [width, height]);

    return (
        <div className="modescontainer" >
            <div >   
                <div class="ui divider"></div>
                <div >
                
                <Grid>
                    <Grid.Column width={16}>
                        <div>width: {width}</div>
                        <Slider multiple  color="red" settings={widthSettings} />
                    </Grid.Column>
                </Grid>
                <Form.Input
                    label={`height: ${height}em `}
                    min={heightMax}
                    max={maxHeight}
                    name='height'
                    onChange={e => setHeight(e.target.value)}
                    step={1}
                    type='range'
                    value={height}
                />

                </div>
            </div>
        </div>
    )

};

export default BackgroundSize;