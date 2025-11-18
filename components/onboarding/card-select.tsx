import { Card, CardContent } from '@/components/ui/card'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CardSelectProps {
  label: string
  description?: string
  selected: boolean
  onClick: () => void
  icon?: React.ReactNode
}

export function CardSelect({ label, description, selected, onClick, icon }: CardSelectProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all border-2',
        'hover:border-primary/50 active:scale-[0.98]',
        selected ? 'border-primary bg-primary/5' : 'border-border'
      )}
      onClick={onClick}
    >
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            {icon && (
              <div className="mt-0.5 text-primary">
                {icon}
              </div>
            )}
            <div className="space-y-1">
              <p className="font-semibold text-foreground text-base">
                {label}
              </p>
              {description && (
                <p className="text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          </div>
          <div className={cn(
            'h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors',
            selected ? 'bg-primary border-primary' : 'border-border'
          )}>
            {selected && <Check className="h-4 w-4 text-white" />}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
