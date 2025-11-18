'use client'

import { useState } from 'react'
import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { FormSection } from '@/components/onboarding/form-section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import { useRouter } from 'next/navigation'
import { Loader2, Mail, Check } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const setUser = useOnboardingStore(state => state.setUser)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [linkSent, setLinkSent] = useState(false)

  const handleSendMagicLink = async () => {
    if (!email) return

    setLoading(true)
    // Simulate magic link generation and delivery
    await new Promise(resolve => setTimeout(resolve, 1500))

    // In a real app, this would:
    // 1. Create/find application ID
    // 2. Generate signed token
    // 3. Send email with magic link
    // For demo, we'll just set user and continue
    setUser(email)
    setLoading(false)
    setLinkSent(true)

    // Auto-continue to passphrase verification
    setTimeout(() => {
      router.push('/onboarding/round1/passphrase')
    }, 2000)
  }

  const isValid = email.includes('@') && email.length > 3

  return (
    <OnboardingLayout progress={5} showBack={true}>
      <FormSection
        title="Start or continue your application"
        description="No password needed. We'll send you a secure link to continue."
      >
        {!linkSent ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-touch"
                autoComplete="email"
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground">
                We'll send you a secure link to start or resume your application
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Mobile number (optional)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+44 7700 900000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-touch"
                autoComplete="tel"
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground">
                Get SMS updates about your application
              </p>
            </div>

            <Alert className="bg-info-light border-info/20">
              <Mail className="h-5 w-5 text-info" />
              <AlertDescription className="text-sm text-info-dark">
                <strong>Secure & Simple:</strong> No password to remember. The link expires in 7 days and works on any device.
              </AlertDescription>
            </Alert>

            <Button
              size="lg"
              className="w-full h-touch-lg mt-6"
              onClick={handleSendMagicLink}
              disabled={!isValid || loading}
            >
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {loading ? 'Sending link...' : 'Send me the link'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 text-center py-8">
            <div className="mx-auto h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-success" />
            </div>
            <h3 className="text-h3 font-semibold text-foreground">Check your email</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We've sent a secure link to <strong>{email}</strong>. Click the link to continue your application.
            </p>
            <p className="text-sm text-muted-foreground pt-4">
              Didn't receive it? Check your spam folder or try again.
            </p>
          </div>
        )}
      </FormSection>
    </OnboardingLayout>
  )
}
