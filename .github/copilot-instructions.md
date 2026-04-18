# GitHub Copilot Instructions

## Project

This is a **Customer Support Assistant** Power Apps Code App built across a video series. Each part adds new capabilities. The codebase should stay simple and readable at every stage so viewers can follow along easily.

---

## Tech Stack

- **React** with **TypeScript**
- **Vite** as the build tool
- **Fluent UI v9** (`@fluentui/react-components`) for UI components
- Deployed to **Power Apps** as a Code App via the PAC CLI

---

## Code Style

### General
- Prefer simple, explicit code over clever or abstract code
- One responsibility per function or component — keep them short and focused
- Use descriptive names for variables, functions, components, and CSS classes
- 2-space indentation throughout
- Single quotes in TypeScript/TSX; semicolons required
- Use explicit TypeScript types; avoid `any`

### Components
- Functional components only — no class components
- One component per file; file name matches the component name (PascalCase)
- Keep JSX clean — extract complex expressions into named variables or helper components
- Use Fluent UI v9 components (`@fluentui/react-components`) for all UI elements

### CSS / Styling
- Use Fluent UI's `makeStyles` and `mergeClasses` for component-scoped styles
- Use CSS custom properties (`--variable-name`) only for values not covered by Fluent UI tokens
- Mobile-first layout; prefer flexbox or grid

### TypeScript
- Use `const` by default; `let` only when reassignment is needed; never `var`
- Prefer `async/await` over `.then()` chains
- Define prop types with interfaces, not inline types
- Validate and handle errors at boundaries (user input, API calls)

---

## Structure

```
/
├── src/
│   ├── components/         # Reusable React components
│   ├── services/           # Integration modules (connectors, Dataverse, flows, Copilot)
│   ├── hooks/              # Custom React hooks
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── index.html              # HTML shell
├── vite.config.ts
├── tsconfig.json
└── part-N-*/               # Notes and assets per video part
```

New files should be introduced intentionally and named clearly to reflect their purpose.

---

## What to Avoid

- Class components or lifecycle methods (use hooks instead)
- `any` type — use proper TypeScript types or `unknown`
- Utility libraries (Lodash, etc.) — use native array/object methods
- Over-engineering — no premature abstractions or patterns that aren't yet needed
- Inline styles (use `makeStyles` instead)
- Magic numbers or strings — use named constants
- Commented-out code left in files

---

## Extensibility

The app will grow across the series. When adding a feature:
- Keep it self-contained so it can be modified or removed without side effects
- Use clear naming that signals what the feature does
- Avoid coupling new code tightly to existing code unless necessary

### Power Platform Connectors
- Each connector lives in `src/services/connector-name.ts`
- Export one typed async function per operation; components never handle raw HTTP
- Connection IDs and endpoint paths are named constants at the top of the file

### Dataverse
- All Dataverse access lives in `src/services/dataverse.ts`
- Use the Power Apps Web API with `fetch`; always include `OData-MaxVersion` and `Content-Type` headers
- Table and column logical names are named string constants — never inline raw strings

### Power Automate Flows
- HTTP-triggered flows are called from `src/services/flows.ts`
- Each flow is a single typed async function accepting a plain object and returning typed data
- Flow URLs are named constants; component code never constructs or stores them

### Copilot Studio
- Copilot Studio integration lives in `src/services/copilot.ts`
- Use the Direct Line channel; keep token management and reconnection logic inside the module
- Components only call `sendMessage(text)` and register an `onMessage(handler)` — no protocol details in component code

---

## Memory Bank

The `memory-bank/` directory is the persistent context for this project. Read all six files at the start of every task:

| File | Contains |
|------|---------|
| `projectbrief.md` | Goals, scope, series roadmap |
| `productContext.md` | Why it exists, user persona, UX principles |
| `techContext.md` | Stack, dev commands, constraints |
| `systemPatterns.md` | Architecture, patterns, conventions |
| `activeContext.md` | Current focus, next steps, open decisions |
| `progress.md` | What's done, what's left |

### When to Update

| Trigger | File to update |
|---------|---------------|
| New dependency or tooling change | `techContext.md` |
| Architectural or pattern decision | `systemPatterns.md` |
| Task completed or new task started | `activeContext.md`, `progress.md` |
| Scope or roadmap change | `projectbrief.md` |
| Product or UX decision | `productContext.md` |

Always update `activeContext.md` at the end of every working session.
