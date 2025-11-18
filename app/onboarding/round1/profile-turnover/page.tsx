'use client'

import { useState } from 'react'
import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { FormSection } from '@/components/onboarding/form-section'
import { CardSelect } from '@/components/onboarding/card-select'
import { Button } from '@/components/ui/button'
import { AutoSaveIndicator } from '@/components/onboarding/auto-save-indicator'
import { InlineHint } from '@/components/onboarding/inline-hint'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import { useRouter } from 'next/navigation'
import { TrendingUp } from 'lucide-react'

const turnoverOptions = [
  { value: '0-250k', label: '£0 – £250K', description: 'Early stage or small business' },
  { value: '250k-1m', label: '£250K – £1M', description: 'Growing business' },
  { value: '1m-5m', label: '£1M – £5M', description: 'Established business' },
  { value: '5m+', label: '£5M+', description: 'Large enterprise' }
]

export default function ProfileTurnoverPage() {
  const router = useRouter()
  const business = useOnboardingStore(state => state.business)
  const updateBusinessProfile = useOnboardingStore(state => state.updateBusinessProfile)
  const [selected, setSelected] = useState(business?.turnover || '')
  const [showSaved, setShowSaved] = useState(false)

  const handleSelect = (value: string) => {
    setSelected(value)
    updateBusinessProfile({ turnover: value })
    setShowSaved(true)
  }

  const handleContinue = () => {
    router.push('/onboarding/round1/profile-employees')
  }

  return (
    <OnboardingLayout progress={30} showBack={true}>
      <FormSection
        title="What is your annual turnover?"
        description="This helps us tailor the right products for your business."
      >
        <div className="space-y-3">
          {turnoverOptions.map((option) => (
            <CardSelect
              key={option.value}
              label={option.label}
              description={option.description}
              selected={selected === option.value}
              onClick={() => handleSelect(option.value)}
              icon={<TrendingUp className="h-5 w-5" />}
            />
          ))}

          <InlineHint>
            We use your turnover to recommend the right account features and transaction limits. This helps us tailor services like overdraft facilities, payment processing, and international transfers to match your business needs.
          </InlineHint>

          <AutoSaveIndicator visible={showSaved} onFadeComplete={() => setShowSaved(false)} />

          <Button
            size="lg"
            className="w-full h-touch-lg mt-8"
            onClick={handleContinue}
            disabled={!selected}
          >
            Next
          </Button>
        </div>
      </FormSection>
    </OnboardingLayout>
  )
}
