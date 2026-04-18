# Active Context

## Current Focus

Project setup and instruction scaffolding — pre-Part 1. No app code exists yet.

## Recent Changes

- Updated `CLAUDE.md` and `.github/copilot-instructions.md` to reflect the Power Apps Code App stack (React + TypeScript + Vite + Fluent UI v9)
- Created memory bank (`memory-bank/` directory with 6 files)
- Rewrote `preparation/part-1-prerequisites.md` to frame Part 1 as environment setup for developing this Code App locally

## Next Steps

1. Scaffold the Code App (Vite + React + TypeScript + Fluent UI v9)
2. Build the UI shell: layout, header, ticket list placeholder
3. Connect to Dataverse: list tickets from a Dataverse table

## Open Decisions

| Decision               | Options                                           | Status                                                |
| ---------------------- | ------------------------------------------------- | ----------------------------------------------------- |
| Routing                | React Router vs simple state-based view switching | Undecided                                             |
| State management       | Local hook state vs Zustand / Context API         | Lean toward local hooks until complexity demands more |
| Dataverse table schema | Define in solution vs document in code            | TBC in Part 2                                         |

## Known Issues / Blockers

_None at this stage._
