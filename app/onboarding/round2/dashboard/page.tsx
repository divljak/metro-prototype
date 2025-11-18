'use client'

import { useMemo } from 'react'
import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { FormSection } from '@/components/onboarding/form-section'
import { ChecklistItem } from '@/components/onboarding/checklist-item'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ProgressSteps } from '@/components/onboarding/progress-steps'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import { computeModuleOrder } from '@/lib/utils/module-ordering'
import { useRouter } from 'next/navigation'
import { Info } from 'lucide-react'

export default function Round2DashboardPage() {
  const router = useRouter()
  const business = useOnboardingStore(state => state.business)
  const people = useOnboardingStore(state => state.people)
  const round2 = useOnboardingStore(state => state.round2)

  // Compute dynamic module ordering based on business risk profile
  const orderedModules = useMemo(() => {
    return computeModuleOrder({ business, people, round2 })
  }, [business, people, round2])

  // Map modules to task format with completion status
  const tasks = useMemo(() => {
    const statusMap: Record<string, boolean> = {
      'business-activity': round2.businessActivityDone,
      'mandate': round2.mandateDone,
      'online-banking': round2.onlineBankingDone,
      'documents': round2.docsDone,
      'lending': round2.lendingDone,
      'subscription': false // Not tracked yet
    }

    const descriptionMap: Record<string, string> = {
      'business-activity': 'Help us understand how your business operates',
      'mandate': 'Choose who can approve payments',
      'online-banking': 'Select your plan and set limits',
      'documents': 'Provide proof of address and trading',
      'lending': 'Check your lending eligibility',
      'subscription': 'Choose the right plan for your business'
    }

    return orderedModules.map(module => ({
      label: module.label,
      description: descriptionMap[module.id] || '',
      done: statusMap[module.id] || false,
      path: module.route,
      required: module.required
    }))
  }, [orderedModules, round2])

  // Check if all required tasks are done
  const allDone = tasks.filter(t => t.required).every(t => t.done)

  const completedCount = tasks.filter(t => t.done).length
  const progress = Math.round((completedCount / tasks.length) * 100)

  const progressSteps = tasks.map(task => ({
    label: task.label.split(' ').slice(0, 3).join(' '),
    completed: task.done,
    current: false
  }))

  return (
    <OnboardingLayout progress={progress} showProgress={true}>
      <div className="space-y-6">
        <FormSection
          title="Finish setting up your business banking"
          description="Complete these final steps to unlock all features and remove account limits."
        >
          <ProgressSteps steps={progressSteps} />

          <Alert className="mt-4">
            <Info className="h-5 w-5" />
            <AlertTitle>Your provisional account is active</AlertTitle>
            <AlertDescription className="text-sm">
              You can already receive and send payments with limited amounts. Complete the steps below to unlock full features.
            </AlertDescription>
          </Alert>

          <div className="space-y-3 mt-6">
            {tasks.map((task, index) => (
              <ChecklistItem
                key={index}
                label={task.label + (!task.required ? ' (Optional)' : '')}
                description={task.description}
                status={task.done ? 'done' : 'todo'}
                onClick={() => router.push(task.path)}
              />
            ))}
          </div>

          {allDone && (
            <Button
              size="lg"
              className="w-full h-touch-lg mt-8"
              onClick={() => router.push('/onboarding/round2/complete')}
            >
              Complete setup
            </Button>
          )}
        </FormSection>
      </div>
    </OnboardingLayout>
  )
}
