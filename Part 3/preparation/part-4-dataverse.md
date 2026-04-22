You are extending an existing React + TypeScript + Vite Code App prototype called "Customer Support Assistant".

The app already has:
- a premium dark enterprise UI
- a Support Agent dashboard
- a Manager dashboard
- ticket list / kanban / customers views
- a ticket overlay
- Microsoft 365-style enrichment for user, calendar, and lightweight message context
- mock fallback data and local state where needed

Your task now is to refactor the app so that Dataverse becomes the primary business data layer.

Important:
- Extend the existing app, do not rebuild it from scratch
- Keep the current visual design and look-and-feel
- Dataverse should become the main system of record for business entities
- Microsoft 365-style data should remain complementary for internal users, photos, and optional calendar/mail context
- Keep the app practical, readable, and demo-friendly
- Where a real Dataverse connection is not possible in the current prototype context, create the app architecture, models, services, repository abstractions, and rich dummy data so the transition to real Dataverse is straightforward

--------------------------------------------------
PROJECT CONTEXT
--------------------------------------------------

This app is part of a multi-step series and evolves in this order:
- Part 1: environment setup
- Part 2: UI scaffolding
- Part 3: Microsoft 365 enrichment
- Part 4: Dataverse as business data layer
- Later parts: flows, Copilot Studio agent, ALM

For this step, the app must be restructured around a proper Dataverse-oriented domain model.

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
GOAL
--------------------------------------------------

Convert the app into a structured solution where Dataverse is the primary business data layer.

This means:
- Dataverse-oriented business entities drive the UI
- The app should reflect a realistic business schema
- Existing screens should now read from app/domain models that are sourced primarily from Dataverse-style entities
- Microsoft 365 remains for internal identity/profile enrichment and optional calendar/mail interplay

--------------------------------------------------
CORE BUSINESS CAPABILITIES TO SUPPORT
--------------------------------------------------

Support the following business capabilities in the app domain:

- Tickets
- Ticket phases
- Action items
- Contacts
- Ticket participants
- Message artifacts
- Support insights
- Weekly highlights
- Audio summaries

--------------------------------------------------
DATAVERSE-ORIENTED TABLES
--------------------------------------------------

Model the business layer around these Dataverse-oriented tables.

1. Tickets
Fields:
- Name
- Company
- Category
- Start / Created Date
- Last Updated / End if relevant
- Phase
- Owner (Support Agent / Manager reference)
- Summary
- Readiness Score or Health Score
- Audio flag / URL
- OutlookEventId or ExternalReferenceId if relevant

2. Ticket Phases
Fields:
- Name
- Order
- Color

3. Action Items
Fields:
- Title
- Ticket lookup
- Due Date
- Priority
- Completed
- Assigned To

4. Contacts
Fields:
- Name
- Company
- Role
- Email
- Photo
- Technical stance
- Interests
- Smalltalk topics

5. Ticket Participants
Fields:
- Ticket lookup
- Contact lookup
- Role
- External flag

6. Message Artifacts
Fields:
- Subject
- Ticket lookup
- Contact lookup
- Preview
- Draft flag
- OutlookId or ExternalMessageId

7. Support Insights
Fields:
- Ticket lookup
- Contact lookup
- Insight text
- Priority

8. Weekly Highlights
Fields:
- Title
- Description
- Related ticket
- Priority
- Week

9. Audio Summaries
Fields:
- Ticket lookup
- Title
- Duration
- URL
- Transcript

Important:
- Adapt field naming where needed to match the Customer Support Assistant app
- Keep the spirit of the schema, but make it natural for a support scenario rather than a briefing scenario

--------------------------------------------------
INTERNAL USERS
--------------------------------------------------

Internal users should not be duplicated as Dataverse business contacts.

Requirements:
- Use Microsoft 365-style user profile data for internal users where appropriate
- Do not create duplicate business contact rows for internal employees unless there is a strong reason
- Use email or stable identifiers for internal-user references where needed
- Keep a clear distinction between:
  - internal Microsoft 365 users
  - external customer/business contacts stored in Dataverse-oriented entities

--------------------------------------------------
DUMMY DATA REQUIREMENTS
--------------------------------------------------

Create rich demo data for the Dataverse-oriented domain.

Use realistic companies such as:
- BMW
- BASF
- Siemens
- Deutsche Bank
- Allianz

Generate:
- multiple tickets across phases
- action items with different priorities and due dates
- customer contacts with interests and smalltalk topics
- message artifacts and support insights
- weekly highlights
- audio summary records

Requirements:
- data should feel realistic and business-ready
- relationships between records should be meaningful
- enough data should exist to fully populate the UI
- avoid shallow placeholder-only data

