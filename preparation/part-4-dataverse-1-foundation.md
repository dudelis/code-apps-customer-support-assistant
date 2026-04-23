Use the existing Customer Support Assistant repo context and memory bank. Do not restate known project setup and do not rebuild the app.

Task:
Set up the Dataverse foundation for Part 4 before any schema or React refactor work begins.

Scope for this prompt only:

1. Create a Dataverse publisher:
   - Name: Death Star Development
   - Prefix: csa
2. Create a solution using that publisher:
   - Name: Customer Support Assistant
3. Place the app in the same solution.
4. Create Dataverse access in the app and add the required Dataverse connections.
5. Verify what current app data surfaces will be moved to Dataverse in Part 4.

Important constraints:

- do not create all implementation code for Part 4 yet
- do not add all tables yet unless they are required for setup validation
- keep the focus on environment and solution foundation
- verify the current UI data usage and confirm that Tickets, Customers, and Tasks are the three primary business entities for this stage

Required output:

1. Complete the publisher and solution setup.
2. Confirm the app is positioned to use Dataverse in the same solution.
3. Confirm the Part 4 data scope is Tickets, Customers, and Tasks.
4. Summarize what was created and what the next prompt should do.

Stop after foundation setup is complete.
