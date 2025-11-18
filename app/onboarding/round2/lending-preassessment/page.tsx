'use client'

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { FormSection } from '@/components/onboarding/form-section'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { TrendingUp, ArrowLeft } from 'lucide-react'

export default function LendingPreAssessmentPage() {
  const router = useRouter()

  return (
    <OnboardingLayout progress={50} showBack={true}>
      <FormSection
        title="Business lending"
        description="See what credit options are available for your business."
      >
        <div className="space-y-6">
          <div className="flex justify-center py-8">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
              <TrendingUp className="h-10 w-10 text-muted-foreground" />
            </div>
          </div>

          <Card className="border-2 bg-muted/30">
            <CardContent className="p-8 text-center">
              <h3 className="text-h3 font-semibold text-foreground mb-2">
                Coming soon
              </h3>
              <p className="text-sm text-muted-foreground">
                Lending pre-assessment and credit line options will be available after your account is fully verified.
              </p>
            </CardContent>
          </Card>

          <Button
            variant="outline"
            size="lg"
            className="w-full gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Button>
        </div>
      </FormSection>
    </OnboardingLayout>
  )
}
