Use the existing Customer Support Assistant repo context and memory bank. Do not restate known project setup and do not rebuild the app.

Task:
Add the Dataverse service or repository layer for Part 4 while keeping the code simple and aligned with the current hooks structure.

Assume Prompts 1 and 2 are already complete.

Scope for this prompt only:

1. Verify how the current app reads Tickets, Customers, and Tasks.
2. Add or adapt a Dataverse layer for those three entities.
3. Keep mock or demo and live Dataverse access behind the same abstractions if that helps the current app stay runnable.
4. Keep Microsoft 365 integrations complementary only for profile, photo, and calendar enrichment.

Implementation guidance:

- introduce a clear Dataverse service or repository layer for Tickets, Customers, and Tasks
- preserve the current React + hooks structure where practical
- keep the implementation explicit and easy to explain in the video series
- do not rework unrelated UI components

Required output:

1. Add the Dataverse-facing service layer for the three main business entities.
2. Keep a clear demo path if live Dataverse is not available during development.
3. Make the next step obvious for wiring hooks and views.

Stop after the service layer is in place and validated as far as practical.
