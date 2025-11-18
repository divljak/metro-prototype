'use client'

import { useState } from 'react'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InlineHintProps {
  children: React.ReactNode
}

export function InlineHint({ children }: InlineHintProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm text-primary hover:underline"
      >
        <Info className="h-4 w-4" />
        Why we ask this
      </button>

      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          isExpanded ? 'max-h-48' : 'max-h-0'
        )}
      >
        <div className="p-4 rounded-lg bg-info-light border border-info/20">
          <p className="text-sm text-info-dark">{children}</p>
        </div>
      </div>
    </div>
  )
}
