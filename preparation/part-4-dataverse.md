# Part 4 Dataverse Prompts

This stage is easier to execute in small passes instead of one large prompt. Use the prompts below in order.

Each prompt should:

- use the existing Customer Support Assistant repo context and memory bank;
- avoid restating known project setup;
- extend the current app instead of rebuilding it;
- keep the implementation simple, explicit, and demo-friendly;
- stop after completing only the scope of that prompt.

## Prompt 1: Foundation

Use [preparation/part-4-dataverse-1-foundation.md](preparation/part-4-dataverse-1-foundation.md).

Goal:
Set up the Dataverse foundation before any table or code work starts.

## Prompt 2: Tables And Seed Data

Use [preparation/part-4-dataverse-2-tables.md](preparation/part-4-dataverse-2-tables.md).

Goal:
Create the minimum Dataverse schema and demo data needed for the current UI.

## Prompt 3: Service Layer

Use [preparation/part-4-dataverse-3-services.md](preparation/part-4-dataverse-3-services.md).

Goal:
Add a readable Dataverse service layer and preserve a clear mock or demo fallback path.

## Prompt 4: Wire The App

Use [preparation/part-4-dataverse-4-wire-ui.md](preparation/part-4-dataverse-4-wire-ui.md).

Goal:
Switch the current tickets, customers, and tasks views to the new Dataverse-backed layer without changing the app direction.

## Prompt 5: CRUD And Final Pass

Use [preparation/part-4-dataverse-5-crud-and-polish.md](preparation/part-4-dataverse-5-crud-and-polish.md).

Goal:
Finish the smallest useful CRUD loop, keep the dashboards working, and leave the code ready for the next series step.

## Suggested Order

1. Foundation
2. Tables and seed data
3. Service layer
4. UI wiring
5. CRUD and cleanup

## Why This Split Works

- Prompt 1 handles Power Platform setup only.
- Prompt 2 locks down schema decisions before app code changes.
- Prompt 3 creates the app abstraction layer before the UI is rewired.
- Prompt 4 limits the main refactor to read-path wiring.
- Prompt 5 finishes mutations and small polish without reopening design decisions.
