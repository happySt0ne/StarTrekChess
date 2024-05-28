import GameObject from "./gameObject.js";
import { 
    setCuboidColorBlack, 
    setCuboidColorWhite 
} from "../../shaders/shadersHelper.js";
import Position from "../types/position.js";
import Size from "../types/size.js";

class Figure extends GameObject {
    #figureType;
    _color;
    #moveCount = -1;
    #isAlive = true;

    static size = new Size(50, 50, 50);

    get isAlive() { return this.#isAlive; }

    get moveCount() { return this.#moveCount; }

    get color() { return this._color; }

    get type() { return this.#figureType; }

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
        this.#moveCount++;

        this.position = new Position(x, y, z);
    }

    die() {
        this.#isAlive = false;
        this.setPosition(0, 0, 500);
    }

    awake() {
        this.#isAlive = true;
    }

    draw() {
        if (!this.#isAlive) return;
        super.draw();
    }
}

export default Figure;
