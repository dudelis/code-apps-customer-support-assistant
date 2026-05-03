Use the existing Customer Support Assistant repo context and memory bank. Do not restate setup and do not rebuild the app.

Task:
Wire the added flow into the ticket overlay UI.

Assume the flow is already added and `src/services/flows.ts` already exists.

Requirements:

1. Add a `Send Email` button in `src/components/ticket/TicketOverlay.tsx`.
2. Call the flow through `src/services/flows.ts` and pass the current ticket ID.
3. Show the returned `message` at the top of the ticket pane.
4. Make the message auto-hide after a couple of seconds and allow the user to close it sooner.
5. Keep the button disabled or loading while the flow is running.

Deliverables:

1. The `Send Email` button is wired.
2. The flow `message` appears as a temporary dismissible banner.
3. In-flight state is handled cleanly.

Stop after the ticket overlay changes.
