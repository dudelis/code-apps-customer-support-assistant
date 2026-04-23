Use the existing Customer Support Assistant repo context and memory bank. Do not restate known project setup and do not rebuild the app.

Task:
Refactor the existing app so Dataverse becomes the primary business data layer for the current app, while keeping the implementation simple and aligned with what the UI already uses.

Before creating any tables in Dataverse, create the following foundation first:

1. Create a Dataverse publisher:
   - Name: Death Star Development
   - Prefix: csa
2. Create a solution using that publisher:
   - Name: Customer Support Assistant
3. Create all custom tables inside that solution and use the `csa` prefix.
4. Place the app in the same solution.
5. Create Dataverse access in the app and add the required Dataverse connections.

Keep the data model simple for this stage.

The three main Dataverse tables should be:

1. Tickets
2. Customers
3. Tasks

You can introduce a small number of supporting Dataverse fields, lookups, or choice columns for things like status, priority, and stage if needed, but keep the core implementation centered on these three tables. Do not expand into a large multi-table architecture unless the current app clearly requires it.

Please check the rest of the app and confirm the current UI/data usage, but optimize for the simplest correct implementation. Based on the current app structure, `Tickets`, `Customers`, and `Tasks` should be treated as the primary business tables.

Scope and constraints:

- extend the current app; do not rebuild it
- keep the current UI, layout, and component structure intact where practical
- keep the implementation readable, explicit, and demo-friendly
- Dataverse should become the system of record for the three main business entities
- Microsoft 365 data should remain complementary for internal-user profile/photo/calendar enrichment where already used
- if live Dataverse is not available during development, keep a seed/demo path that mirrors the Dataverse structure and makes later live wiring obvious

Dataverse table expectations:

1. Tickets
   - title or name
   - customer lookup
   - assigned agent reference or identifier
   - status
   - priority
   - created date
   - updated date
   - summary

2. Customers
   - name
   - company
   - role
   - email
   - last interaction date

3. Tasks
   - title
   - ticket lookup, if applicable
   - priority
   - due date
   - completed flag

Relationship expectations:

- one customer can have many tickets
- one ticket can have many tasks
- tasks may optionally exist without a ticket if the current app behavior needs that
- use Dataverse lookups where relationships matter
- use Dataverse choice columns where appropriate for status and priority

Seed/demo data expectations:

- populate the three main tables with dummy data
- use some funny Star Wars-themed records while still keeping the data useful for demos
- include enough data to exercise the existing screens and views

App changes required:

1. Update the app so it reads data from Dataverse for the three main tables: Tickets, Customers, and Tasks.
2. Update the app so CRUD operations for those three tables can be carried out inside the app.
3. Keep the current dashboards and views working with the new Dataverse-backed data layer.
4. Keep the code structure clear so the Dataverse part is easy to explain in the video series.

Implementation guidance:

- introduce a clear Dataverse service/repository layer for Tickets, Customers, and Tasks
- keep mock/demo and live Dataverse access behind the same abstractions if helpful
- preserve the current React + hooks structure where practical
- avoid over-engineering and avoid adding unnecessary new concepts for this step

Required output:

1. Verify the app’s current business data usage and keep the implementation focused on the three main tables.
2. Add or adapt the Dataverse layer for Tickets, Customers, and Tasks.
3. Wire the app to display Dataverse-backed data for those entities.
4. Support create, read, update, and delete operations in the app for those entities.
5. Seed the data with demo records, including some Star Wars-themed examples.
6. Keep the code readable and ready for the next series step.

Important:

- do not return only a plan
- actually update the codebase
- keep the scope intentionally small
- preserve the existing app direction and UI
- prefer a simple three-table Dataverse design over a more ambitious schema for this step
