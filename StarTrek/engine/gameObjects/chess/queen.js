import Figure from "../figure.js";
import figureTypes from "../../types/figureTypes.js";
import Size from "../../types/size.js";
import Position from "../../types/position.js";

class Queen extends Figure {
    constructor (x, y, z, color) {
        super(x, y, z, color, figureTypes.Queen);
    }

    static size = new Size(5, 60, 5);

    draw() {
        var size = Queen.size;
        var platformGape = 10;

        super.draw();

        var platformSize = new Size(40, 10, 40);
        var platformPos = new Position(this.position);

        platformPos.x -= Math.abs(size.width - platformSize.width)/2;
        platformPos.z -= Math.abs(size.depth - platformSize.depth)/2;

        super.draw(platformPos, platformSize);
        
        platformPos = new Position(this.position);
        platformPos.y += platformSize.height + platformGape;

        platformSize = new Size(30, 10, 30);
        
        platformPos.x -= Math.abs(size.width - platformSize.width)/2;
        platformPos.z -= Math.abs(size.depth - platformSize.depth)/2;
        
        super.draw(platformPos, platformSize);

        platformPos = new Position(this.position);
        platformPos.y += platformSize.height*2 + platformGape*2;

        platformSize = new Size(20, 10, 20);
        
        platformPos.x -= Math.abs(size.width - platformSize.width)/2;
        platformPos.z -= Math.abs(size.depth - platformSize.depth)/2;
        
        super.draw(platformPos, platformSize);  
        
        platformPos = new Position(this.position);
        platformPos.y += Queen.size.height;
        
        platformSize = new Size(15, 15, 15);
        platformPos.x -= Math.abs(Queen.size.width - platformSize.width)/2;
        platformPos.z -= Math.abs(Queen.size.depth - platformSize.depth)/2;
        
        super.draw(platformPos, platformSize);  
    }
}

export default Queen;
