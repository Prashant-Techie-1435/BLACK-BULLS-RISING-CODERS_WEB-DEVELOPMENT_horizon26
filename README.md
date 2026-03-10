# BLACK-BULLS-RISING-CODERS_WEB-DEVELOPMENT_horizon26

# OpsPulse — Unified Business Health Dashboard for SMBs

## Horizon 1.0 Hackathon Project

OpsPulse — Real-Time Business Intelligence Dashboard

OpsPulse is a web-based real-time business intelligence dashboard designed to help businesses monitor operational metrics such as sales, inventory, and customer support activity from a single interface.
The system simulates real-time operational events and visualizes them through interactive dashboards, alerts, and analytics charts.

The project demonstrates how operational data can be streamed, processed, and visualized to help business owners detect risks early and make better decisions.

Live Demo

The project is deployed online.

Live Website:
https://opspulse-eu0e.onrender.com

You can access the deployed version directly using the link above.

Features

Real-time operational dashboard

Business Stress Score calculation

Event-driven data simulation

Sales analytics and trend visualization

Inventory monitoring

Customer support ticket tracking

Intelligent alert system

Interactive charts and graphs

Role-based dashboard views

Responsive UI

Tech Stack
Frontend

HTML5 – Structure of web pages

CSS3 – Styling and layout

JavaScript (ES6) – Application logic and dynamic updates

Visualization

Chart.js – Interactive data visualization and analytics charts

Deployment

Render – Hosting and deployment platform

Development Tools

Git – Version control

GitHub – Repository management

VS Code – Development environment

System Architecture

The system follows a layered web application architecture consisting of four main layers.

1. Presentation Layer (Frontend UI)

Responsible for displaying the user interface and handling user interactions.

Components:

Landing Page

Dashboard Interface

KPI Metrics Panels

Charts and Graphs

Alert Notifications

Technologies:

HTML

CSS

JavaScript

Chart.js

2. Application Logic Layer

This layer contains the core logic of the application.

Responsibilities:

Processing incoming events

Updating dashboard metrics

Calculating business stress score

Detecting anomalies

Generating alerts

3. State Management Layer

This layer stores and manages the current system state.

Maintained data includes:

Sales history

Inventory levels

Customer support tickets

Alert history

Business stress score

Revenue statistics

A centralized state object updates the entire dashboard dynamically.

4. Data / Event Layer

This layer provides operational data to the system.

Current Implementation:

Simulation engine generates events

Types of events:

Sales transactions

Inventory updates

Support ticket events

Future integration possibilities:

Node.js backend APIs

WebSocket real-time streaming

Database integration

Architecture Flow

User
↓
Landing Page
↓
Business Selection
↓
Dashboard Initialization
↓
Event Simulation Engine
↓
Application Logic Processing
↓
State Update
↓
Charts, KPIs, Alerts Updated on Dashboard

Data Pipeline

OpsPulse processes operational data using an event-driven data pipeline.

Step 1 — Event Generation

The simulation engine generates business events such as:

Sales events

Inventory changes

Support tickets

Step 2 — Event Processing

Each event is processed by the application logic layer.

Example processing:

Sales Event

Update revenue

Update sales history

Update hourly revenue metrics

Inventory Event

Update product stock levels

Detect low stock conditions

Support Ticket Event

Update ticket queue

Calculate support health metrics

Step 3 — State Update

The processed data is stored in the centralized application state, which maintains:

Sales history

Inventory data

Ticket data

Alert data

Step 4 — Dashboard Visualization

The updated state triggers updates to:

KPI panels

Charts and graphs

Alerts feed

Business stress score

This creates a real-time operational monitoring system.

Business Stress Score

The Business Stress Score measures the operational health of the business.

It is calculated using three components:

Sales Health

Inventory Health

Support Health

Formula:

Stress Score =
(1 − Sales Health) × 40%

(1 − Inventory Health) × 35%

(1 − Support Health) × 25%

Score Range:

0 – 40 → Healthy
41 – 70 → Moderate Risk
71 – 100 → High Risk

Alert Detection System

The alert engine automatically detects operational anomalies.

Examples:

Low Stock Crisis
Sales Spike Opportunity
Sales Drop Anomaly
High Support Ticket Volume
High Business Stress Score

Alert categories:

Crisis Alerts

Opportunity Alerts

Anomaly Alerts

These alerts are displayed in the Alert Feed section of the dashboard.

Future Improvements

Possible enhancements:

Real database integration

Node.js backend APIs

WebSocket real-time data streaming

Machine learning prediction models

Mobile dashboard version

Multi-user authentication
