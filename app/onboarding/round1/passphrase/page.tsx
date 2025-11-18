'use client'

import { useState, useEffect } from 'react'
import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { FormSection } from '@/components/onboarding/form-section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import { useRouter } from 'next/navigation'
import { Loader2, Shield, AlertCircle } from 'lucide-react'
import { generatePassphrase, validatePassphrase, formatPassphrase } from '@/lib/utils/passphrase'

export default function PassphrasePage() {
  const router = useRouter()
  const user = useOnboardingStore(state => state.user)
  const [passphrase, setPassphrase] = useState<string[]>([])
  const [word1, setWord1] = useState('')
  const [word2, setWord2] = useState('')
  const [word3, setWord3] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Generate passphrase when component mounts
    // In production, this would come from the magic link token
    const generated = generatePassphrase()
    setPassphrase(generated)
  }, [])

  const handleVerify = async () => {
    const entered = [word1, word2, word3]

    if (!validatePassphrase(entered, passphrase)) {
      setError(true)
      return
    }

    setLoading(true)
    setError(false)

    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 800))

    setLoading(false)
    router.push('/onboarding/round1/lookup-business')
  }

  const isValid = word1.length > 0 && word2.length > 0 && word3.length > 0

  // Redirect if no user email set
  useEffect(() => {
    if (!user.email) {
      router.push('/onboarding/round1/login')
    }
  }, [user.email, router])

  return (
    <OnboardingLayout progress={7} showBack={true}>
      <FormSection
        title="Verify your identity"
        description="Enter the 3 words shown below to continue securely."
      >
        <div className="space-y-6">
          {/* Passphrase Display */}
          <div className="p-6 rounded-lg bg-primary/5 border-2 border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Your secure words</p>
                <p className="text-xs text-muted-foreground">Enter these exactly as shown</p>
              </div>
            </div>
            <p className="text-xl font-bold text-primary text-center py-4 tracking-wide">
              {formatPassphrase(passphrase)}
            </p>
          </div>

          {/* Input Fields */}
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="word1">First word</Label>
              <Input
                id="word1"
                type="text"
                placeholder="Enter first word"
                value={word1}
                onChange={(e) => {
                  setWord1(e.target.value)
                  setError(false)
                }}
                className="h-touch"
                autoComplete="off"
                autoCapitalize="off"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="word2">Second word</Label>
              <Input
                id="word2"
                type="text"
                placeholder="Enter second word"
                value={word2}
                onChange={(e) => {
                  setWord2(e.target.value)
                  setError(false)
                }}
                className="h-touch"
                autoComplete="off"
                autoCapitalize="off"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="word3">Third word</Label>
              <Input
                id="word3"
                type="text"
                placeholder="Enter third word"
                value={word3}
                onChange={(e) => {
                  setWord3(e.target.value)
                  setError(false)
                }}
                className="h-touch"
                autoComplete="off"
                autoCapitalize="off"
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <Alert className="bg-destructive/10 border-destructive/20">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <AlertDescription className="text-sm text-destructive">
                The words you entered don't match. Please try again.
              </AlertDescription>
            </Alert>
          )}

          <Alert className="bg-info-light border-info/20">
            <AlertDescription className="text-xs text-info-dark">
              This extra step ensures only you can access your application, even if someone else has your email.
            </AlertDescription>
          </Alert>

          <Button
            size="lg"
            className="w-full h-touch-lg mt-6"
            onClick={handleVerify}
            disabled={!isValid || loading}
          >
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {loading ? 'Verifying...' : 'Continue'}
          </Button>
        </div>
      </FormSection>
    </OnboardingLayout>
  )
}
