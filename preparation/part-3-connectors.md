You are extending an existing React + TypeScript + Vite Code App prototype called "Customer Support Assistant".

The app already has:
- a premium dark UI
- a Support Agent dashboard
- a Manager dashboard
- ticket list / kanban / customers views
- a ticket overlay
- mock data and local state

Your task now is to enhance the app by integrating Microsoft 365 data while keeping the app frontend-focused and simple.

Important:
- Extend the existing app, do not rebuild it from scratch
- Keep the current visual design and look-and-feel
- Do NOT add Dataverse yet
- Do NOT add a custom backend
- Keep mock data where real Microsoft 365 data is not available
- Clearly separate connector-backed data from mock fallback data
- The goal is to make the app feel much more realistic while still staying simple

--------------------------------------------------
PROJECT CONTEXT
--------------------------------------------------

This app is part of a multi-step series and will later evolve with:
- more connectors
- Dataverse
- flows
- Copilot Studio agent
- ALM

For this step, only add Microsoft 365-based enrichment to the existing app.

Tech stack:
- React
- TypeScript
- Vite
- Fluent UI v9 preferred
- Clean component structure
- Easy to extend later

--------------------------------------------------
DESIGN LANGUAGE
--------------------------------------------------

Keep the existing visual style exactly aligned with the current app.

Requirements:
- Dark premium theme
- Glassmorphism panels
- Soft shadows
- Gradients
- Rounded corners
- Spacious enterprise layout
- Professional and clean UI
- Do not downgrade the current design quality

--------------------------------------------------
MICROSOFT 365 DATA TO INTEGRATE
--------------------------------------------------

Use Microsoft 365-style data for the following areas:

1. User profile information
- Logged-in user display name
- Photo
- Job title / role

2. Calendar data
- Events
- Start / end time
- Organizer
- Attendees

3. Email data
- Light usage only
- Relevant message previews / related communication where useful

Important:
- If live integration is not available in this prototype context, create the app architecture and service abstraction so that real Microsoft 365 data can be plugged in later
- Also provide realistic mock fallback data so the app remains fully functional

--------------------------------------------------
BOUNDARIES
--------------------------------------------------

- No Dataverse
- No Power Automate
- No custom backend
- No overengineering
- Keep mock data where needed
- Focus on app realism, not full enterprise implementation

--------------------------------------------------
FEATURE UPDATES
--------------------------------------------------

1. GLOBAL SHELL BAR

Extend the top bar to include:
- Logged-in user info
- User photo
- User name
- User title / role if available

This should come from Microsoft 365 user profile data, with mock fallback if needed.

--------------------------------------------------
2. SUPPORT AGENT DASHBOARD
--------------------------------------------------

Keep the current overall layout:
- 70% left / 30% right

LEFT AREA

A. Tickets View
- Keep the existing ticket list/table
- Enrich ticket items where appropriate using Microsoft 365 context
- Assigned agent / reporter / last updated by can use internal user profile data
- Keep tickets themselves mock/local for now

B. Kanban View
- Keep the current phases:
  - New
  - Open
  - Assigned
  - In Progress
  - Waiting
  - Closed

- Cards should now be enriched with:
  - Assigned internal user
  - Related organizer where relevant
  - Attendee profile photos for internal participants
  - More realistic ownership feel

C. Customers View
- Keep external customers partially mocked
- For internal users or support owners, enrich profile cards with Microsoft 365 user data:
  - Name
  - Photo
  - Title
  - Email
- Keep customer company/contact data mocked where necessary

D. Calendar / Activity Area
If the app already has or can support a ticket schedule / support calendar view:
- Use Microsoft 365 calendar events
- Map events into the existing weekly or list-based UI
- Combine them with mock ticket-related tasks or follow-ups
- Make it visually clear what comes from calendar data vs local mock data

RIGHT SIDEBAR — "My Tasks"
- Keep tasks local/mock for now
- Sorting should still work
- Where useful, show relation to a calendar item or ticket
- Clicking an item should still open the Ticket Overlay

--------------------------------------------------
3. FULL-SCREEN TICKET OVERLAY
--------------------------------------------------

Opened from:
- Ticket list
- Kanban
- Task list
- Calendar-related items if applicable

