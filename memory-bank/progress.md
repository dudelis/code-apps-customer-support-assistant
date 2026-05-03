# Progress

## What Works

- Project conventions and instructions documented (`CLAUDE.md`)
- Memory bank created and maintained
- **Part 1** — dev environment setup
- **Part 2** — full UI prototype: dark glassmorphism theme, role switcher, agent/manager dashboards, ticket overlay, mock data
- **Part 3** — M365 integration (v1.0.4):
  - Office 365 Users — logged-in user name + profile photo in ShellBar
  - Office 365 Outlook — real calendar events in Calendar tab
  - Mock/live toggle via `VITE_M365_MODE=live`
- **Part 4** — Dataverse integration (v1.1.0):
  - Generated services for `csa_tickets`, `csa_customers`, `csa_tasks`
  - `dataverseService.ts` — all reads + mutations (create, updateStatus, delete, updateTaskDone, createCustomer)
  - Shared context state for tickets, customers, tasks (same pattern as TicketOverlay)
  - Full CRUD for tickets: New Ticket dialog (C), list/kanban/overlay (R), status progression clicks (U), Delete button (D)
  - Customer create: New Customer dialog (C); list view (R)
  - Task done toggle persists to Dataverse (U); task list (R)
  - Mock/live toggle via `VITE_DATAVERSE_MODE=live`

## What Is Left to Build

- [ ] Part 5 — Power Automate flow: trigger HTTP flow from the app (`src/services/flows.ts`)
- [ ] Copilot Studio integration (`src/services/copilot.ts`)
- [ ] External URL / API integration
- [ ] ALM setup — solution, pipelines, environments

## Current Prep State

- [x] Part 5 preparation split into `preparation/part-5-flows-1-add-flow.md` and `preparation/part-5-flows-2-wire-ui.md`
- [x] Flow integration prerequisites captured: use `npx power-apps` commands and `@microsoft/power-apps` `1.1.1+`

## Series Part Status

| Part                               | Status         |
| ---------------------------------- | -------------- |
| 1 — Dev environment setup          | ✅ Complete    |
| 2 — Scaffolding the app            | ✅ Complete    |
| 3 — Adding connectors              | ✅ Complete    |
| 4 — Adding Dataverse               | ✅ Complete    |
| 5 — Starting the flow from the app | ⬜ Not started |

## Planned After The Core Series

- Copilot assistance
- External URL / API integration
- ALM and environment movement guidance
