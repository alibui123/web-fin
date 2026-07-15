export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || ""
    const allowedOrigin = env.ALLOWED_ORIGIN || "*"

    if (allowedOrigin !== "*" && origin && origin !== allowedOrigin) {
      return new Response(
        JSON.stringify({ error: "Origin not allowed" }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
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
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      )
    }

    if (!env.RETELL_API_KEY || !env.RETELL_AGENT_ID) {
      return new Response(
        JSON.stringify({ error: "Server misconfiguration" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      )
    }

    try {
      let email = ""
      try {
        const body = await request.json()
        email = body?.email || ""
      } catch {
        // No body or invalid JSON — proceed without email
      }

      const response = await fetch("https://api.retellai.com/v2/create-web-call", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RETELL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: env.RETELL_AGENT_ID,
          ...(email ? { metadata: { caller_email: email } } : {}),
        }),
      })

      if (!response.ok) {
        const details = await response.text()
        return new Response(
          JSON.stringify({ error: "Failed to create call", details }),
          {
            status: response.status,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        )
      }

      const data = await response.json()
      return new Response(
        JSON.stringify({ access_token: data.access_token }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      )
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      )
    }
  },
}
