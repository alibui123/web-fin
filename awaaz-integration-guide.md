# Awaaz Voice Agent — Web Integration Guide

## Overview

This guide explains how to wire the "Talk to Awaaz" button on the FinovaSolutions website to the Retell AI voice agent. When a visitor clicks the button, a call starts directly in the browser — no phone number needed.

The integration has two parts:
- **A server-side endpoint** that fetches a secure access token from Retell
- **Frontend JavaScript** that uses that token to start the voice call

---

## Why Two Parts?

Retell requires your secret API key to create a call session. That key must never be exposed in frontend code. So the flow is:

```
User clicks button
      ↓
Frontend hits your server endpoint
      ↓
Server calls Retell API (using secret key) → gets access token
      ↓
Frontend uses access token to start WebRTC call in browser
```

---

## What You Need from the Client

Before writing any code, get these two values from the Retell dashboard and store them as **environment variables** on the server. Never hardcode them.

| Variable Name | Where to Find It |
|---|---|
| `RETELL_API_KEY` | Retell Dashboard → API Keys (left sidebar) |
| `RETELL_AGENT_ID` | Retell Dashboard → open the Awaaz agent → copy agent ID from the page |

---

## Part 1 — Server-Side Endpoint

If the site is exported as static, use a Cloudflare Worker as the server-side endpoint.

### Option A - Cloudflare Worker (recommended for static hosting)

1. Deploy the Worker below (see cloudflare/retell-worker.js).
2. Set Worker environment variables: RETELL_API_KEY, RETELL_AGENT_ID.
3. Optional: set ALLOWED_ORIGIN to https://finovasolutions.tech.
4. Use the Worker URL in NEXT_PUBLIC_RETELL_WORKER_URL when you build the site.

```js
export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || ""
    const allowedOrigin = env.ALLOWED_ORIGIN || "*"

    if (allowedOrigin !== "*" && origin && origin !== allowedOrigin) {
      return new Response(JSON.stringify({ error: "Origin not allowed" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      })
    }

    const corsHeaders = {
      "Access-Control-Allow-Origin": allowedOrigin === "*" ? "*" : (origin || allowedOrigin),
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders })
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const response = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agent_id: env.RETELL_AGENT_ID }),
    })

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to create call" }), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const data = await response.json()
    return new Response(JSON.stringify({ access_token: data.access_token }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  },
}
```

### Option B - App/Server route (Next.js API)

Create an endpoint on your backend (route, serverless function, API handler — whatever fits your stack). It should:

- Accept a `POST` request
- Call Retell's web call API using the secret key
- Return the `access_token` to the frontend

**Endpoint to call:**
```
POST https://api.retellai.com/v2/create-web-call
Authorization: Bearer YOUR_RETELL_API_KEY
Content-Type: application/json

Body: { "agent_id": "YOUR_RETELL_AGENT_ID" }
```

**Reference implementation (Node.js):**

```js
// POST /api/create-web-call  (adapt route to your framework)

async function createWebCall(req, res) {
  try {
    const response = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent_id: process.env.RETELL_AGENT_ID,
      }),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to create call" });
    }

    const data = await response.json();
    return res.status(200).json({ access_token: data.access_token });

  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
```

> Adapt the function signature and export style to your framework (Express, Next.js API routes, Netlify Functions, etc.). The core logic — call Retell, return the token — stays the same.

---

## Part 2 — Frontend

### Load the Retell Client SDK

Add this script tag to the page where the button lives, before your main script:

```html
<script src="https://cdn.jsdelivr.net/npm/retell-client-js-sdk@latest/dist/index.umd.js"></script>
```

Alternatively install via npm and import it if you're working in a bundled environment:

```bash
npm install retell-client-js-sdk
```

```js
import { RetellWebClient } from "retell-client-js-sdk";
```

---

### Hook Into the Existing Button

Find the "Talk to Awaaz" button in the codebase — it currently links to `#contact`. Give it an ID (or select it however fits the existing codebase) and attach the following logic:

```js
const retellClient = new RetellWebClient();
let isCallActive = false;

document.getElementById("awaaz-btn").addEventListener("click", async () => {
  if (isCallActive) return;

  try {
    // 1. Get access token from your server endpoint
    const endpoint = process.env.NEXT_PUBLIC_RETELL_WORKER_URL || "/api/create-web-call";
    const res = await fetch(endpoint, { method: "POST" });
    if (!res.ok) throw new Error("Failed to get access token");
    const { access_token } = await res.json();

    // 2. Set up call event listeners
    retellClient.on("call_started", () => {
      isCallActive = true;
      // Update UI: show "End Call" button, show active state
    });

    retellClient.on("call_ended", () => {
      isCallActive = false;
      // Update UI: restore original button state
    });

    retellClient.on("agent_start_talking", () => {
      // Optional: animate the UI to show Awaaz is speaking
    });

    retellClient.on("agent_stop_talking", () => {
      // Optional: animate the UI to show Awaaz is listening
    });

    retellClient.on("error", (err) => {
      isCallActive = false;
      console.error("Retell error:", err);
      // Show error state in UI
    });

    // 3. Start the call
    await retellClient.startCall({ accessToken: access_token });

  } catch (err) {
    console.error("Could not start call:", err);
    // Show error feedback to user
  }
});

// Wire up your "End Call" button wherever it lives in the UI
document.getElementById("awaaz-end-btn").addEventListener("click", () => {
  retellClient.stopCall();
});
```

> Replace `/api/create-web-call` with whatever route your server endpoint is registered at.

---

## Call UI

The call UI is flexible — design it however fits the site. At minimum it needs:

- A visual indicator that the call is active (so the user knows it connected)
- An **End Call** button that calls `retellClient.stopCall()`
- Error feedback if the connection fails

The four SDK events (`call_started`, `call_ended`, `agent_start_talking`, `agent_stop_talking`) give you everything you need to drive whatever UI you build.

---

## Environment Variables

Make sure these are set in the deployment environment (not in any committed file):

```
RETELL_API_KEY=your_secret_key_here
RETELL_AGENT_ID=your_agent_id_here
NEXT_PUBLIC_RETELL_WORKER_URL=https://your-worker.your-subdomain.workers.dev
```

In local development, use a `.env` file (add it to `.gitignore`).

---

## Checklist Before Going Live

- [ ] Server endpoint returns `access_token` successfully (test with Postman or curl)
- [ ] API key and agent ID are in environment variables, not hardcoded
- [ ] Button click starts the call and shows active state
- [ ] End Call button stops the call cleanly
- [ ] Error state is handled (failed fetch, Retell error event)
- [ ] Tested on mobile — microphone permission prompt appears correctly
- [ ] Call appears in Retell Dashboard → Call History after test
