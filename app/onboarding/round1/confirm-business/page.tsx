'use client'

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { FormSection } from '@/components/onboarding/form-section'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import { useRouter } from 'next/navigation'
import { Building2, MapPin, Users } from 'lucide-react'

export default function ConfirmBusinessPage() {
  const router = useRouter()
  const business = useOnboardingStore(state => state.business)
  const people = useOnboardingStore(state => state.people)

  if (!business) {
    router.push('/onboarding/round1/lookup-business')
    return null
  }

  const directors = people.filter(p => p.role === 'Director')
  const pscs = people.filter(p => p.role === 'PSC')

  return (
    <OnboardingLayout progress={20} showBack={true}>
      <FormSection
        title="Confirm your business details"
        description="Check that everything looks correct."
      >
        <div className="space-y-4">
          {/* Company info card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Company name</p>
                <p className="font-semibold text-foreground">{business.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Company type</p>
                <p className="font-semibold text-foreground">{business.type}</p>
              </div>
            </CardContent>
          </Card>

          {/* Address card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Registered Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{business.address}</p>
            </CardContent>
          </Card>

          {/* Directors & PSCs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Directors & People with Significant Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {directors.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Directors</p>
                  <div className="space-y-1">
                    {directors.map(person => (
                      <p key={person.id} className="text-sm text-foreground">
                        {person.name}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {pscs.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">PSCs</p>
                  <div className="space-y-1">
                    {pscs.map(person => (
                      <p key={person.id} className="text-sm text-foreground">
                        {person.name}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Button
            size="lg"
            className="w-full h-touch-lg mt-6"
            onClick={() => router.push('/onboarding/round1/profile-turnover')}
          >
            Confirm and continue
          </Button>
        </div>
      </FormSection>
    </OnboardingLayout>
  )
}
