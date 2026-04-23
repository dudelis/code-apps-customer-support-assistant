# Active Context

## Current Focus

Part 3 complete. Microsoft 365 User + Calendar integration added (mock data + service layer ready for live connector).

## Recent Changes

- Condensed `preparation/part-4-dataverse.md` into a repo-aware implementation prompt that avoids repeating project/stack context already covered by the memory bank and instructions
- Rewrote `preparation/part-4-dataverse.md` again to narrow Part 4 Dataverse scope to the three core tables already reflected in the app: Tickets, Customers, and Tasks
- Added required Dataverse setup steps to the prompt: publisher (`Death Star Development`, prefix `csa`), solution (`Customer Support Assistant`), solution placement, Dataverse connections, and Star Wars-themed seed data
- Added `UserProfile`, `CalendarEvent`, `CalendarEventDateTime` types to `src/types/index.ts`
- Updated `AgentNavView` to include `'calendar'`
- Created mock data: `src/data/userProfile.ts`, `src/data/calendarEvents.ts`
- Created service layer: `src/services/userProfileService.ts`, `src/services/calendarService.ts`
  - Toggle live vs mock via `VITE_M365_MODE=live` in `.env.local`
  - Wired to `Office365UsersService` and `Office365OutlookService` generated connectors in live mode
- Added Office 365 Users + Office 365 Outlook connectors via `pac code add-data-source`
- Generated services in `src/generated/services/`
- Created hooks: `src/hooks/useUserProfile.ts`, `src/hooks/useCalendarEvents.ts`
- Created `src/components/shared/UserAvatar.tsx` — compact avatar + name in ShellBar (job title in tooltip)
- Created `src/components/agent/CalendarView.tsx` — event list with loading / error / empty states
- Updated `ShellBar` — added `<UserAvatar />` to right section
- Updated `AgentNavTabs` — added 📅 Calendar tab
- Updated `SupportAgentDashboard` — renders `<CalendarView />` when `activeView === 'calendar'`

## Next Steps

1. Part 2 (pending) — Dataverse: replace `src/data/*.ts` mock modules with real Web API calls
2. To go live with M365: set `VITE_M365_MODE=live` in `.env.local`, build, and deploy

## Open Decisions

| Decision               | Options                                           | Status                                                |
| ---------------------- | ------------------------------------------------- | ----------------------------------------------------- |
| Routing                | React Router vs simple state-based view switching | Still undecided — state-based works for current scope |
| State management       | Local hook state vs Zustand / Context API         | Local hooks + Context for overlay; working well       |
| Dataverse table schema | Define in solution vs document in code            | TBC in Part 2                                         |

## Known Issues / Blockers

_None._
