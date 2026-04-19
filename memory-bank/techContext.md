# Tech Context

## Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | React 19 | Functional components + hooks only |
| Language | TypeScript | Strict mode; `verbatimModuleSyntax` enabled — must use `import type` for type-only imports |
| Build tool | Vite 7 | Fast HMR in dev; optimised bundle for prod |
| UI library | Fluent UI v9 (`@fluentui/react-components` ^9.73) | `webDarkTheme` as base; custom CSS variables for glassmorphism |
| Platform | Power Apps Code Apps | Deployed via PAC CLI 2.6.4 |
| Data | Dataverse Web API | Planned for Part 2 |
| Automation | Power Automate (`shared_logicflows`) | Connected — Part 3 in progress |
| AI | Copilot Studio | Planned for Part 5 |

## Dev Commands

```bash
npm install        # install dependencies
npm run dev        # start local dev server (Vite, port 3000)
npm run build      # production build (runs tsc -b then vite build)
npm run lint       # ESLint
```

```powershell
pac code push      # deploy to Power Apps (run from project root)
```

## Deployment Info

- **Environment**: code-apps-us
- **Environment ID**: f0c1817c-eed6-edee-9857-661c7b8d6e0e
- **App ID**: df9964cd-33f3-49c4-a2e2-476a1bba4a85
- **App URL**: https://apps.powerapps.com/play/e/f0c1817c-eed6-edee-9857-661c7b8d6e0e/app/df9964cd-33f3-49c4-a2e2-476a1bba4a85

## Connector: Power Automate Direct Invoke (Custom Connector)

- API ID: `shared_crc39-5fpower-20automate-20direct-20invoke-5fba456ee3f9d472a6`
- Added via: `pac code add-data-source --apiId "shared_crc39-5fpower-20automate-20direct-20invoke-5fba456ee3f9d472a6" --connectionId "ba10b99e-092b-4a90-a3ff-b5bd9cef5cbb"`
- Connection reference key in `power.config.json`: `c341c007-ab35-40ff-abf4-1ccd432958a4`
- Auto-generated service: `src/generated/services/PowerAutomateDirectInvokeService.ts` — do not edit manually
- Usage: `PowerAutomateDirectInvokeService.invoke('2024-10-01', { input1, input2 })` → `{ output }`
- API version must be `2024-10-01` (not `2016-06-01`)

## Direct Flow Call (MSAL PKCE)

- AAD App Registration: Client ID `22096dd6-2dd5-4c8b-a26f-8a615ae94a8e`, Tenant `1e7886bb-4ad8-4924-b559-29c5f5fea8f5`
- Scope: `https://service.flow.microsoft.com//.default` (double slash is intentional)
- Flow URL: `https://f0c1817ceed6edee9857661c7b8d6e.0e.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/ef8fbd01bbbf470fb0ca1f8b80441d03/triggers/manual/paths/invoke?api-version=1`
- Redirect URI registered in AAD: `window.location.origin` of the Power Apps iframe (`https://f0c1817ceed6edee9857661c7b8d6e.0e.environment.api.powerplatformusercontent.com`)
- Custom popup polls `popup.location.hash` for `#code=` (same-origin after AAD redirect)
- Token exchange done manually via fetch — MSAL `acquireTokenByCode` cannot be used (dynamic iframe path cannot be pre-registered as redirect URI)
- Token cached in module-level variables `cachedToken` / `tokenExpiresAt` (59 min TTL); page refresh resets cache
- CSP `connect-src` in Power Platform Admin Center must include `https://login.microsoftonline.com` and the flow endpoint domain

## Constraints

- Must run inside the Power Apps iframe sandbox
- Power Apps iframe runs at a dynamic path (`/<guid>/<number>/`) — only the origin can be registered as redirect URI in AAD
- Web API calls use ambient session token from Power Apps for Dataverse (no extra auth headers needed)
- PAC CLI must be authenticated before deployment: `pac auth create --url https://org0d999d10.crm.dynamics.com/`
- `verbatimModuleSyntax` is on — all type imports must use `import type { ... }`

## Key Dependencies

```json
{
  "@azure/msal-browser": "^4.x",
  "@fluentui/react-components": "^9.73.7",
  "@microsoft/power-apps": "^1.0.3",
  "react": "^19.2.0",
  "react-dom": "^19.2.0"
}
```

## Theme System

CSS custom properties defined in `src/index.css`:
- `--bg-base`, `--bg-panel`, `--bg-glass` — layered dark backgrounds
- `--border-glass` — subtle white border for glassmorphism panels
- `--accent` — indigo (#6366f1) brand colour
- `--text-primary`, `--text-muted` — typography hierarchy
