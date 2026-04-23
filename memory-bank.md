# Customer Support Assistant — Memory Bank

## Project

- Path: C:\_dev\code-apps-customer-support-assistant\app\
- App name: Customer Support Assistant
- Environment: code-apps (7edee57a-8151-e291-9c30-d0418c88af4d)
- App URL: https://apps.powerapps.com/play/e/7edee57a-8151-e291-9c30-d0418c88af4d/app/69c0e8b7-b853-43be-ae6c-61164c57bb12
- Version: v1.0.4 (live M365 connectors active)
- App URL: https://apps.powerapps.com/play/e/7edee57a-8151-e291-9c30-d0418c88af4d/app/69c0e8b7-b853-43be-ae6c-61164c57bb12

## Completed Steps

- [x] Prerequisites validated (Node v22.14.0, Git, pac CLI 2.6.4)
- [x] pac auth create (Darth.Sidious@fallenorder.onmicrosoft.com)
- [x] Environment selected: code-apps
- [x] Scaffold (npx degit microsoft/PowerAppsCodeApps/templates/vite app)
- [x] Initialize (pac code init)
- [x] Baseline build + deploy
- [ ] Install Fluent UI v9
- [ ] Implement UI prototype (types, data, theme, components)
- [ ] Final build + deploy

## Data Sources

- **Office 365 Users** — connection `shared-office365user-91d43677-e3ab-4110-b0bb-1b850c7cd8d1` (API: `shared_office365users`)
- **Office 365 Outlook** — connection `64b7342d44814b4e9e6237500a14d0fb` (API: `shared_office365`)
- Added via `pac code add-data-source`; generated services in `src/generated/services/`
- Toggle live vs mock via `VITE_M365_MODE=live` in `.env.local`

## Components Planned

See plan at C:\Users\fuksz\.claude\plans\staged-prancing-mitten.md

## Next Steps

- Install @fluentui/react-components
- Build full UI prototype per plan
- Final deploy v1.0.0
