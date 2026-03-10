# BLACK-BULLS-RISING-CODERS_WEB-DEVELOPMENT_horizon26

# OpsPulse — Unified Business Health Dashboard for SMBs

## Horizon 1.0 Hackathon Project

OpsPulse is a **real-time business intelligence dashboard designed for Small and Medium Businesses (SMBs)**.
It aggregates operational data across multiple business verticals such as **Sales, Inventory, and Customer Support** and converts it into a **single Business Stress Score (BSS)** that reflects the real-time health of a business.

The platform helps business owners quickly understand operational issues, identify opportunities, and respond to crises through an intelligent alert system and a specialized **War Room Mode**.

---

# Problem Statement

Small and Medium Businesses often operate using multiple disconnected tools such as CRM systems, inventory software, accounting platforms, and customer support tools. Because of this fragmentation, founders and operations managers spend hours manually combining data to answer one simple question:

**"How is my business performing right now?"**

Existing Business Intelligence tools are often **too expensive, complex, or enterprise-focused**, making them unsuitable for SMB operators.

OpsPulse solves this by providing a **unified real-time business health dashboard**.

---

# Key Features

## Real-Time Business Data

The platform simulates live data streams using **Socket.io** to update business metrics every 5 seconds.

Data Verticals:

* Sales
* Inventory
* Customer Support

These streams simulate real operational data inside the dashboard.

---

## Business Stress Score (BSS)

OpsPulse introduces a **Business Stress Score** which represents overall business health on a scale of **0–100**.

### Formula

BSS = (0.4 × Sales Stress) + (0.3 × Inventory Stress) + (0.3 × Support Stress)

Where:

* **Sales Stress** measures revenue performance compared to targets.
* **Inventory Stress** evaluates stock levels against reorder points.
* **Support Stress** measures customer support response time against service-level agreements.

Score Meaning:

| Score Range | Status   |
| ----------- | -------- |
| 0 – 40      | Healthy  |
| 40 – 75     | Moderate |
| 75 – 100    | Critical |

The score is visualized using a **dashboard gauge indicator**.

---

## Three-Tier Alert System

OpsPulse automatically generates intelligent alerts based on operational metrics.

### Crisis Alerts

Critical threats to business operations.

Examples:

* Stock level reaches zero
* Business Stress Score above 75
* Extremely high support response time

### Anomaly Flags

Unexpected deviations in business data.

Examples:

* Ticket volume increases by 200%
* Sudden drop in sales

### Opportunity Signals

Positive growth opportunities.

Examples:

* Sales exceed 120% of target
* Upcoming high-demand events

---

## War Room Mode

When the **Business Stress Score exceeds 75**, the dashboard automatically switches into **War Room Mode**.

War Room Mode:

* Dashboard color changes to **red**
* Non-essential charts are hidden
* Only **actionable tasks** are displayed

Example Action Cards:

* Restock low inventory items
* Increase support staff
* Approve emergency budget

War Room Mode automatically deactivates when the score drops below **50**.

---

## Festival & Event Intelligence

OpsPulse includes an **event intelligence module** that detects upcoming business opportunities.

The system checks a **BusinessEvents database collection** containing events such as:

* Diwali
* Black Friday
* New Year
* Christmas

If an event occurs within the next **14 days**, the system generates an **Opportunity Signal**.

Example:

"Diwali in 10 days: Increase inventory by 20%"

T
