/**
 * Canvas 渲染（表现层）
 * 使用格子坐标 (col, row)，转换为像素时用 col * CELL_SIZE，保证整数像素
 */
var canvas, ctx;

function initCanvas() {
  canvas = document.getElementById('gameCanvas');
  if (!canvas) return false;
  ctx = canvas.getContext('2d');
  canvas.width = CONFIG.CANVAS_WIDTH;
  canvas.height = CONFIG.CANVAS_HEIGHT;
  return true;
}

function clearCanvas() {
  if (!ctx) return;
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/** 可选：绘制网格线 */
function drawGrid() {
  if (!ctx) return;
  var cs = CONFIG.CELL_SIZE;
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1;
  for (var x = 0; x <= CONFIG.COLS; x++) {
    ctx.beginPath();
    ctx.moveTo(x * cs, 0);
    ctx.lineTo(x * cs, canvas.height);
    ctx.stroke();
  }
  for (var y = 0; y <= CONFIG.ROWS; y++) {
    ctx.beginPath();
    ctx.moveTo(0, y * cs);
    ctx.lineTo(canvas.width, y * cs);
    ctx.stroke();
  }
}

function drawSnake() {
  if (!ctx || !state.snake.length) return;
  var cs = CONFIG.CELL_SIZE;
  var pad = 1;
  for (var i = 0; i < state.snake.length; i++) {
    var seg = state.snake[i];
    var x = seg.col * cs + pad;
    var y = seg.row * cs + pad;
    var w = cs - pad * 2;
    var h = cs - pad * 2;
    if (i === 0) {
      ctx.fillStyle = '#4ecca3';
      ctx.strokeStyle = '#2d8b6f';
      ctx.lineWidth = 2;
      ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);
    } else {
      ctx.fillStyle = '#3a9d7a';
      ctx.fillRect(x, y, w, h);
    }
  }
}

function drawFood() {
  if (!ctx || !state.food) return;
  var cs = CONFIG.CELL_SIZE;
  var x = state.food.col * cs;
  var y = state.food.row * cs;
  ctx.fillStyle = '#e94560';
  ctx.beginPath();
  ctx.arc(x + cs / 2, y + cs / 2, cs / 2 - 2, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * 根据当前状态绘制一帧（清空 → 网格 → 蛇 → 食物）
 */
function render() {
  clearCanvas();
  drawGrid();
  drawSnake();
  drawFood();
}
