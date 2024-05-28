class ChessPosition {
    #layer;
    #x;
    #z;

    get layer() {
        return parseInt(this.#layer);
    }

    get x() {
        return parseInt(this.#x);
    }   

    get z() {
        return parseInt(this.#z);
    }

    set layer(value) {
        this.#layer = parseInt(value);
    }

    set x(value) {
        this.#x = parseInt(value);
    }
    
    set z(value) {
        this.#z = parseInt(value);
    }

    constructor() {
        if (arguments.length === 3) {
            this.#constructor1.apply(this, arguments);
        }

        if (arguments.length === 1 && 'layer' in arguments[0] 
                && 'x' in arguments[0] && 'z' in arguments[0]) {
            this.#constructor2.apply(this, arguments);
        }
    }

    #constructor1(layer, x, z) {
        this.#layer = parseInt(layer);
        this.#x = parseInt(x);
        this.#z = parseInt(z);
    }

    #constructor2(position) {
        this.#layer = parseInt(position.layer);
        this.#x = parseInt(position.x);
        this.#z = parseInt(position.z);
    }
}

export default ChessPosition;
