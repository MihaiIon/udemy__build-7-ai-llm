class Renderer {
  /**
   * Set up the renderer
   * @param {Board} board
   * @param {Agent} agent
   */
  constructor(board, options) {
    this.board = board;
    this.agent = board.agent;

    // Options
    this.cellSize = options.cellSize || 50;
  }

  getCanvasSize() {
    return this.board.size * this.cellSize;
  }

  render() {
    for (let x = 0; x < this.board.size; x++) {
      for (let y = 0; y < this.board.size; y++) {
        this.renderCell(this.board.cells[x][y]);
      }
    }

    this.renderAgent();
    this.renderGrid();
  }

  /**
   * Renders a cell on the board (excluding the agent)
   * @param {Cell} cell 
   */
  renderCell(cell) {
    let x = cell.x * this.cellSize;
    let y = cell.y * this.cellSize;

    stroke(0);
    fill(cell.color);
    rect(x, y, this.cellSize, this.cellSize);
  }

  /**
   * Renders the agent on the board (with a pulsing effect when it moved)
   */
  renderAgent() {
    let x = this.agent.x * this.cellSize;
    let y = this.agent.y * this.cellSize;

    stroke(0);
    fill(this.agent.color);
    rect(x, y, this.cellSize, this.cellSize);

    // // Pulsing effect
    // let pulse = (sin(frameCount * 0.1) + 1) * 0.1;
    // let offset = this.cellSize * pulse / 2;
    // let originalColor = this.agent.color;
    // let pulsingColor = color(originalColor);
    // pulsingColor.setAlpha(255);
    // pulsingColor.setSaturation(255 * pulse);
    // fill(pulsingColor);
    // rect(x + offset, y + offset, this.cellSize - 2 * offset, this.cellSize - 2 * offset);

    // // Reset the fill color
    // fill(originalColor);
  }

  /**
   * Render a grid on top the the cells
   */
  renderGrid() {
    stroke(boardBackgroundColor);
    for (let i = 0; i <= this.board.size; i++) {
      let x = i * this.cellSize;
      line(x, 0, x, height);
      line(0, i * this.cellSize, width, i * this.cellSize);
    }
  }
}