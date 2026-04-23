# Progress

## What Works

- Project conventions and instructions documented (`CLAUDE.md`, `.github/copilot-instructions.md`)
- Memory bank created
- Part 4 Dataverse implementation prompt shortened to rely on repo context instead of repeating setup and architectural background
- Part 1 prerequisites document explains local setup
- **Code App scaffolded and deployed** — `app/` folder with React + TypeScript + Vite + Fluent UI v9
- **Full UI prototype v1.0.0** — dark glassmorphism theme, role switcher, agent/manager dashboards, ticket overlay, mock data
- **Part 3 — M365 integration deployed as v1.0.4**:
  - Office 365 Users connector — logged-in user name + profile photo in ShellBar
  - Office 365 Outlook connector — real calendar events (next 30 days) in new Calendar tab
  - Service layer with mock/live toggle (`VITE_M365_MODE=live` in `.env.local`)
  - Generated connector services in `src/generated/services/`

## What Is Left to Build

- [ ] Dataverse service — replace `src/data/*.ts` mock modules with real Web API calls
- [ ] Power Automate flow — create / update tickets
- [ ] Copilot Studio chat interface
- [ ] ALM setup — solution, pipelines, environments

## Series Part Status

| Part                              | Status         |
| --------------------------------- | -------------- |
| 1 — Scaffold + UI shell           | ✅ Complete    |
| 2 — Dataverse                     | ⬜ Not started |
| 3 — M365 User + Calendar          | ✅ Complete    |
| 4 — Power Automate flows          | ⬜ Not started |
| 5 — Copilot Studio                | ⬜ Not started |
| 6 — ALM                           | ⬜ Not started |
