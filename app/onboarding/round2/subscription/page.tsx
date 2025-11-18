'use client'

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { FormSection } from '@/components/onboarding/form-section'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Package, ArrowLeft } from 'lucide-react'

export default function SubscriptionPage() {
  const router = useRouter()

  return (
    <OnboardingLayout progress={50} showBack={true}>
      <FormSection
        title="Business plans"
        description="Choose the plan that fits your business needs."
      >
        <div className="space-y-6">
          <div className="flex justify-center py-8">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
              <Package className="h-10 w-10 text-muted-foreground" />
            </div>
          </div>

          <Card className="border-2 bg-muted/30">
            <CardContent className="p-8 text-center">
              <h3 className="text-h3 font-semibold text-foreground mb-2">
                Coming soon
              </h3>
              <p className="text-sm text-muted-foreground">
                Plan selection and subscription management will be available shortly.
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
