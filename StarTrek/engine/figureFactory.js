import King from "./gameObjects/chess/king.js";
import Queen from "./gameObjects/chess/queen.js";
import Rook from "./gameObjects/chess/rook.js";
import Bishop from "./gameObjects/chess/bishop.js";
import Knight from "./gameObjects/chess/knight.js";
import Pawn from "./gameObjects/chess/pawn.js";

import figureTypes from "./types/figureTypes.js";

class FigureFactory {
    static createFigure(figureType, color) {
        return this.#createFigure[figureType](color);
    }

    static #createFigure = {
        [figureTypes.King]: (color) => this.#createKing(color),
        [figureTypes.Queen]: (color) => this.#createQueen(color),
        [figureTypes.Rook]: (color) => this.#createRook(color),
        [figureTypes.Bishop]: (color) => this.#createBishop(color),
        [figureTypes.Knight]: (color) => this.#createKnight(color),
        [figureTypes.Pawn]: (color) => this.#createPawn(color),
    };

    static #createKing = (color) => new King(0, 0, 0, color);
    static #createQueen = (color) => new Queen(0, 0, 0, color);
    static #createRook = (color) => new Rook(0, 0, 0, color);
    static #createBishop = (color) => new Bishop(0, 0, 0, color)
    static #createKnight = (color) => new Knight(0, 0, 0, color);
    static #createPawn = (color) => new Pawn(0, 0, 0, color);
}

export default FigureFactory;
