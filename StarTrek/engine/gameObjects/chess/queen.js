import Figure from "../figure.js";

class Queen extends Figure {
    constructor (x, y, z, color) {
        super(x, y, z, color, figureTypes.King);
    }
}

export default Queen;
