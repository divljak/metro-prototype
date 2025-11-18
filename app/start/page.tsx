'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Building2, CheckCircle2, Shield, Zap } from 'lucide-react'

export default function StartPage() {
  const router = useRouter()

  const features = [
    {
      icon: Zap,
      title: 'Open in minutes',
      description: 'Get a provisional account in just 10 minutes'
    },
    {
      icon: Shield,
      title: 'Bank-grade security',
      description: 'Your data is encrypted and protected'
    },
    {
      icon: Building2,
      title: 'Built for business',
      description: 'Features designed specifically for SMEs'
    },
    {
      icon: CheckCircle2,
      title: 'FCA regulated',
      description: 'Fully authorized and regulated by the FCA'
    }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-4 py-6 border-b">
        <div className="max-w-2xl mx-auto">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl space-y-8">
          {/* Main heading */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Welcome to Metro Bank Business Banking
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
              Open a business current account in minutes. No monthly fees, instant provisional account.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="border-2">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground mb-1">{feature.title}</p>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full h-14 text-lg"
              onClick={() => router.push('/onboarding/round1/welcome')}
            >
              Get started
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already started? <button
                className="text-primary font-medium hover:underline"
                onClick={() => router.push('/onboarding/round1/login')}
              >
                Continue your application
              </button>
            </p>
          </div>

          {/* Info footer */}
          <div className="text-center space-y-2 pt-6">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
            <p className="text-xs text-muted-foreground">
              Metro Bank PLC is authorized by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and the Prudential Regulation Authority
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
