import { Clock } from 'lucide-react'

interface TimeEstimateProps {
  minutes: number
}

export function TimeEstimate({ minutes }: TimeEstimateProps) {
  const displayText = minutes < 1
    ? `~${Math.round(minutes * 60)} seconds left`
    : minutes === 1
    ? `~1 minute remaining`
    : `~${minutes} minutes remaining`

  return (
    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pb-2">
      <Clock className="h-4 w-4" />
      <span>{displayText}</span>
    </div>
  )
}
