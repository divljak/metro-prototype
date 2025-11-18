'use client'

import { useState } from 'react'
import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { FormSection } from '@/components/onboarding/form-section'
import { CardSelect } from '@/components/onboarding/card-select'
import { InlineHint } from '@/components/onboarding/inline-hint'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import { useRouter } from 'next/navigation'
import { Shield, Users, Lock } from 'lucide-react'

const mandateTypes = [
  { value: 'single', label: 'One person can approve payments', icon: Users },
  { value: 'dual', label: 'Two people must approve payments', icon: Shield },
  { value: 'mixed', label: 'Different rules for larger payments', icon: Lock }
]

export default function MandatePage() {
  const router = useRouter()
  const round2 = useOnboardingStore(state => state.round2)
  const people = useOnboardingStore(state => state.people)
  const updateRound2Progress = useOnboardingStore(state => state.updateRound2Progress)
  const updatePersonPermissions = useOnboardingStore(state => state.updatePersonPermissions)

  const [step, setStep] = useState(1)
  const [selectedMandate, setSelectedMandate] = useState(round2.mandateType)

  const handleSave = () => {
    updateRound2Progress({
      mandateType: selectedMandate,
      mandateDone: true
    })
    router.push('/onboarding/round2/dashboard')
  }

  return (
    <OnboardingLayout progress={50} showBack={true}>
      <div className="space-y-6">
        {step === 1 && (
          <FormSection
            title="How should payments be approved?"
            description="Choose the approval structure that works for your business."
          >
            <div className="space-y-3">
              {mandateTypes.map((mandate) => {
                const Icon = mandate.icon
                return (
                  <CardSelect
                    key={mandate.value}
                    label={mandate.label}
                    selected={selectedMandate === mandate.value}
                    onClick={() => setSelectedMandate(mandate.value)}
                    icon={<Icon className="h-5 w-5" />}
                  />
                )
              })}
            </div>

            <InlineHint>
              Payment mandates protect your business by requiring appropriate approvals for transactions. Regulatory requirements may apply based on your business structure and turnover.
            </InlineHint>

            <div className="space-y-3 mt-8">
              <Button
                size="lg"
                className="w-full h-touch-lg"
                onClick={() => setStep(2)}
                disabled={!selectedMandate}
              >
                Next
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full h-touch-lg"
                onClick={() => router.push('/dashboard/provisional')}
              >
                Skip for now
              </Button>
            </div>
          </FormSection>
        )}

        {step === 2 && (
          <FormSection
            title="Set permissions for each person"
            description="Choose who can approve, view, or manage the account."
          >
            <div className="space-y-4">
              {people.map((person) => (
                <Card key={person.id} className="border-2">
                  <CardContent className="p-4 space-y-4">
                    <div>
                      <p className="font-semibold text-foreground">{person.name}</p>
                      <p className="text-sm text-muted-foreground">{person.role}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`${person.id}-admin`} className="cursor-pointer">
                          Admin (full access)
                        </Label>
                        <Switch
                          id={`${person.id}-admin`}
                          checked={person.isAdmin || false}
                          onCheckedChange={(checked) =>
                            updatePersonPermissions(person.id, { isAdmin: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor={`${person.id}-approver`} className="cursor-pointer">
                          Can approve payments
                        </Label>
                        <Switch
                          id={`${person.id}-approver`}
                          checked={person.isApprover || false}
                          onCheckedChange={(checked) =>
                            updatePersonPermissions(person.id, { isApprover: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor={`${person.id}-viewer`} className="cursor-pointer">
                          View only
                        </Label>
                        <Switch
                          id={`${person.id}-viewer`}
                          checked={person.isViewer || false}
                          onCheckedChange={(checked) =>
                            updatePersonPermissions(person.id, { isViewer: checked })
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-3 mt-8">
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex-1 h-touch"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button
                  size="lg"
                  className="flex-1 h-touch"
                  onClick={handleSave}
                >
                  Save mandate
                </Button>
              </div>
              <Button
                variant="secondary"
                size="lg"
                className="w-full h-touch"
                onClick={() => router.push('/dashboard/provisional')}
              >
                Skip for now
              </Button>
            </div>
          </FormSection>
        )}
      </div>
    </OnboardingLayout>
  )
}
