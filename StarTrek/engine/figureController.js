import { isFocusInInputElement } from '../supportStuff/usefullFunctions.js';
import Desk from './gameObjects/desk.js';

const moveInput = document.getElementById('moveInput');

class FigureController {
    static #desk;

    static setDesk(desk) {
        FigureController.#desk = desk; 
    }

    static setupUiController() {
        document.addEventListener('keydown', (event) => {
            var isEnterPressed = event.key === 'Enter';
            var isEscapePressed = event.key === 'Escape';
            var isMoveInputFocused = isFocusInInputElement('moveInput');

            if (isEscapePressed && isMoveInputFocused) {

                moveInput.blur();
            } else if (isEnterPressed && isMoveInputFocused) {
        
                moveInput.blur();
                this.#makeMove(moveInput.value);
                this.#clearInput();
            } else if (isEnterPressed) {
        
                moveInput.focus();
            }
        });
    };

    static #clearInput() {
        moveInput.value = '';
    }

    static #makeMove(input) {
        var parsedInput = this.#parseMoveInput(input);
        var from = parsedInput.from;
        var to = parsedInput.to; 

        var fromTile = this.#desk.get(from[0], from[1], from[2]);
        fromTile.color = '';
        var toTile = this.#desk.get(to[0], to[1], to[2]);
        toTile.color = '';

        //TODO: осталось сделать само передвижение. Для этого я думаю можно ебануть
        // функцию в доске чтобы "убирать" фигуру с определённого тайла.
    }

    static #parseMoveInput(input) {
        input = input.trim().replace(/\s+/g, ' ').split(' ');
        //TODO: добавь проверку на ввод.   
        return {
            from: input[0],
            to: input[1]
        };
    }
}

export default FigureController;
