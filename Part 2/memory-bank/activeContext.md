# Active Context

## Current Focus

Part 1 complete. Full UI prototype scaffolded, implemented, and deployed to the `code-apps` environment.

## Recent Changes

- Scaffolded Code App into `./app/` using `npx degit microsoft/PowerAppsCodeApps/templates/vite`
- Installed `@fluentui/react-components` v9
- Implemented full UI prototype with mock data:
  - Premium dark glassmorphism theme (`customDarkTheme` + `glassStyles`)
  - ShellBar with 🎧 icon and Support Agent / Manager role switcher
  - Support Agent Dashboard: 70/30 split, Tickets / Kanban / Customers nav, My Tasks sidebar
  - Manager Dashboard: greeting, metrics strip, active tickets, critical issues, AI insights
  - Full-screen Ticket Overlay: gradient header, Summary / Activity / Messages / Customer Info tabs, status progression bar
  - 18 realistic mock tickets across BMW, BASF, Siemens, Deutsche Bank, Allianz
- Deployed v1.0.0 to `code-apps` environment
- App URL: https://apps.powerapps.com/play/e/7edee57a-8151-e291-9c30-d0418c88af4d/app/69c0e8b7-b853-43be-ae6c-61164c57bb12

## Next Steps

1. Part 2 — Dataverse: replace `src/data/*.ts` mock modules with real Dataverse Web API calls in `src/services/dataverse.ts`; hooks stay the same interface
2. Define Dataverse table schema for `supportticket` and `customer` tables (Part 2 decision)

## Open Decisions

| Decision               | Options                                           | Status                                                |
| ---------------------- | ------------------------------------------------- | ----------------------------------------------------- |
| Routing                | React Router vs simple state-based view switching | Still undecided — state-based works for current scope |
| State management       | Local hook state vs Zustand / Context API         | Local hooks + Context for overlay; working well       |
| Dataverse table schema | Define in solution vs document in code            | TBC in Part 2                                         |

## Known Issues / Blockers

_None._
