# System Patterns

## Architecture Overview

```
src/
├── components/      # React components (one per file, PascalCase)
├── services/        # Stateless async integration modules (hand-written)
├── hooks/           # Custom hooks — shared context state + service bridges
├── data/            # Mock data modules (used when VITE_*_MODE != 'live')
├── generated/       # PAC CLI-generated connector services & models (do not edit)
│   ├── services/
│   └── models/
├── App.tsx          # Root component, layout, context providers
└── main.tsx         # Entry point
```

## Data Flow

```
Component → Hook (context) → Service → External system
```

- Components never call services directly — always through hooks
- Services never hold state — pure async functions only
- Shared state is provided via React Context so mutations in one component update all views

## Shared Context Pattern

All three business data hooks (`useTickets`, `useCustomers`, `useTasks`) follow the same pattern already established by `useTicketOverlay`:

```typescript
// 1. Define context shape + create context with safe defaults
export const TicketsContext = createContext<TicketsContextValue>({...});

// 2. State factory — called once in App.tsx, owns the actual state
export function useTicketsState(): TicketsContextValue {
  const [all, setAll] = useState<Ticket[]>([]);
  ...
  return { all, isLoading, error, byStatus, byPriority, createTicket, updateStatus, deleteTicket };
}

// 3. Hook — components call this; reads from shared context
export function useTickets(): TicketsContextValue {
  return useContext(TicketsContext);
}
```

In `App.tsx`:
```tsx
const ticketsState = useTicketsState();
return (
  <TicketsContext.Provider value={ticketsState}>
    ...
  </TicketsContext.Provider>
);
```

This means a single fetch, and mutations from any component (e.g. delete in overlay) update the list view immediately.

## Service Conventions

- One file per integration domain: `userProfileService.ts`, `calendarService.ts`, `dataverseService.ts`, `flows.ts`
- Named exports only — no default exports, no classes
- All table/column logical names and constants at the top of the file
- Toggle mock vs live with env vars: `VITE_M365_MODE` (M365), `VITE_DATAVERSE_MODE` (Dataverse)
- **Reads**: live calls generated services; mock returns `src/data/*` arrays
- **Mutations**: live calls generated services; mock is a no-op (optimistic UI state persists for the session)
- **Flow/connector calls** (`flows.ts`): always live — no mock toggle needed (Power Apps provides the connection at runtime)
- Errors propagate as thrown exceptions — hooks catch and expose them

```typescript
const IS_LIVE = import.meta.env.VITE_DATAVERSE_MODE === 'live';

export async function updateTicketStatus(id: string, status: TicketStatus): Promise<void> {
  if (!IS_LIVE) return;
  const result = await Csa_ticketsService.update(id, { csa_status: STATUS_TO_VALUE[status] });
  if (!result.success) throw new Error('Failed to update ticket status.');
}
```

## Mutation Strategy

- **Optimistic update** for status changes and done toggles: update local state immediately, then call service. Fast and responsive; no rollback on failure (acceptable for Part 4 scope).
- **Refetch** for creates: call service, then re-run `load()` to get the server-assigned ID and timestamps.
- **Optimistic remove** for deletes: remove from local state immediately, then call service.

## Hook Shape

All data hooks expose a consistent shape:

```typescript
{
  all: T[];
  isLoading: boolean;
  error: string | null;
  // derived helpers
  byStatus?: Map<TicketStatus, Ticket[]>;
  byId?: (id: string) => T | undefined;
  sortByDate?: () => T[];
  // mutation helpers
  createX?: (input: NewXInput) => Promise<void>;
  updateX?: (...) => Promise<void>;
  deleteX?: (id: string) => Promise<void>;
}
```

## Component Conventions

- One component per file; filename = component name (PascalCase)
- Props typed with a dedicated interface: `interface TicketCardProps { ... }`
- Styles via Fluent UI `makeStyles`; never inline `style` prop unless value is truly dynamic
- No business logic in components — delegate to hooks
- Loading state: `<Spinner />` centered in a wrapper div
- Error state: `<MessageBar intent="error">` inline
- Empty state: plain `<Text>` centered in a wrapper div

## Error Handling

- Services throw on non-OK responses
- Hooks catch and expose `error: string | null`
- Components display inline errors using Fluent UI `MessageBar`
- Mutation errors are currently silent (not surfaced to the user) — revisit for Part 5

## Styling

- Fluent UI design tokens via `makeStyles` for all spacing, colour, and typography
- Use `mergeClasses` to combine conditional class names
- CSS custom properties only for values not available as Fluent UI tokens
- Dark glassmorphism theme: `#0d0f14` background, `rgba(255,255,255,0.04–0.08)` glass surfaces, `#4F8CFF` accent
