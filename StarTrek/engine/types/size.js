class Size {
    #height; #width; #depth;

    get height() { return parseInt(this.#height); }
    get width() { return parseInt(this.#width); }   
    get depth() { return parseInt(this.#depth); }

    set height(value) { this.#height = parseInt(value); }
    set width(value) { this.#width = parseInt(value); }
    set depth(value) { this.#depth = parseInt(value); }

    constructor() {
        if (arguments.length === 3) {
            this.#constructor1.apply(this, arguments);
        }

        if (arguments.length === 1 && 'height' in arguments[0] 
                && 'width' in arguments[0] && 'depth' in arguments[0]) {
            this.#constructor2.apply(this, arguments);
        }
    }

    #constructor1(width, height, depth) {
        this.#width = parseInt(width);
        this.#height = parseInt(height);
        this.#depth = parseInt(depth);
    }

    #constructor2(position) {
        this.#width = parseInt(position.width);
        this.#height = parseInt(position.height);
        this.#depth = parseInt(position.depth);
    }
}

export default Size;
