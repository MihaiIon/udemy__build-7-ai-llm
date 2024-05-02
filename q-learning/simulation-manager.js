class SimulationManager {
  constructor() {
    this.board = BoardFactory.createLevel_1();
    this.renderer = new Renderer(this.board);
    this.qLearning = new QLearning(this.board, { epsilon: 0.1, learningRate: 0.1, discountFactor: 0.9 });
    this.uiManager = new UIManager(this.board, this.qLearning.qTable);

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

    
    console.log(this.board);
    console.log(this.renderer);
    console.log(this.qLearning);
    console.log(this.uiManager);
  }
}