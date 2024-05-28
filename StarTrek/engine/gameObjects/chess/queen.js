import Figure from "../figure.js";
import figureTypes from "../../types/figureTypes.js";

class Queen extends Figure {
    constructor (x, y, z, color) {
        super(x, y, z, color, figureTypes.Queen);
    }
}

export default Queen;
