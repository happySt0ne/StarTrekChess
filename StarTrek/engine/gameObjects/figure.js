import GameObject from "./gameObject.js";
import { 
    setCuboidColorBlack, 
    setCuboidColorWhite 
} from "../../shaders/shadersHelper.js";

class Figure extends GameObject {
    #figureType;
    _color;
    
    static size = {
        width: 50,
        height: 50,
        depth: 50
    };

    get color() {
        return this._color;
    }

    get type() {
        return this.#figureType;
    }
    
    constructor(x, y, z, color, figureType) {
        super(x, y, z);

        this._color = color;
        this.#figureType = figureType;
    }

    setObjectColor() {
        if (this._color == 'black') {
            setCuboidColorBlack();
        } else if (this._color == 'white') {
            setCuboidColorWhite();
        } else {
            super.setObjectColor();
        }
    }

    setPosition(x, y, z) {
        this.position = {
            x: x,
            y: y,
            z: z
        };
    }
}

export default Figure;
