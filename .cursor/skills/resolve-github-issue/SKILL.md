---
name: resolve-github-issue
description: Fetches GitHub issue details via gh CLI and implements a solution in the current repo. Use when the user asks to resolve, fix, complete, or handle a GitHub issue by number (e.g. issue #1, issue 2, 解决 issue 1, 处理 issue #3).
---

# Resolve GitHub Issue

## When to apply

Apply when the user refers to an issue by number (e.g. "解决 issue #1", "handle issue 2", "完成编号为 1 的 issue"). The skill is generic: the issue number comes from the user message; the repository is the current project (where `gh` is run).

## Workflow

### 1. Resolve issue number

Parse the issue number from the user message. Examples: "issue #1" → 1, "issue 2" → 2, "编号为 3 的 issue" → 3. If no number is given, ask the user which issue to resolve.

### 2. Fetch issue content

From the **project root** (repository root), run:

```bash
gh issue view <number>
```

If the project has no GitHub remote or you need a specific repo:

```bash
gh issue view <number> --repo owner/repo
```

Use the command output (title + body) as the requirement. Do not assume issue content; always fetch it.

### 3. Implement the solution

- Summarize what the issue asks for.
- Plan changes (files to add/edit).
- Implement the changes (code, docs, config, etc.).
- Verify the result (e.g. run linter, open the app) when relevant.

### 4. Optional follow-up

- If the user wants to close the issue after resolving: `gh issue close <number> --comment "Fixed by ..."`.
- If the user only asked to "resolve" or "解决", implementing the fix is enough unless they ask to close or comment.

## Prerequisites

- GitHub CLI (`gh`) installed and authenticated (`gh auth status`).
- Current directory is (or is under) the repository that contains the issue.

## Example

User: "帮我解决该项目在 GitHub 上编号为 1 的 issue"

1. Issue number: 1.
2. Run: `gh issue view 1` → read title and body.
3. e.g. issue says "缺少 README.md" → add README.md with project intro and run instructions.
4. No need to close the issue unless the user asks.
