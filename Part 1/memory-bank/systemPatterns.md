# System Patterns

## Architecture Overview

```
src/
├── components/   # React components (one per file, PascalCase)
├── services/     # Stateless async integration modules
├── hooks/        # Custom hooks — bridge services ↔ components
├── App.tsx       # Root component, layout
└── main.tsx      # Entry point
```

## Data Flow

```
Component → Hook → Service → External system
```

- Components never call services directly — always through hooks
- Services never hold state — pure async functions only

## Component Conventions

- One component per file; filename = component name (PascalCase)
- Props typed with a dedicated interface: `interface TicketCardProps { ... }`
- Styles via Fluent UI `makeStyles`; never inline `style` prop unless value is truly dynamic
- No business logic in components — delegate to hooks

```tsx
// Good
const { tickets, isLoading, error } = useTickets();

// Bad — business logic leaking into component
useEffect(() => { fetch('/api/...').then(...) }, []);
```

## Service Conventions

- One file per integration domain: `dataverse.ts`, `flows.ts`, `copilot.ts`, `connector-<name>.ts`
- Named exports only — no default exports, no classes
- All table/column logical names and URLs are named constants at the top of the file
- Errors propagate as thrown exceptions — hooks handle them

```ts
export const TICKETS_TABLE = 'cr123_supportticket';

export async function getTickets(): Promise<Ticket[]> { ... }
```

## Hook Conventions

- Named `use<Domain>` — e.g. `useTickets`, `useTicketDetail`, `useCopilot`
- Expose a consistent shape: `{ data, isLoading, error }`
- Own all loading and error state — components never manage fetch lifecycle directly

## Error Handling

- Services throw on non-OK HTTP responses
- Hooks catch and expose `error: string | null`
- Components display inline errors using Fluent UI `MessageBar`
- No silent failures — every caught error must be surfaced or logged

## Styling

- Fluent UI design tokens via `makeStyles` for all spacing, colour, and typography
- Use `mergeClasses` to combine conditional class names
- CSS custom properties only for values not available as Fluent UI tokens
