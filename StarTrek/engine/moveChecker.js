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
     * @param {Object} startPosition - должен иметь в себе layer, x, z
     * @param {Object} endPosition - должен иметь в себе layer, x, z
     * @returns {boolean} - Возможен ли данный ход
     */
    static checkMove(startPosition, endPosition) {
        var figure = this.#getFigure(startPosition);

        if (!!figure && figure.type in this.#checkFunc) {

            var result = this.#checkFunc[figure.type](startPosition, endPosition);
        } else {
            alert('Фигура неизвестного типа.');
            return false;
        }

        return result;
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
        pos2.layer += directionY * 1;
        pos2.x += directionX + 2*(-directionX);
        pos2.z += directionZ;

        var pos3 = new ChessPosition(position);
        pos3.layer += directionY * 2;
        pos3.x += directionX + 4*(-directionX);
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
        pos2.x += directionX + 2*(-directionX);
        pos2.z += directionZ;

        var pos3 = new ChessPosition(startPosition);
        pos3.layer += 2*directionY;
        pos3.x += directionX + 4*(-directionX);
        pos3.z += directionZ;

        this.#rec(pos1, range, directionX, directionY, directionZ);
        this.#rec(pos2, range, directionX, directionY, directionZ);
        this.#rec(pos3, range, directionX, directionY, directionZ);
    }

    static #checkPawn (startPosition, endPosition) {
        // var directionX = -1;
        // var directionY = 1;
        // var directionZ = -1;

        // var pos1 = new ChessPosition(startPosition);
        // pos1.x += directionX;
        // pos1.z += directionZ;

        // var pos2 = new ChessPosition(startPosition);
        // pos2.layer += 1*directionY;
        // pos2.x += directionX + 2*(-directionX);
        // pos2.z += directionZ;

        // var pos3 = new ChessPosition(startPosition);
        // pos3.layer += 2*directionY;
        // pos3.x += directionX + 4*(-directionX);
        // pos3.z += directionZ;

        // var range = Infinity;

        // this.#rec(pos1, range, directionX, directionY, directionZ);
        // this.#rec(pos2, range, directionX, directionY, directionZ);
        // this.#rec(pos3, range, directionX, directionY, directionZ);

        // this.#check(startPosition, Infinity, -1, 1, -1);
        // this.#check(startPosition, Infinity, -1, 1, 1);
        // this.#check(startPosition, Infinity, 1, 1, -1);
        // this.#check(startPosition, Infinity, 1, 1, 1);

        this.#check(startPosition, Infinity, -1, 1, 0);
        // this.#check(startPosition, Infinity, 0, 1, -1);
        this.#check(startPosition, Infinity, 1, -1, 0);
        // this.#check(startPosition, Infinity, 0, 1, 1);

        this.#colorise(this.#moves);
        this.#colorise(this.#movesToKill);
    }

    // static #checkPawn(startPosition, endPosition) { 
    //     var startFigure = this.#getFigure(startPosition);
    //     var moveDirection = (startFigure.color == 'white') ? -1 : 1;
    //     var enableMoves = [];
        
    //     let positionToCheck = {
    //         layer: startPosition.layer,
    //         x: parseInt(startPosition.x) + moveDirection,
    //         z: startPosition.z
    //     };

    //     if (startFigure.moveCount == 0) {

    //         var moveXInfo = this.#checkXEnableMoves(positionToCheck, 3, moveDirection);
    //     } else {
    //         var moveXInfo = this.#checkXEnableMoves(positionToCheck , 1, moveDirection);
    //     }

    //     enableMoves = enableMoves.concat(moveXInfo.enableMoves);
        
    //     var moveDiagInfo = this.#checkDiagEnableMoves(startPosition, 1, moveDirection, -1);
    //     if (moveDiagInfo.moveToKill != null) {
    //         enableMoves.push(moveDiagInfo.moveToKill);
    //     }

    //     moveDiagInfo = this.#checkDiagEnableMoves(startPosition, 1, moveDirection, 1);
    //     if (moveDiagInfo.moveToKill != null) {
    //         enableMoves.push(moveDiagInfo.moveToKill);
    //     }

    //     enableMoves.forEach(x => x.color = '');

    //     var endTile = this.#desk.get(endPosition);

    //     if (enableMoves.includes(endTile)) {
    //         return true;
    //     } 

    //     return false;
    // }
    
    static #checkBishop(startPosition, endPosition) {
        
    }
    static #checkKing(startPosition, endPosition) {
        
    }
    static #checkQueen(startPosition, endPosition) {
        
    }
    static #checkKnight(startPosition, endPosition) {
        
    }
    static #checkRook(startPosition, endPosition) {
        
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
