import Tile from "./tile.js";
import GameObject from "./gameObject.js";

const constants = {
    layersCount: 3,
    deskWidthTiles: 4,
    deskLengthTiles: 4
};

class Desk extends GameObject {
    #desks;

    get(layer, x, z) {
        return this.#desks[layer-1][z-1][x-1];
    }

    constructor(x, y, z, yGap) {
        super(x, y, z);

        this.#desks = []
        this.#desks.push(this.#createLayer(x + Tile.size.width*4, y - 2*yGap, z));
        this.#desks.push(this.#createLayer(x + Tile.size.width*2, y - yGap, z));
        this.#desks.push(this.#createLayer(x, y, z));
    }

    draw() {
        for (var z = 0; z < constants.layersCount; ++z) {

            for (var i = 0; i < constants.deskWidthTiles; ++i) {
                
                for (var j = 0; j < constants.deskLengthTiles; ++j) {
    
                    this.#desks[z][i][j].draw();
                }
            }
        }
    }

    #createLayer(x, y, z) {
        var desk = [];
    
        for (var i = 0; i < constants.deskLengthTiles; ++i) {
            
            var row = [];
            for (var j = 0; j < constants.deskWidthTiles; ++j) {
    
                row.push(
                    new Tile(
                        x + j*Tile.size.width, 
                        y, 
                        z + i*Tile.size.depth, (j+i)%2 == 0 ? 'white' : 'black'
                    )
                );
            }
    
            desk.push(row);
        }
    
        return desk;
    }
}

export default Desk;
