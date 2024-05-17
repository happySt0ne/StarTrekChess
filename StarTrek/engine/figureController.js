import { 
    isFocusInInputElement,
    containsOnlyDigits
} from '../supportStuff/usefullFunctions.js';

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

        var fromTile = this.#desk.get(from[0], from[1], from[2]);
        var toTile = this.#desk.get(to[0], to[1], to[2]);
        
        var figureToMove = fromTile.figure;

        if (figureToMove == null || toTile.figure != null) {

            alert('Вы пытаетесь сделать недопустимый ход.')
            return;
        }

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
            from: input[0],
            to: input[1]
        };
    }
}

export default FigureController;
