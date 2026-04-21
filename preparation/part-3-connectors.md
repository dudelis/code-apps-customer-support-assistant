## Part 3 — Microsoft 365 Integration (User + Calendar)

Extend the existing **Customer Support Assistant** React + TypeScript + Vite app.

### Scope
- Integrate **Office 365 User**
  - Display logged-in user:
    - Name
    - Profile photo
    - Job title / role
- Add a new tab:
  - `Calendar` (next to Tickets, Kanban, Customers)
- Show Microsoft 365 **calendar events**
  - Subject
  - Start / End time
  - Organizer
  - Attendees

---

### Requirements
- Do **not** rebuild the app
- Keep existing UI, layout, and premium dark design
- Frontend-only implementation
- No Dataverse
- No Power Automate
- No custom backend

---

### Architecture
- Add simple service layer:
  - `userProfileService`
  - `calendarService`
- Separate:
  - Connector-based data
  - Mock fallback data
- Use clean TypeScript models
- Add mapping helpers if needed

---

### Fallback Logic
- If Microsoft 365 data is unavailable:
  - Use realistic mock user
  - Use mock calendar events
- UI must remain fully functional

---

### Deliverables
- User profile service (with fallback)
- Calendar service (with fallback)
- Updated top bar with user info
- New Calendar view/tab with events
- Clean, extendable code
- Short note (README or comments) explaining:
  - current limitations
  - where real connectors will plug in later
