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

class PathCell extends Cell {
  constructor(x, y) {
    super(x, y, 'path');

    this.color = color(pathCellColor);
  }
}

class WallCell extends Cell {
  constructor(x, y) {
    super(x, y, 'wall');

    this.color = color(wallCellColor);
    this.isObstacle = true;
  }
}

class DeathCell extends Cell {
  constructor(x, y) {
    super(x, y, 'death');

    this.color = color(deathCellColor);
    this.reward = -1;
  }
}

class GoalCell extends Cell {
  constructor(x, y) {
    super(x, y, 'goal');

    this.color = color(goalCellColor);
    this.reward = 1;
  }
}

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