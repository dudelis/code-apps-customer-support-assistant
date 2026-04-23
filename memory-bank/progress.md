# Progress

## What Works

- Project conventions and instructions documented (`CLAUDE.md`, `.github/copilot-instructions.md`)
- Memory bank created
- Root `README.md` rewritten to describe the project as a live series with Parts 1-3 complete, Part 4 in preparation, and later plans for Copilot, external URLs/APIs, and ALM
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
- [ ] Power Automate flow — start the flow from the app
- [ ] Copilot assistance
- [ ] External URL / API integration
- [ ] ALM setup — solution, pipelines, environments

## Series Part Status

| Part                               | Status            |
| ---------------------------------- | ----------------- |
| 1 — Dev environment setup          | ✅ Complete       |
| 2 — Scaffolding the app            | ✅ Complete       |
| 3 — Adding connectors              | ✅ Complete       |
| 4 — Adding Dataverse               | 🚧 In preparation |
| 5 — Starting the flow from the app | ⬜ Not started    |

## Planned After The Core Series

- Copilot assistance
- External URL / API integration
- ALM and environment movement guidance
