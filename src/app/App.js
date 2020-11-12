import React, { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css'
import '../App.css';
import Grid from './components/Grid'
import Modes from './components/Modes'
import Shapes from './components/Shapes'
import ColorPicker from './components/ColorPicker'
import Actions from './components/Actions' 
import SelectCommands from './components/SelectCommands';
import SelectActions from './components/SelectActions';

function App() {
  const [mode, setMode] = React.useState(null);
  const [command, setCommand] = React.useState(null);
  const [selection, setSelection] = React.useState(null);
  const [action, setAction] = React.useState(null);
  const [shape, setShape] = React.useState(null);
  const [color, setColor] = React.useState(null);
  
  const [keyPressed, setKeyPressed] =  React.useState({});

  useEffect(() => {
    document.addEventListener('keydown', logKey);       
  },[]);

  function logKey(e) {
    if (!e.repeat){
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
          <SelectCommands selection={selection} keyPressed={keyPressed} broadcastAction={setAction} broadcastCommand={setCommand}  />
          <SelectActions selection={selection} keyPressed={keyPressed} broadcastAction={setAction}  />

          </>
          :null}
          <Actions keyPressed={keyPressed} broadcastAction={setAction} />

          <ColorPicker keyPressed={keyPressed}  broadcastColor={setColor} />
        </div>
        
      </div>
      <div className="grid-pane">
        <Grid mode={mode} broadcastSelection={setSelection} action={action} command={command} shape={shape} color={color} keyPressed={keyPressed} />
      </div>
    </div>
  );
}

export default App;
