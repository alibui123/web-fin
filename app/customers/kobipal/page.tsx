import type { Metadata } from "next"
import CustomerHub from "@/components/customer-hub"

export const metadata: Metadata = {
  title: "KobiPal | Finova Customers",
  description:
    "A social forum built for weak networks across Africa, plus the landing page that turned visitors into sign-ups — App Store and Google Play.",
  alternates: { canonical: "/customers/kobipal" },
}

export default function KobipalPage() {
  return (
    <CustomerHub
      name="KobiPal"
      sector="Consumer community platform"
      region="Africa"
      arc="A community platform arc for places where connectivity is weak: a Flutter forum tuned for speed and small data, and a landing page built for the same audience."
      body={[
        "Heavy apps stall where networks are weak. We built KobiPal as a social forum in Flutter, live on the App Store and Google Play from one codebase, then a landing page at kobipal.com with one message and one action — tuned to load fast for the same people the app serves.",
        "Finova remains their technical partner after launch.",
      ]}
      quote="Finova built our social platform and remain our technical partners. Sharp, reliable and a genuine pleasure to build with."
      attribution="Ayo Owolo, KobiPal"
      clientSlug="kobipal"
      secondaryCta={{ href: "/portfolio?practice=apps-and-platforms", label: "Apps and platforms" }}
    />
  )
}
