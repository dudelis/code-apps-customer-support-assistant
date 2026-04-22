You are building a Code App prototype called "Customer Support Assistant".

Goal:
Create full UI scaffolding, navigation, and layout ONLY.
Do NOT use Dataverse or any connectors.
Use only mock collections / hardcoded data.

--------------------------------------------------
DESIGN LANGUAGE
--------------------------------------------------

- Dark premium theme
- Glassmorphism panels
- Soft shadows, gradients, rounded corners
- Clean enterprise-grade UI

--------------------------------------------------
GLOBAL SHELL BAR
--------------------------------------------------

Fixed top bar with:
- Icon: 🎧
- Title: Customer Support Assistant
- Role Switcher (toggle):
  - Support Agent
  - Manager

This drives the entire app navigation.

--------------------------------------------------
SCREEN STRUCTURE
--------------------------------------------------

1. SUPPORT AGENT DASHBOARD

Layout:
- 70% left / 30% right

LEFT AREA:
Segmented navigation:
- 📋 Tickets
- 📊 Kanban
- 👥 Customers

Tickets View:
- Table or list layout
- Each item:
  - Ticket Title
  - Customer Name
  - Status
  - Priority
  - Created Date

Kanban:
6 columns:
- New, Open, Assigned, In Progress, Waiting, Closed

Cards:
- Ticket Title
- Customer
- Status
- Priority badge

Customers View:
Grid of profile cards:
- Name
- Company
- Role
- Email
- Last interaction
- Button: View Details → opens overlay

RIGHT SIDEBAR: "My Tasks"
- Task list
- Sort dropdown (Date / Priority)
- Each item:
  - Checkbox
  - Title
  - Priority badge
  - Due date
- Clicking → opens Ticket Overlay

--------------------------------------------------
2. FULL-SCREEN TICKET OVERLAY
--------------------------------------------------

Opened from:
- Ticket list
- Kanban
- Task list

HEADER:
- Gradient banner
- Ticket Title
- Customer Name
- Status
- Priority
- Assigned Agent

CENTER TABS:
- Summary (AI-style generated issue summary + Copy button)
- Activity (timeline of updates)
- Messages (mock email/chat thread)
- Customer Info (basic profile)

FOOTER:
- Status progression bar (New → Closed)
- Back button

--------------------------------------------------
3. MANAGER DASHBOARD
--------------------------------------------------

Design:
- Spacious
- Minimal
- Executive-style overview

Sections:
- Greeting ("Welcome back")
- Key Metrics:
  - Open Tickets
  - SLA Breaches
  - Avg Resolution Time
- Active Tickets (horizontal cards)
- Critical Issues (top priority tickets)
- Insights Panel (AI-style summaries)

--------------------------------------------------
MOCK DATA
--------------------------------------------------

Create collections:
- Tickets
- Tasks
- Customers
- Messages
- Agents
- Metrics

Use realistic companies:
BMW, BASF, Siemens, Deutsche Bank, Allianz

--------------------------------------------------
TECHNICAL REQUIREMENTS
--------------------------------------------------

- Clean structure
- Reusable components
- Clear navigation logic
- State handled via collections/variables
- Easy to replace later with real data
- Keep code simple, readable, and modular

--------------------------------------------------
CONSTRAINTS
--------------------------------------------------

- NO Dataverse
- NO connectors
- NO Power Automate

--------------------------------------------------
DELIVERABLE
--------------------------------------------------

Provide:
1. App structure
2. Screens/components
3. Mock collections
4. Key formulas (pseudo is fine)
5. Step-by-step build instructions
