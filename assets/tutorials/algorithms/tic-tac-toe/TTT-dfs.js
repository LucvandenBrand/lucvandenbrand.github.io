const ID_PLAYING_FIELD = "playing-field";
const HUMAN = 0, AI = 1;

/**
 * Remove an element from the array.
 * @returns {*[]} Array with the element removed.
 **/
const remove = (array, element) => {
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

    this.isEmpty = (row, col) => {
        return this.getCellMark(row, col) === EMPTY_MARK;
    }

    this.getUnmarked = () => {
        const unmarked = [];
        for (let row = 0; row < SIZE; row++) {
            for (let col = 0; col < SIZE; col++) {
                if (this.isEmpty(row, col))
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
                cell.onclick = () => {
                    onClick(row, col)
                };
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

/**
 * Class checking win-conditions.
 **/
const TicTacToeGrid = function(grid) {
    const size = grid.getSize();

    const evaluateRow = row => {
        let winHuman = true;
        let winAI    = true;
        for (let col = 0; col < size; col++) {
            let mark = grid.getCellMark(row, col);
            winHuman &= (mark === HUMAN);
            winAI    &= (mark === AI);
        }
        return (winHuman ? 1 : 0) + (winAI ? -1 : 0);
    };

    const evaluateRows = () => {
        let score = 0;
        for (let row = 0; row < size; row++) {
            score += evaluateRow(row);
        }
        return score;
    };

    const evaluateCol = col => {
        let winHuman = true;
        let winAI    = true;
        for (let row = 0; row < size; row++) {
            let mark = grid.getCellMark(row, col);
            winHuman &= (mark === HUMAN);
            winAI    &= (mark === AI);
        }
        return (winHuman ? 1 : 0) + (winAI ? -1 : 0);
    };

    const evaluateCols = () => {
        let score = 0;
        for (let col = 0; col < size; col++) {
            score += evaluateCol(col);
        }
        return score;
    };

    const evaluateDiags = () => {
        let leftWinHuman = true, leftWinAI = true;
        let rightWinHuman = true, rightWinAI = true;
        for (let rowCol = 0; rowCol < size; rowCol++) {
            let leftMark = grid.getCellMark(rowCol, rowCol);
            leftWinHuman &= (leftMark === HUMAN);
            leftWinAI    &= (leftMark === AI);

            let rightMark = grid.getCellMark(rowCol, size - 1 - rowCol);
            rightWinHuman &= (rightMark === HUMAN);
            rightWinAI    &= (rightMark === AI);
        }

        let scoreLeftDiag  = (leftWinHuman ? 1 : 0) + (leftWinAI ? -1 : 0) ;
        let scoreRightDiag = (rightWinHuman ? 1 : 0) + (rightWinAI ? -1 : 0) ;

        return scoreLeftDiag + scoreRightDiag;
    };

    /**
     * Return +1 if HUMAN has won, -1 of AI has won, and 0 otherwise.
     * @returns {Number} The score of the board.
     **/
    this.evaluate = mark => {
        return evaluateRows() + evaluateCols() + evaluateDiags();
    };

    /**
     * Return the used grid.
     * @returns {Grid} The used grid.
     **/
    this.getGrid = () => grid;
};

/**
 * Contains player control and DFS AI.
 **/
const TicTacToeGame = function(ticTacToeGrid) {
    const AI_SPEED = 1;
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

    const remove = (array, element) => {
        return array.filter(e => e !== element);
    };

    async function findBestMove(player, options) {
        const score = ticTacToeGrid.evaluate();
        if (options.length === 0 || score !== 0)
            return new Result(score);

        const minScore = player === HUMAN ? -1 : 1;
        let bestResult = new Result(minScore);

        for (let option of options) {
            await setMark(option, player);
            const result = await findBestMove(player ^ 1, remove(options, option));
            _grid.unmarkCell(option.row, option.col);

            if (player === HUMAN && result.score > bestResult.score) {
                bestResult = new Result(result.score, option.row, option.col);
            }
            if (player === AI && result.score < bestResult.score) {
                bestResult = new Result(result.score, option.row, option.col);
            }
        }

        return bestResult;
    }

    async function computerMove() {
        const move = await findBestMove(AI, _grid.getUnmarked());

        if (move.row >= 0 && move.col >= 0) {
            _grid.markCell(move.row, move.col, AI);
        }

        _currentPlayer = HUMAN;
    };

    _grid.onCellClick((row, col) => {
        if (_currentPlayer != HUMAN || !_grid.isEmpty(row, col))
            return;

        _grid.markCell(row, col, HUMAN);

        _currentPlayer = AI;
        computerMove();
    });

    _grid.markCell(1,1, AI);
};

const grid = new Grid(document.getElementById(ID_PLAYING_FIELD));
const ticTacToeGrid = new TicTacToeGrid(grid);
new TicTacToeGame(ticTacToeGrid);
