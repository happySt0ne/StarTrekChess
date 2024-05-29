import Figure from "../figure.js";
import figureTypes from "../../types/figureTypes.js";
import Size from "../../types/size.js";

class Pawn extends Figure {
    constructor (x, y, z, color) {
        super(x, y, z, color, figureTypes.Pawn);
    }

    static size = new Size(30, 30, 30);
}

export default Pawn;
