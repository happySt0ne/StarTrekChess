import Figure from "../figure.js";
import figureTypes from "../../types/figureTypes.js";
import Size from "../../types/size.js";
import Position from "../../types/position.js";

class Pawn extends Figure {
    constructor (x, y, z, color) {
        super(x, y, z, color, figureTypes.Pawn);
    }

    static size = new Size(50, 5, 50);

    draw() {
        super.draw();

        var platformSize = new Size(20, 40, 20);
        var platformPos = new Position(this.position);
        platformPos.x += Math.abs(Pawn.size.width - platformSize.width) / 2;
        platformPos.z += Math.abs(Pawn.size.depth - platformSize.depth) / 2;
        platformPos.y += Pawn.size.height;        

        super.draw(platformPos, platformSize);

        platformPos = new Position(this.position);
        platformPos.y += platformSize.height + Pawn.size.height
        platformSize = new Size(30, 20, 30);
        platformPos.x += Math.abs(Pawn.size.width - platformSize.width) / 2;
        platformPos.z += Math.abs(Pawn.size.depth - platformSize.depth) / 2;

        super.draw(platformPos, platformSize);

        platformPos = new Position(this.position);
        platformPos.y += platformSize.height + Pawn.size.height
        platformSize = new Size(30, 10, 30);
        platformPos.x += Math.abs(Pawn.size.width - platformSize.width) / 2;
        platformPos.z += Math.abs(Pawn.size.depth - platformSize.depth) / 2;

        super.draw(platformPos, platformSize);
    }
}

export default Pawn;
