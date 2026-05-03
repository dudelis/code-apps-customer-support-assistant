Use the existing Customer Support Assistant repo context and memory bank. Do not restate setup and do not rebuild the app.

Task:
Add the Power Automate flow to the code app and prepare a small wrapper service for it.

Assume Part 4 is already complete.

Requirements:

1. Work inside `app/`.
2. Follow the Microsoft guide: https://learn.microsoft.com/en-us/power-apps/developer/code-apps/how-to/add-flows
3. Use `npx power-apps list-flows` and `npx power-apps add-flow --flow-id <flow-id>`.
4. Upgrade `@microsoft/power-apps` first if it is below `1.1.1`.
5. Create a small `src/services/flows.ts` wrapper for the generated flow client.
6. Do not wire any UI yet.

Deliverables:

1. The flow is added.
2. `src/services/flows.ts` exists.
3. Any required package or config updates are included.

Stop before the ticket overlay changes.
