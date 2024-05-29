class FigureArranger {
    static #desk;

    static #figures = {
        ['white']: [],
        ['black']: []
    };

    static setDesk(desk) {
        if (this.#desk != null || desk == null) return;
        this.#desk = desk;
    }

    static setFigures(figuresArray) {
        this.#figures[figuresArray[0].color] = figuresArray;
    }

    static arrangeAll() {
        this.#arrangePawns('black');
        this.#arrangePawns('white');

        this.#arrangeKnights('black');
        this.#arrangeKnights('white');

        this.#arrangeBishops('black');
        this.#arrangeBishops('white');

        this.#arrangeRooks('black');
        this.#arrangeRooks('white');

        this.#arrangeQueens();
        this.#arrangeKings();
    }

    static #arrangeKings() {
        this.#desk.get(2, 10, 5).setFigure(this.#figures['white'][15]);
        this.#desk.get(4, 1, 2).setFigure(this.#figures['black'][15]);        
    }

    static #arrangeQueens() {
        this.#desk.get(4, 1, 5).setFigure(this.#figures['black'][14]);
        this.#desk.get(2, 10, 2).setFigure(this.#figures['white'][14]);        
    }

    static #arrangeRooks(color) {
        var layer = (color == 'black') ? 4 : 2;
        var x = (color == 'black') ? 1 : 10;
    
        this.#desk.get(layer, x, 1).setFigure(this.#figures[color][8]);
        this.#desk.get(layer, x, 6).setFigure(this.#figures[color][9]);   
    }

    static #arrangeBishops(color) {
        var layer = (color == 'black') ? 3 : 1;
        var x = (color == 'black') ? 2 : 9;
    
        this.#desk.get(layer, x, 3).setFigure(this.#figures[color][10]);
        this.#desk.get(layer, x, 4).setFigure(this.#figures[color][11]);        
    }

    static #arrangeKnights(color) {
        var layer = (color == 'black') ? 3 : 1;
        var x = (color == 'black') ? 2 : 9;

        this.#desk.get(layer, x, 2).setFigure(this.#figures[color][12]);
        this.#desk.get(layer, x, 5).setFigure(this.#figures[color][13]);
    }

    static #arrangePawns(color) {
        var layer = (color == 'black') ? 3 : 1;
        var x = (color == 'black') ? 3 : 8;

        var k = 0;
        for (var i = 2; i < 6; ++i) {
            
            this.#desk.get(layer, x, i).setFigure(this.#figures[color][k++]);
        }
        
        layer++;
        x = (color == 'black') ? 2 : 9;

        this.#desk.get(layer, x, 1).setFigure(this.#figures[color][4]);
        this.#desk.get(layer, x, 2).setFigure(this.#figures[color][5]);

        this.#desk.get(layer, x, 5).setFigure(this.#figures[color][6]);
        this.#desk.get(layer, x, 6).setFigure(this.#figures[color][7]);
    }
}

export default FigureArranger;
