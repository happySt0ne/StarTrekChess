import {setCuboidColorWhite, setCuboidColorBlack  } from '../../shaders/shadersHelper.js';
import GameObject from './gameObject.js';

class Tile extends GameObject {    
    #color;
    #figure;

    get color() {
        return this.#color;
    }
    set color(value) {
        this.#color = value;
    }

    static size = {
        width: 100,
        height: 15,
        depth: 100
    };

    setFigure(figure) {
        this.#figure = figure;

        this.#figure.setPosition(
            this.position.x + (Tile.size.width - this.#figure.constructor.size.width)/2,
            this.position.y + Tile.size.height,
            this.position.z + (Tile.size.width - this.#figure.constructor.size.depth)/2
        );
    }

    setObjectColor() {
        if (this.#color == 'black') {
            setCuboidColorBlack();
        } else if (this.#color == 'white') {
            setCuboidColorWhite();
        } else {
            super.setObjectColor();
        }
    }

    constructor(x, y, z, color) { 
        super(x, y, z);
        this.#color = color;
    }
}

export default Tile;
