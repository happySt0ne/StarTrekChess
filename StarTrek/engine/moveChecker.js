import figureTypes from "./figureTypes.js";

class MoveChecker {
    static #desk;
    
    static setDesk(desk) {
        this.#desk = desk;
    }

    static #getFigure(startPosition) {
        var figure = this.#desk.get(
            startPosition.layer, 
            startPosition.x, 
            startPosition.z
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
        
        if (!!figure && figure.type in checkFunc) {

            var result = checkFunc[figure.type](startPosition, endPosition, figure);
        } else {
            alert('Фигура неизвестного типа.');
            return false;
        }

        console.log(result);
        return result;
    }
}

const checkFunc = {
    [figureTypes.Pawn]: (startPosition, endPosition, figure) => 
        checkPawn(startPosition, endPosition, figure),

    [figureTypes.Bishop]: (startPosition, endPosition, figure) => 
        checkBishop(startPosition, endPosition, figure),

    [figureTypes.King]: (startPosition, endPosition, figure) => 
        checkKing(startPosition, endPosition, figure),

    [figureTypes.Queen]: (startPosition, endPosition, figure) => 
        checkQueen(startPosition, endPosition, figure),

    [figureTypes.Knight]: (startPosition, endPosition, figure) => 
        checkKnight(startPosition, endPosition, figure),

    [figureTypes.Rook]: (startPosition, endPosition, figure) => 
        checkRook(startPosition, endPosition, figure)
}

function checkPawn(startPosition, endPosition, figure) {
    return 'pizdec2321';
}

function checkBishop(startPosition, endPosition, figure) {
    
}
function checkKing(startPosition, endPosition, figure) {
    
}
function checkQueen(startPosition, endPosition, figure) {
    
}
function checkKnight(startPosition, endPosition, figure) {
    
}
function checkRook(startPosition, endPosition, figure) {
    
}



export default MoveChecker;
