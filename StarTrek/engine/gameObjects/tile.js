import Camera from "../camera.js";
import { setCuboidColors, setCuboidPoints } from '../../shaders/shadersHelper.js';
import GameObject from './gameObject.js';

class Tile extends GameObject {    
    size = {
        width: 100,
        height: 30,
        depth: 100
    };

    constructor(x, y, z) { 
        super(x, y, z);
    }
}

export default Tile;
