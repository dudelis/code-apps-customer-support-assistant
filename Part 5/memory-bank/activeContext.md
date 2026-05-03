# Active Context

## Current Focus

Part 5 is complete. The CSA Notification flow is registered, wrapped in `src/services/flows.ts`, and wired into the `TicketOverlay` UI. The next step is Copilot Studio integration (`src/services/copilot.ts`).

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
- Split the Part 5 preparation into two staged prompts
  - `preparation/part-5-flows-1-add-flow.md` covers adding the flow and creating the service wrapper
  - `preparation/part-5-flows-2-wire-ui.md` covers wiring the flow into the ticket overlay UI
- **Part 5 step 1**: upgraded `@microsoft/power-apps` to `1.1.1`; added CSA Notification flow via `npx power-apps add-flow`; generated `CSANotificationService.ts` + `CSANotificationModel.ts`; created `src/services/flows.ts` with `sendNotification()`
- **Part 5 step 2**: wired `sendNotification` into `TicketOverlay` as **Send Email** button with auto-dismissing banner
- **Part 5 step 3**: added CSA Notification Caller custom connector via `pac code add-data-source`; added `invokeTicketEmail()` to `flows.ts`; added **HTTP Trigger** button to `TicketOverlay`; fixed `api-version` query param to `'1'`; deployed as v1.1.4

## Next Steps

1. Part 6 — Copilot Studio integration (`src/services/copilot.ts`, Direct Line channel)
2. After Part 5, extend with Copilot Studio integration
3. Later: external URL/API calls, ALM setup

## Open Decisions

| Decision                    | Options                                           | Status                                                        |
| --------------------------- | ------------------------------------------------- | ------------------------------------------------------------- |
| Routing                     | React Router vs simple state-based view switching | Still state-based; working well                               |
| Error feedback on mutations | Silent fail vs toast notification                 | Currently silent (optimistic for updates); revisit for Part 5 |

## Known Limitations

- Mutation errors are silent (optimistic updates stay; no rollback on failure)
- No task create/delete in the UI — tasks are managed in Dataverse directly for now
- No customer edit/delete in the UI — out of scope for the series
