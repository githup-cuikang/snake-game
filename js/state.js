/**
 * 游戏状态（状态层）
 * phase: idle | playing | over | paused
 * 再玩一次时：蛇、方向、食物、当前分重置；最高分保留
 */
function getInitialSnake() {
  var c = CONFIG.COLS;
  var r = CONFIG.ROWS;
  var midC = Math.floor(c / 2);
  var midR = Math.floor(r / 2);
  return [
    { col: midC, row: midR },
    { col: midC - 1, row: midR },
    { col: midC - 2, row: midR }
  ];
}

var state = {
  phase: 'idle',
  snake: getInitialSnake(),
  direction: 'right',
  pendingDirection: null,
  food: null,
  score: 0,
  highScore: 0,
  paused: false
};

/**
 * 重置为可开始一局的状态（蛇、方向、食物、分数；保留 phase 与 highScore 的更新由 game 负责）
 */
function resetPlayState() {
  state.snake = getInitialSnake();
  state.direction = 'right';
  state.pendingDirection = null;
  state.food = null;
  state.score = 0;
  state.paused = false;
}
