import Figure from "../figure.js";
import figureTypes from "../../types/figureTypes.js";
import Size from "../../types/size.js";
import Position from "../../types/position.js";

class Knight extends Figure {
    constructor (x, y, z, color) {
        super(x, y, z, color, figureTypes.Knight);
    }

    static size = new Size(50, 5, 50);

    draw() {
        var direction = (this.color == 'black' ? 1 : -1);

        super.draw();

        var platformSize = new Size(20, 40, 10);
        var platformPos = new Position(this.position);
        platformPos.x += Math.abs(Knight.size.width - platformSize.width) / 2;
        platformPos.z += Math.abs(Knight.size.depth - platformSize.depth) / 2;
        platformPos.y += Knight.size.height;        

        super.draw(platformPos, platformSize);

        platformPos = new Position(this.position);
        platformPos.y += platformSize.height + Knight.size.height
        platformSize = new Size(30, 25, 20);
        platformPos.x += Math.abs(Knight.size.width - platformSize.width) / 2;
        platformPos.z += Math.abs(Knight.size.depth - platformSize.depth) / 2;

        super.draw(platformPos, platformSize);

        if (direction > 0) {
            platformPos.x += platformSize.width;
        } 

        platformSize = new Size(20, 15, 20);

        if (direction < 0) {
            platformPos.x -= platformSize.width;
        }
        
        super.draw(platformPos, platformSize);

    }
}

export default Knight;
