# 使用 gh 将 snake-game 推送到 GitHub 的计划

## 当前状态

- **项目路径**：`D:\ClaudeCodeProjects\snake-game`
- **Git 状态**：尚未执行 `git init`，不是 Git 仓库
- **GitHub 账号**：已通过 `gh auth status` 确认为 `githup-cuikang`，可正常使用 `gh`

## 步骤概览

```mermaid
flowchart LR
  A[git init] --> B[可选 .gitignore]
  B --> C[git add + commit]
  C --> D[gh repo create]
  D --> E[推送完成]
```

---

## 1. 本地初始化 Git 并提交

在项目根目录执行：

- `git init`：将当前目录初始化为 Git 仓库
- （可选）新增 `.gitignore`：忽略如 `Thumbs.db`、`.DS_Store`、编辑器/系统临时文件，避免把无关文件推上去
- `git add .`：暂存全部文件（含 `index.html`、`style.css`、`js/*.js`、`plan.md`、`requirements.md` 等）
- `git commit -m "初始提交：纯 Web HTML5 贪吃蛇"`：生成首次提交

说明：若不打算加 `.gitignore`，可省略该步，直接 add/commit。

---

## 2. 用 gh 在 GitHub 上建仓并推送

使用一条命令完成「在 GitHub 创建仓库 + 设置远程 + 推送」：

```bash
gh repo create snake-game --public --source=. --remote=origin --push
```

在 **项目根目录**（即 `D:\ClaudeCodeProjects\snake-game`）下执行。

参数含义：

| 参数 | 含义 |
|------|------|
| `snake-game` | 在 GitHub 上创建的仓库名（可与本地文件夹同名） |
| `--public` | 公开仓库；若需私有则改为 `--private` |
| `--source=.` | 使用当前目录作为仓库源，gh 会基于当前分支推送 |
| `--remote=origin` | 将新仓库设为远程 `origin` |
| `--push` | 创建后立即执行 `git push -u origin <当前分支>` |

执行后：

- GitHub 上会出现 `https://github.com/githup-cuikang/snake-game`
- 本地已关联 `origin`，且默认分支（一般为 `main`）已推送

若希望仓库名不同（例如 `html5-snake`），将命令中的 `snake-game` 替换为目标名称即可。

---

## 3. 可选：先建空仓再手动关联（备选）

若不想用 `--source=. --push`，可拆开做：

1. `gh repo create snake-game --public`：仅在 GitHub 创建空仓库
2. `git remote add origin https://github.com/githup-cuikang/snake-game.git`（或 gh 输出的 URL）
3. `git branch -M main`（若当前分支不是 main 且希望默认分支为 main）
4. `git push -u origin main`

推荐直接使用第 2 步的一条命令，更简单。

---

## 4. 执行顺序与注意事项

- **顺序**：先完成 1（init → 可选 .gitignore → add → commit），再执行 2 的 `gh repo create ... --push`。
- **目录**：所有命令均在 `D:\ClaudeCodeProjects\snake-game` 下执行（PowerShell 下可用 `Set-Location D:\ClaudeCodeProjects\snake-game` 进入）。
- **冲突**：若 GitHub 上已存在同名仓库 `snake-game`，`gh repo create` 会报错，需换仓库名或先删/改已有仓库。

---

## 5. 建议的 .gitignore 内容（若添加）

可只忽略常见系统/编辑器文件，例如：

```
.DS_Store
Thumbs.db
*.log
```

当前项目无构建产物或依赖目录，无需忽略 `node_modules` 等。
