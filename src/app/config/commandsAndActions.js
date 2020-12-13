export const selectCommands = [
  [{
    name: 'select',
    key:'s',
    iconname: 'hand pointer',
    active:true,
  },
  {
    name: 'multiselect',
    key:'m',
    iconname: 'hand pointer outline',
    active:false,
  }],
];
export const actions = [
  [{
    name: 'linestoggle',
    key:'l',
    iconname: 'grid layout',
  },{
    name: 'console',
    key:'c',
    iconname: 'terminal',
  }],
];

export const selectActions = [
  [{
    name: 'delete',
    key:'Delete',
    iconname: 'delete',
  }],
  [ 
    {
      name: 'top',
      key:'ArrowUp',
      ctrlKey: true,
      shiftKey: true,
      iconname: 'sort amount up',
    },
    {
      name: 'up',
      key:'ArrowUp',
      ctrlKey: true,
      shiftKey: false,
      iconname: 'long arrow alternate up',
    },
  ],
  [ 
    {
      name: 'bottom',
      key:'ArrowDown',
      ctrlKey: true,
      shiftKey: true,
      iconname: 'sort amount down',
    },
    {
      name: 'down',
      key:'ArrowDown',
      ctrlKey: true,
      shiftKey: false,
      iconname: 'long arrow alternate down',
    },
  ],
  [ 
    {
      name: 'moveup',
      key:'ArrowUp',
      ctrlKey: false,
      shiftKey: false,
      iconname: 'arrow up',
    },
    {
      name: 'movedown',
      key:'ArrowDown',
      ctrlKey: false,
      shiftKey: false,
      iconname: 'arrow down',
    },
    {
      name: 'moveleft',
      key:'ArrowLeft',
      ctrlKey: false,
      shiftKey: false,
      iconname: 'arrow left',
    },
    {
      name: 'moveright',
      key:'ArrowRight',
      ctrlKey: false,
      shiftKey: false,
      iconname: 'arrow right',
    },
  ],
  [
    {
      name: 'duplicate',
      key:'p',
      ctrlKey: false,
      shiftKey: false,
      iconname: 'copy',
    },
  ],
  //duplicate
];
export const multiSelectActions = [
  [{
    name: 'group',
    key:'g',
    iconname: 'object group',
  },{
    name: 'ungroup',
    key:'u',
    iconname: 'object ungroup',
  }],
];
