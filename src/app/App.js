import React, { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import '../App.css';
import Grid from './components/Grid'
import Modes from './components/Modes'
import Shapes from './components/Shapes'
import ColorPicker from './components/ColorPicker'
import SelectCommands from './components/SelectCommands';

function App() {
  const [mode, setMode] = React.useState(null);
  const [command, setCommand] = React.useState(null);
  const [shape, setShape] = React.useState(null);
  const [color, setColor] = React.useState(null);
  
  const [keyPressed, setKeyPressed] =  React.useState({});

  useEffect(() => {
    document.addEventListener('keydown', logKey);       
  },[]);

  function logKey(e) {
    if (!e.repeat && e.code!==keyPressed.code){
      setKeyPressed(
        {
          'code':e.code,
          'key':e.key,
          'shiftKey':e.shiftKey,
          'ctrlKey':e.ctrlKey,
          
        });
    }
  }

  return (
    <div className="App builder">
      <div className="ui-panes">
        <div className="tools-pane pane">
          <Modes mode={mode} color={color} broadcastMode={setMode} keyPressed={keyPressed} />
          {mode?.name==='draw'?
          <>
          <Shapes broadcastMode={setMode} broadcastCommand={setCommand} broadcastShape={setShape} color={color} keyPressed={keyPressed} />
          </>
          :null}
          {mode?.name==='select'?
          <>
          <SelectCommands broadcastCommand={setCommand}  />
          </>
          :null}
          <ColorPicker keyPressed={keyPressed}  broadcastColor={setColor} />
        </div>
        
      </div>
      <div className="grid-pane">
        <Grid mode={mode} command={command} shape={shape} color={color} keyPressed={keyPressed} />
      </div>
    </div>
  );
}

export default App;
