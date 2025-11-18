import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChecklistItemProps {
  label: string
  description?: string
  status: 'todo' | 'done'
  onClick?: () => void
}

export function ChecklistItem({ label, description, status, onClick }: ChecklistItemProps) {
  return (
    <Card
      className={cn(
        'transition-all border-2',
        onClick && 'cursor-pointer hover:border-primary/50 active:scale-[0.98]',
        status === 'done' && 'bg-success-light/30 border-success/20'
      )}
      onClick={onClick}
    >
      <CardContent className="p-4 md:p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-3">
              <p className="font-semibold text-foreground text-base">
                {label}
              </p>
              <Badge variant={status === 'done' ? 'default' : 'secondary'} className={cn(
                status === 'done' && 'bg-success text-success-foreground'
              )}>
                {status === 'done' ? 'Done' : 'To do'}
              </Badge>
            </div>
            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {onClick && (
            <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
