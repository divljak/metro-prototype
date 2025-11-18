'use client'

import { useState } from 'react'
import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { FormSection } from '@/components/onboarding/form-section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useRouter } from 'next/navigation'
import { Lock, Fingerprint, Check, AlertCircle } from 'lucide-react'

export default function SecureAccountPage() {
  const router = useRouter()
  const [passcode, setPasscode] = useState('')
  const [confirmPasscode, setConfirmPasscode] = useState('')
  const [enableBiometric, setEnableBiometric] = useState(false)
  const [error, setError] = useState('')

  const handleContinue = () => {
    if (passcode.length !== 6) {
      setError('Passcode must be exactly 6 digits')
      return
    }

    if (passcode !== confirmPasscode) {
      setError('Passcodes do not match')
      return
    }

    // Mock save passcode
    console.log('Passcode saved:', passcode)
    console.log('Biometric enabled:', enableBiometric)

    // Continue to Round 2 dashboard
    router.push('/onboarding/round2/dashboard')
  }

  const handleSkip = () => {
    // Skip to dashboard with security warning
    router.push('/dashboard')
  }

  const isValid = passcode.length === 6 && confirmPasscode.length === 6

  return (
    <OnboardingLayout progress={95} showBack={false}>
      <FormSection
        title="Secure your account"
        description="Create a passcode to protect your business banking. You can use this instead of your password for quick access."
      >
        <div className="space-y-6">
          {/* Passcode input */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="passcode">Create 6-digit passcode</Label>
              <Input
                id="passcode"
                type="password"
                inputMode="numeric"
                maxLength={6}
                placeholder="••••••"
                value={passcode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '')
                  setPasscode(value)
                  setError('')
                }}
                className="h-touch text-center text-2xl tracking-widest"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm passcode</Label>
              <Input
                id="confirm"
                type="password"
                inputMode="numeric"
                maxLength={6}
                placeholder="••••••"
                value={confirmPasscode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '')
                  setConfirmPasscode(value)
                  setError('')
                }}
                className="h-touch text-center text-2xl tracking-widest"
              />
            </div>
          </div>

          {error && (
            <Alert className="bg-destructive/10 border-destructive/20">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <AlertDescription className="text-sm text-destructive">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Biometric option */}
          <Card
            className="border-2 cursor-pointer transition-colors hover:border-primary/40"
            onClick={() => setEnableBiometric(!enableBiometric)}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Fingerprint className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-foreground">
                      Enable Face ID / Touch ID
                    </p>
                    <div
                      className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        enableBiometric
                          ? 'bg-primary border-primary'
                          : 'border-border'
                      }`}
                    >
                      {enableBiometric && (
                        <Check className="h-4 w-4 text-white" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sign in quickly and securely using biometrics
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert className="bg-info-light border-info/20">
            <Lock className="h-5 w-5 text-info" />
            <AlertDescription className="text-sm text-info-dark">
              Your passcode is stored securely on your device and never shared with Metro Bank.
            </AlertDescription>
          </Alert>

          {/* Action buttons */}
          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full h-touch-lg"
              onClick={handleContinue}
              disabled={!isValid}
            >
              Continue
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="w-full"
              onClick={handleSkip}
            >
              Skip for now
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              You can set this up later in your account settings
            </p>
          </div>
        </div>
      </FormSection>
    </OnboardingLayout>
  )
}
