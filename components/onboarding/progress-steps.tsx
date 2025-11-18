import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  label: string
  completed: boolean
  current: boolean
}

interface ProgressStepsProps {
  steps: Step[]
}

export function ProgressSteps({ steps }: ProgressStepsProps) {
  return (
    <div className="overflow-x-auto pb-4 -mx-4 px-4">
      <div className="flex items-center gap-2 min-w-max">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-full border-2 transition-all whitespace-nowrap',
              step.completed && 'bg-success/10 border-success',
              step.current && !step.completed && 'border-primary bg-primary/5',
              !step.completed && !step.current && 'border-border'
            )}>
              {step.completed ? (
                <div className="h-5 w-5 rounded-full bg-success flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              ) : (
                <div className={cn(
                  'h-5 w-5 rounded-full border-2',
                  step.current ? 'border-primary bg-primary' : 'border-border'
                )} />
              )}
              <span className={cn(
                'text-sm font-medium',
                step.completed && 'text-success',
                step.current && !step.completed && 'text-primary',
                !step.completed && !step.current && 'text-muted-foreground'
              )}>
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className={cn(
                'h-px w-4 transition-colors',
                step.completed ? 'bg-success' : 'bg-border'
              )} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