--------------------------------------------------
APP INTEGRATION REQUIREMENTS
--------------------------------------------------

Refactor the existing app so that screens use the Dataverse-oriented business layer.

1. SUPPORT AGENT DASHBOARD

Map sections like this:
- ticket schedule / calendar area → tickets or ticket-related schedule data
- kanban → tickets + ticket phases
- customers view → contacts
- my tasks → action items

2. TICKET OVERLAY

Map sections like this:
- summary → ticket record
- tasks → action items
- messages → message artifacts
- insights → support insights
- phase bar → ticket phases
- customer / participant context → contacts + ticket participants

3. MANAGER DASHBOARD

Map sections like this:
- today / active work → tickets
- highlights → weekly highlights
- audio player / podcast-like area → audio summaries
- metrics → derived from ticket and action item data

Requirements:
- Keep the UI structure and premium look intact
- Change the underlying data layer and mapping, not the overall product direction
- Existing components should be reused where possible

--------------------------------------------------
CONNECTOR INTERPLAY
--------------------------------------------------

The app should reflect this source-of-truth model:

- Dataverse-oriented business data = primary system of record
- Microsoft 365 user data = internal profile enrichment
- Outlook/calendar/mail context = optional complementary enrichment

Examples:
- internal user photos can come from Microsoft 365 profile data
- external customer contacts should come from Dataverse-oriented contact entities
- a ticket can reference an Outlook event ID if relevant, but the ticket itself belongs to Dataverse
- message previews can mix Dataverse-stored artifacts with optional Outlook-linked references

--------------------------------------------------
ARCHITECTURE REQUIREMENTS
--------------------------------------------------

Introduce a clean, practical architecture that separates:

- domain/business entities
- Dataverse-oriented repositories/services
- Microsoft 365 enrichment services
- UI view models
- dummy data seed layer for prototype/demo mode

Use a simple repository or service pattern, for example:
- ticket repository
- phase repository
- action item repository
- contact repository
- insight repository
- weekly highlight repository
- audio summary repository
- user enrichment service
- optional calendar/mail enrichment service

Requirements:
- keep the architecture understandable
- avoid overengineering
- prioritize readability and maintainability
- make it easy to swap the dummy data implementation for a real Dataverse API layer later

--------------------------------------------------
RELATIONSHIPS AND MODELING DECISIONS
--------------------------------------------------

Model and reflect realistic relationships.

Examples:
- one ticket has one phase
- one ticket has many action items
- one ticket has many participants
- one ticket has many message artifacts
- one ticket has many support insights
- one ticket may have zero or many audio summaries
- one weekly highlight can reference one related ticket

When modeling fields, make practical decisions between:
- simple text
- enum / choice
- lookup / foreign key style references
- derived values

Requirements:
- where a choice-like field makes sense, model it clearly
- where relationships are important, use lookup-style references in the app/domain model
- keep naming explicit and business-friendly

--------------------------------------------------
FALLBACK / PROTOTYPE MODE
--------------------------------------------------

Even if no real Dataverse API exists yet, the app must behave as though Dataverse is the primary data layer.

Requirements:
- implement seed/demo data as if it were returned from Dataverse-style repositories
- keep the UI fully usable
- do not leave major sections empty
- preserve the prototype experience
- make the code future-proof for real integration

--------------------------------------------------
TECHNICAL REQUIREMENTS
--------------------------------------------------

- Keep the current design and layout intact
- Refactor existing screens and components instead of unnecessarily replacing them
- Use TypeScript types for all domain models
- Introduce clear repository/service boundaries
- Keep state handling straightforward
- Make implementation easy to evolve in later parts
- Comment only where useful
- Keep the codebase clean, organized, and demo-ready

--------------------------------------------------
DELIVERABLE
--------------------------------------------------

Provide the implementation in one go.

Specifically:
1. Refactor the app around a Dataverse-oriented schema
2. Add TypeScript domain models for the business entities
3. Add repository/service abstractions for Dataverse-oriented data access
4. Add rich dummy data that respects the entity relationships
5. Update existing screens and components to use the new domain layer
6. Keep Microsoft 365 enrichment where useful for internal user context
7. Add concise notes in code comments or a short README note explaining:
   - schema decisions
   - relationship decisions
   - lookup vs choice-style decisions
   - current limitations without full real Dataverse connectivity
   - implementation order for future real integration

Important:
- Do not return only a plan
- Actually scaffold and update the code
- Preserve the premium enterprise UI
- Preserve the existing app structure where possible
- Keep the result practical, readable, and ready for the next step in the series
- Adapt everything to the Customer Support Assistant domain, not executive briefings
