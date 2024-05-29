import {
    setCuboidColorRed, setCuboidColorGreen 
} from '../../shaders/shadersHelper.js';
import GameObject from './gameObject.js';

class Tile extends GameObject {    
    #color;
    #figure;
    #isDouble;

    get isDouble() {
        return this.#isDouble;
    }

    get figure() {
        return this.#figure;
    }
    set figure(figure) {
        if (figure == null) {
            
            this.#figure = figure;
            return;
        }

        if (this.#figure != null) {
            this.#figure.die();
        }

        this.#figure = figure;
        
        this.#figure.setPosition(
            this.position.x + (Tile.size.width - this.#figure.constructor.size.width)/2,
            this.position.y + Tile.size.height,
            this.position.z + (Tile.size.width - this.#figure.constructor.size.depth)/2
        );
    }

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
        if (this.#figure != null) {
            this.#figure.die();
        }

        this.#figure = figure;

        this.#figure.setPosition(
            this.position.x + (Tile.size.width - this.#figure.constructor.size.width)/2,
            this.position.y + Tile.size.height,
            this.position.z + (Tile.size.width - this.#figure.constructor.size.depth)/2
        );
    }

    setObjectColor() {
        if (this.#color == 'black') {
            setCuboidColorRed();
        } else if (this.#color == 'white') {
            setCuboidColorGreen();
        } else {
            super.setObjectColor();
        }
    }

    constructor(x, y, z, color, isDouble) { 
        super(x, y, z);
        this.#color = color;
        this.#isDouble = isDouble;
    }
}

export default Tile;
