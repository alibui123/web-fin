import React from "react"
import { Metadata } from "next"
import NovaAuthPage from "@/components/product-pages/nova-auth"

export const metadata: Metadata = {
  title: "Nova Auth | Finova Solutions",
  description: "Our blockchain-powered authentication system eliminates the need for outdated OTPs. Nova Auth uses hashed biometric data stored on a secure digital ledger—offering faster, more secure, and far cheaper digital authentication.",
}

export default function Page() {
  return <NovaAuthPage />
} 