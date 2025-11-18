'use client'

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import { PartyPopper, Check } from 'lucide-react'

const unlockedFeatures = [
  'Unlimited daily payments',
  'International transfers',
  'Multi-currency accounts',
  'Issue unlimited debit cards',
  'Advanced reporting tools',
  'API access',
  'Dedicated account manager',
  'Priority support'
]

export default function CompletePage() {
  const router = useRouter()

  return (
    <OnboardingLayout progress={100} showProgress={false}>
      <div className="space-y-8 pb-8">
        {/* Success hero */}
        <div className="text-center space-y-4">
          <div className="mx-auto h-24 w-24 rounded-full bg-success/10 flex items-center justify-center mb-4">
            <PartyPopper className="h-12 w-12 text-success" />
          </div>
          <Badge className="bg-success text-success-foreground">
            Fully Verified
          </Badge>
          <h1 className="text-display font-bold text-foreground">
            Your business is fully verified!
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Your account is now fully active with all features available.
          </p>
        </div>

        {/* Features unlocked */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">All features now unlocked</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {unlockedFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-4 w-4 text-success" />
                </div>
                <p className="text-foreground">{feature}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full h-touch-lg"
            onClick={() => router.push('/')}
          >
            Go to your dashboard
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            You'll receive a confirmation email with next steps
          </p>
        </div>
      </div>
    </OnboardingLayout>
  )
}
