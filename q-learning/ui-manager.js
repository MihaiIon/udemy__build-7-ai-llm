class UIManager {
  constructor(board, qTable) {
    this.qTableUIManager = new QTableUIManager(board, qTable);
    this.qTableUIManager.update();

    this.initializeDebugUI(board.agent);
  }

  /**
   * 
   * @param {Board} board 
   */
  initializeDebugUI(agent) {
    const buttonMoveAgentUp = document.getElementById("btn--move-agent-up");
    buttonMoveAgentUp.onclick = () => agent.moveUp();

    const buttonMoveAgentRight = document.getElementById("btn--move-agent-right");
    buttonMoveAgentRight.onclick = () => agent.moveRight();

    const buttonMoveAgentDown = document.getElementById("btn--move-agent-down");
    buttonMoveAgentDown.onclick = () => agent.moveDown();

    const buttonMoveAgentLeft = document.getElementById("btn--move-agent-left");
    buttonMoveAgentLeft.onclick = () => agent.moveLeft();

    [ buttonMoveAgentUp,
      buttonMoveAgentRight,
      buttonMoveAgentDown,
      buttonMoveAgentLeft
    ].forEach(button => button.className = BUTTON_CLASSES);
  }
}

/**
 * 
 */
class QTableUIManager {
  constructor(board, qTable) {
    this.board = board;
    this.qTable = qTable;

    this.qValueAverages = [];
    this.#resetQValueAverages(board);

    this.table = document.getElementById("q-table-lookup");
    this.tbody = this.table.querySelector("tbody");
    this.#resetTable(board);
  }

  /**
   * Resets the Q-value averages for the board to null
   * @param {Board} board The board to update the Q-values for
   */
  #resetQValueAverages(board) {
    this.qValueAverages = Array.from({ length: board.size }, () => Array(board.size).fill(null));
  }

  #resetTable() {
    const table = this.table;
    const tbody = this.tbody;

    const tableWidth = this.board.cellSize * this.board.size;
    const tableHeight = this.board.cellSize * this.board.size;

    table.style.width = `${tableWidth}px`;
    table.style.height = `${tableHeight}px`;
    table.className = Q_TABLE_LOOKUP_CLASSES;

    // Clear the table's body 
    tbody.innerHTML = "";

    // Fill table with cells
    let row;
    for (let y = 0; y < this.board.size; y++) {
      row = tbody.insertRow();

      for (let x = 0; x < this.board.size; x++) {
        this.#appendQValueCell(row, x, y);
      }
    }
  }

  #appendQValueCell(row, x, y) {
    const cell = row.insertCell();
    cell.style.width = `${this.board.cellSize}px`;
    cell.style.height = `${this.board.cellSize}px`;
    cell.className = Q_VALUE_CELL_CLASSES;

    // Skip obstacles and terminal cells
    if (this.board.isObstacle(x, y) || this.board.isTerminal(x, y)) {
      cell.className = INVALID_Q_VALUE_CELL_CLASSES;
      return;
    }

    // Create a text node for the q-value
    const cellText = document.createElement("span");
    cellText.id = `q-value-average-${y}-${x}`;
    cell.appendChild(cellText);

    // Average the q-values for each action
    // - Use countUp.js to animate the q-values
    const qValuesAverage = new CountUp(cellText.id, 0.00, { decimalPlaces: 2, duration: 0.3 })
    qValuesAverage.start();
    this.qValueAverages[y][x] = qValuesAverage;

    return cell;
  }

  /**
   * Updates the Q-value averages for each cell in the board
   */
  update() {
    let qValueAverage, qValues, average;

    for (let y = 0; y < this.qValueAverages.length; y++) {
      for (let x = 0; x < this.qValueAverages[y].length; x++) {
        qValueAverage = this.qValueAverages[y][x];
        if (qValueAverage === null) continue;

        qValues = this.qTable.getValues(this.board.getCell(x, y));
        average = qValues.reduce((acc, val) => acc + val, 0) / qValues.length;
        qValueAverage.update(average);

        const color = `rgba(16, 185, 129, ${average})`;
        document.getElementById(`q-value-average-${y}-${x}`).parentNode.style.backgroundColor = color;
        console.log(color);
      }
    }
  }
}

// ================================================================================================
// STYLES
// ================================================================================================

const BUTTON_CLASSES = Object.freeze(
  "transition bg-yellow-900 hover:bg-yellow-950 text-white font-bold py-2 px-4 rounded"
);

const Q_TABLE_LOOKUP_CLASSES = Object.freeze(
  "table-fixed relative rounded bg-slate-800 shadow-md"
);

const Q_VALUE_CELL_CLASSES = Object.freeze(
  "transition bg-slate-800 border-2 border-slate-900 hover:!bg-slate-700 text-slate-300 text-center cursor-pointer"
);

const INVALID_Q_VALUE_CELL_CLASSES = Object.freeze(
  "bg-zinc-950 border-2 border-zinc-900"
);
