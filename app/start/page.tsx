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
      <div className="px-6 py-6 md:px-12 border-b bg-white">
        <div className="max-w-screen-2xl mx-auto">
          <div className="h-14 w-14 rounded-lg bg-primary flex items-center justify-center shadow-card">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
        </div>
      </div>

      {/* Hero Section with Gradient */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 md:py-24 bg-gradient-blue-hero">
        <div className="w-full max-w-screen-2xl space-y-12">
          {/* Main heading */}
          <div className="text-center space-y-6">
            <h1 className="text-display-responsive font-bold text-white leading-tight">
              Welcome to Metro Bank Business Banking
            </h1>
            <p className="text-body-lg md:text-h3 text-white/90 max-w-2xl mx-auto">
              Open a business current account in minutes. No monthly fees, instant provisional account.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="border-2 hover:shadow-card-hover hover:scale-[1.02] cursor-pointer bg-white/95 backdrop-blur">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-h3 mb-2">{feature.title}</p>
                      <p className="text-body text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* CTA */}
          <div className="space-y-4 max-w-md mx-auto">
            <Button
              size="lg"
              className="w-full h-14 text-lg"
              onClick={() => router.push('/onboarding/round1/welcome')}
            >
              Get started
            </Button>
            <p className="text-center text-sm text-white/80">
              Already started? <button
                className="text-white font-semibold hover:underline"
                onClick={() => router.push('/onboarding/round1/login')}
              >
                Continue your application
              </button>
            </p>
          </div>

          {/* Info footer */}
          <div className="text-center space-y-2 pt-8">
            <p className="text-xs text-white/70">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
            <p className="text-xs text-white/70">
              Metro Bank PLC is authorized by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and the Prudential Regulation Authority
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
