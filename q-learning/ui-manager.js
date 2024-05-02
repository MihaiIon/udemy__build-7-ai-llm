class UIManager {
  constructor() {
    this.board = BoardFactory.createLevel_1();
    this.renderer = new Renderer(this.board);
    this.qLearning = new QLearning(this.board, { epsilon: 0.1, learningRate: 0.1, discountFactor: 0.9 });


    // this.isRunning = false;
    // this.isTraining = false;
    // this.isTrainingPaused = false;
    
    // this.isEpisodeOver = false;
    // this.isEpisodeStarted = false;
    // this.isEpisodePaused = false;
    // this.isEpisodeCompleted = false;
    
    // this.isAgentDead = false;
    // this.isAgentAtGoal = false;
    
    // this.isAgentMoving = false;
    // this.isAgentMovingUp = false;
    // this.isAgentMovingRight = false;
    // this.isAgentMovingDown = false;
    // this.isAgentMovingLeft = false;
  }

  initialize() {
    this.initializeDebugUI();
  }

  initializeDebugUI() {
    const buttonMoveAgentUp = document.getElementById("btn--move-agent-up");
    buttonMoveAgentUp.onclick = () => this.board.agent.moveUp();

    const buttonMoveAgentRight = document.getElementById("btn--move-agent-right");
    buttonMoveAgentRight.onclick = () => this.board.agent.moveRight();

    const buttonMoveAgentDown = document.getElementById("btn--move-agent-down");
    buttonMoveAgentDown.onclick = () => this.board.agent.moveDown();

    const buttonMoveAgentLeft = document.getElementById("btn--move-agent-left");
    buttonMoveAgentLeft.onclick = () => this.board.agent.moveLeft();

    [ buttonMoveAgentUp,
      buttonMoveAgentRight,
      buttonMoveAgentDown,
      buttonMoveAgentLeft
    ].forEach(button => button.className = BUTTON_CLASSES);
  }
}

// ================================================================================================
// STYLES
// ================================================================================================

const BUTTON_CLASSES = Object.freeze(
  "transition bg-yellow-900 hover:bg-yellow-950 text-white font-bold py-2 px-4 rounded"
);