HEADER
Update the header to show more realistic, connector-backed context:
- Ticket Title
- Customer Name
- Status
- Priority
- Assigned Agent
- Related meeting/event subject if applicable
- Time information where relevant
- Internal participant photos where relevant

CENTER TABS

A. Summary
- Keep this mocked for now
- But make it contextual based on the selected ticket, customer, and any related calendar/event data
- Include a Copy button

B. Activity
- Show a timeline that can mix:
  - Mock ticket updates
  - Calendar-related events
  - Internal interaction references
- Keep it simple and readable

C. Messages
- Use Microsoft 365 email data if possible
- If not possible, simulate the structure with:
  - subject filtering
  - domain matching
  - customer-related conversation previews
- Keep it lightweight, not a full email client

D. Customer Info
- Internal users should use Microsoft 365 profile data where applicable
- External customer details can remain mocked
- Show a clean separation between internal and external contacts if useful

FOOTER
- Keep the status progression bar (New → Closed)
- Keep Back button
- Preserve the existing UX pattern

--------------------------------------------------
4. MANAGER DASHBOARD
--------------------------------------------------

Keep the current manager dashboard structure and premium look.

Update these sections:

A. Greeting
- Use Microsoft 365 user profile data for the logged-in manager

B. Key Metrics
- Still mostly mock or derived from local ticket data
- Examples:
  - Open Tickets
  - SLA Breaches
  - Avg Resolution Time

C. Active Tickets
- Keep using local/mock ticket data
- Where relevant, enrich with internal owner data from Microsoft 365

D. Critical Issues
- Still based on local/mock ticket priority logic

E. Insights Panel
- Keep AI-style summaries mocked
- Make them context-aware using the enriched ticket / calendar / user information

F. Calendar / Today’s Schedule Area
- Use Microsoft 365 calendar data for the manager’s day view if possible
- Otherwise provide an abstraction and fallback mock implementation

--------------------------------------------------
ARCHITECTURE REQUIREMENTS
--------------------------------------------------

You must introduce a clear, simple architecture for separating app data sources.

Implement the code so there is a clear distinction between:
- Microsoft 365 connector/service data
- Mock fallback data
- App view models

Use a simple service layer or adapter approach, for example:
- profile service
- calendar service
- mail service
- mapping helpers

Requirements:
- Keep logic simple
- Avoid overengineering
- Prefer readable code over clever abstractions
- Make it easy to replace fallback data with real data later
- Keep existing reusable components where possible

--------------------------------------------------
DATA MAPPING REQUIREMENTS
--------------------------------------------------

Map Microsoft 365-style data into app-specific models.

Examples of app models you may need:
- AppUser
- AppCalendarEvent
- AppTicketParticipant
- AppMessagePreview

Requirements:
- Create clear mapping functions
- Keep fields minimal and useful
- Include fallback behavior if connector data is unavailable
- Preserve a consistent UI model regardless of source

--------------------------------------------------
FALLBACK LOGIC
--------------------------------------------------

The app must remain fully usable even without real connector access.

Implement fallback logic such that:
- if user profile is unavailable → use mock user
- if calendar events are unavailable → use mock events
- if emails are unavailable → use mock message previews

Requirements:
- Fallbacks should not break the UI
- Show realistic sample data
- Avoid empty screens
- Keep fallback logic explicit and easy to understand

--------------------------------------------------
TECHNICAL REQUIREMENTS
--------------------------------------------------

- Keep the current design and layout intact
- Extend existing screens and components instead of replacing them unnecessarily
- Use TypeScript types for app models
- Use reusable components
- Keep state handling straightforward
- Make the implementation easy to evolve in the next parts
- Comment only where useful
- Keep the codebase clean and organized

--------------------------------------------------
DELIVERABLE
--------------------------------------------------

Provide the implementation in one go.

Specifically:
1. Update the architecture to support Microsoft 365 enrichment
2. Add or update services for:
   - user profile
   - calendar
   - messages
3. Add app model mapping functions
4. Add fallback mock data and fallback logic
5. Update the existing UI screens and components
6. Keep the app runnable as a frontend prototype
7. Include concise integration guidance in comments or a short README note
8. Note the current limitations because Dataverse is not added yet

Important:
- Do not return only a plan
- Actually scaffold and update the code
- Preserve the premium enterprise UI
- Preserve the existing app structure where possible
- Keep the result practical, readable, and demo-ready
