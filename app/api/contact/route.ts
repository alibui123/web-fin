import { NextResponse } from "next/server"

/**
 * Contact submissions. Immediate response path (not a next-day queue).
 * Payload includes marketingConsent as a separate field from the service message,
 * and sourcePage for attribution. HubSpot sync can consume these fields when wired.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json()

    const name = String(data.name || "").trim()
    const email = String(data.email || "").trim()
    const company = String(data.company || "").trim()
    const message = String(data.message || "").trim()
    const phone = String(data.phone || "").trim()
    const marketingConsent = Boolean(data.marketingConsent)
    const sourcePage = String(data.sourcePage || "/contact")

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      )
    }

    // Flatten extended fields into the PHP-compatible body while preserving
    // marketingConsent as its own logged property.
    const payload = {
      name,
      email,
      subject: company || "Contact form",
      company,
      phone,
      marketingConsent,
      sourcePage,
      message: [
        message,
        "",
        `Company: ${company || "(not provided)"}`,
        phone ? `Phone / WhatsApp: ${phone}` : null,
        `Marketing consent (phone/WhatsApp): ${marketingConsent ? "yes" : "no"}`,
        `Source page: ${sourcePage}`,
      ]
        .filter(Boolean)
        .join("\n"),
    }

    console.log("Contact form submission:", {
      email,
      company,
      marketingConsent,
      sourcePage,
      hasPhone: Boolean(phone),
    })

    const phpEndpoint = "https://finovasolutions.tech/contact.php"
    const response = await fetch(phpEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "https://finovasolutions.tech",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("PHP endpoint error:", errorText)
      throw new Error(`Failed to send message: ${response.status}`)
    }

    const responseData = await response.json()
    if (!responseData.success) {
      throw new Error(responseData.message || "Failed to send message")
    }

    return NextResponse.json(responseData)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to send message"
    console.error("Contact form error:", error)
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}
