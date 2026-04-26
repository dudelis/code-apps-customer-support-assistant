# Active Context

## Current Focus

Part 4 is complete. Dataverse is the data layer for all three business tables. Full CRUD is wired. The next step is Part 5: starting a Power Automate flow from the app.

## Recent Changes

- Converted `useTickets`, `useCustomers`, `useTasks` to shared context state (same pattern as `useTicketOverlay`)
  - Each exports a `Context`, a `use[Name]State()` factory (mounted in App.tsx), and a `use[Name]()` hook
  - Mutations from any component now update the shared state across all views
- Added mutation functions to `dataverseService.ts`: `createTicket`, `updateTicketStatus`, `deleteTicket`, `updateTaskDone`, `createCustomer`
- `TicketOverlay` — fixed static mock import; now reads from `useTickets` context; status steps are clickable (calls `updateStatus`); added Delete button
- `StatusProgressionBar` — added optional `onStatusChange` prop; steps are clickable when provided
- `MyTasksSidebar` — task done toggle now calls `setTaskDone` (optimistic update → persists to Dataverse); removed local `done` Set
- `TicketsView` — New Ticket button opens `NewTicketDialog`
- `CustomersView` — New Customer button opens `NewCustomerDialog`
- New: `NewTicketDialog.tsx` — form for title, priority, customer, summary
- New: `NewCustomerDialog.tsx` — form for name, company, role, email
- Deployed as v1.1.0

## Next Steps

1. Part 5 — trigger a Power Automate flow from the app (`src/services/flows.ts`)
2. After Part 5, extend with Copilot Studio integration
3. Later: external URL/API calls, ALM setup

## Open Decisions

| Decision               | Options                                           | Status                                                |
| ---------------------- | ------------------------------------------------- | ----------------------------------------------------- |
| Routing                | React Router vs simple state-based view switching | Still state-based; working well                       |
| Error feedback on mutations | Silent fail vs toast notification           | Currently silent (optimistic for updates); revisit for Part 5 |

## Known Limitations

- Mutation errors are silent (optimistic updates stay; no rollback on failure)
- No task create/delete in the UI — tasks are managed in Dataverse directly for now
- No customer edit/delete in the UI — out of scope for the series
