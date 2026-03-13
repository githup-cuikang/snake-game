/**
 * 游戏循环、阶段切换、开始/结束/再玩一次
 * 依赖：state, snake, food, render, config；input 中调用 startOrRestart
 */
var loopId = null;

function startOrRestart() {
  if (state.phase === 'playing' && !state.paused) return;
  resetPlayState();
  if (!spawnFood()) {
    return;
  }
  state.phase = 'playing';
  updateScoreUI();
  updateOverlays();
  if (loopId != null) clearInterval(loopId);
  loopId = setInterval(tick, CONFIG.TICK_MS);
  render();
}

function tick() {
  if (state.phase !== 'playing' || state.paused) return;
  var result = tickSnake();
  if (result === 'over') {
    state.phase = 'over';
    if (state.score > state.highScore) {
      state.highScore = state.score;
      try {
        localStorage.setItem(CONFIG.HIGH_SCORE_KEY, String(state.highScore));
      } catch (e) {}
    }
    updateOverlays();
    updateScoreUI();
    if (loopId != null) clearInterval(loopId);
    loopId = null;
    render();
    return;
  }
  if (result === 'ate') {
    state.score += CONFIG.SCORE_PER_FOOD;
    spawnFood();
    updateScoreUI();
  }
  render();
}

function updateScoreUI() {
  var cur = document.getElementById('currentScore');
  var high = document.getElementById('highScore');
  if (cur) cur.textContent = state.score;
  if (high) high.textContent = state.highScore;
}

function updateOverlays() {
  var startEl = document.getElementById('overlayStart');
  var overEl = document.getElementById('overlayOver');
  var pauseEl = document.getElementById('overlayPause');
  var finalScoreEl = document.getElementById('finalScore');
  if (startEl) startEl.classList.toggle('hidden', state.phase !== 'idle');
  if (overEl) {
    overEl.classList.toggle('hidden', state.phase !== 'over');
    if (finalScoreEl) finalScoreEl.textContent = state.score;
  }
  if (pauseEl) pauseEl.classList.toggle('hidden', state.phase !== 'playing' || !state.paused);
}

function init() {
  if (!initCanvas()) return;
  try {
    var saved = localStorage.getItem(CONFIG.HIGH_SCORE_KEY);
    if (saved != null) state.highScore = Math.max(0, parseInt(saved, 10) || 0);
  } catch (e) {}
  resetPlayState();
  updateScoreUI();
  updateOverlays();
  setupInput();
  render();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
window.updateOverlays = updateOverlays;
window.render = render;
