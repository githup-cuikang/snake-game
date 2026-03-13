/**
 * 蛇的移动与碰撞检测（逻辑层）
 * 蛇身：数组，首为蛇头，末为蛇尾；每项 { col, row }
 */

/**
 * 根据当前方向计算下一格蛇头坐标
 */
function getNextHead(col, row, direction) {
  switch (direction) {
    case 'up': return { col: col, row: row - 1 };
    case 'down': return { col: col, row: row + 1 };
    case 'left': return { col: col - 1, row: row };
    case 'right': return { col: col + 1, row: row };
    default: return { col: col, row: row };
  }
}

/**
 * 检测新蛇头是否撞墙（越界）
 */
function hitWall(col, row) {
  return col < 0 || col >= CONFIG.COLS || row < 0 || row >= CONFIG.ROWS;
}

/**
 * 检测新蛇头是否与自身任意一节重合（不含当前蛇尾，因本帧会 pop 掉蛇尾）
 * 蛇长 1 时 body.length-1 为 0，循环不执行，返回 false，正确
 */
function hitSelf(newHead, body) {
  var len = body.length;
  if (len <= 1) return false;
  for (var i = 0; i < len - 1; i++) {
    if (body[i].col === newHead.col && body[i].row === newHead.row) {
      return true;
    }
  }
  return false;
}

/**
 * 执行一帧移动：先应用 pendingDirection，再计算新头，碰撞则返回 'over'，吃食物则不去尾并返回 'ate'，否则去尾返回 'moved'
 */
function tickSnake() {
  var dir = state.pendingDirection != null && !isOpposite(state.direction, state.pendingDirection)
    ? state.pendingDirection
    : state.direction;
  state.direction = dir;
  state.pendingDirection = null;

  var body = state.snake;
  var head = body[0];
  var next = getNextHead(head.col, head.row, dir);

  if (hitWall(next.col, next.row)) return 'over';
  if (hitSelf(next, body)) return 'over';

  var ate = state.food && state.food.col === next.col && state.food.row === next.row;
  body.unshift(next);
  if (!ate) body.pop();
  return ate ? 'ate' : 'moved';
}

/** 禁止反向：判断两方向是否相反 */
function isOpposite(a, b) {
  return (a === 'left' && b === 'right') || (a === 'right' && b === 'left') ||
    (a === 'up' && b === 'down') || (a === 'down' && b === 'up');
}
