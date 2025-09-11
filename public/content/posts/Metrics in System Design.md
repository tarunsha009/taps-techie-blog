---
title: "📊 Metrics in System Design (Part 1 of Observability Series)"
date: "2025-09-10"
author: "Tarun"
readTime: "7 min"
tags: ["system-design", "observability", "metrics"]
difficulty: "Beginner"
series: "Observability Series"
excerpt: "Metrics are the first pillar of observability. Learn how to collect, visualize, and use metrics to understand your system’s health and performance."
---

# 📊 Metrics in System Design (Part 1 of Observability Series)

## Introduction: Why Metrics Matter

Imagine you’re running an API for an **e-commerce checkout system**.

* Users are complaining that "checkout feels slow."
* Your dashboard shows CPU usage is fine.
* What’s wrong?

Without **metrics**, you’d be **guessing in the dark**. Metrics give you **numbers** to measure the health and performance of your system.

Metrics tell you:

* How many requests are hitting your service
* How fast your APIs are responding
* How often errors happen
* How much CPU, memory, or disk you’re consuming

👉 With metrics, you *know* what’s happening, not just what you feel.

---

## What Are Metrics?

A **metric** is simply a numerical measurement collected over time.

Examples:

* API latency = 120ms
* Error rate = 1.5%
* CPU utilization = 75%

They’re usually stored as **time series data** → values with timestamps.

---

## Types of Metrics

### 1. System Metrics (Resource Usage)

Collected from the infrastructure.

* CPU utilization (%)
* Memory usage (MB or %)
* Disk I/O
* Network bandwidth

**Example:** If CPU hits 100%, requests will slow down.

---

### 2. Application Metrics

Collected from inside the application.

* Request rate (RPS – requests per second)
* Response times (latency)
* Error rates
* Queue lengths

**Example:** Checkout API serves 500 requests/sec with 200ms avg latency.

---

### 3. Business Metrics

Tell you about **user or business impact**.

* Number of orders processed
* Messages sent
* Revenue generated

**Example:** “We processed 1,000 successful checkouts in the last 5 minutes.”

---

## How Metrics Are Collected

### 1. Instrumentation in Code

Developers add code to track metrics:

* Java → Micrometer, Dropwizard
* Python → Prometheus client, StatsD
* Go/Node.js → Prometheus client libraries

**Example (Python + Prometheus client):**

```python
from prometheus_client import Counter, Histogram

REQUESTS = Counter("http_requests_total", "Total HTTP requests")
LATENCY = Histogram("http_request_duration_seconds", "Request latency")

def handle_checkout(request):
    REQUESTS.inc()
    with LATENCY.time():
        return process_order(request)
````

The app now exposes `/metrics` endpoint → Prometheus scrapes it.

---

### 2. Exporters (System-Level)

For servers and containers:

* Node Exporter → Linux metrics
* cAdvisor → container metrics
* JMX Exporter → JVM metrics

These run as agents and expose metrics endpoints.

---

### 3. Scraping & Storage

* Prometheus (or other systems) scrapes metrics at intervals.
* Stores them as time-series data:
  `http_requests_total{status="200"} = 12459 at 2025-09-11T10:15:00Z`

---

## How to View Metrics (Visualization)

Metrics are best understood through **dashboards**.

* Use **Grafana** to visualize metrics.
* Common panels:

  * RPS (requests per second)
  * Latency (P50, P95, P99)
  * Error rates
  * CPU/Memory usage

**Example Dashboard:**

* Checkout API: 500 RPS
* P95 latency: 450ms (too high!)
* Error rate: 2%

---

## Monitoring Approaches

Two useful frameworks for thinking about metrics:

### 🔹 RED Method (APIs)

* **Rate** → requests per second
* **Errors** → failed requests per second
* **Duration** → response time distribution

Example (Checkout API):

* Rate: 500 RPS
* Errors: 10/s
* Duration: 450ms P95

---

### 🔹 USE Method (System Resources)

* **Utilization** → how much resource is used
* **Saturation** → demand > capacity? (e.g., load > cores)
* **Errors** → hardware/software resource failures

Example (Server):

* CPU utilization: 85%
* Saturation: load = 12 on 8 cores (bad!)
* Errors: disk I/O failures

---

## Example: Monitoring a Payment API

**Metrics to collect:**

* Rate → requests/sec
* Errors → % failed transactions
* Duration → avg & P95 latency

**System metrics:**

* CPU usage (is service CPU-bound?)
* Memory usage (possible leaks?)
* DB connections usage

**Business metrics:**

* Payments processed
* Failed payments

👉 Together, these detect issues before customers complain.

---

## Tools in the Industry

* **Prometheus** → collect & store metrics
* **Grafana** → dashboards & alerts
* **StatsD / Telegraf** → metric emitters
* **CloudWatch (AWS)**, **Azure Monitor**, **Google Cloud Monitoring** → cloud-native

---

## Best Practices

✔️ Collect **system + app + business metrics**

✔️ Use **labels/tags** (e.g., endpoint=/checkout, status=200)

✔️ Monitor **percentiles (P95, P99)**, not just averages

✔️ Expose metrics over `/metrics` endpoints

✔️ Keep dashboards **simple and actionable**

---

## Conclusion

Metrics are the **first pillar of observability**.

They help you measure:

* **System health** (CPU, memory, network)
* **Application health** (latency, errors, throughput)
* **Business health** (orders, revenue, usage)

In the next part, we’ll cover **Logs and Log Aggregation** — the second pillar of observability.

---

✅ This is **Part 1 of the Observability Series**.
Next up: **Logs — Stories Behind the Numbers.**

---
