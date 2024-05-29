import Figure from "../figure.js";
import figureTypes from "../../types/figureTypes.js";
import Size from "../../types/size.js";
import Position from "../../types/position.js";

class Rook extends Figure {
    constructor (x, y, z, color) {
        super(x, y, z, color, figureTypes.Rook);
    }

    static size = new Size(50, 10, 50);

    draw() {
        super.draw();
        
        var platformSize = new Size(20, 40, 20);
        var platformPos = new Position(this.position);
        platformPos.y += Rook.size.height;
        platformPos.x += Math.abs(Rook.size.width - platformSize.width) / 2;
        platformPos.z += Math.abs(Rook.size.depth - platformSize.depth) / 2;
        
        super.draw(platformPos, platformSize);

        platformPos = new Position(this.position);
        platformPos.y += platformSize.height + Rook.size.height;

        platformSize = new Size(Rook.size);
        platformSize.width -= 10;
        platformSize.depth -= 10;

        platformPos.x += Math.abs(Rook.size.width - platformSize.width)/2;
        platformPos.z += Math.abs(Rook.size.depth - platformSize.depth)/2;

        super.draw(platformPos, platformSize);
    }
}

export default Rook;
