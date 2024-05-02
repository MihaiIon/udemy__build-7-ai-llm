/**
 * Base class for all cells in the board.
 * @param {number} x The x-coordinate of the cell
 * @param {number} y The y-coordinate of the cell
 * @param {string} type The type of the cell: ['path', 'wall', 'death', 'goal']
 */
class Cell {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    
    this.color = color(0);
    this.isObstacle = false;
    this.reward = 0;
  }
}

/**
 * Represents an empty cell that the agent can move to.
 */
class PathCell extends Cell {
  constructor(x, y) {
    super(x, y, 'path');

    this.color = color(pathCellColor);
  }
}

/**
 * Represents a obstacle cell.
 * The agent cannot move to this cell.
 */
class WallCell extends Cell {
  constructor(x, y) {
    super(x, y, 'wall');

    this.color = color(wallCellColor);
    this.isObstacle = true;
  }
}

/**
 * Represents a cell that kills the agent.
 * The agent will receive a negative reward when moving to this cell.
 * The episode will end when the agent moves to this cell.
 */
class DeathCell extends Cell {
  constructor(x, y) {
    super(x, y, 'death');

    this.color = color(deathCellColor);
    this.reward = -1;
  }
}

/**
 * Represents the goal cell.
 * The agent will receive a positive reward when moving to this cell.
 * The episode will end when the agent moves to this cell.
 */
class GoalCell extends Cell {
  constructor(x, y) {
    super(x, y, 'goal');

    this.color = color(goalCellColor);
    this.reward = 1;
  }
}

/**
 * Represents the game board.
 * The board is a grid of cells that the agent can move to.
 * The board also contains the agent itself.
 */
class Board {
  constructor(size) {
    this.agent = null;

    this.size = size;
    this.cells = [];
    for (let x = 0; x < size; x++) {
      this.cells[x] = [];
      for (let y = 0; y < size; y++) {
        // Initialize all cells as paths
        this.setPathCell(x, y);
      }
    }
  }

  /**
   * Verifies if the specified position is inside the board and not an obstacle
   * @param {number} x The x-coordinate of the cell
   * @param {number} y The y-coordinate of the cell
   * @returns True if the position is valid, false otherwise
   */
  isValidPosition(x, y) {
    return x >= 0 && x < this.size && y >= 0 && y < this.size && !this.cells[x][y].isObstacle;
  }

  setAgent(x, y) {
    this.agent = new Agent(x, y, this);
  }

  setDeathCell(x, y) {
    this.cells[x][y] = new DeathCell(x, y);
  }

  setGoalCell(x, y) {
    this.cells[x][y] = new GoalCell(x, y);
  }

  setPathCell(x, y) {
    this.cells[x][y] = new PathCell(x, y);
  }

  setWallCell(x, y) {
    this.cells[x][y] = new WallCell(x, y);
  }
}

/**
 * Factory class to create boards with different configurations.
 * The configurations are specified as a matrix of integers.
 * 
 * The integers represent the following:
 *   0 - Path cell
 *   1 - Agent cell
 *   2 - Goal cell
 *   3 - Wall cell
 *   4 - Death cell
 */
class BoardFactory {
  static createBoard(size, configuration) {
    const board = new Board(size);

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        switch (configuration[y][x]) {
          case 1: board.setAgent(x, y); break;
          case 2: board.setGoalCell(x, y); break;
          case 3: board.setWallCell(x, y); break;
          case 4: board.setDeathCell(x, y); break;
        }
      }
    }

    return board;
  }

  static createLevel_1() {
    const configuration =
    [[1, 0, 0, 0, 0],
     [0, 0, 0, 0, 0],
     [0, 3, 3, 3, 0],
     [0, 0, 0, 0, 0],
     [0, 0, 0, 0, 2]];

    return this.createBoard(5, configuration);
  }
}