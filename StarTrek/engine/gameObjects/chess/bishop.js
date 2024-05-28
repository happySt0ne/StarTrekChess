import Figure from "../figure.js";
import figureTypes from "../../types/figureTypes.js";

class Bishop extends Figure {
    constructor (x, y, z, color) {
        super(x, y, z, color, figureTypes.Bishop);
    }
}

export default Bishop;
