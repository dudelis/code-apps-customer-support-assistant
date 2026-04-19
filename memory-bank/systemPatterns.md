# System Patterns

## Architecture Overview

```
src/
├── components/   # React components (one per file, PascalCase)
├── services/     # Stateless async integration modules
├── hooks/        # Custom hooks — bridge services ↔ components
├── generated/    # PAC CLI auto-generated models (services excluded — invalid TS)
├── App.tsx       # Root component, layout
└── main.tsx      # Entry point
```

## Data Flow

```
Component → Hook → Service → External system
```

- Components never call services directly — always through hooks
- Services never hold state — pure async functions only
- **Exception**: `FlowPanel` calls `flows.ts` directly (demo widget, no hook needed yet)

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

## Power Automate Flow Patterns

Two approaches are demonstrated in this app:

### 1. Direct HTTP Call with MSAL PKCE (`src/services/flows.ts`)

- Opens a custom popup, polls `popup.location.hash` for `#code=` after AAD redirects back (same-origin)
- Exchanges code manually via fetch to `login.microsoftonline.com/token` (MSAL `acquireTokenByCode` cannot be used — dynamic iframe path)
- Caches token in module-level `cachedToken` / `tokenExpiresAt` (59 min TTL)
- Calls flow via `fetch` with `Authorization: Bearer <token>`
- Requires AAD app registration with `Flows.Manage.All` permission and CSP `connect-src` configured

```ts
// getAccessToken() checks in-memory cache first, then MSAL silent, then popup
export async function runCodeAppFlow(input: CodeAppFlowInput): Promise<CodeAppFlowOutput> {
  const token = await getAccessToken();
  const response = await fetch(FLOW_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(input),
  });
  return response.json() as Promise<CodeAppFlowOutput>;
}
```

### 2. Custom Connector via PAC CLI (`src/generated/services/PowerAutomateDirectInvokeService.ts`)

- Add connector: `pac code add-data-source --apiId "<connector-api-id>" --connectionId "<connection-id>"`
- PAC CLI auto-generates the service file — do not edit manually
- API version must be `2024-10-01`

```ts
const result = await PowerAutomateDirectInvokeService.invoke('2024-10-01', { input1, input2 });
const data = result as unknown as { output?: string };
```

## Error Handling

- Services throw on non-OK HTTP responses
- Hooks catch and expose `error: string | null`
- Components display inline errors using Fluent UI `MessageBar`
- No silent failures — every caught error must be surfaced or logged

## Styling

- Fluent UI design tokens via `makeStyles` for all spacing, colour, and typography
- Use `mergeClasses` to combine conditional class names
- CSS custom properties only for values not available as Fluent UI tokens
