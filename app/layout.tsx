import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Chatbot from "@/components/chat-bot"
import Script from "next/script"
import SmoothScroll from "@/components/smooth-scroll"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://finovasolutions.tech"),
  title: "Managed AI Agents That Run Your Operations | Finova Solutions",
  description:
    "Finova builds AI agents that take repetitive work off your team and runs them inside the tools you already use. Live with named clients. Book a call.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://finovasolutions.tech/",
    siteName: "Finova Solutions",
    title: "Managed AI Agents That Run Your Operations | Finova Solutions",
    description:
      "Finova builds AI agents that take repetitive work off your team and runs them inside the tools you already use. Live with named clients. Book a call.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Finova Solutions, managed AI agents for operations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Managed AI Agents That Run Your Operations | Finova Solutions",
    description:
      "Finova builds AI agents that take repetitive work off your team and runs them inside the tools you already use. Live with named clients. Book a call.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/images/icon.png",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", spaceGrotesk.className)} suppressHydrationWarning>
        <ThemeProvider>
          <SmoothScroll />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
            <Chatbot />
          </div>
        </ThemeProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2C5WKYX3ZD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2C5WKYX3ZD');
          `}
        </Script>
      </body>
    </html>
  )
}
