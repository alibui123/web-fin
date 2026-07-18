// Shared site-wide constants.

export const SITE_URL = "https://finovasolutions.tech"

// Canonical "Book a call" link. Used on every primary Book-a-call CTA.
export const CALENDLY_URL =
  "https://calendly.com/ceo-finovasolutions/done-for-you-service-finova-solutions"

/** Clears sticky :hover/:focus after opening external CTAs (touch / back-nav). */
export function clearStickyCta(e: { currentTarget: { blur: () => void } }) {
  e.currentTarget.blur()
}

// Demo agent dial-in for the homepage live-demo section.
// Replace when the dedicated demo number is confirmed.
export const DEMO_PHONE_DISPLAY = "+92 327 6508716"
export const DEMO_PHONE_HREF = "tel:+923276508716"
