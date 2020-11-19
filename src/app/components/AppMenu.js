import React, { useEffect } from 'react';
import { Dropdown, Icon, Menu, Segment } from 'semantic-ui-react'
import {menuActions} from '../config/menuActions';

const AppMenu = (props) => {
  
  const actionClick = ((a) => {
    props.broadcastAction(JSON.parse(JSON.stringify(a)));
  });

  useEffect(() => {   
      for (const actionSet of menuActions) {
          for (const a of actionSet) {
              if (props.keyPressed.key===a.key && 
                  (a.ctrlKey===undefined || 
                  props.keyPressed.ctrlKey === a.ctrlKey) && 
                  (a.shiftKey===undefined || 
                  props.keyPressed.shiftKey === a.shiftKey)) {
                  actionClick(a);
              }    
          }
      }
  }, [props.keyPressed, ]);

  return (<div>
    <Menu attached='top'>
      <Dropdown item icon='' text='Builder ' simple>
        <Dropdown.Menu>
        {menuActions
          .map((actionSet, index) => (
              <div>
              {actionSet
                  .map((a, index) => (
                    <Dropdown.Item text={a.name} onClick={() => actionClick(a)} />
                  ))}
              </div>
          ))
        }  
        </Dropdown.Menu>
      </Dropdown>

    </Menu>
  </div>);
}

export default AppMenu;