import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    let email = "";
    try {
      const body = await req.json();
      email = body?.email || "";
    } catch {
      // No body or invalid JSON — proceed without email
    }

    const response = await fetch("https://api.retellai.com/v2/create-web-call", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent_id: process.env.RETELL_AGENT_ID,
        ...(email ? { metadata: { caller_email: email } } : {}),
      }),
    });

    if (!response.ok) {
      console.error("Retell API error:", response.status, await response.text());
      return NextResponse.json({ error: "Failed to create call" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ access_token: data.access_token }, { status: 200 });
  } catch (err) {
    console.error("Error creating web call:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
