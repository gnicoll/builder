export const shapes = [
  [{
    name: 'rectangle',
    style: [{
      'backgroundColor':'{color}',
      'width': '{width}',
      'height': '{height}',
    }],
    active:true,
    saveKey:'r',
  }],
  [{
    name: 'circle',
    style: [{
      'borderRadius':'50%',
      'backgroundColor':'{color}',
      'width': '{width}',
      'height': '{height}',
    }],
    active:false,
    saveKey:'c',
  }],
  [{
    name: 'halfcircle',
    style: [{
      'borderRadius':'50% / 0 0 100% 100%',
      /*
    border-top-left-radius: 50% 0px;
    border-top-right-radius: 50% 0px;
    border-bottom-right-radius: 50% 100%;
    border-bottom-left-radius: 50% 100%;
    */
      'backgroundColor':'{color}',
      'width': '{width}',
      'height': '{height}',
    },{
      'borderRadius':'100% 0% 0% 100% / 50% 0 0 50%',
      'backgroundColor':'{color}',
      'width': '{width}',
      'height': '{height}',
    },{
      'borderRadius':'0% 100% 100% 0%/ 0 50% 50% 0',
      'backgroundColor':'{color}',
      'width': '{width}',
      'height': '{height}',
    },{
      'borderRadius':'50% / 100% 100% 0 0',
      'backgroundColor':'{color}',
      'width': '{width}',
      'height': '{height}',
    }],
    active:false,
    saveKey:'h',
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
    active:false,
    saveKey:'a',
  }],
  [{
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
    active:false,
    saveKey:'q',
  }],
  [{
    name: 'triangle',
    style: [
      {
        'width': '{width}',
        'height': '{height}',
        'borderLeft': '{height/2} solid {color}',
        'borderRight': 'none',
        'borderBottom': '{width} solid transparent',
        'borderTop': '{height/2} solid transparent',
      },
      {
        'width': '{width}',
        'height': '{height}',
        'borderLeft': '{width/2} solid transparent',
        'borderRight': '{width/2} solid transparent',
        'borderBottom': '{height} solid {color}',
        'borderTop': 'none',
      },
      {
        'width': '{width}',
        'height': '{height}',
        'borderLeft': '{width/2} solid transparent',
        'borderRight': '{width/2} solid transparent',
        'borderBottom': '{height} solid {color}',
        'borderTop': 'none',
      },
      {
        'width': '{width}',
        'height': '{height}',
        'borderLeft': '{width/2} solid transparent',
        'borderRight': '{width/2} solid transparent',
        'borderBottom': '{height} solid {color}',
        'borderTop': 'none',
      },
    ],
    active:false,
    saveKey:'t',
  }],
  [{
    name: 'triangleangled',
    style: [
      {
        'width': '{width}',
        'height': '{height}',
        'borderRight': '{width} solid transparent',
        'borderTop': '{height} solid {color}',
        'borderLeft': 'none',
        'borderBottom': 'none',
      },
      {
        'width': '{width}',
        'height': '{height}',
        'borderLeft': '{width} solid transparent',
        'borderTop': '{height} solid {color}',
        'borderRight': 'none',
        'borderBottom': 'none',
      },
      {
        'width': '{width}',
        'height': '{height}',
        'borderLeft': '{width} solid transparent',
        'borderBottom': '{height} solid {color}',
        'borderTop': 'none',
        'borderRight': 'none',
      },
      {
        'width': '{width}',
        'height': '{height}',
        'borderRight': '{width} solid transparent',
        'borderBottom': '{height} solid {color}',
        'borderLeft': 'none',
        'borderTop': 'none',
      },
    ],
    active:false,
    saveKey:'p',
  }],
];