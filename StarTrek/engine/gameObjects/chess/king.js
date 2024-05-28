import figureTypes from "../../types/figureTypes.js";
import Figure from "../figure.js";
import Position from "../../types/position.js";
import Size from "../../types/size.js";

class King extends Figure {
    constructor (x, y, z, color) {
        super(x, y, z, color, figureTypes.King);
    }

    draw() {
        super.draw();
        
        var a = new Position(this.position);
        a.y += 50;

        var z = new Size(this.constructor.size);
        z.width += 50;

        super.draw(a, z);
    }
}

export default King;
