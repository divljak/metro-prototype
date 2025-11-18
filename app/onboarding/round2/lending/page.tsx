'use client'

import { useState, useEffect } from 'react'
import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { FormSection } from '@/components/onboarding/form-section'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import { useRouter } from 'next/navigation'
import { TrendingUp, Check, Info, Building2, CheckCircle2 } from 'lucide-react'

// Helper function to calculate lending eligibility based on turnover
function calculateEligibility(turnover: string): { min: number, max: number } {
  const ranges: Record<string, { min: number, max: number }> = {
    '£0 - £50k': { min: 5000, max: 25000 },
    '£50k - £100k': { min: 10000, max: 50000 },
    '£100k - £250k': { min: 25000, max: 100000 },
    '£250k - £500k': { min: 50000, max: 200000 },
    '£500k+': { min: 100000, max: 500000 }
  }
  return ranges[turnover] || { min: 5000, max: 25000 }
}

// Helper to format currency
function formatCurrency(amount: number): string {
  if (amount >= 1000) {
    return `£${(amount / 1000).toFixed(0)}K`
  }
  return `£${amount.toLocaleString()}`
}

export default function LendingPage() {
  const router = useRouter()
  const business = useOnboardingStore(state => state.business)
  const round2 = useOnboardingStore(state => state.round2)
  const updateRound2Progress = useOnboardingStore(state => state.updateRound2Progress)

  const [step, setStep] = useState(1)
  const [loanAmount, setLoanAmount] = useState(round2.loanAmount || '')
  const [estimatedRevenue, setEstimatedRevenue] = useState(round2.estimatedRevenue || '')
  const [estimatedProfit, setEstimatedProfit] = useState(round2.estimatedProfit || '')
  const [eligibilityRange, setEligibilityRange] = useState<{ min: number, max: number } | null>(null)
  const [obConnected, setObConnected] = useState(round2.openBankingConnected)
  const [obLoading, setObLoading] = useState(false)

  useEffect(() => {
    if (business?.turnover) {
      const range = calculateEligibility(business.turnover)
      setEligibilityRange(range)
    }
  }, [business])

  const handleConnectOB = async () => {
    setObLoading(true)
    // Mock Open Banking connection
    await new Promise(resolve => setTimeout(resolve, 2000))
    setObConnected(true)
    setObLoading(false)
  }

  const handleComplete = () => {
    updateRound2Progress({
      loanAmount: typeof loanAmount === 'string' ? parseInt(loanAmount) : loanAmount,
      estimatedRevenue: typeof estimatedRevenue === 'string' ? parseInt(estimatedRevenue) : estimatedRevenue,
      estimatedProfit: typeof estimatedProfit === 'string' ? parseInt(estimatedProfit) : estimatedProfit,
      openBankingConnected: obConnected,
      lendingEligibilityRange: eligibilityRange,
      lendingDone: true
    })
    router.push('/onboarding/round2/dashboard')
  }

  return (
    <OnboardingLayout progress={60} showBack={true}>
      <div className="space-y-6">
        {/* Step 1: Loan Amount */}
        {step === 1 && (
          <FormSection
            title="How much would you like to borrow?"
            description="Select an amount between £5K and £500K."
          >
            <Card className="border-2">
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label htmlFor="loan-amount">Loan amount</Label>
                  <Input
                    id="loan-amount"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="h-touch mt-2"
                    placeholder="e.g. 50000"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Enter an amount in pounds (£)
                  </p>
                </div>

                {/* Quick selection buttons */}
                <div className="grid grid-cols-3 gap-2">
                  {[10000, 25000, 50000].map((amount) => (
                    <Button
                      key={amount}
                      variant={parseInt(loanAmount as string) === amount ? 'default' : 'outline'}
                      onClick={() => setLoanAmount(amount.toString())}
                      className="h-12"
                    >
                      {formatCurrency(amount)}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3 mt-8">
              <Button
                size="lg"
                className="w-full h-touch-lg"
                onClick={() => setStep(2)}
                disabled={!loanAmount || parseInt(loanAmount as string) <= 0}
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

        {/* Step 2: Estimated Revenue (Optional) */}
        {step === 2 && (
          <FormSection
            title="Estimated annual revenue"
            description="This helps us provide a more accurate offer. Optional."
          >
            <Card className="border-2">
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="revenue">Annual revenue (£)</Label>
                  <Input
                    id="revenue"
                    type="number"
                    value={estimatedRevenue}
                    onChange={(e) => setEstimatedRevenue(e.target.value)}
                    className="h-touch mt-2"
                    placeholder="e.g. 250000"
                  />
                  {business?.turnover && (
                    <p className="text-xs text-muted-foreground mt-2">
                      You indicated turnover of {business.turnover} in Round 1
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

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
                  onClick={() => setStep(3)}
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

        {/* Step 3: Estimated Profit (Optional) */}
        {step === 3 && (
          <FormSection
            title="Estimated annual profit"
            description="Your profit after costs. Optional."
          >
            <Card className="border-2">
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="profit">Annual profit (£)</Label>
                  <Input
                    id="profit"
                    type="number"
                    value={estimatedProfit}
                    onChange={(e) => setEstimatedProfit(e.target.value)}
                    className="h-touch mt-2"
                    placeholder="e.g. 75000"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Estimated profit after all business expenses
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3 mt-8">
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex-1 h-touch"
                  onClick={() => setStep(2)}
                >
                  Back
                </Button>
                <Button
                  size="lg"
                  className="flex-1 h-touch"
                  onClick={() => setStep(4)}
                >
                  See my eligibility
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

        {/* Step 4: Lending Preview */}
        {step === 4 && eligibilityRange && (
          <FormSection
            title="Your lending eligibility"
            description="Based on your business profile, here's what you may qualify for."
          >
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">You may qualify for</p>
                  <p className="text-4xl font-bold text-foreground">
                    {formatCurrency(eligibilityRange.min)} - {formatCurrency(eligibilityRange.max)}
                  </p>
                  <p className="text-sm text-muted-foreground">Based on turnover: {business?.turnover || 'Not specified'}</p>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>What's next?</AlertTitle>
                  <AlertDescription className="text-sm">
                    Connect your business account for a precise offer, or skip this for now and we'll prepare your options.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <div className="space-y-3 mt-8">
              <Button
                size="lg"
                className="w-full h-touch-lg"
                onClick={() => setStep(5)}
              >
                Connect my account for precise offer
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full h-touch-lg"
                onClick={() => setStep(6)}
              >
                Skip to confirmation
              </Button>
            </div>
          </FormSection>
        )}

        {/* Step 5: Open Banking (Optional) */}
        {step === 5 && (
          <FormSection
            title="Connect your business account"
            description="Securely connect your account to get a precise lending offer."
          >
            {!obConnected ? (
              <>
                <Card className="border-2">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-10 w-10 text-primary" />
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">Secure connection</p>
                        <p className="text-sm text-muted-foreground">
                          We use Open Banking to securely read your transaction history
                        </p>
                      </div>
                    </div>

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        <ul className="list-disc list-inside space-y-1">
                          <li>View-only access (we cannot move money)</li>
                          <li>Bank-grade encryption</li>
                          <li>Disconnect anytime</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>

                <div className="space-y-3 mt-8">
                  <Button
                    size="lg"
                    className="w-full h-touch-lg"
                    onClick={handleConnectOB}
                    disabled={obLoading}
                  >
                    {obLoading ? 'Connecting...' : 'Connect now'}
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full h-touch-lg"
                    onClick={() => setStep(6)}
                  >
                    Skip for now
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Card className="border-2 border-success/20 bg-success/5">
                  <CardContent className="p-6 space-y-4 text-center">
                    <div className="flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
                        <CheckCircle2 className="h-8 w-8 text-success" />
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-foreground">Account connected</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        We're analyzing your transaction history to prepare a precise offer.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  size="lg"
                  className="w-full h-touch-lg mt-8"
                  onClick={() => setStep(6)}
                >
                  Continue
                </Button>
              </>
            )}
          </FormSection>
        )}

        {/* Step 6: Confirmation */}
        {step === 6 && (
          <FormSection
            title="Thank you"
            description="We'll prepare your lending offer and be in touch shortly."
          >
            <Card className="border-2">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
                    <Check className="h-8 w-8 text-success" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <Check className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Loan amount</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(parseInt(loanAmount as string))} requested
                      </p>
                    </div>
                  </div>

                  {eligibilityRange && (
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <Check className="h-5 w-5 text-success mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Initial eligibility</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(eligibilityRange.min)} - {formatCurrency(eligibilityRange.max)}
                        </p>
                      </div>
                    </div>
                  )}

                  {obConnected && (
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                      <Check className="h-5 w-5 text-success mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Account connected</p>
                        <p className="text-sm text-muted-foreground">
                          We'll analyze your data for a precise offer
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>What happens next?</AlertTitle>
                  <AlertDescription className="text-sm">
                    Our lending team will review your application and contact you within 2 business days with a detailed offer.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Button
              size="lg"
              className="w-full h-touch-lg mt-8"
              onClick={handleComplete}
            >
              Done
            </Button>
          </FormSection>
        )}
      </div>
    </OnboardingLayout>
  )
}
