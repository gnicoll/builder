export const modes = [
  {
    name: 'draw',
    key:'d',
    iconname: 'pencil',
    active:true
  },
  {
    name: 'select',
    key:'s',
    iconname: 'hand pointer',
    active:false
  },
];

export const commands = [
  [{
    name: 'select',
    key:'s',
    iconname: 'hand pointer',
    active:true,
    selectable:true
  },
  {
    name: 'multiselect',
    key:'m',
    iconname: 'hand pointer outline',
    active:false,
    selectable:true
  }],
  [{
    name: 'delete',
    key:'Delete',
    iconname: 'delete',
    selectable:false
  }],
];
export const colors = [
  {
    name: 'white',
    color: '#ffffff'
  },
  {
    name: 'black',
    color: '#000000'
  },
  {
    name: 'grey',
    color: '#888888'
  },
];

export const shapes = [
  {
    name: 'circle',
    style: [{
      'borderRadius':'50%',
      'backgroundColor':'{color}',
      'width': '{width}',
      'height': '{height}',
    }],
    active:true
  },
  {
    name: 'halfcircle',
    style: [{
      'borderRadius':'50% / 100% 100% 0 0',
      'backgroundColor':'{color}',
      'width': '{width}',
      'height': '{height}',
    }],
    active:false
  },
  {
    name: 'halfcircleangle',
    ratio: '1:1',
    style: [
      {
        'borderRight': '{width/2} solid transparent',
        'borderTop': '{width/2} solid transparent',
        'borderRadius':'{width/2}',
        'borderLeft': '{width/2} solid {color}',
        'borderBottom': '{width/2} solid {color}',
        'width': '{width}',
        'height': '{height}',
      },
      {
        'borderTop': '{width/2} solid transparent',
        'borderLeft': '{width/2} solid transparent',
        'borderRadius':'{width/2}',
        'borderRight': '{width/2} solid {color}',
        'borderBottom': '{width/2} solid {color}',
        'width': '{width}',
        'height': '{height}',
      },
      {
        'borderRight': '{width/2} solid transparent',
        'borderBottom': '{width/2} solid transparent',
        'borderRadius':'{width/2}',
        'borderLeft': '{width/2} solid {color}',
        'borderTop': '{width/2} solid {color}',
        'width': '{width}',
        'height': '{height}',
      },
      {
        'borderLeft': '{width/2} solid transparent',
        'borderBottom': '{width/2} solid transparent',
        'borderRadius':'{width/2}',
        'borderRight': '{width/2} solid {color}',
        'borderTop': '{width/2} solid {color}',
        'width': '{width}',
        'height': '{height}',
      },
    ],
    active:false
  },
  {
    name: 'quartercircle',
    style: [
      {
        'borderRadius':'0 0 100% 0',
        'backgroundColor':'{color}',
        'width': '{width}',
        'height': '{height}',
      },
                  {
                  'borderRadius':'0 0 0 100%',
                  'backgroundColor':'{color}',
                  'width': '{width}',
                  'height': '{height}',
                  },
      {
      'borderRadius':'0 100% 0 0',
      'backgroundColor':'{color}',
      'width': '{width}',
      'height': '{height}',
      },
      {
      'borderRadius':'100% 0 0 0',
      'backgroundColor':'{color}',
      'width': '{width}',
      'height': '{height}',
      },
    ],
    active:false
  },
  {
    name: 'rectangle',
    style: [{
      'backgroundColor':'{color}',
      'width': '{width}',
      'height': '{height}',
    }],
    active:false
  },
  {
    name: 'triangle-up',
    style: [{
      'width': '{width}',
      'height': '{height}',
      'borderLeft': '{width/2} solid transparent',
      'borderRight': '{width/2} solid transparent',
      'borderBottom': '{height} solid {color}',
    }],
    active:false
  },
  {
    name: 'cone',
    style: [{
      borderRadius: '50%',
      'width': '{width}',
      'height': '{height}',
      'borderLeft': '{width} solid transparent',
      'borderRight': '{width} solid transparent',
      'borderTop': '{height} solid {color}',
    }],
    active:false
  },
];