# Customer Support Assistant — Memory Bank

## Project

- Path: C:\_dev\code-apps-customer-support-assistant\app\
- App name: Customer Support Assistant
- Environment: code-apps (7edee57a-8151-e291-9c30-d0418c88af4d)
- App URL: https://apps.powerapps.com/play/e/7edee57a-8151-e291-9c30-d0418c88af4d/app/69c0e8b7-b853-43be-ae6c-61164c57bb12
- Version: v1.1.0 (Part 4 complete — full Dataverse CRUD)
- Last deployed: 2026-04-26

## Completed Steps

- [x] Prerequisites validated (Node v22.14.0, Git, pac CLI 2.6.4)
- [x] pac auth create (Darth.Sidious@fallenorder.onmicrosoft.com)
- [x] Environment selected: code-apps
- [x] Scaffold + initialize (pac code init)
- [x] Part 2 — Full UI prototype (dark theme, dashboards, ticket overlay)
- [x] Part 3 — M365 connectors (Office 365 Users + Outlook)
- [x] Part 4 — Dataverse CRUD (Tickets, Customers, Tasks)

## Data Sources

- **Office 365 Users** — connection `shared-office365user-91d43677-e3ab-4110-b0bb-1b850c7cd8d1`
- **Office 365 Outlook** — connection `64b7342d44814b4e9e6237500a14d0fb`
- **Dataverse csa_tickets / csa_customers / csa_tasks** — generated services in `src/generated/services/`
- Toggle live vs mock: `VITE_M365_MODE=live` (M365), `VITE_DATAVERSE_MODE=live` (Dataverse) in `.env.local`

## Next Steps

- Part 5 — trigger a Power Automate HTTP flow from the app (`src/services/flows.ts`)
- Copilot Studio integration
- ALM setup
