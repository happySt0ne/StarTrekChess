import { 
    isFocusInInputElement,
    containsOnlyDigits
} from '../supportStuff/usefullFunctions.js';
import MoveChecker from './moveChecker.js';

const moveInput = document.getElementById('moveInput');

class FigureController {
    static #desk;

    static setDesk(desk) {
        this.#desk = desk; 
        MoveChecker.setDesk(desk);
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
        if (!parsedInput) {
            
            alert(`
                Введите корректные координаты.
                Сначала вводятся координаты клетки с 
                которой нужно сделать ход
                затем координаты клетки, 
                куда нужно передвинуть. Cначала 
                вводится уровень доски (1-самая нижняя), 
                затем x координата, после чего z.
                Пример: 111 222`
            );
            return;
        }

        var from = parsedInput.from;
        var to = parsedInput.to; 

        var fromTile = this.#desk.get(from.layer, from.x, from.z);
        var toTile = this.#desk.get(to.layer, to.x, to.z);
        
        MoveChecker.checkMove(from, to);

        var figureToMove = fromTile.figure;

        fromTile.figure = null;
        toTile.figure = figureToMove;
    }

    static #parseMoveInput(input) {
        input = input.trim().replace(/\s+/g, ' ').split(' ');

        if (input == '' || input == null || input.length < 2 
            || input[0].length < 3 || input[1].length < 3
            || !containsOnlyDigits(input[0])
            || !containsOnlyDigits(input[1])) {

            return false;
        }

        return {
            from: {
                layer: input[0][0],
                x: input[0][1],
                z: input[0][2]
            },
            to: {
                layer: input[1][0],
                x: input[1][1],
                z: input[1][2]
            }
        };
    }
}

export default FigureController;
