import figureTypes from "../../types/figureTypes.js";
import Figure from "../figure.js";
import Position from "../../types/position.js";
import Size from "../../types/size.js";

class King extends Figure {
    constructor (x, y, z, color) {
        super(x, y, z, color, figureTypes.King);
    }

    draw() {
        var platformSize = new Size(this.constructor.size);
        platformSize.height /= 2;
        
        super.draw(this.position, platformSize);
        
        var cubePos = new Position(this.position);
        cubePos.x += 10;
        cubePos.z += 10;

        var cubeSize = new Size(this.constructor.size);
        cubeSize.width -= 20;
        cubeSize.depth -= 20;

        super.draw(cubePos, cubeSize);
    }
}

export default King;
