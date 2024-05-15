import {setCuboidColorWhite, setCuboidColorBlack  } from '../../shaders/shadersHelper.js';
import GameObject from './gameObject.js';

class Tile extends GameObject {    
    size = {
        width: 100,
        height: 30,
        depth: 100
    };
    color;

    setObjectColor() {
        if (this.color == 'black') {
            setCuboidColorBlack();
        } else {
            setCuboidColorWhite();
        }
    }

    constructor(x, y, z, color) { 
        super(x, y, z);
        this.color = color;
    }
}

export default Tile;
