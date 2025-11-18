'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SupportBubble } from '@/components/onboarding/support-bubble'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import {
  Lock,
  TrendingUp,
  FileText,
  Globe,
  Users,
  CreditCard,
  Package,
  ArrowRight,
  AlertCircle
} from 'lucide-react'

interface ProductCard {
  title: string
  description: string
  icon: any
  locked: boolean
  route?: string
}

const PRODUCT_CARDS: ProductCard[] = [
  {
    title: 'Business lending',
    description: 'Provide a few details to see available credit lines.',
    icon: TrendingUp,
    locked: true,
    route: '/onboarding/round2/lending'
  },
  {
    title: 'Toolkit+',
    description: 'Unlock invoicing, expenses, and accounting integrations.',
    icon: FileText,
    locked: true
  },
  {
    title: 'International transfers',
    description: 'Available after completing setup.',
    icon: Globe,
    locked: true
  },
  {
    title: 'Approvals & permissions',
    description: 'Decide who can approve payments in your business.',
    icon: Users,
    locked: true,
    route: '/onboarding/round2/mandate'
  },
  {
    title: 'Business plans',
    description: 'Pick the plan that fits your needs.',
    icon: Package,
    locked: true,
    route: '/onboarding/round2/subscription'
  },
  {
    title: 'Debit cards',
    description: 'Available once verification is complete.',
    icon: CreditCard,
    locked: true
  }
]

export default function ProvisionalDashboardPage() {
  const router = useRouter()
  const provisionalAccount = useOnboardingStore(state => state.provisionalAccount)
  const business = useOnboardingStore(state => state.business)

  const businessName = business?.name || 'Your Business Ltd'
  const accountBalance = '0.00'

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-4 py-6 md:px-6 md:py-8">
        <div className="w-full max-w-2xl mx-auto">
          <h1 className="text-h1 font-bold text-foreground mb-2">
            Welcome to Metro Bank
          </h1>
          <p className="text-muted-foreground">
            Your provisional account is active
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full max-w-2xl mx-auto px-4 md:px-6 space-y-6 pb-24">
        {/* Account Summary Card */}
        <Card className="border-2">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold text-foreground">
                  {businessName}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Business Current Account
                </p>
              </div>
              <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
                <AlertCircle className="h-3 w-3 mr-1" />
                In progress
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-3xl font-bold text-foreground">
                £{accountBalance}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Current balance
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-xs text-muted-foreground">Sort code</p>
                <p className="text-base font-mono font-semibold text-foreground">
                  {provisionalAccount.sortCode}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Account number</p>
                <p className="text-base font-mono font-semibold text-foreground">
                  {provisionalAccount.accountNumber}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                Some features are locked until setup is completed.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Continue Setup CTA */}
        <Button
          size="lg"
          className="w-full h-touch-lg gap-2"
          onClick={() => router.push('/onboarding/round2/secure-account')}
        >
          Complete your setup
          <ArrowRight className="h-4 w-4" />
        </Button>

        {/* Product Preview Cards */}
        <div className="space-y-3 pt-4">
          <h2 className="text-h3 font-semibold text-foreground px-1">
            Discover features
          </h2>
          <p className="text-sm text-muted-foreground px-1 pb-2">
            Complete setup to unlock all banking features
          </p>

          {PRODUCT_CARDS.map((product, index) => {
            const Icon = product.icon
            return (
              <Card
                key={index}
                className={`border-2 transition-all ${
                  product.locked
                    ? 'opacity-60'
                    : 'cursor-pointer hover:border-primary/40'
                }`}
                onClick={() => {
                  if (product.route) {
                    router.push(product.route)
                  }
                }}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-semibold text-foreground">
                          {product.title}
                        </p>
                        {product.locked && (
                          <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Support Bubble */}
      <SupportBubble />
    </div>
  )
}
