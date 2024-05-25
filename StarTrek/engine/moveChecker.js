import figureTypes from "./figureTypes.js";
import ChessPosition from "./chessPosition.js";

Set.prototype.push = function (element) {
    this.add(element);
};

Set.prototype.concat = function (set) {
    var mergedSet = new Set(this);

    set.forEach((item) => {
        mergedSet.add(item);
    })

    return mergedSet;
};

Set.prototype.includes = function (item) {
    return this.has(item);
};

class MoveChecker {
    static #desk;
    
    static setDesk(desk) {
        this.#desk = desk;
    }

    static #getFigure(position) {
        var figure = this.#desk.get(
            position.layer, 
            position.x, 
            position.z
        ).figure;

        return figure;
    }

    /**
     * 
     * @param {ChessPosition} startPosition - должен иметь в себе layer, x, z
     * @param {ChessPosition} endPosition - должен иметь в себе layer, x, z
     * @returns {boolean} - Возможен ли данный ход
     */
    static checkMove(startPosition, endPosition) {
        var figure = this.#getFigure(startPosition);

        if (!figure || !(figure.type in this.#checkFunc)) {
            alert('Фигура неизвестного типа.');
            return false;
        }

        return this.#checkFunc[figure.type](startPosition, endPosition);
    }

    static #moves = new Set();
    static #movesToKill = new Set();
    
    static #rec(position, range, directionX, directionY, directionZ) {
        if (range == 0) return;
        if (this.#desk.get(position) == null) return;
        if (this.#desk.get(position).figure != null) {
            
            this.#movesToKill.push(this.#desk.get(position));
            return;
        }

        this.#moves.push(this.#desk.get(position));

        var pos1 = new ChessPosition(position);
        pos1.x += directionX;
        pos1.z += directionZ;

        var pos2 = new ChessPosition(position);
        pos2.layer += directionY;
        pos2.x += directionX + 2*(directionY);
        pos2.z += directionZ;

        var pos3 = new ChessPosition(position);
        pos3.layer += directionY * 2;
        pos3.x += directionX + 4*(directionY);
        pos3.z += directionZ;

        this.#rec(pos1, range - 1, directionX, directionY, directionZ);
        this.#rec(pos2, range - 1, directionX, directionY, directionZ);
        this.#rec(pos3, range - 1, directionX, directionY, directionZ);
    }

    static #colorise(tiles) {
        tiles.forEach(e => e.color = '');
    }

    static #clearMoveBuffers() {
        this.#moves.clear();
        this.#movesToKill.clear();
    }

    static #check(startPosition, range, directionX, directionY, directionZ) {
        var pos1 = new ChessPosition(startPosition);
        pos1.x += directionX;
        pos1.z += directionZ;

        var pos2 = new ChessPosition(startPosition);
        pos2.layer += 1*directionY;
        pos2.x += directionX + 2*(directionY);
        pos2.z += directionZ;

        var pos3 = new ChessPosition(startPosition);
        pos3.layer += 2*directionY;
        pos3.x += directionX + 4*(directionY);
        pos3.z += directionZ;

        this.#rec(pos1, range, directionX, directionY, directionZ);
        this.#rec(pos2, range, directionX, directionY, directionZ);
        this.#rec(pos3, range, directionX, directionY, directionZ);
    }

    static getPawnValidMoves(startPosition) {
        this.#clearMoveBuffers();
        
        var enableMoves = new Set();
        var startFigure = this.#getFigure(startPosition);
        var xMoveDirection = (startFigure.color == 'white') ? -1 : 1;
        var moveRange = (startFigure.moveCount === 0) ? 2 : 1; 

        this.#check(startPosition, 1, xMoveDirection, -1, 1);
        this.#check(startPosition, 1, xMoveDirection, -1, -1);
        this.#check(startPosition, 1, xMoveDirection, 1, 1);
        this.#check(startPosition, 1, xMoveDirection, 1, -1);

        enableMoves = enableMoves.concat(this.#movesToKill);

        this.#clearMoveBuffers();

        this.#check(startPosition, moveRange, xMoveDirection, -1, 0);
        this.#check(startPosition, moveRange, xMoveDirection, 1, 0);

        enableMoves = enableMoves.concat(this.#moves);
        
        return enableMoves;
    }

    static #checkPawn (startPosition, endPosition) {
        var endTile = this.#desk.get(endPosition);

        var moves = this.getPawnValidMoves(startPosition);

        return moves.includes(endTile);
    }

    static getBishopValidMoves(startPosition) {
        this.#clearMoveBuffers();

        this.#check(startPosition, Infinity, -1, 1, -1);
        this.#check(startPosition, Infinity, -1, 1, 1);
        this.#check(startPosition, Infinity, 1, 1, -1);
        this.#check(startPosition, Infinity, 1, 1, 1);

        this.#check(startPosition, Infinity, -1, -1, -1);
        this.#check(startPosition, Infinity, -1,-1, 1);
        this.#check(startPosition, Infinity, 1, -1, -1);
        this.#check(startPosition, Infinity, 1, -1, 1);

        return this.#moves.concat(this.#movesToKill);
    }

    static #checkBishop(startPosition, endPosition) {
        this.getBishopValidMoves(startPosition);

        var endTile = this.#desk.get(endPosition);

        return this.#moves.includes(endTile) || this.#movesToKill.includes(endTile);
    }

    static getKingValidMoves(startPosition) {
        this.#clearMoveBuffers();

        this.#check(startPosition, 1, -1, 1, -1);
        this.#check(startPosition, 1, -1, 1, 1);
        this.#check(startPosition, 1, 1, 1, -1);
        this.#check(startPosition, 1, 1, 1, 1);

        this.#check(startPosition, 1, -1, -1, -1);
        this.#check(startPosition, 1, -1,-1, 1);
        this.#check(startPosition, 1, 1, -1, -1);
        this.#check(startPosition, 1, 1, -1, 1);

        this.#check(startPosition, 1, 1, -1, 0);
        this.#check(startPosition, 1, 1, 1, 0);
        this.#check(startPosition, 1, -1, 1, 0);
        this.#check(startPosition, 1, -1, -1, 0);

        this.#check(startPosition, 1, 0, 1, -1);
        this.#check(startPosition, 1, 0, -1, -1);
        this.#check(startPosition, 1, 0, 1, 1);
        this.#check(startPosition, 1, 0, -1, 1);

        return this.#moves.concat(this.#movesToKill);
    }

    static #checkKing(startPosition, endPosition) {
        this.getKingValidMoves(startPosition);

        var endTile = this.#desk.get(endPosition);

        return this.#moves.includes(endTile) || this.#movesToKill.includes(endTile);
    }

    static getQueenValidMoves(startPosition) {
        this.#clearMoveBuffers();

        this.#check(startPosition, Infinity, -1, 1, -1);
        this.#check(startPosition, Infinity, -1, 1, 1);
        this.#check(startPosition, Infinity, 1, 1, -1);
        this.#check(startPosition, Infinity, 1, 1, 1);

        this.#check(startPosition, Infinity, -1, -1, -1);
        this.#check(startPosition, Infinity, -1,-1, 1);
        this.#check(startPosition, Infinity, 1, -1, -1);
        this.#check(startPosition, Infinity, 1, -1, 1);

        this.#check(startPosition, Infinity, 1, -1, 0);
        this.#check(startPosition, Infinity, 1, 1, 0);
        this.#check(startPosition, Infinity, -1, 1, 0);
        this.#check(startPosition, Infinity, -1, -1, 0);

        this.#check(startPosition, Infinity, 0, 1, -1);
        this.#check(startPosition, Infinity, 0, -1, -1);
        this.#check(startPosition, Infinity, 0, 1, 1);
        this.#check(startPosition, Infinity, 0, -1, 1);

        return this.#moves.concat(this.#movesToKill);
    }

    static #checkQueen(startPosition, endPosition) {
        this.getQueenValidMoves(startPosition);

        var endTile = this.#desk.get(endPosition);

        return this.#moves.includes(endTile) || this.#movesToKill.includes(endTile);
    }

    static getKnightValidMoves(startPosition) {
        this.#clearMoveBuffers();
        var dx = [ 2, 2, 1, 1, -1, -1, -2, -2 ];
        var dz = [ 1, -1, 2, -2, 2, -2, 1, -1 ];
        var dy = [-1, 0, 1];

        for (var i = 0; i < 8; ++i) {
            for (var j = 0; j < 3; ++j) {

                var tile = this.#desk.get(
                    parseInt(startPosition.layer) + dy[j], 
                    parseInt(startPosition.x) + (dx[i] + 2*dy[j]),
                    parseInt(startPosition.z) + dz[i]
                );
    
                if (tile == null) continue;
                if (tile.figure != null) {
                    this.#movesToKill.push(tile);
                    continue;
                }
    
                this.#moves.push(tile);
            }
        }
        this.#colorise(this.#moves.concat(this.#movesToKill));
        return this.#moves.concat(this.#movesToKill);
    }

    static #checkKnight(startPosition, endPosition) {
        this.getKnightValidMoves(startPosition);

        var endTile = this.#desk.get(endPosition);

        return this.#moves.includes(endTile) || this.#movesToKill.includes(endTile);
    }

    static getRookValidMoves(startPosition) {
        this.#clearMoveBuffers();

        this.#check(startPosition, Infinity, 1, -1, 0);
        this.#check(startPosition, Infinity, 1, 1, 0);
        this.#check(startPosition, Infinity, -1, 1, 0);
        this.#check(startPosition, Infinity, -1, -1, 0);

        this.#check(startPosition, Infinity, 0, 1, -1);
        this.#check(startPosition, Infinity, 0, -1, -1);
        this.#check(startPosition, Infinity, 0, 1, 1);
        this.#check(startPosition, Infinity, 0, -1, 1);

        return this.#moves.concat(this.#movesToKill);
    }
    
    static #checkRook(startPosition, endPosition) {
        this.getRookValidMoves(startPosition);

        var endTile = this.#desk.get(endPosition);

        return this.#moves.includes(endTile) || this.#movesToKill.includes(endTile); 
    }
    
    static #checkFunc = {
        [figureTypes.Pawn]: (startPosition, endPosition) => 
            this.#checkPawn(startPosition, endPosition),
    
        [figureTypes.Bishop]: (startPosition, endPosition) => 
            this.#checkBishop(startPosition, endPosition),
    
        [figureTypes.King]: (startPosition, endPosition) => 
            this.#checkKing(startPosition, endPosition),
    
        [figureTypes.Queen]: (startPosition, endPosition) => 
            this.#checkQueen(startPosition, endPosition),
    
        [figureTypes.Knight]: (startPosition, endPosition) => 
            this.#checkKnight(startPosition, endPosition),
    
        [figureTypes.Rook]: (startPosition, endPosition) => 
            this.#checkRook(startPosition, endPosition)
    }

    static getMoves(fromTile) {
        var tilePos = this.#desk.getTilePosition(fromTile);

        return this.#getMoves[fromTile.figure.type](tilePos);
    }

    static #getMoves = {
        [figureTypes.Pawn]: (startPosition) => 
            this.getPawnValidMoves(startPosition),
    
        [figureTypes.Bishop]: (startPosition) => 
            this.getBishopValidMoves(startPosition),
    
        [figureTypes.King]: (startPosition) => 
            this.getKingValidMoves(startPosition),
    
        [figureTypes.Queen]: (startPosition) => 
            this.getQueenValidMoves(startPosition),
    
        [figureTypes.Knight]: (startPosition) => 
            this.getKnightValidMoves(startPosition),
    
        [figureTypes.Rook]: (startPosition) => 
            this.getRookValidMoves(startPosition)
    }
}

export default MoveChecker;
