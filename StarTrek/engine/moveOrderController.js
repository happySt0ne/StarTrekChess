import Figure from "./gameObjects/figure.js";

class MoveOrderController {
    static #isWhiteMove = true;

    static get PlayerTurn() {
        return this.#isWhiteMove ? 'white' : 'black';
    }

    static changeTurn() {
        this.#isWhiteMove = !this.#isWhiteMove;
    }

    static isValidTurn(figure) {
        if (!(figure instanceof Figure) || figure == null) {
        
            alert('вы не выбрали фигуру для хода.');
            return;
        }

        return figure.color === this.PlayerTurn
    }
}

export default MoveOrderController;
