import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const routes = [
  {
    category: "Round 1: Provisional Account (10 min flow)",
    pages: [
      { name: "Welcome", path: "/onboarding/round1/welcome", description: "Start here" },
      { name: "Login (Magic Link)", path: "/onboarding/round1/login", description: "Email only, no password" },
      { name: "Passphrase", path: "/onboarding/round1/passphrase", description: "3-word verification" },
      { name: "Lookup Business", path: "/onboarding/round1/lookup-business", description: "Companies House search" },
      { name: "Confirm Business", path: "/onboarding/round1/confirm-business", description: "Review company details" },
      { name: "Annual Turnover", path: "/onboarding/round1/profile-turnover", description: "Select turnover band" },
      { name: "Employee Count", path: "/onboarding/round1/profile-employees", description: "Team size" },
      { name: "Cash & International", path: "/onboarding/round1/profile-cash-international", description: "Business activities" },
      { name: "People", path: "/onboarding/round1/people", description: "Directors & PSCs" },
      { name: "Invite People", path: "/onboarding/round1/invite", description: "Send invitations" },
      { name: "KYC Verification", path: "/onboarding/round1/kyc", description: "Identity verification" },
      { name: "Background Checks", path: "/onboarding/round1/background-checks", description: "Loading carousel" },
      { name: "Provisional Account", path: "/onboarding/round1/provisional", description: "Account created!" }
    ]
  },
  {
    category: "Round 1.5: Provisional Dashboard",
    pages: [
      { name: "Provisional Dashboard", path: "/dashboard/provisional", description: "First home screen with features preview" }
    ]
  },
  {
    category: "Round 2: Full Verification",
    pages: [
      { name: "Secure Account", path: "/onboarding/round2/secure-account", description: "Passcode + biometric setup" },
      { name: "Round 2 Dashboard", path: "/onboarding/round2/dashboard", description: "Verification hub" },
      { name: "Business Activity", path: "/onboarding/round2/business-activity", description: "Trading details" },
      { name: "Mandate & Approvals", path: "/onboarding/round2/mandate", description: "Payment permissions" },
      { name: "Online Banking Setup", path: "/onboarding/round2/online-banking", description: "Plans & limits" },
      { name: "Documents", path: "/onboarding/round2/documents", description: "Upload proof with QR handover" },
      { name: "Lending", path: "/onboarding/round2/lending", description: "6-step lending wizard with Open Banking" },
      { name: "Complete", path: "/onboarding/round2/complete", description: "Success screen" },
      { name: "Subscription (Placeholder)", path: "/onboarding/round2/subscription", description: "Coming soon" }
    ]
  },
  {
    category: "Entry Points",
    pages: [
      { name: "Start Page", path: "/start", description: "Marketing entry point with feature overview" }
    ]
  },
  {
    category: "Design System",
    pages: [
      { name: "Design System", path: "/design-system", description: "View all components" }
    ]
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="space-y-2 mb-8">
          <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Metro Bank</h1>
          <p className="text-lg text-muted-foreground">Business Banking Onboarding Prototype</p>
          <p className="text-sm text-muted-foreground pt-2">
            Navigate to any screen below to test the flow
          </p>
        </div>

        <div className="space-y-6">
          {routes.map((section, idx) => (
            <Card key={idx} className="border-2">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">{section.category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {section.pages.map((page, pageIdx) => (
                  <Link key={pageIdx} href={page.path}>
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group">
                      <div className="flex-1">
                        <p className="font-medium text-foreground group-hover:text-primary">
                          {page.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {page.description}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>All screens are mobile-first and use the Metro Banking Design System</p>
        </div>
      </div>
    </main>
  )
}

