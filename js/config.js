/**
 * 游戏可配置常量（模块 1 / FR-1）
 * 保证 CELL_SIZE 为整数，避免格子错位
 */
var CONFIG = {
  COLS: 20,
  ROWS: 20,
  CANVAS_WIDTH: 400,
  CANVAS_HEIGHT: 400,
  // 由宽高与行列数推导，必须为整数
  get CELL_SIZE() {
    var w = Math.floor(this.CANVAS_WIDTH / this.COLS);
    var h = Math.floor(this.CANVAS_HEIGHT / this.ROWS);
    return w <= h ? w : h;
  },
  /** 游戏循环间隔（毫秒） */
  TICK_MS: 150,
  /** 每吃一个食物加分 */
  SCORE_PER_FOOD: 10,
  /** localStorage 最高分键名 */
  HIGH_SCORE_KEY: 'snake_high_score'
};
