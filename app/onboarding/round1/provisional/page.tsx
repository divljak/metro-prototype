'use client'

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import { useRouter } from 'next/navigation'
import { PartyPopper, Copy, Check, Info } from 'lucide-react'
import { useState } from 'react'

export default function ProvisionalPage() {
  const router = useRouter()
  const provisionalAccount = useOnboardingStore(state => state.provisionalAccount)
  const [copied, setCopied] = useState(false)

  const copyAccountDetails = () => {
    navigator.clipboard.writeText(
      `Sort Code: ${provisionalAccount.sortCode}\nAccount Number: ${provisionalAccount.accountNumber}`
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <OnboardingLayout progress={100} showProgress={false}>
      <div className="space-y-8 pb-8">
        {/* Success hero */}
        <div className="text-center space-y-4">
          <div className="mx-auto h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mb-4">
            <PartyPopper className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-display font-bold text-foreground">
            Your provisional account is ready!
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            You can start using your account with limited features while we complete verification.
          </p>
        </div>

        {/* Account details */}
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Your Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Sort Code</p>
              <p className="text-2xl font-bold text-foreground font-mono">
                {provisionalAccount.sortCode}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Account Number</p>
              <p className="text-2xl font-bold text-foreground font-mono">
                {provisionalAccount.accountNumber}
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={copyAccountDetails}
              className="w-full gap-2 mt-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy account details
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* What you can do */}
        <Alert>
          <Info className="h-5 w-5" />
          <AlertTitle>Provisional account limits</AlertTitle>
          <AlertDescription className="space-y-2 mt-2">
            <p className="text-sm">While we verify your business:</p>
            <ul className="text-sm list-disc list-inside space-y-1 ml-2">
              <li>Receive payments up to £5,000 per day</li>
              <li>Send payments up to £1,000 per transaction</li>
              <li>View transactions and statements</li>
            </ul>
            <p className="text-sm mt-3">
              Complete the remaining steps to unlock all features and remove limits.
            </p>
          </AlertDescription>
        </Alert>

        {/* CTAs */}
        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full h-touch-lg"
            onClick={() => router.push('/dashboard/provisional')}
          >
            Continue
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full h-touch-lg"
            onClick={() => router.push('/dashboard/provisional')}
          >
            Go to dashboard
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  )
}
