'use client'

import { ReactNode } from 'react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import { useCheckpointSaver } from '@/hooks/use-checkpoint'
import { SupportBubble } from './support-bubble'

interface OnboardingLayoutProps {
  children: ReactNode
  progress?: number
  showBack?: boolean
  showProgress?: boolean
}

export function OnboardingLayout({
  children,
  progress = 0,
  showBack = false,
  showProgress = true
}: OnboardingLayoutProps) {
  const router = useRouter()
  const user = useOnboardingStore(state => state.user)

  // Auto-save checkpoint as user navigates
  useCheckpointSaver(user.email)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with back button */}
      {showBack && (
        <div className="px-4 py-4 md:px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      )}

      {/* Progress bar */}
      {showProgress && progress > 0 && (
        <div className="px-4 pb-4 md:px-6">
          <Progress value={progress} className="w-full" />
          <p className="text-xs text-muted-foreground mt-2">{progress}% complete</p>
        </div>
      )}

      {/* Main content area - mobile-first, centered container with marketing max-width */}
      <div className="flex-1 flex flex-col">
        <div className="w-full max-w-screen-2xl mx-auto px-6 py-8 md:px-12 md:py-12 lg:px-20">
          {children}
        </div>
      </div>

      {/* Global support bubble */}
      <SupportBubble />
    </div>
  )
}
