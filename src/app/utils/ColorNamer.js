import namedColors from 'color-name-list';
import nearestColor from 'nearest-color';
var Color = require('color');

const nameColor = (code) => {
    
    const colors = namedColors.reduce((o, { name, hex }) => Object.assign(o, { [name]: hex }), {});
    const nearest = nearestColor.from(colors);
    
    return nearest(Color(code).hex()).name;
}

export default nameColor;