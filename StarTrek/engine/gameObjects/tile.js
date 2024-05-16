import {setCuboidColorWhite, setCuboidColorBlack  } from '../../shaders/shadersHelper.js';
import GameObject from './gameObject.js';

class Tile extends GameObject {    
    static size = {
        width: 100,
        height: 15,
        depth: 100
    };
    color;

    setObjectColor() {
        if (this.color == 'black') {
            setCuboidColorBlack();
        } else if (this.color == 'white') {
            setCuboidColorWhite();
        } else {
            super.setObjectColor();
        }
    }

    constructor(x, y, z, color) { 
        super(x, y, z);
        this.color = color;
    }
}

export default Tile;
