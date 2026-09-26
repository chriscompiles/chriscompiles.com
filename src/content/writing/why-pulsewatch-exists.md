---
title: Why PulseWatch exists
description: The problem that led me to build PulseWatch, and why monitoring the absence of a job matters
publicationDate: 2026-09-18
type: Essay
draft: false
---
I built PulseWatch because of an automated trading-analysis pipeline I was running. Each morning, the pipeline pulled market data, sent it through Claude for analysis, applied my own risk rules and staged potential orders in Alpaca for me to review. When it worked it was great. When it failed overnight, it was a pain. I would open it and find no data pull, no market analysis, no queued orders. Nothing.

I realized that application logs would only be useful if the process had started. They couldn’t tell me that my machine had gone to sleep, the scheduler had failed or the job had never launched. The thought that inspired PulseWatch was: **a script that never starts can't report its own absence**.

PulseWatch is dead-man’s-switch monitoring for unattended scripts, cron jobs and background work. You create a monitor and receive a unique URL. Your job pings `/start` when it begins, `/success` when it completes, or `/fail` when it encounters a known failure. PulseWatch checks independently whether those expected events happen. If the job never runs, explicitly fails, or takes too long, it alerts you.

Alerts are currently email only. The integration is ordinary HTTP, so there is no SDK or agent to install. A Python integration can use the standard library:

```python
import urllib.request

url = "https://pulsewatch.ai/ping/YOUR_TOKEN"

def ping(event):
    try:
        urllib.request.urlopen(f"{url}/{event}", timeout=3)
    except Exception:
        pass  # monitoring should not stop the job itself

ping("start")

try:
    run_job()
except Exception:
    ping("fail")
    raise
else:
    ping("success")
```

Anything else that can make an HTTP request can use it too, including a couple of `curl` calls in a shell script.

The architecture is pretty boring on purpose: a Flask and Jinja web app, Postgres and a separate watchdog, which is itself monitored externally. All hosted on Render.

In terms of engineering, the most interesting work has been on edge cases that appeared after v1 was running. The first was deciding what should happen if a job sends `/start` twice. In my first version both attempts remained open, leaving the older one as a phantom “stuck” run. PulseWatch now follows a “newest start wins” rule: a new start supersedes any existing run. The superseded run is retained internally but doesn't generate an alert. Another one was flapping. The monitor only sends an alert when it detects a state change; this stops a broken job producing the same email every few minutes. But it does not solve FAIL → OK → FAIL → OK. PulseWatch now detects repeated state changes separately, sends one “unstable” alert, suppresses ordinary transition alerts, and notifies again only once when the job stabilises.

PulseWatch supports a grace period as part of the monitoring; I discovered that precise schedules can be pretty imprecise sometimes. At one point the watchdog’s five-minute runs were occasionally landing about four minutes and 59 seconds apart, and a strict boundary check meant some monitors were skipped. A task configured for every five minutes will not necessarily run exactly every five minutes, particularly with external schedulers such as GitHub Actions.

This is a fairly established field. Healthchecks.io, Dead Man’s Snitch, Cronitor and others already exist.

I built PulseWatch because I wanted this particular start-and-terminal-event model for my own pipeline, and because implementing it exposed more interesting failure semantics than I initially expected. I am also interested in whether unattended AI and agent workflows will eventually need different monitoring from conventional cron jobs.

I do not think PulseWatch answers that question yet. Today it can tell you that an agent did not start, failed or ran for too long. It cannot tell you whether the result was sensible, whether the agent became trapped in an unproductive loop or whether it quietly burned through an unreasonable number of tokens.

PulseWatch is solo-built and very early. The stack is Flask, SQLAlchemy, Postgres and server-rendered Jinja. It is live at pulsewatch.ai, there is a free tier, and the current user count is fewer than 10.

I’d particularly value criticism on three things:

- Are `/start` plus a terminal ping useful semantics, or needless complexity compared with a single heartbeat?
    
- What important failure modes does this model miss?
    
- What would prevent you from trusting it with something important?
