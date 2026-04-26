# Project Brief

## Overview

**Customer Support Assistant** — a Power Apps Code App that gives support agents a fast, modern interface for managing customer interactions. Built as a video series; each part ships a working increment of the product.

## Goals

- Demonstrate how to build a real-world Power Apps Code App end-to-end
- Show practical integration patterns for the Power Platform ecosystem
- Keep every step simple enough for viewers to follow and reproduce

## Core Requirements

- Support agents can view, create, and update support tickets
- Data is stored in Dataverse (Tickets, Customers, Tasks)
- Automation runs through Power Automate flows
- Agents can use a Copilot Studio bot for AI-assisted responses
- External data is pulled through Power Platform connectors (Office 365)

## Actual Series Roadmap

| Part | Capability | Status |
|------|-----------|--------|
| 1 | Dev environment setup (Node, Git, PAC CLI, scaffold) | ✅ Complete |
| 2 | Scaffolding the app (UI prototype, theme, dashboards, mock data) | ✅ Complete |
| 3 | Adding connectors (Office 365 Users + Outlook — profile, calendar) | ✅ Complete |
| 4 | Adding Dataverse (Tickets, Customers, Tasks — full CRUD) | ✅ Complete |
| 5 | Starting a flow from the app (Power Automate HTTP trigger) | ⬜ Next |
| 6+ | Copilot Studio, external URLs/APIs, ALM | ⬜ Planned |

## Out of Scope

- Custom authentication (uses Power Apps identity)
- Mobile-native builds
- Non-Power Platform backends
