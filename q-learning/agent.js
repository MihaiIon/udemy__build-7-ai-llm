class Agent {
  constructor(x, y, board) {
    this.x = x;
    this.y = y;
    this.board = board;
    this.intial = { x, y };

    this.color = color(agentCellColor);
  }

  /**
   * Moves the agent in the specified direction
   * @param {number} direction 
   */
  move(direction) {
    let newX = this.x;
    let newY = this.y;

    switch (direction) {
      case 0: newY--; break;
      case 1: newX++; break;
      case 2: newY++; break;
      case 3: newX--; break;
    }

    if (this.board.isValidPosition(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
  }
  moveUp() { this.move(0); }
  moveRight() { this.move(1); }
  moveDown() { this.move(2); } 
  moveLeft() { this.move(3); }

  /**
   * Resets the agent to its initial position
   */
  reset() {
    this.x = this.initial.x;
    this.y = this.initial.y;
  }
}