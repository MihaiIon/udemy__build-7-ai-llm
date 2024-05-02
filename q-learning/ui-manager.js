class UIManager {
  constructor(board, qTable) {
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

// ================================================================================================
// STYLES
// ================================================================================================

const BUTTON_CLASSES = Object.freeze(
  "transition bg-yellow-900 hover:bg-yellow-950 text-white font-bold py-2 px-4 rounded"
);