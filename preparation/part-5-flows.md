# Part 5 Flow Prompts

This stage is easier to execute in two small passes instead of one combined prompt. Use the prompts below in order.

Each prompt should:

- use the existing Customer Support Assistant repo context and memory bank;
- avoid restating known project setup;
- extend the current app instead of rebuilding it;
- keep the implementation simple, explicit, and demo-friendly;
- stop after completing only the scope of that prompt.

## Prompt 1: Add The Flow

Use [preparation/part-5-flows-1-add-flow.md](preparation/part-5-flows-1-add-flow.md).

Goal:
Add the Power Automate flow to the code app with the supported CLI workflow and prepare a small service wrapper for later UI use.

## Prompt 2: Wire The Flow To The UI

Use [preparation/part-5-flows-2-wire-ui.md](preparation/part-5-flows-2-wire-ui.md).

Goal:
Add the `Send Email` ticket action and show the returned flow `message` as a temporary dismissible banner in the ticket pane.

## Suggested Order

1. Add the flow
2. Wire the flow to the UI

## Why This Split Works

- Prompt 1 isolates the CLI and generated-code step from the UI step.
- Prompt 2 can assume the flow client already exists and focus only on readable ticket-pane behavior.
- The separation keeps the series easier to explain and makes retries simpler if the flow generation step changes.
