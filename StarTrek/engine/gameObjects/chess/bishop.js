import Figure from "../figure.js";

class Bishop extends Figure {
    constructor (x, y, z, color) {
        super(x, y, z, color, figureTypes.King);
    }
}

export default Bishop;
