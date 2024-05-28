import Figure from "../figure.js";
import figureTypes from "../../types/figureTypes.js";

class Rook extends Figure {
    constructor (x, y, z, color) {
        super(x, y, z, color, figureTypes.Rook);
    }
}

export default Rook;
