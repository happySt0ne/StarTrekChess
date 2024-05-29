import FigureController from "./figureController.js";
import cameraController from "./cameraController.js";
import GameObject from "./gameObjects/gameObject.js";
import Desk from "./gameObjects/desk.js";
import Figure from "./gameObjects/figure.js";
import figureTypes from "./types/figureTypes.js";
import SoundsPlayer from "./soundsPlayer.js";
import King from "./gameObjects/chess/king.js";
import FigureFactory from "./figureFactory.js";

class Game {
    static #gameInstance;
    #whiteFigures = [];
    #blackFigures = [];
    #desk;

    static getInstance() {
        return this.#gameInstance;
    }


    getFigures(color) {
        var result = (color == 'black') ? this.#blackFigures : this.#whiteFigures;
        return result.filter(f => f.isAlive);
    }

    #setupGame(setupData) {
        FigureController.setupUiController();

        cameraController.enableCameraController();

        GameObject.setBuffers(setupData.positionBuffer, setupData.colorBuffer);
        GameObject.setMatrixLocation(setupData.matrixLocation);
    }

    #createDesk() {
        this.#desk = new Desk(-300, 200, -500, 150);

        FigureController.setDesk(this.#desk);
    }

    #createFigures() {
        this.#whiteFigures.push(FigureFactory.createFigure(figureTypes.King, 'white'));

        this.#blackFigures.push(FigureFactory.createFigure(figureTypes.Pawn, 'black'));
        this.#blackFigures.push(FigureFactory.createFigure(figureTypes.King, 'black'));
    }

    #arrangeFigures() {
        this.#desk.get(1, 8, 4).setFigure(this.#whiteFigures[0]);

        this.#desk.get(2, 9, 5).setFigure(this.#blackFigures[0]);
        this.#desk.get(3, 3, 2).setFigure(this.#blackFigures[1]);
    }

    constructor(setupData) {
        if (Game.#gameInstance != null) return Game.#gameInstance;
        Game.#gameInstance = this;

        this.#setupGame(setupData);
        this.#createDesk();
        this.#createFigures();
        this.#arrangeFigures();

        SoundsPlayer.playAmbient();
    }

    draw() {
        this.#desk.draw();
        this.#blackFigures.forEach(f => f.draw());
        this.#whiteFigures.forEach(f => f.draw());
    }
}

export default Game;
