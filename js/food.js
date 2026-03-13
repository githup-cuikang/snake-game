/**
 * 食物生成：随机选格且不与蛇身重叠（FR-3）
 */

/**
 * 获取当前可选空格子列表（排除蛇身含蛇头）
 */
function getEmptyCells() {
  var used = {};
  var body = state.snake;
  for (var i = 0; i < body.length; i++) {
    var k = body[i].col + ',' + body[i].row;
    used[k] = true;
  }
  var cells = [];
  for (var r = 0; r < CONFIG.ROWS; r++) {
    for (var c = 0; c < CONFIG.COLS; c++) {
      if (!used[c + ',' + r]) cells.push({ col: c, row: r });
    }
  }
  return cells;
}

/**
 * 在空位中随机生成一个食物；若无空位返回 false，否则写入 state.food 并返回 true
 */
function spawnFood() {
  var cells = getEmptyCells();
  if (cells.length === 0) return false;
  var idx = Math.floor(Math.random() * cells.length);
  state.food = cells[idx];
  return true;
}
