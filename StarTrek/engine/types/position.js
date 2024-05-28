class Position {
    #y; 
    #x; 
    #z;

    get y() { return parseInt(this.#y); }
    get x() { return parseInt(this.#x); }   
    get z() { return parseInt(this.#z); }

    set y(value) { this.#y = parseInt(value); }
    set x(value) { this.#x = parseInt(value); }
    set z(value) { this.#z = parseInt(value); }

    constructor() {
        if (arguments.length === 3) {
            this.#constructor1.apply(this, arguments);
        }

        if (arguments.length === 1 && 'y' in arguments[0] 
                && 'x' in arguments[0] && 'z' in arguments[0]) {
            this.#constructor2.apply(this, arguments);
        }
    }

    #constructor1(x, y, z) {
        this.#x = parseInt(x);
        this.#y = parseInt(y);
        this.#z = parseInt(z);
    }

    #constructor2(position) {
        this.#x = parseInt(position.x);
        this.#y = parseInt(position.y);
        this.#z = parseInt(position.z);
    }
}

export default Position;
