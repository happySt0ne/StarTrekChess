import Figure from "../figure.js";
import figureTypes from "../../types/figureTypes.js";

class Pawn extends Figure {
    constructor (x, y, z, color) {
        super(x, y, z, color, figureTypes.Pawn);
    }
}

export default Pawn;
