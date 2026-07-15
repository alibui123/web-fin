import React from "react"
import { ArrowRight, Shield, Zap, Lock, Fingerprint, LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function NovaAuthPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Gradient Background */}
      <section className="relative pt-12 pb-16 sm:pt-20 md:pt-32 sm:pb-24 md:pb-36">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs sm:text-sm">
                <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                <span>Blockchain Authentication</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Secure Authentication Reimagined
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-foreground/70 leading-relaxed max-w-xl">
                Our blockchain-powered authentication system eliminates the need for outdated OTPs. Nova Auth uses hashed biometric data stored on a secure digital ledger—offering faster, more secure, and far cheaper digital authentication.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                  <Link href="/contact" className="flex items-center">
                    Schedule Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-blue-500/20 hover:bg-blue-500/5">
                  <Link href="#features" className="flex items-center">
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-80 md:h-96 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl shadow-blue-500/20">
                {/* Hexagonal grid background */}
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                        <path d="M25 0L50 25L25 50L0 25L25 0z" fill="none" stroke="white" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hexagons)" />
                  </svg>
                </div>
                
                {/* Digital locks animation - Static version */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <div className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-4 border-white/30" />
                    <div className="absolute top-4 left-4 right-4 bottom-4 rounded-full border-4 border-white/40" />
                    <div className="absolute top-8 left-8 right-8 bottom-8 rounded-full border-4 border-white/50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Fingerprint className="w-16 h-16 text-white" />
                    </div>
                  </div>
                </div>
                
                {/* Static particles replacing animated ones */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: '4px',
                      height: '4px',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: 0.6,
                    }}
                  />
                ))}
                
                {/* Static connection lines */}
                <svg className="absolute inset-0 w-full h-full">
                  <line
                    x1="30%"
                    y1="30%"
                    x2="70%"
                    y2="40%"
                    stroke="white"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                  <line
                    x1="20%"
                    y1="50%"
                    x2="60%"
                    y2="70%"
                    stroke="white"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                  <line
                    x1="70%"
                    y1="20%"
                    x2="40%"
                    y2="60%"
                    stroke="white"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                </svg>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 blur-lg opacity-70" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 blur-xl opacity-40" />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-12 sm:py-20 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Why Choose Nova Auth?</h2>
            <p className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto">
              Our blockchain-powered authentication system provides unmatched security with a seamless user experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Feature 1 */}
            <div className="bg-background/80 border border-blue-500/10 rounded-xl p-4 sm:p-6 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-3 sm:mb-4">
                <Shield className="text-white h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Enhanced Security</h3>
              <p className="text-sm sm:text-base text-foreground/70">
                Blockchain-based cryptographic security with immutable ledger protects against man-in-the-middle attacks.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-background/80 border border-blue-500/10 rounded-xl p-4 sm:p-6 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-3 sm:mb-4">
                <Zap className="text-white h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm sm:text-base text-foreground/70">
                Authenticates in milliseconds, improving user experience and reducing abandonment rates by 30%.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-background/80 border border-blue-500/10 rounded-xl p-4 sm:p-6 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-3 sm:mb-4">
                <LineChart className="text-white h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Cost Effective</h3>
              <p className="text-sm sm:text-base text-foreground/70">
                Reduces authentication costs by 70% by eliminating SMS fees and simplifying implementation.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-background/80 border border-blue-500/10 rounded-xl p-4 sm:p-6 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-3 sm:mb-4">
                <Lock className="text-white h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-sm sm:text-base text-foreground/70">
                Biometric data is hashed and never stored in its raw form, ensuring user privacy and regulatory compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-background to-background/90">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">How Nova Auth Works</h2>
            <p className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto">
              A seamless and secure authentication process powered by blockchain technology
            </p>
          </div>

          <div className="relative">
            {/* Connection Line - Hidden on mobile */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-blue-500 to-transparent hidden md:block" />
            
            {/* Step 1 */}
            <div className="relative grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-16">
              <div className="md:col-span-2 md:text-right flex flex-col justify-center order-2 md:order-1 text-center md:text-right">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">User Registration</h3>
                <p className="text-sm sm:text-base text-foreground/70">
                  Users register with biometric data (fingerprint, face ID) which is securely hashed and registered on the blockchain.
                </p>
              </div>
              <div className="md:col-span-1 flex justify-center order-1 md:order-2 mb-4 md:mb-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-base sm:text-xl font-bold relative z-10">1</div>
              </div>
              <div className="md:col-span-2 hidden md:block order-3" />
            </div>
            
            {/* Step 2 */}
            <div className="relative grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-16">
              <div className="md:col-span-2 hidden md:block" />
              <div className="md:col-span-1 flex justify-center mb-4 md:mb-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-base sm:text-xl font-bold relative z-10">2</div>
              </div>
              <div className="md:col-span-2 flex flex-col justify-center text-center md:text-left">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Authentication Request</h3>
                <p className="text-sm sm:text-base text-foreground/70">
                  When authentication is needed, the user provides their biometric data which is hashed using the same algorithm.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-16">
              <div className="md:col-span-2 md:text-right flex flex-col justify-center order-2 md:order-1 text-center md:text-right">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Blockchain Verification</h3>
                <p className="text-sm sm:text-base text-foreground/70">
                  Our system compares the provided hash with the stored hash on the blockchain, verifying the user's identity.
                </p>
              </div>
              <div className="md:col-span-1 flex justify-center order-1 md:order-2 mb-4 md:mb-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-base sm:text-xl font-bold relative z-10">3</div>
              </div>
              <div className="md:col-span-2 hidden md:block order-3" />
            </div>
            
            {/* Step 4 */}
            <div className="relative grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4">
              <div className="md:col-span-2 hidden md:block" />
              <div className="md:col-span-1 flex justify-center mb-4 md:mb-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-base sm:text-xl font-bold relative z-10">4</div>
              </div>
              <div className="md:col-span-2 flex flex-col justify-center text-center md:text-left">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Secure Access Granted</h3>
                <p className="text-sm sm:text-base text-foreground/70">
                  Upon successful verification, the user is granted access in milliseconds, with the entire transaction logged on the blockchain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-12 sm:py-20 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Nova Auth vs Traditional Authentication</h2>
            <p className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto">
              See how our revolutionary approach outperforms traditional authentication methods
            </p>
          </div>

          <div className="relative overflow-x-auto rounded-xl border border-blue-500/10">
            <table className="w-full text-left text-sm sm:text-base">
              <thead className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-foreground">
                <tr>
                  <th className="px-6 py-4 font-semibold">Features</th>
                  <th className="px-6 py-4 font-semibold text-blue-500">Nova Auth</th>
                  <th className="px-6 py-4 font-semibold text-foreground/60">OTP Authentication</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-500/10">
                <tr className="bg-background/80">
                  <td className="px-6 py-4 font-medium">Authentication Speed</td>
                  <td className="px-6 py-4 text-blue-500">Milliseconds</td>
                  <td className="px-6 py-4 text-foreground/60">15-60 seconds</td>
                </tr>
                <tr className="bg-background/60">
                  <td className="px-6 py-4 font-medium">Security Level</td>
                  <td className="px-6 py-4 text-blue-500">Very High (Blockchain)</td>
                  <td className="px-6 py-4 text-foreground/60">Medium</td>
                </tr>
                <tr className="bg-background/80">
                  <td className="px-6 py-4 font-medium">Cost per Authentication</td>
                  <td className="px-6 py-4 text-blue-500">$0.001</td>
                  <td className="px-6 py-4 text-foreground/60">$0.05 - $0.10</td>
                </tr>
                <tr className="bg-background/60">
                  <td className="px-6 py-4 font-medium">User Experience</td>
                  <td className="px-6 py-4 text-blue-500">Seamless</td>
                  <td className="px-6 py-4 text-foreground/60">Friction-heavy</td>
                </tr>
                <tr className="bg-background/80">
                  <td className="px-6 py-4 font-medium">Vulnerability to SIM Swapping</td>
                  <td className="px-6 py-4 text-blue-500">None</td>
                  <td className="px-6 py-4 text-foreground/60">High</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border border-blue-500/20 rounded-2xl p-6 sm:p-8 md:p-16 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-6">Ready to upgrade your authentication system?</h2>
              <p className="text-base sm:text-lg text-foreground/70 mb-6 sm:mb-8">
                Schedule a demo to see how Nova Auth can enhance your security while reducing costs.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white w-full sm:w-auto">
                <Link href="/contact" className="flex items-center justify-center">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 