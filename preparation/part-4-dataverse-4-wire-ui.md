Use the existing Customer Support Assistant repo context and memory bank. Do not restate known project setup and do not rebuild the app.

Task:
Wire the current app to display Dataverse-backed Tickets, Customers, and Tasks without changing the current UI direction.

Assume Prompts 1 through 3 are already complete.

Scope for this prompt only:

1. Update the app so it reads data from Dataverse for Tickets, Customers, and Tasks.
2. Keep the current dashboards and views working with the new data layer.
3. Preserve the current component structure where practical.
4. Keep the code readable and ready for the next prompt.

Important constraints:

- focus on read paths first
- do not try to finish every mutation flow in this prompt
- do not over-engineer state management

Required output:

1. Wire hooks and views to the Dataverse-backed layer.
2. Keep the app working for the three main business entities.
3. Summarize what remains for CRUD completion.

Stop after the read-path refactor is complete.
