'use client'

import { useState } from 'react'
import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { FormSection } from '@/components/onboarding/form-section'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import { useRouter } from 'next/navigation'
import { CreditCard, Camera, MapPin, Loader2 } from 'lucide-react'

export default function KYCPage() {
  const router = useRouter()
  const kycStatus = useOnboardingStore(state => state.kyc.primaryApplicantStatus)
  const updateKYCStatus = useOnboardingStore(state => state.updateKYCStatus)
  const [loading, setLoading] = useState(false)

  const handleStartVerification = async () => {
    setLoading(true)
    updateKYCStatus('in_progress')

    // Simulate KYC verification
    await new Promise(resolve => setTimeout(resolve, 1500))

    updateKYCStatus('completed')
    useOnboardingStore.getState().createProvisionalAccount()
    setLoading(false)

    router.push('/onboarding/round1/background-checks')
  }

  const steps = [
    {
      icon: CreditCard,
      title: 'Upload ID',
      description: 'Passport or driving licence'
    },
    {
      icon: Camera,
      title: 'Take a selfie',
      description: 'Quick video to verify your identity'
    },
    {
      icon: MapPin,
      title: 'Confirm address',
      description: 'Recent utility bill or bank statement'
    }
  ]

  return (
    <OnboardingLayout progress={80} showBack={true}>
      <FormSection
        title="Verify your identity"
        description="Quick verification to keep your account secure. Takes less than 2 minutes."
      >
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card key={index} className="border-2">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-base">
                        {step.title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          <Button
            size="lg"
            className="w-full h-touch-lg mt-8"
            onClick={handleStartVerification}
            disabled={loading || kycStatus === 'completed'}
          >
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {loading ? 'Verifying...' : kycStatus === 'completed' ? 'Verified' : 'Start verification'}
          </Button>
        </div>
      </FormSection>
    </OnboardingLayout>
  )
}
