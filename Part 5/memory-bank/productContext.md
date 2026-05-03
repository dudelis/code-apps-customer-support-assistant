# Product Context

## Why This Project Exists

Support teams using Dataverse solutions often need lightweight custom interfaces that don't require full model-driven app configuration. A Power Apps Code App fills that gap — full control over the UI while staying inside the Power Platform trust boundary.

This app also serves as a teaching vehicle: each part of the series introduces one new Power Platform concept in a realistic, working context.

## Problems It Solves

- Support agents need a single view of tickets without navigating complex model-driven forms
- Managers need a dashboard with metrics, active tickets, and critical issue visibility
- Ticket status, priority, and task tracking are updated directly from the app (no Dataverse portal needed)
- AI-assisted responses (via Copilot Studio, planned) will reduce time-to-resolution
- Power Automate removes manual notification and escalation work

## User Personas

**Support Agent** — non-technical; manages their ticket queue, tasks, and calendar from the agent dashboard. Can create and update tickets and customers, mark tasks done, and view ticket details in the overlay.

**Support Manager** — needs visibility across the team; uses the manager dashboard to monitor metrics, active tickets, and critical issues.

## What the App Has Now (v1.1.0)

- Dark glassmorphism UI with role switcher (Agent / Manager)
- **Agent dashboard**: Tickets list, Kanban board, Customers grid, Calendar, My Tasks sidebar
- **Manager dashboard**: Metrics strip, Active Tickets strip, Critical Issues panel, Insights panel
- **Ticket overlay**: Header, Summary tab, Activity tab, Messages tab, Customer Info tab
- **Dataverse-backed**: Tickets (full CRUD), Customers (C + R), Tasks (R + done toggle)
- **M365 connectors**: logged-in user profile in ShellBar, calendar events in Calendar tab
- **Create flows**: New Ticket dialog, New Customer dialog
- **Status progression bar** is clickable — clicking a step updates the ticket status in Dataverse

## UX Principles

- Show only what is needed for the current task
- Optimistic updates for status changes and task done toggles (instant feedback)
- Fluent UI v9 ensures visual consistency with the Microsoft 365 ecosystem
- Errors are surfaced inline with Fluent UI `MessageBar` — never silent failures
- Loading states shown with Fluent UI `Spinner` in context (not full-page blocking)
