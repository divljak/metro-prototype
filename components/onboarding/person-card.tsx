import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import type { Person, PersonStatus } from '@/lib/stores/onboarding-store'
import { cn } from '@/lib/utils'

interface PersonCardProps {
  person: Person
  onClick?: () => void
  showActions?: boolean
}

function getStatusBadgeVariant(status: PersonStatus) {
  switch (status) {
    case 'completed':
      return 'default'
    case 'in_progress':
      return 'secondary'
    case 'invited':
      return 'outline'
    default:
      return 'secondary'
  }
}

function getStatusLabel(status: PersonStatus) {
  switch (status) {
    case 'completed':
      return 'Completed'
    case 'in_progress':
      return 'In progress'
    case 'invited':
      return 'Invited'
    default:
      return 'Not started'
  }
}

function getInitials(name: string): string {
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

export function PersonCard({ person, onClick, showActions = false }: PersonCardProps) {
  return (
    <Card
      className={cn(
        'border-2',
        onClick && 'cursor-pointer hover:border-primary/50 transition-all'
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 flex-shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {getInitials(person.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground text-base truncate">
              {person.name}
            </p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <p className="text-sm text-muted-foreground">
                {person.role}
              </p>
              <Badge variant={getStatusBadgeVariant(person.status)} className={cn(
                'text-xs',
                person.status === 'completed' && 'bg-success text-success-foreground'
              )}>
                {getStatusLabel(person.status)}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
