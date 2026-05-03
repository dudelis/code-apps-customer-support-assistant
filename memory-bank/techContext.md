# Tech Context

## Stack

| Layer      | Choice                                      | Notes                                           |
| ---------- | ------------------------------------------- | ----------------------------------------------- |
| Framework  | React 18                                    | Functional components + hooks only              |
| Language   | TypeScript                                  | Strict mode; no `any`                           |
| Build tool | Vite                                        | Fast HMR in dev; optimised bundle for prod      |
| UI library | Fluent UI v9 (`@fluentui/react-components`) | Microsoft design system                         |
| Platform   | Power Apps Code Apps                        | Deployed via PAC CLI                            |
| Data       | Dataverse Web API                           | Generated services in `src/generated/services/` |
| Automation | Power Automate                              | HTTP-triggered flows (Part 5)                   |
| AI         | Copilot Studio                              | Direct Line channel (planned)                   |

## Dev Commands

```bash
npm install        # install dependencies
npm run dev        # start local dev server (Vite, port 5173)
npm run build      # production build (tsc -b && vite build)
npm run lint       # ESLint
pac code push      # deploy to Power Apps
```

For Part 5 flow integration, use the npm-based Power Apps CLI commands from the `app/` folder:

```bash
npx power-apps list-flows
npx power-apps add-flow --flow-id <flow-id>
```

These flow commands are not available through `pac code`.

## Versioning Rule

Bump the **patch digit** in `app/src/version.ts` before every `pac code push`. The version is displayed in the ShellBar via `VersionTag`.

## Constraints

- Must run inside the Power Apps iframe sandbox
- Authentication is provided by Power Apps — no custom auth code
- Web API calls use the ambient session token from Power Apps; no extra auth headers needed in production
- PAC CLI must be authenticated to the target environment before deployment

## Key Dependencies

```json
{
  "@fluentui/react-components": "^9.x",
  "react": "^18.x",
  "react-dom": "^18.x",
  "@microsoft/power-apps": "1.1.1+ required for add-flow/list-flows support"
}
```

## Environment Variables (`.env.local`, not committed)

```
VITE_M365_MODE=live         # use real Office 365 connectors; omit for mock data
VITE_DATAVERSE_MODE=live    # use real Dataverse services; omit for mock data
```

Both are set to `live` in the current `.env.local`. In mock mode, reads return `src/data/*` arrays and mutations are no-ops.

## Connectors & Generated Services

| Connector               | API name         | Connection ID                       | Generated service                                   |
| ----------------------- | ---------------- | ----------------------------------- | --------------------------------------------------- |
| Office 365 Users        | `office365users` | `shared-office365user-91d43677-...` | `src/generated/services/Office365UsersService.ts`   |
| Office 365 Outlook      | `office365`      | `64b7342d44814b4e9e6237500a14d0fb`  | `src/generated/services/Office365OutlookService.ts` |
| Dataverse csa_tickets   | —                | —                                   | `src/generated/services/Csa_ticketsService.ts`      |
| Dataverse csa_customers | —                | —                                   | `src/generated/services/Csa_customersService.ts`    |
| Dataverse csa_tasks     | —                | —                                   | `src/generated/services/Csa_tasksService.ts`        |

## Dataverse Schema (publisher: `csa`, solution: `Customer Support Assistant`)

| Table     | Logical name    | Key fields                                                                                                                                      |
| --------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Tickets   | `csa_tickets`   | `csa_ticketid`, `csa_name`, `csa_status` (optionset), `csa_priority` (optionset), `csa_assignedagent`, `csa_summary`, `csa_CustomerId` (lookup) |
| Customers | `csa_customers` | `csa_customerid`, `csa_name`, `csa_company`, `csa_role`, `csa_email`, `csa_lastinteractiondate`                                                 |
| Tasks     | `csa_tasks`     | `csa_taskid`, `csa_name`, `csa_priority` (optionset), `csa_duedate`, `csa_isdone`, `csa_TicketId` (lookup)                                      |
