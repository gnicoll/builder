import React, { useEffect } from 'react';
import {colors} from '../config/commandsAndActions';
import {palettes} from '../config/palettes';

import { RgbaStringColorPicker } from "react-colorful";
import "react-colorful/dist/index.css";
import { Header, Modal, Container, Popup, Card, CardContent, Button, Icon } from 'semantic-ui-react'
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
function convertColors(palette) {
    let colors = [];
    for (const p of palette) {
        colors.push(`rgba(${p.rgb[0]},${p.rgb[1]},${p.rgb[2]},1)`);
    }
    return colors;
}

const ColorPicker = (props) => {
    const [colorPalette, setColorPalette] = React.useState(
        convertColors(palettes[getRandomInt(palettes.length)]));
    const [colorHistory, setColorHistory] = React.useState(["rgba(0,0,0,1)", "rgba(255,255,255,1)"]);
    const [color, setColor] = React.useState(colorHistory[0]);
    const [secondaryColor, setSecondaryColor] = React.useState(colorHistory[1]);
    const [selection, setSelection] = React.useState(color);
    const [secondarySelection, setSecondarySelection] = React.useState(secondaryColor);
    const [open, setOpen] = React.useState(false)

    const randomPalette = (()=>{
        setColorPalette(convertColors(palettes[getRandomInt(palettes.length)]));
    })

    const colorPalletClick = ((pColor) => {
        if (!colorPalette.includes(pColor)) {
            const newPalette = [...colorPalette];
            newPalette.unshift(pColor);
            setColorPalette(newPalette);
        } else {
            const newPalette = colorPalette.filter((c)=>c!==pColor);
            setColorPalette(newPalette);
        }
    });
    const secondaryColorHistoryClick = ((historyColor) => {
        setSecondaryColor(historyColor);
    });
    const colorHistoryClick = ((historyColor) => {
        setColor(historyColor);
    });

    const paletteClick = ((newPalette) => {
        setColorPalette(newPalette);
        setOpen(false);
    });  

    const switchColors = (() =>{
        const secColor = secondaryColor;
        setSecondaryColor(color);
        setColor(secColor);
    });

    useEffect(() => {
        if ((props.keyPressed.key==='x' ||props.keyPressed.key==='X')) {
            switchColors();
        }  

    }, [props.keyPressed]);

    useEffect(() => {
        setSelection(color);
    }, [setSelection,color]);

    useEffect(() => {
        setSecondarySelection(secondaryColor);
    }, [setSecondarySelection,secondaryColor]);

    useEffect(() => {
        if (colorHistory.includes(color)){
            const newHistory = colorHistory.filter((c)=>c!==color);
            newHistory.unshift(color);
            setColorHistory(newHistory.slice(0, 10));
            props.broadcastColor(color);
        } else {
            props.broadcastColor(color);
            const newHistory = [...colorHistory];
            newHistory.unshift(color);
            setColorHistory(newHistory.slice(0, 10));
        }
    }, [props.broadcastColor, color,setColorHistory]);
    
    return (
        <Container className="modescontainer" >
        {props.selection.length?
        <div class="ui divider"></div>

        :null}
        <div class="ui divider"></div>
        <Container>
            <div className="palettecolorlist">
            <Modal
                basic
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                size='small'
                trigger={<Icon className="paletteicon" name='paint brush' />}
                >
                <Header icon>
                    <Icon name='paint brush' />
                    palettes
                </Header>
                <Modal.Content>
                    <div className="palettelist">
                        {palettes
                            .map((p, index) => (                    
                            <Card 
                                key={index} 
                                className="palettelistcard">
                                <CardContent onClick={() => paletteClick(convertColors(p))} className="palettecolorlist">

                                    {convertColors(p).map((pColor, index) => (
                                            <div 
                                                key={index} 
                                                
                                                name={"square full"} 
                                                style={{backgroundColor:pColor}} 
                                                className="palettecolor"
                                            />                        
                                        ))}
                                </CardContent>
                            </Card>
                            ))
                        }
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic onClick={() => setOpen(false)}>
                    </Button>
                </Modal.Actions>
                </Modal>:
                {colorPalette
                    .map((pColor, index) => (
                        <div 
                            key={index} 
                            onClick={() => colorHistoryClick(pColor)} 
                            name={"square full"} 
                            style={{backgroundColor:pColor}} 
                            className="palettecolor"
                        />                        
                    ))
                }
            </div>
        </Container>
            <div className="colors">

            {colorPalette.includes(color)?
                <Icon style={{color:color}} name='minus square' onClick={()=>colorPalletClick(color)}/>
            :   <Icon style={{color:color}} name='plus square' onClick={()=>colorPalletClick(color)}/>
            }
                        
            <Popup
                on='click'
                onClose={()=>setColor((' ' + selection).slice(1))}
                pinned
                    position='right center'
                trigger={
                    <div 
                        name={"square full"} 
                        className="primarycolor" 
                        style={{backgroundColor:color}} 
                    />
                }
            >
                <Popup.Header>
                    Color
                </Popup.Header>
                <Popup.Content>
                    <RgbaStringColorPicker color={selection} onChange={setSelection} />
                    
                </Popup.Content>
            </Popup>
            <Popup
                on='click'
                onClose={()=>setSecondaryColor(secondarySelection)}
                pinned
                    position='right center'
                trigger={
                    <div 
                        name={"square full"} 
                        className="secondarycolor" 
                        style={{backgroundColor:secondaryColor}} 
                    />
                }
            >
                <Popup.Header>
                    Color
                </Popup.Header>
                <Popup.Content>
                    <RgbaStringColorPicker color={secondarySelection} onChange={setSecondarySelection} />
                </Popup.Content>
            </Popup>
            <Popup
                trigger={<Icon name='arrows alternate horizontal' onClick={()=>switchColors()}/>}
                content="switch (x)"
                position='right center'
                className="switchicon"
            />
            
            </div>
            <Container>           
                <div className="historycolorlist">
                    <Icon name='history' />
                    {colorHistory
                        .map((historyColor, index) => (
                            <div 
                                key={index} 
                                onClick={() => colorHistoryClick(historyColor)} 
                                name={"square full"} 
                                style={{backgroundColor:historyColor}} 
                                className="historycolor"
                            />                        
                        ))
                    }
                </div>
            </Container>
        <div class="ui divider"></div>
            <Container>           
                <div className="usedcolorlist">
                    <Icon name='tint' />
                    {props.usedColors
                        .map((usedColor, index) => ( 
                            <Popup
                                trigger={
                                    <div 
                                        key={index} 
                                        onClick={() => colorHistoryClick(usedColor.color)} 
                                        name={"square full"} 
                                        style={{backgroundColor:usedColor.color}} 
                                        className="usedcolor"
                                    /> 
                                }
                                content={usedColor.name}
                                position='right center'
                                className="switchicon"
                            />                      
                        ))
                    }
                </div>
            </Container>
            
        </Container>
    )

};

export default ColorPicker;