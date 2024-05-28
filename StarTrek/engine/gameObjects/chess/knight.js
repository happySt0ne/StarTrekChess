import Figure from "../figure.js";
import figureTypes from "../../types/figureTypes.js";

class Knight extends Figure {
    constructor (x, y, z, color) {
        super(x, y, z, color, figureTypes.Knight);
    }
}

export default Knight;
