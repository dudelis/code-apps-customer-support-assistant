# Customer Support Assistant — Memory Bank

## Project

- **Path**: `C:/_dev/code-apps-customer-support-assistant - test/`
- **App name**: Customer Support Assistant
- **Environment**: code-apps-us (f0c1817c-eed6-edee-9857-661c7b8d6e0e)
- **App ID**: df9964cd-33f3-49c4-a2e2-476a1bba4a85
- **App URL**: https://apps.powerapps.com/play/e/f0c1817c-eed6-edee-9857-661c7b8d6e0e/app/df9964cd-33f3-49c4-a2e2-476a1bba4a85
- **Version**: v1.0.0

## Completed Steps

- [x] Prerequisites validated (Node 22, pac CLI 2.6.4, Git)
- [x] Scaffold (`npx degit microsoft/PowerAppsCodeApps/templates/vite`)
- [x] Install Fluent UI (`@fluentui/react-components`)
- [x] Initialize (`pac code init --displayName 'Customer Support Assistant'`)
- [x] Baseline deploy
- [x] Implement full UI shell (Part 1)
- [x] Final deploy (v1.0.0)
- [x] Memory bank updated

## Data Sources

_None yet — all mock data. Part 2 will add Dataverse._

## Components

- `ShellBar` — fixed top bar, role switcher (Support Agent / Manager)
- `AgentDashboard` — 70/30 grid container
  - `TicketsView` — table list of tickets
  - `KanbanView` — 6-column board
  - `CustomersView` — customer grid + detail overlay
  - `CustomerCard` — individual customer card
  - `TasksSidebar` — task list with sort, checkboxes, ticket link
- `TicketOverlay` — full-screen overlay (Summary / Activity / Messages / Customer Info)
- `PriorityBadge`, `StatusBadge` — shared badge components
- `ManagerDashboard` — metrics, active tickets, critical issues, AI insights

## Mock Data

- 12 tickets (BMW, BASF, Siemens, Deutsche Bank, Allianz)
- 8 tasks linked to tickets
- 5 customers
- 10 messages across tickets
- 3 agents
- Metrics object

## Next Steps

- Part 2: `/add-dataverse` — replace mock data with real Dataverse ticket table
- Part 3: `/add-connector` or flows — Power Automate for ticket creation
- Part 4: connector integration
- Part 5: `/add-mcscopilot` — Copilot Studio chat interface
