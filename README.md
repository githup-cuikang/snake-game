# 贪吃蛇 (Snake Game)

基于 HTML5、CSS3 与原生 JavaScript 的贪吃蛇游戏，在浏览器中单页运行，无需后端与构建工具。

## 技术栈

- **HTML5**：页面结构、Canvas 游戏画布
- **CSS3**：布局与样式
- **原生 JavaScript (ES5+)**：游戏逻辑、渲染、输入处理
- **Canvas 2D API**：蛇身、食物与网格绘制

不依赖 Node.js、打包工具或任何前端框架。

## 运行方式

### 方式一：直接打开（推荐）

1. 克隆或下载本仓库到本地。
2. 用浏览器打开项目根目录下的 `index.html` 即可开始游戏。

```bash
# 克隆仓库后，在项目根目录用浏览器打开
# Windows 示例：
start index.html
# 或双击 index.html 文件
```

### 方式二：本地 HTTP 服务（可选）

若希望通过 `file://` 以外的地址访问（例如某些环境对本地文件限制较多），可使用简单 HTTP 服务器：

```bash
# Python 3
python -m http.server 8080

# 或 Node.js（若已安装 npx）
npx serve .
```

然后在浏览器访问 `http://localhost:8080`（端口以实际为准）。

## 操作说明

| 操作     | 按键                    |
|----------|-------------------------|
| 开始游戏 | 空格 或 Enter           |
| 控制方向 | 方向键 ↑↓←→ 或 W / A / S / D |
| 暂停/继续 | P                      |
| 再玩一次 | 游戏结束后按 空格/Enter，或点击「再玩一次」按钮 |

## 游戏规则

- 控制蛇头方向，蛇会持续向前移动。
- 吃到食物后蛇身变长、得分增加；当前分数与最高分会显示在画布上方。
- 最高分会保存在浏览器本地（localStorage），下次打开仍会显示。
- 蛇头撞到墙壁或自身身体即游戏结束。

## 项目结构

```
snake-game/
├── index.html      # 入口页面与 Canvas 容器
├── style.css       # 样式
├── js/
│   ├── config.js   # 游戏配置（格子数、速度、分数等）
│   ├── state.js    # 游戏状态
│   ├── snake.js    # 蛇的逻辑与移动
│   ├── food.js     # 食物生成
│   ├── render.js   # Canvas 绘制
│   ├── input.js    # 键盘输入
│   └── game.js     # 游戏主循环与流程
├── requirements.md # 需求规格说明
└── README.md       # 本文件
```

## 兼容性

目标环境为现代浏览器（Chrome、Firefox、Edge、Safari 等），使用标准 HTML5、ES5+ 与 Canvas 2D API。

## 需求与设计文档

更详细的功能需求与术语定义见 [requirements.md](requirements.md)。
