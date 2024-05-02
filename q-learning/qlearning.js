const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

/**
 * The Q-learning algorithm is a model-free reinforcement learning algorithm that learns
 * to make decisions by estimating the value of taking an action in a given state.
 * 
 * The agent learns to maximize the expected reward by updating the Q-values based on 
 * the rewards it receives.
 * 
 * The Q-learning algorithm works as follows:
 * 1. Initialize the Q-table with random values.
 * 2. Choose an action based on the current state and the Q-values.
 * 3. Take the action and observe the reward and the next state.
 * 4. Update the Q-value for the state-action pair based on the reward and the next state.
 * 5. Repeat steps 2-4 until the agent reaches the goal state.
 */
class QLearning {
  constructor(board, options) {
    // This is the agent that learns to navigate the board.
    this.agent = board.agent;

    // This is the Q-table, which stores the Q-values for each state-action pair.
    this.qTable = new QTable(board);

    // This is the learning rate, which determines how much the agent learns from each step.
    // - A value of 0 means the agent doesn't learn at all.
    // - This value can be adjusted to change the agent's learning behavior.
    // - A higher value will make the agent learn faster, but it may also make the agent less stable.
    this.learningRate = options.learningRate || 0.1;

    // This is the discount factor, which determines how much the agent values future rewards.
    // - A value of 0 means the agent only cares about the immediate reward.
    this.discountFactor = options.discountFactor || 0.9;

    // This is the exploration rate, which determines how often the agent explores new actions.
    this.epsilon = options.epsilon || 0.1;
  }

  /**
   * 
   * @param {number} episodes The number of episodes to run
   */
  learn(episodes) {}

  /**
   * 
   * @param {Cell} state Current state of the agent
   * @returns {number} The action to take
   */
  chooseAction(state) {
    // With probability epsilon, choose a random action
    if (Math.random() < this.epsilon) return Math.floor(Math.random() * 4);
 
    // Otherwise, choose the action with the highest Q-value
    return this.qTable.argmax(state);
  }

  getAction(state) {
    return this.qTable.argmax(state);
  }
}

/**
 * The Q-table stores the Q-values for each state-action pair.
 * The Q-value represents the expected reward for taking an action in a given state.
 *
 * Each Cell in the board is a state, and each action is a possible move the agent can make.
 * The Q-table is initialized with all Q-values between 0 and 1, if the 
 */
class QTable {
  constructor(board) {
    this.board = board;
    this.table = {};

    let cell;
    for (let x = 0; x < board.size; x++) {
      for (let y = 0; y < board.size; y++) {

        // Skip obstacles and terminal cells.
        // - The agent can't move to obstacles
        // - The agent stops moving when reaching terminal cells
        if (board.isObstacle(x, y) || board.isTerminal(x, y)) continue;

        // Initialize the Q-values for each action, is the action is possible.
        cell = board.getCell(x, y);
        if (board.isValidPosition(x, y - 1)) this.table[this.getKey(cell, UP)] = Math.random();
        if (board.isValidPosition(x + 1, y)) this.table[this.getKey(cell, RIGHT)] = Math.random();
        if (board.isValidPosition(x, y + 1)) this.table[this.getKey(cell, LEFT)] = Math.random();
        if (board.isValidPosition(x - 1, y)) this.table[this.getKey(cell, DOWN)] = Math.random();
      }
    }
  }

  /**
   * Gets the Q-value for the state-action pair
   * @param {Cell} state The current state
   * @param {number} action The action to take
   * @returns {number} The Q-value for the state-action pair
   */
  get(state, action) {
    let key = this.getKey(state, action);
    return this.table[key] || 0;
  }

  /**
   * Sets the Q-value for the state-action pair
   * @param {Cell} state The current state
   * @param {number} action The action to take
   * @param {number} value The Q-value for the state-action pair
   */
  set(state, action, value) {
    let key = this.getKey(state, action);
    this.table[key] = value;
  }

  /**
   * Finds the action with the highest Q-value for the state
   * @param {Cell} state The current state
   * @returns {number} The action with the highest Q-value
   */
  argmax(state) {
    let values = this.getValues(state);
    return values.indexOf(Math.max(...values));
  }

  /**
   * Gets the key for the state-action pair
   * @param {Cell} state The current state
   * @param {number} action The action to take
   * @returns 
   */
  getKey(state, action) {
    return `${state.x},${state.y},${action}`;
  }

  /**
   * Gets the Q-values for the state
   * @param {Cell} state The current state
   * @returns {number[]} The Q-values for the state
   */
  getValues(state) {
    return [UP, RIGHT, DOWN, LEFT].map(action => this.get(state, action));
  }
}
