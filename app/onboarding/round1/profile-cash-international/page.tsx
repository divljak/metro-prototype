'use client'

import { useState } from 'react'
import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { FormSection } from '@/components/onboarding/form-section'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent } from '@/components/ui/card'
import { AutoSaveIndicator } from '@/components/onboarding/auto-save-indicator'
import { InlineHint } from '@/components/onboarding/inline-hint'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import { useRouter } from 'next/navigation'
import { Banknote, Globe } from 'lucide-react'

export default function ProfileCashInternationalPage() {
  const router = useRouter()
  const business = useOnboardingStore(state => state.business)
  const updateBusinessProfile = useOnboardingStore(state => state.updateBusinessProfile)
  const [handlesCash, setHandlesCash] = useState(business?.handlesCash || false)
  const [international, setInternational] = useState(business?.international || false)
  const [showSaved, setShowSaved] = useState(false)

  const handleToggle = (field: 'cash' | 'international', value: boolean) => {
    if (field === 'cash') {
      setHandlesCash(value)
      updateBusinessProfile({ handlesCash: value })
    } else {
      setInternational(value)
      updateBusinessProfile({ international: value })
    }
    setShowSaved(true)
  }

  const handleContinue = () => {
    router.push('/onboarding/round1/people')
  }

  return (
    <OnboardingLayout progress={50} showBack={true}>
      <FormSection
        title="A few more questions"
        description="This helps us set up the right features for your account."
      >
        <div className="space-y-4">
          {/* Cash handling */}
          <Card className="border-2">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Banknote className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <Label htmlFor="cash" className="text-base font-semibold cursor-pointer">
                      Do you handle cash?
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Taking payments or making deposits in cash
                    </p>
                  </div>
                </div>
                <Switch
                  id="cash"
                  checked={handlesCash}
                  onCheckedChange={(value) => handleToggle('cash', value)}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* International payments */}
          <Card className="border-2">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <Label htmlFor="international" className="text-base font-semibold cursor-pointer">
                      Do you send or receive international payments?
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Trading with businesses or customers abroad
                    </p>
                  </div>
                </div>
                <Switch
                  id="international"
                  checked={international}
                  onCheckedChange={(value) => handleToggle('international', value)}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          <InlineHint>
            These questions help us meet regulatory requirements and set up the right security measures for your account. Cash handling and international payments have specific compliance requirements we need to configure properly.
          </InlineHint>

          <AutoSaveIndicator visible={showSaved} onFadeComplete={() => setShowSaved(false)} />

          <Button
            size="lg"
            className="w-full h-touch-lg mt-8"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </FormSection>
    </OnboardingLayout>
  )
}
