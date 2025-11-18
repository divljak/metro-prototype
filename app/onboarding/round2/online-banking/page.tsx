'use client'

import { useState } from 'react'
import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { FormSection } from '@/components/onboarding/form-section'
import { CardSelect } from '@/components/onboarding/card-select'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import { useRouter } from 'next/navigation'
import { Zap, TrendingUp, Building2 } from 'lucide-react'

const plans = [
  { value: 'basic', label: 'Basic', description: 'Essential banking features', icon: Zap },
  { value: 'plus', label: 'Plus', description: 'Enhanced features and support', icon: TrendingUp },
  { value: 'commercial', label: 'Commercial', description: 'Full suite for larger businesses', icon: Building2 }
]

const limitPresets = [
  { value: 5000, label: '£5,000/day' },
  { value: 10000, label: '£10,000/day' },
  { value: 25000, label: '£25,000/day' }
]

export default function OnlineBankingPage() {
  const router = useRouter()
  const round2 = useOnboardingStore(state => state.round2)
  const updateRound2Progress = useOnboardingStore(state => state.updateRound2Progress)

  const [step, setStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState(round2.plan || 'basic')
  const [dailyLimit, setDailyLimit] = useState(round2.dailyLimit.toString())

  const handleSave = () => {
    updateRound2Progress({
      plan: selectedPlan,
      dailyLimit: parseInt(dailyLimit),
      onlineBankingDone: true
    })
    router.push('/onboarding/round2/dashboard')
  }

  return (
    <OnboardingLayout progress={75} showBack={true}>
      <div className="space-y-6">
        {step === 1 && (
          <FormSection
            title="Choose your online banking plan"
            description="You can upgrade or downgrade anytime."
          >
            <div className="space-y-3">
              {plans.map((plan) => {
                const Icon = plan.icon
                return (
                  <CardSelect
                    key={plan.value}
                    label={plan.label}
                    description={plan.description}
                    selected={selectedPlan === plan.value}
                    onClick={() => setSelectedPlan(plan.value)}
                    icon={<Icon className="h-5 w-5" />}
                  />
                )
              })}
            </div>

            <div className="space-y-3 mt-8">
              <Button
                size="lg"
                className="w-full h-touch-lg"
                onClick={() => setStep(2)}
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
            title="Set your daily payment limit"
            description="Choose a default limit or set a custom amount."
          >
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {limitPresets.map((preset) => (
                  <Button
                    key={preset.value}
                    variant={parseInt(dailyLimit) === preset.value ? 'default' : 'outline'}
                    onClick={() => setDailyLimit(preset.value.toString())}
                    className="h-16 flex flex-col items-center justify-center"
                  >
                    <span className="text-xs">£{(preset.value / 1000).toFixed(0)}K</span>
                  </Button>
                ))}
              </div>

              <Card className="border-2">
                <CardContent className="p-5 space-y-4">
                  <Label htmlFor="custom-limit">Or enter a custom limit</Label>
                  <Input
                    id="custom-limit"
                    type="number"
                    value={dailyLimit}
                    onChange={(e) => setDailyLimit(e.target.value)}
                    className="h-touch"
                    placeholder="Enter amount"
                  />
                  <p className="text-xs text-muted-foreground">
                    This is the maximum total amount you can send per day
                  </p>
                </CardContent>
              </Card>
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
                  disabled={!dailyLimit || parseInt(dailyLimit) <= 0}
                >
                  Save setup
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
