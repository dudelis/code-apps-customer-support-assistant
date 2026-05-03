# CLAUDE.md

## Project

**Customer Support Assistant** — a **Power Apps Code App** built with React and Vite. It is developed as part of a video series, with each part adding new capabilities: Power Platform connectors, Dataverse, Power Automate flows, Copilot Studio integration, and ALM practices.

The goal is to keep the codebase simple, readable, and easy to follow at each step of the series.

---

## Running the App

```bash
npm install
npm run dev
```

To build and deploy to Power Apps:

```bash
npm run build
pac code push
```

### Versioning rule

Every time the app is deployed to a Power Platform environment with `pac code push`, increment the **patch digit** (third number) in `app/src/version.ts` before building:

```ts
// Before deploy: bump 1.0.0 → 1.0.1, 1.1.2 → 1.1.3, etc.
export const APP_VERSION = '1.0.1';
```

The version is displayed next to the app name in the shell bar via `VersionTag` (`app/src/components/shared/VersionTag.tsx`). It reads `APP_VERSION` from `app/src/version.ts` — update that file and the header updates automatically on next build.

---

## Project Structure

```
/
├── src/
│   ├── components/         # Reusable React components
│   ├── services/           # API and integration modules (connectors, Dataverse, flows)
│   ├── hooks/              # Custom React hooks
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── index.html              # HTML shell
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── CLAUDE.md               # This file
└── part-N-*/               # Notes and assets per video part
```

Each video part may introduce new files. Keep additions scoped and clearly named.

---

## Tech Stack

- **React** with **TypeScript**
- **Vite** as the build tool
- **Fluent UI v9** (`@fluentui/react-components`) for UI components
- **Power Apps Code Apps** platform (deployed via PAC CLI)

---

## Coding Conventions

- **TypeScript throughout** — no plain `.js` files in `src/`; use explicit types, avoid `any`
- **Functional components only** — no class components; use hooks for state and side effects
- **One component per file** — file name matches the component name (PascalCase)
- **Services are plain modules** — no classes; export individual async functions
- **Descriptive names** — clear variable, function, and component names; no abbreviations
- **Small functions** — each function does one thing
- **No dead code** — remove unused imports, variables, and functions before committing
- **Consistent formatting** — 2-space indentation, single quotes, semicolons required
- **Comments only when necessary** — explain *why*, not *what*

---

## Future Extensions

The app is designed to grow across the series. Upcoming integrations follow these patterns:

### Power Platform Connectors
- Each connector lives in `src/services/connector-name.ts`
- Export one typed async function per operation; callers never handle raw HTTP
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

The `memory-bank/` directory is the persistent context for this project. It contains six files:

| File | Purpose |
|------|---------|
| `projectbrief.md` | Goals, scope, series roadmap |
| `productContext.md` | Why it exists, user persona, UX principles |
| `techContext.md` | Stack, dev commands, constraints |
| `systemPatterns.md` | Architecture, patterns, conventions |
| `activeContext.md` | Current focus, next steps, open decisions |
| `progress.md` | What's done, what's left |

### Reading the Memory Bank

At the start of every task, read all six files in parallel before writing any code. They are the ground truth for project state.

### Updating the Memory Bank

Update the relevant file(s) whenever:
- A new technology or dependency is introduced → `techContext.md`
- An architectural or pattern decision is made → `systemPatterns.md`
- A task is completed or a new one begins → `activeContext.md` and `progress.md`
- The scope or roadmap changes → `projectbrief.md`
- A product or UX decision is made → `productContext.md`

Always update `activeContext.md` at the end of every session. It is the most frequently changing file.

---

## What Claude Should Do

- Read the full memory bank before starting any task
- Follow the conventions above without being asked
- Prefer the simplest solution that works
- Ask before introducing new files, dependencies, or structural changes
- Keep changes scoped to what was asked — do not refactor surrounding code unprompted
- When adding a feature, make it self-contained and easy to extend or remove in a future video part
- Update the memory bank at the end of every session
