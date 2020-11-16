import React, { useEffect } from 'react';
import { Dropdown, Icon, Menu, Segment } from 'semantic-ui-react'

const AppMenu = ({code, broadcastCode}) => {
  
  const handleCodeClick = (c)=>{
    broadcastCode(c);
  }

  return (<div>
    <Menu attached='top'>
      <Dropdown item icon='code' text='Builder ' simple>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Icon name='dropdown' />
            <span className='text'>New</span>

            <Dropdown.Menu>
              <Dropdown.Item>Document</Dropdown.Item>
              <Dropdown.Item>Image</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>Open</Dropdown.Item>
          <Dropdown.Item>Save...</Dropdown.Item>
          <Dropdown.Item>Edit Permissions</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Header>Export</Dropdown.Header>
          <Dropdown.Item>Share</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Menu.Menu position=''>
        <div className='ui aligned category item'>
          <div className='ui transparent icon input'>
            <input
              className=''
              defaultValue={code}
              type='text'
            />
            <i className='code link icon' onClick={()=>handleCodeClick(code)} />
          </div>
          <div className='results' />
        </div>
      </Menu.Menu>
      <Menu.Menu position='right'>
        <div className='ui right aligned category search item'>
          <div className='ui transparent icon input'>
            <input
              className='prompt'
              type='text'
              placeholder='Search animals...'
            />
            <i className='search link icon' />
          </div>
          <div className='results' />
        </div>
      </Menu.Menu>
    </Menu>
  </div>);
}

export default AppMenu;