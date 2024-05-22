import figureTypes from "./figureTypes.js";
import ChessPosition from "./chessPosition.js";

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

    static #moves = [];
    static #movesToKill = [];
    
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
        this.#moves = [];
        this.#movesToKill = [];
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

    static #checkPawn (startPosition, endPosition) {
        this.#clearMoveBuffers();
        
        var startFigure = this.#getFigure(startPosition);
        var xMoveDirection = (startFigure.color == 'white') ? -1 : 1;
        var moveRange = (startFigure.moveCount === 0) ? 2 : 1; 
        
        var endTile = this.#desk.get(endPosition);

        this.#check(startPosition, 1, xMoveDirection, -1, 1);
        this.#check(startPosition, 1, xMoveDirection, -1, -1);
        this.#check(startPosition, 1, xMoveDirection, 1, 1);
        this.#check(startPosition, 1, xMoveDirection, 1, -1);
                
        if (this.#movesToKill.includes(endTile)) {
            return true;
        }

        this.#clearMoveBuffers();

        this.#check(startPosition, moveRange, xMoveDirection, -1, 0);
        this.#check(startPosition, moveRange, xMoveDirection, 1, 0);
        
        if (this.#moves.includes(endTile)) {
            return true;
        }

        return false;
    }

    // TODO: не проверял.
    static #checkBishop(startPosition, endPosition) {
        this.#clearMoveBuffers();

        this.#check(startPosition, Infinity, -1, 1, -1);
        this.#check(startPosition, Infinity, -1, 1, 1);
        this.#check(startPosition, Infinity, 1, 1, -1);
        this.#check(startPosition, Infinity, 1, 1, 1);

        this.#check(startPosition, Infinity, -1, -1, -1);
        this.#check(startPosition, Infinity, -1,-1, 1);
        this.#check(startPosition, Infinity, 1, -1, -1);
        this.#check(startPosition, Infinity, 1, -1, 1);

        var endTile = this.#desk.get(endPosition);

        return this.#moves.includes(endTile) || this.#movesToKill.includes(endTile);
    }

    //TODO: не проверял.
    static #checkKing(startPosition, endPosition) {
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

        var endTile = this.#desk.get(endPosition);

        return this.#moves.includes(endTile) || this.#movesToKill.includes(endTile);
    }

    //TODO: не тестировал.
    static #checkQueen(startPosition, endPosition) {
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

        var endTile = this.#desk.get(endPosition);

        return this.#moves.includes(endTile) || this.#movesToKill.includes(endTile);
    }

    static #checkKnight(startPosition, endPosition) {
        
    }
    
    static #checkRook(startPosition, endPosition) {
        this.#clearMoveBuffers();

        this.#check(startPosition, Infinity, 1, -1, 0);
        this.#check(startPosition, Infinity, 1, 1, 0);
        this.#check(startPosition, Infinity, -1, 1, 0);
        this.#check(startPosition, Infinity, -1, -1, 0);

        this.#check(startPosition, Infinity, 0, 1, -1);
        this.#check(startPosition, Infinity, 0, -1, -1);
        this.#check(startPosition, Infinity, 0, 1, 1);
        this.#check(startPosition, Infinity, 0, -1, 1);
    
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
}

export default MoveChecker;
