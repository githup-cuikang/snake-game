/**
 * 键盘输入：方向键/WASD、禁止反向、每帧仅应用一次方向（节流由 game tick 应用 pendingDirection 保证）
 * 空格/Enter 开始或再玩一次；P 暂停（可选）
 */
function setupInput() {
  document.addEventListener('keydown', function (e) {
    var key = e.code || e.key;
    var phase = state.phase;

    if (phase === 'idle' || phase === 'over') {
      if (key === 'Space' || key === ' ' || key === 'Enter') {
        e.preventDefault();
        startOrRestart();
      }
      return;
    }

    if (phase === 'playing') {
      if (key === 'KeyP' || key === 'p') {
        e.preventDefault();
        state.paused = !state.paused;
        if (window.updateOverlays) window.updateOverlays();
        if (window.render) window.render();
        return;
      }
      if (key === 'Space' || key === ' ' || key === 'Enter') {
        return;
      }

      var dir = keyToDirection(key);
      if (dir != null) {
        e.preventDefault();
        state.pendingDirection = dir;
      }
    }
  });

  var btn = document.getElementById('btnPlayAgain');
  if (btn) btn.addEventListener('click', startOrRestart);
}

function keyToDirection(key) {
  switch (key) {
    case 'ArrowUp':
    case 'KeyW':
      return 'up';
    case 'ArrowDown':
    case 'KeyS':
      return 'down';
    case 'ArrowLeft':
    case 'KeyA':
      return 'left';
    case 'ArrowRight':
    case 'KeyD':
      return 'right';
    default:
      return null;
  }
}
