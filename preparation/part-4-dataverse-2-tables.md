Use the existing Customer Support Assistant repo context and memory bank. Do not restate known project setup and do not rebuild the app.

Task:
Create the minimum Dataverse schema for Part 4 and seed it with useful demo data.

Assume Prompt 1 is already complete.

Scope for this prompt only:

1. Create these Dataverse tables inside the `Customer Support Assistant` solution using the `csa` prefix:
   - Tickets
   - Customers
   - Tasks
2. Keep the model intentionally small.
3. Add only the supporting choice columns, lookups, and fields needed by the current UI.
4. Seed the tables with demo data, including a few Star Wars-themed records that still feel useful in the app.

Table expectations:

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
- tasks may optionally exist without a ticket if that matches the current app behavior
- use Dataverse lookups where relationships matter
- use choice columns where appropriate for status and priority

Important constraints:

- do not wire the full React app yet
- do not over-design the schema
- optimize for the current app, not a future enterprise model

Required output:

1. Create the three tables and their minimum required columns.
2. Seed them with enough data to exercise the current screens.
3. Summarize the schema decisions briefly.
4. State what the next prompt should wire in code.

Stop after schema and seed data are ready.
