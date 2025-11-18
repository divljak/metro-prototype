'use client'

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { FormSection } from '@/components/onboarding/form-section'
import { PersonCard } from '@/components/onboarding/person-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import { useRouter } from 'next/navigation'
import { Mail } from 'lucide-react'

export default function InvitePage() {
  const router = useRouter()
  const people = useOnboardingStore(state => state.people)
  const updatePersonStatus = useOnboardingStore(state => state.updatePersonStatus)

  const handleSendInvite = (personId: string) => {
    // Simulate sending invite
    updatePersonStatus(personId, 'invited')
  }

  const allInvited = people.every(p => p.status !== 'not_started')

  return (
    <OnboardingLayout progress={70} showBack={true}>
      <FormSection
        title="Invite key people to verify"
        description="Each director and PSC needs to complete their own verification. We'll email them a secure link."
      >
        <div className="space-y-4">
          {people.map((person) => (
            <Card key={person.id} className="border-2">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">
                      {person.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {person.role}
                    </p>
                  </div>
                  {person.status === 'not_started' ? (
                    <Button
                      size="sm"
                      onClick={() => handleSendInvite(person.id)}
                      className="gap-2 flex-shrink-0"
                    >
                      <Mail className="h-4 w-4" />
                      Send invite
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-success flex-shrink-0">
                      <Mail className="h-4 w-4" />
                      Invited
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            size="lg"
            className="w-full h-touch-lg mt-8"
            onClick={() => router.push('/onboarding/round1/kyc')}
            disabled={!allInvited}
          >
            Continue
          </Button>

          {!allInvited && (
            <p className="text-sm text-center text-muted-foreground">
              Send invites to all people before continuing
            </p>
          )}
        </div>
      </FormSection>
    </OnboardingLayout>
  )
}
