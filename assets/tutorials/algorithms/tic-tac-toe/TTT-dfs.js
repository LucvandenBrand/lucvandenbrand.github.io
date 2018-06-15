const ID_PLAYING_FIELD = "playing-field";

function remove(array, element) {
    return array.filter(e => e !== element);
}

/**
 * Tic-Tac-Toe playing grid.
 * @param {HTMLELement} container Element to put the grid into.
 **/
const Grid = function(container) {
    const ATTRIBUTE_MARK = "mark",
          EMPTY_MARK = -1;
    const SIZE = 3;
    const _cells = Array(SIZE*SIZE);

    const construct = () => {
        for (let index = 0; index < SIZE * SIZE; index++) {
            const cell = document.createElement('div');
            cell.setAttribute(ATTRIBUTE_MARK, EMPTY_MARK);
            _cells[index] = cell;
            container.appendChild(cell);
        }
    };

    const flattenIndex = (row, col) => {
        return SIZE * row + col;
    };

    /**
     * Mark a cell with a given value.
     * @param {Number} row The row of the grid.
     * @param {Number} col The col of the grid.
     * @param {Number} mark Mark to give to the cell.
     **/
    this.markCell = (row, col, mark) => {
        _cells[flattenIndex(row, col)].setAttribute(ATTRIBUTE_MARK, mark);
    };

    /**
     * Return the mark of the cell.
     * @param {Number} row The row of the grid.
     * @param {Number} col The col of the grid.
     * @returns {Number} The mark of the cell.
     **/
    this.getCellMark = (row, col) => {
        return Number(_cells[flattenIndex(row, col)].getAttribute(ATTRIBUTE_MARK));
    };

    this.unmarkCell = (row, col) => {
        this.markCell(row, col, EMPTY_MARK);
    };

    this.getUnmarked = () => {
        const unmarked = [];
        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                if (this.getCellMark(row, col) === EMPTY_MARK)
                    unmarked.push({row, col});
            }
        }
        return unmarked;
    }

    /**
     * Bind a click method to each cell.
     * @param {function} onClick Callback method for when the cell is clicked.
     **/
    this.onCellClick = onClick => {
        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                const cell = _cells[flattenIndex(row, col)];
                cell.onclick = () => { onClick(row, col) };
            }
        }
    };

    /**
     * Return the size of the grid.
     * @returns {Number} Size of the grid.
     **/
    this.getSize = () => SIZE;

    construct();
};

const TicTacToeGrid = function(grid) {
    const size = grid.getSize();

    const checkWinRow = (row, mark) => {
        for (let col = 0; col < size; col++) {
            if (grid.getCellMark(row, col) !== mark)
                return false;
        }
        return true;
    };

    const checkWinRows = mark => {
        let win = false;
        for (let row = 0; row < size; row++) {
            if (checkWinRow(row, mark))
                win = true;
        }
        return win;
    };

    const checkWinCol = (col, mark) => {
        for (let row = 0; row < size; row++) {
            if (grid.getCellMark(row, col) !== mark)
                return false;
        }
        return true;
    };

    const checkWinCols = mark => {
        let win = false;
        for (let col = 0; col < size; col++) {
            if (checkWinCol(col, mark))
                win = true;
        }

        return win;
    };

    const checkWinDiags = mark => {
        let winLeftDiag = true;
        let winRightDiag = true;
        for (let rowCol = 0; rowCol < size; rowCol++) {
            if (grid.getCellMark(rowCol, rowCol) !== mark)
                winLeftDiag = false;
            if (grid.getCellMark(rowCol, size - rowCol - 1) !== mark)
                winRightDiag = false;
        }
        return winLeftDiag || winRightDiag;
    };

    /**
     * Return if the mark has won in rows, cols or diagonals.
     * @returns {Boolean} True if the mark has won.
     **/
    this.checkWin = mark => {
        return checkWinRows(mark) || checkWinCols(mark) || checkWinDiags(mark);
    };

    /**
     * Return the used grid.
     * @returns {Grid} The used grid.
     **/
    this.getGrid = () => grid;
};

const TicTacToeGame = function(ticTacToeGrid) {
    const AI_SPEED = 0;
    const HUMAN = 0, AI = 1, NEITHER = -1;
    const _grid = ticTacToeGrid.getGrid();
    let _currentPlayer = HUMAN;

    const setMark = (option, mark) => {
        return new Promise(resolve => {
            _grid.markCell(option.row, option.col, mark);
            setTimeout(resolve, AI_SPEED);
        });
    };

    const Result = function(score, row = -1, col = -1) {
        this.score = score;
        this.row = row;
        this.col = col;
    };

    async function findBestMove(player) {
        if (ticTacToeGrid.checkWin(HUMAN))
            return new Result(1);
        if (ticTacToeGrid.checkWin(AI))
            return new Result(-1);

        const options = _grid.getUnmarked();

        if (options.length === 0)
            return new Result(0);

        let curResult;
        if (player == HUMAN)
            curResult = new Result(-1);
        else
            curResult = new Result(1);

        for (let option of options) {
            await setMark(option, player);
            const result = await findBestMove(player ^ 1);
            _grid.unmarkCell(option.row, option.col);

            if ((player == HUMAN && result.score > curResult.score) ||
                (player == AI && result.score < curResult.score)) {
                    curResult = new Result(result.score, option.row, option.col);
                }
        }

        return curResult;
    }

    async function computerMove() {
        const move = await findBestMove(AI);

        if (move.row > 0 && move.col > 0) {
            _grid.markCell(move.row, move.col, AI);
        }

        _currentPlayer = HUMAN;
    };

    const onClick = (row, col) => {
        if (_currentPlayer != HUMAN)
            return;

        _grid.markCell(row, col, HUMAN);

        _currentPlayer = AI;
        computerMove();
    };

    _grid.onCellClick(onClick);
};

const grid = new Grid(document.getElementById(ID_PLAYING_FIELD));
const ticTacToeGrid = new TicTacToeGrid(grid);
new TicTacToeGame(ticTacToeGrid);
