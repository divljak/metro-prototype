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
import { Users } from 'lucide-react'

const employeeOptions = [
  { value: '0-2', label: '0 – 2', description: 'Just you or a small team' },
  { value: '3-10', label: '3 – 10', description: 'Small team' },
  { value: '10-50', label: '10 – 50', description: 'Medium-sized team' },
  { value: '50+', label: '50+', description: 'Large team' }
]

export default function ProfileEmployeesPage() {
  const router = useRouter()
  const business = useOnboardingStore(state => state.business)
  const updateBusinessProfile = useOnboardingStore(state => state.updateBusinessProfile)
  const [selected, setSelected] = useState(business?.employees || '')
  const [showSaved, setShowSaved] = useState(false)

  const handleSelect = (value: string) => {
    setSelected(value)
    updateBusinessProfile({ employees: value })
    setShowSaved(true)
  }

  const handleContinue = () => {
    router.push('/onboarding/round1/profile-cash-international')
  }

  return (
    <OnboardingLayout progress={40} showBack={true}>
      <FormSection
        title="How many people work in your business?"
        description="Include yourself and any full-time or part-time employees."
      >
        <div className="space-y-3">
          {employeeOptions.map((option) => (
            <CardSelect
              key={option.value}
              label={option.label}
              description={option.description}
              selected={selected === option.value}
              onClick={() => handleSelect(option.value)}
              icon={<Users className="h-5 w-5" />}
            />
          ))}

          <AutoSaveIndicator visible={showSaved} onFadeComplete={() => setShowSaved(false)} />

          <InlineHint>
            We use team size to recommend the right features, transaction limits, and account structure for your business.
          </InlineHint>

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
