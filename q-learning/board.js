class Board {
  constructor(size) {
    this.size = size;
    this.cells = [];
    for (let x = 0; x < size; x++) {
      this.cells[x] = [];
      for (let y = 0; y < size; y++) {
        this.cells[x][y] = new Path(x, y);
      }
    }
  }

  addCell(x, y, type) {
    this.cells[x][y] = new Cell(x, y, type);
  }

  addAgent(x, y) {
    this.cells[x][y] = new Agent(x, y);
  }

  addDeath(x, y) {
    this.cells[x][y] = new Death(x, y);
  }

  addGoal(x, y) {
    this.cells[x][y] = new Goal(x, y);
  }

  addObstacle(x, y) {
    this.cells[x][y] = new Obstacle(x, y);
  }

  addPath(x, y) {
    this.cells[x][y] = new Path(x, y);
  }

  display() {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        if (this.cells[x][y]) {
          this.cells[x][y].display();
        }
      }
    }
  }
}

class Cell {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;

    this.isObstacle = false;
    this.reward = 0;
  }

  display() {
    const bacgroundColor = color("#32363f");

    stroke('#2d3039');

    if (this.type === 'agent') {
      fill('#c64ddb');                       // pink
    } else if (this.type === 'death') {
      fill('#c32020');                       // red
    } else if (this.type === 'goal') {
      fill('#0fe582');                       // green
    } else if (this.type === 'obstacle') {
      fill("#191a2b");                       // dark blue
    } else if (this.type === 'path') {
      fill("#32363f");                       // gray
    }
    rect(this.x * CELL_SIZE, this.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }
}

class Agent extends Cell {
  constructor(x, y) {
    super(x, y, 'agent');

    this.isObstacle = true;
  }
}

class Death extends Cell {
  constructor(x, y) {
    super(x, y, 'death');

    this.reward = -1;
  }
}

class Goal extends Cell {
  constructor(x, y) {
    super(x, y, 'goal');

    this.reward = 1;
  }
}

class Obstacle extends Cell {
  constructor(x, y) {
    super(x, y, 'obstacle');

    this.isObstacle = true;
  }
}

class Path extends Cell {
  constructor(x, y) {
    super(x, y, 'path');
  }
}
