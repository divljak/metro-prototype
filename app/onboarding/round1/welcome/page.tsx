'use client'

import { useState, useEffect } from 'react'
import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { TimeEstimate } from '@/components/onboarding/time-estimate'
import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { loadCheckpoint, clearCheckpoint } from '@/hooks/use-checkpoint'

export default function WelcomePage() {
  const router = useRouter()
  const [savedCheckpoint, setSavedCheckpoint] = useState<string | null>(null)

  useEffect(() => {
    const checkpoint = loadCheckpoint()
    if (checkpoint) {
      setSavedCheckpoint(checkpoint.route)
    }
  }, [])

  const handleContinue = () => {
    if (savedCheckpoint) {
      router.push(savedCheckpoint)
    }
  }

  const handleStartFresh = () => {
    clearCheckpoint()
    setSavedCheckpoint(null)
  }

  return (
    <OnboardingLayout progress={0} showProgress={true}>
      <div className="space-y-8">
        {/* Resume Banner */}
        {savedCheckpoint && (
          <Alert className="bg-primary/5 border-primary/20">
            <AlertTitle className="text-foreground font-semibold flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              Continue where you left off
            </AlertTitle>
            <AlertDescription className="text-sm text-muted-foreground mt-2">
              We saved your progress. Pick up right where you stopped.
            </AlertDescription>
            <div className="flex gap-2 mt-4">
              <Button
                size="sm"
                onClick={handleContinue}
                className="flex-1"
              >
                Continue <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleStartFresh}
              >
                Start fresh
              </Button>
            </div>
          </Alert>
        )}

        {/* Hero section */}
        <div className="text-center space-y-4">
          <div className="mx-auto h-20 w-20 rounded-full bg-primary flex items-center justify-center mb-4">
            <span className="text-white font-bold text-3xl">M</span>
          </div>
          <h1 className="text-display font-bold text-foreground">
            Open your Business Account
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Takes just a few minutes. You can always continue later.
          </p>
        </div>

        {/* Benefits list */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-foreground text-lg mb-4">
              What you'll get:
            </h3>
            {[
              'Provisional account in under 10 minutes',
              'Free business banking for 18 months',
              'Instant payments with no hidden fees',
              'Multi-currency accounts included',
              'Dedicated support team'
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-4 w-4 text-success" />
                </div>
                <p className="text-foreground">{benefit}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="space-y-3">
          <TimeEstimate minutes={10} />
          <Link href="/onboarding/round1/login" className="block">
            <Button size="lg" className="w-full h-touch-lg">
              Start Application
            </Button>
          </Link>
          <p className="text-center text-sm text-muted-foreground">
            Already started? <Link href="/onboarding/round1/login" className="text-primary hover:underline font-medium">Continue</Link>
          </p>
        </div>
      </div>
    </OnboardingLayout>
  )
}
