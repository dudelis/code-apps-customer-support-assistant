# Active Context

## Current Focus

Part 3 — Power Automate integration complete (demo). Two approaches demonstrated side-by-side in the Flow tab:
1. **Calling the Flow Directly** — HTTP POST with bearer token via MSAL PKCE custom popup
2. **Calling the Flow via Custom Connector** — PAC CLI data source, auto-generated service

## Recent Changes

- Removed `shared_logicflows` connector and `LogicflowsService.ts` entirely — replaced with two new approaches
- `src/services/flows.ts` rewritten: MSAL PKCE custom popup polling, manual token exchange, in-memory token cache (`cachedToken` / `tokenExpiresAt`). No MSAL token caching (AAD PKCE redirect URI constraints in Power Apps iframe prevent it).
- `src/components/shared/FlowPanel.tsx` — "Calling the Flow Directly" panel
- `src/components/shared/ConnectorFlowPanel.tsx` — NEW, "Calling the Flow via Custom Connector" panel
- Custom connector `shared_crc39-5fpower-20automate-20direct-20invoke-5fba456ee3f9d472a6` added via PAC CLI
  - Connection ID: `ba10b99e-092b-4a90-a3ff-b5bd9cef5cbb`
  - Connection reference key: `c341c007-ab35-40ff-abf4-1ccd432958a4` in `power.config.json`
  - Auto-generated: `src/generated/services/PowerAutomateDirectInvokeService.ts` (single `invoke(api_version, body)` method)
  - API version must be `2024-10-01`
- AAD app registration created for direct flow call: Client ID `22096dd6-2dd5-4c8b-a26f-8a615ae94a8e`, Tenant ID `1e7886bb-4ad8-4924-b559-29c5f5fea8f5`
- CSP `connect-src` updated in Power Platform Admin Center to allow `https://login.microsoftonline.com` and flow endpoint domain
- `@azure/msal-browser` added as dependency
- Version bumped to `v1.2.3` in ShellBar
- Deployed successfully via `pac code push`

## Deployment

- Build: `npm run build`
- Deploy: `pac code push`
- **Bump the patch version** in `src/components/ShellBar.tsx` before every deployment.

## Connector Portability

When moving the app between environments:
- Connection reference IDs in `power.config.json` are environment-specific
- Re-run `pac code add-data-source` with new connection ID in the target environment
- Or package in a **Solution** — Power Platform prompts for connection mapping on import

## Next Steps

1. Part 2 — Dataverse: replace mock ticket arrays with real Dataverse queries
2. Part 3 (continued) — add flows for ticket create/update in `flows.ts`
3. Part 4 — Connector: pull external customer data
4. Part 5 — Copilot Studio: embed chat interface for AI-assisted responses

## Open Decisions

| Decision               | Options                                           | Status                                                |
| ---------------------- | ------------------------------------------------- | ----------------------------------------------------- |
| Routing                | React Router vs simple state-based view switching | Resolved: state-based switching (role + agentView)    |
| State management       | Local hook state vs Zustand / Context API         | Resolved: local hook (`useAppState`) for now          |
| Dataverse table schema | Define in solution vs document in code            | TBC in Part 2                                         |

## Known Issues / Caveats

- Direct flow call: token popup shown on first use per session (in-memory cache lasts 59 min; page refresh resets it). MSAL `acquireTokenByCode` cannot be used because AAD requires `redirect_uri` to match exactly, and Power Apps runs in an iframe at a dynamic path that cannot be pre-registered.
- `PowerAutomateDirectInvokeService.ts` is auto-generated — do not edit manually. If `pac code add-data-source` is re-run, it will be regenerated.
