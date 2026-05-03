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
- **Part 5** — Power Automate flow + custom connector integration (v1.1.1 → v1.1.4):
  - Upgraded `@microsoft/power-apps` to `1.1.1`
  - Added CSA Notification flow via `npx power-apps add-flow`; generated `CSANotificationService.ts` + `CSANotificationModel.ts`
  - Added CSA Notification Caller custom connector via `pac code add-data-source`; generated `CSANotificationCallerService.ts`
  - `src/services/flows.ts` — `sendNotification()` (PA flow connector) and `invokeTicketEmail()` (custom connector, passes `ticketId`, `api-version: 1`)
  - `TicketOverlay` — **Send Email** button calls PA flow; **HTTP Trigger** button calls custom connector; banner shows returned message; auto-hides after 5 s; dismissible; buttons independently disabled while in-flight

## What Is Left to Build

- [ ] Part 6 — Copilot Studio integration (`src/services/copilot.ts`)
- [ ] External URL / API integration
- [ ] ALM setup — solution, pipelines, environments

## Series Part Status

| Part                               | Status      |
| ---------------------------------- | ----------- |
| 1 — Dev environment setup          | ✅ Complete |
| 2 — Scaffolding the app            | ✅ Complete |
| 3 — Adding connectors              | ✅ Complete |
| 4 — Adding Dataverse               | ✅ Complete |
| 5 — Power Automate flows           | ✅ Complete |
| 6 — Copilot Studio                 | ⬜ Not started |

## Planned After The Core Series

- Copilot assistance
- External URL / API integration
- ALM and environment movement guidance
