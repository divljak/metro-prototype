'use client'

import { useState } from 'react'
import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { FormSection } from '@/components/onboarding/form-section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const countries = ['UK', 'USA', 'EU', 'China', 'India', 'Australia', 'Canada', 'Other']
const paymentMethods = ['Bank transfer', 'Card payments', 'Cash', 'Online platforms', 'Cheques']

export default function BusinessActivityPage() {
  const router = useRouter()
  const round2 = useOnboardingStore(state => state.round2)
  const updateRound2Progress = useOnboardingStore(state => state.updateRound2Progress)

  const [step, setStep] = useState(1)
  const [selectedCountries, setSelectedCountries] = useState<string[]>(round2.countries)
  const [selectedPayments, setSelectedPayments] = useState<string[]>(round2.paymentMethods)
  const [cashPercentage, setCashPercentage] = useState(round2.cashPercentage)

  const toggleCountry = (country: string) => {
    setSelectedCountries(prev =>
      prev.includes(country)
        ? prev.filter(c => c !== country)
        : [...prev, country]
    )
  }

  const togglePayment = (method: string) => {
    setSelectedPayments(prev =>
      prev.includes(method)
        ? prev.filter(p => p !== method)
        : [...prev, method]
    )
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      updateRound2Progress({
        countries: selectedCountries,
        paymentMethods: selectedPayments,
        cashPercentage,
        businessActivityDone: true
      })
      router.push('/onboarding/round2/dashboard')
    }
  }

  return (
    <OnboardingLayout progress={25} showBack={true}>
      <div className="space-y-6">
        {/* Step 1: Countries */}
        {step === 1 && (
          <FormSection
            title="Which countries do you trade with?"
            description="Select all that apply."
          >
            <div className="flex flex-wrap gap-2">
              {countries.map((country) => (
                <Badge
                  key={country}
                  variant={selectedCountries.includes(country) ? 'default' : 'outline'}
                  className={cn(
                    'cursor-pointer px-4 py-2 text-sm h-auto',
                    'hover:opacity-80 transition-all'
                  )}
                  onClick={() => toggleCountry(country)}
                >
                  {country}
                </Badge>
              ))}
            </div>

            <div className="space-y-3 mt-8">
              <Button
                size="lg"
                className="w-full h-touch-lg"
                onClick={handleNext}
                disabled={selectedCountries.length === 0}
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

        {/* Step 2: Payment methods */}
        {step === 2 && (
          <FormSection
            title="How do you get paid?"
            description="Select all payment methods you accept."
          >
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <Card
                  key={method}
                  className={cn(
                    'cursor-pointer transition-all border-2',
                    selectedPayments.includes(method)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  )}
                  onClick={() => togglePayment(method)}
                >
                  <CardContent className="p-4">
                    <p className="font-medium text-foreground">{method}</p>
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
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </Button>
                <Button
                  size="lg"
                  className="flex-1 h-touch"
                  onClick={handleNext}
                  disabled={selectedPayments.length === 0}
                >
                  Next
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

        {/* Step 3: Cash percentage */}
        {step === 3 && (
          <FormSection
            title="Roughly what % of your turnover is in cash?"
            description="Move the slider to estimate."
          >
            <Card className="border-2">
              <CardContent className="p-6 space-y-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-foreground">{cashPercentage}%</p>
                  <p className="text-sm text-muted-foreground mt-1">of turnover in cash</p>
                </div>

                <Slider
                  value={[cashPercentage]}
                  onValueChange={(value) => setCashPercentage(value[0])}
                  max={100}
                  step={5}
                  className="w-full"
                />

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3 mt-8">
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex-1 h-touch"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </Button>
                <Button
                  size="lg"
                  className="flex-1 h-touch"
                  onClick={handleNext}
                >
                  Save
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
