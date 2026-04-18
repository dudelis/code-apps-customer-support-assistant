# Prerequisites and Installation

Tools and setup needed to build code-apps with **Claude Code** or **GitHub Copilot**.

---

## 1. VS Code

Download and install from: https://code.visualstudio.com/

---

## 2. Node.js (LTS)

Required to run Vite-based projects locally.

Download from: https://nodejs.org/

Verify install:

```
node -v
npm -v
```

---

## 3. Git

Download from: https://git-scm.com/

Verify install:

```
git --version
```

---

## 4. GitHub CLI (`gh`)

Used for repo management, auth, and Copilot features.

Download from: https://cli.github.com/

Verify and authenticate:

```
gh --version
gh auth login
```

---

## 5. Claude Code

AI coding agent from Anthropic, runs in the terminal.

Docs: https://docs.anthropic.com/en/docs/claude-code/overview

**Windows PowerShell:**

```powershell
irm https://claude.ai/install.ps1 | iex
```

**Windows CMD:**

```cmd
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

Verify install:

```
claude --version
```

---

## 6. GitHub Copilot (VS Code)

AI coding assistant built into VS Code.

Install the extension: [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

- Requires a GitHub account with an active Copilot subscription (or free tier).
- Sign in via VS Code: `Ctrl+Shift+P` → **GitHub Copilot: Sign In**

Also install the chat extension: [GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat)

---

## 7. Repo Configuration Files

### For Claude Code — `CLAUDE.md`

Place a `CLAUDE.md` in the repo root. Claude reads it automatically to understand project context, conventions, and commands.

Minimal example:

```markdown
# CLAUDE.md

## Project

Brief description of the app.

## Running the app

Open index.html directly in a browser — no build step required.

## Conventions

- Single self-contained index.html per app (embedded CSS + JS)
- No frameworks, bundlers, or package managers
```

### For GitHub Copilot — `.github/copilot-instructions.md`

Place custom instructions here. Copilot uses this file to tailor suggestions to your project.

Docs: https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot

---

## 8. Power Platform Skills (for Copilot agent mode)

Add Power Platform skills to enhance Copilot agent capabilities for Power Apps / Dataverse work.

Repo: https://github.com/microsoft/power-platform-skills

---
