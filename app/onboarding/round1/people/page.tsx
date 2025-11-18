'use client'

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { FormSection } from '@/components/onboarding/form-section'
import { PersonCard } from '@/components/onboarding/person-card'
import { Button } from '@/components/ui/button'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import { useRouter } from 'next/navigation'

export default function PeoplePage() {
  const router = useRouter()
  const people = useOnboardingStore(state => state.people)

  return (
    <OnboardingLayout progress={60} showBack={true}>
      <FormSection
        title="Who owns and runs the business?"
        description="We've pulled this information from Companies House. We'll need to verify each person in the next step."
      >
        <div className="space-y-3">
          {people.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}

          <Button
            size="lg"
            className="w-full h-touch-lg mt-8"
            onClick={() => router.push('/onboarding/round1/invite')}
          >
            Looks good
          </Button>
        </div>
      </FormSection>
    </OnboardingLayout>
  )
}
