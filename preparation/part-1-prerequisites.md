# Part 1 Prerequisites

This folder is the preparation step for the project. The goal here is to get the local machine ready to develop the Power Apps Code App in this repository before we scaffold the app itself.

We are preparing to build a React + TypeScript + Vite code-app, use AI coding agents in VS Code, and later deploy through the Power Apps toolchain.

---

## What We Are Preparing For

By the end of this setup, the machine should be ready to:

- work on the code-app in VS Code
- install and run the React/Vite project locally
- use Git for source control
- use Claude Code or GitHub Copilot to help with development
- prepare for Power Apps deployment steps later in the series

---

## 1. Install VS Code

VS Code is the editor for this repo and the place where we will develop the code-app.

Download: https://code.visualstudio.com/

---

## 2. Install Node.js LTS

Node.js is required because the code-app will be scaffolded and run with Vite.

Download: https://nodejs.org/

Verify the install:

```bash
node -v
npm -v
```

---

## 3. Install Git

Git is required for cloning the repo, tracking changes, and working through the project safely.

Download: https://git-scm.com/

Verify the install:

```bash
git --version
```

---

## 4. Install GitHub CLI

GitHub CLI is useful for repository authentication and GitHub-based developer workflows.

Download: https://cli.github.com/

Verify and sign in:

```bash
gh --version
gh auth login
```

---

## 5. Install Claude Code

Claude Code is an optional AI coding agent that runs in the terminal and can help build the code-app in this repo.

Docs: https://docs.anthropic.com/en/docs/claude-code/overview

Windows PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

Windows CMD:

```cmd
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

Verify the install:

```bash
claude --version
```

---

## 6. Install GitHub Copilot CLI

GitHub Copilot CLI is another optional AI assistant for terminal workflows.

It requires a GitHub account with Copilot access.

Install with winget:

```bash
winget install GitHub.Copilot
```

Restart the shell, then verify:

```bash
copilot --version
```

Authenticate:

```bash
copilot auth login
```

Example usage:

```bash
copilot suggest "create a React component for a ticket list"
copilot explain "npm run build"
```

---

## 7. Configure The Repository For AI-Assisted Development

This repo already includes the core instruction files that help the agents understand the project.

### `CLAUDE.md`

Defines project context, conventions, structure, and the memory-bank workflow for Claude Code.

### `.github/copilot-instructions.md`

Defines project-specific guidance for GitHub Copilot so suggestions stay aligned with the Code App architecture and coding style.

These files matter because we are not just preparing a generic web project. We are preparing to develop this specific Power Apps Code App with a consistent stack and clear conventions.

---

## 8. Power Platform Skills

If you want stronger Power Platform assistance in agent workflows, add Power Platform skills for Copilot agent mode.

Repo: https://github.com/microsoft/power-platform-skills

This becomes more useful once the project starts integrating Dataverse, flows, and other Power Platform services.

---

## 9. Optional Memory Bank Workflow

The repo already uses a `memory-bank/` folder instead of a single memory file.

This helps keep track of:

- project goals
- product context
- technical context
- architecture patterns
- current focus
- progress across the video series

That matters because we are preparing to build the code-app over multiple parts, not as a one-off prototype.

---

## Next Step

Once these prerequisites are installed, the next step is to scaffold the Power Apps Code App in this repository with React, TypeScript, Vite, and Fluent UI v9.
