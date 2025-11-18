'use client'

import { useRouter } from 'next/navigation'
import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { FormSection } from '@/components/onboarding/form-section'
import { LoadingCarousel } from '@/components/onboarding/loading-carousel'
import { Shield } from 'lucide-react'

const VERIFICATION_STEPS = [
  {
    text: 'Verifying your identity...',
    duration: 1200
  },
  {
    text: 'Checking Companies House data...',
    duration: 1000
  },
  {
    text: 'Running AML and sanctions checks...',
    duration: 1300
  },
  {
    text: 'Assessing business risk profile...',
    duration: 1100
  },
  {
    text: 'Preparing your provisional account...',
    duration: 1400
  }
]

export default function BackgroundChecksPage() {
  const router = useRouter()

  const handleComplete = () => {
    router.push('/onboarding/round1/provisional')
  }

  return (
    <OnboardingLayout progress={85} showBack={false}>
      <FormSection
        title="Running security checks"
        description="This usually takes 2–3 minutes. We're making sure everything is secure."
      >
        <div className="space-y-6">
          <div className="flex justify-center py-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>

          <LoadingCarousel
            messages={VERIFICATION_STEPS}
            onComplete={handleComplete}
          />

          <p className="text-xs text-center text-muted-foreground pt-4">
            Please don't close this window. You'll be redirected automatically when complete.
          </p>
        </div>
      </FormSection>
    </OnboardingLayout>
  )
}
