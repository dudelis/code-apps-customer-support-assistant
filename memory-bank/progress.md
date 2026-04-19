# Progress

## What Works

- Power Apps Code App scaffolded, initialised, and deployed
- Dark glassmorphism UI shell with full navigation
- Role switcher: Support Agent ↔ Manager
- **Support Agent dashboard** (70/30 layout):
  - Tickets view: full list with ID, title, customer, status badge, priority badge, date
  - Kanban view: 6 columns (New / Open / Assigned / In Progress / Waiting / Closed), colour-coded per status
  - Customers view: grid of profile cards with "View Details" panel overlay
  - Tasks sidebar: sortable by date or priority, checkbox completion, links to ticket overlay
- **Ticket overlay** (full-screen): Summary (AI-style) / Activity (timeline) / Messages (thread) / Customer Info tabs + status progress bar
- **Manager dashboard**: greeting, metric cards (Open / SLA Breaches / Avg Resolution), active tickets carousel, critical issues list, AI insights panel
- Mock data: 12 tickets, 8 tasks, 5 customers (BMW, BASF, Siemens, Deutsche Bank, Allianz), 10 messages, 3 agents
- **Power Automate flows — two approaches working (Part 3 demo)**:
  - **Direct HTTP call** (`src/services/flows.ts`): MSAL PKCE custom popup, manual token exchange, in-memory cache (59 min). Returns `{ output }`. Panel: "Calling the Flow Directly"
  - **Custom connector** (`PowerAutomateDirectInvokeService.invoke('2024-10-01', body)`): PAC CLI data source, auto-generated service. Panel: "Calling the Flow via Custom Connector"
  - Both panels rendered in the **Flow** tab in App.tsx
- Version: `v1.2.3` deployed

## What Is Left to Build

- [ ] Part 2 — Dataverse: real ticket and customer data
- [ ] Part 3 — Power Automate: create/update ticket flows (extend flows.ts)
- [ ] Part 4 — Connector: external data enrichment
- [ ] Part 5 — Copilot Studio: in-app AI chat
- [ ] Part 6 — ALM: solution packaging, pipelines, environments

## Series Part Status

| Part                     | Status         |
| ------------------------ | -------------- |
| 1 — Scaffold + UI shell  | ✅ Complete    |
| 2 — Dataverse            | ⬜ Not started |
| 3 — Power Automate flows | 🔄 In progress (two flow invocation approaches demoed; full ticket flows pending) |
| 4 — Connectors           | ⬜ Not started |
| 5 — Copilot Studio       | ⬜ Not started |
| 6 — ALM                  | ⬜ Not started |
