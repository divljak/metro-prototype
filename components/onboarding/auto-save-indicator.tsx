'use client'

import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AutoSaveIndicatorProps {
  visible: boolean
  onFadeComplete?: () => void
  position?: 'top' | 'inline'
}

export function AutoSaveIndicator({
  visible,
  onFadeComplete,
  position = 'inline'
}: AutoSaveIndicatorProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (visible) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
        if (onFadeComplete) {
          setTimeout(onFadeComplete, 300) // Wait for fade-out animation
        }
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [visible, onFadeComplete])

  if (!show) return null

  return (
    <div
      className={cn(
        'flex items-center gap-2 text-sm text-success transition-all duration-300',
        show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1',
        position === 'top' && 'justify-center py-2',
        position === 'inline' && 'mt-2'
      )}
    >
      <div className="h-5 w-5 rounded-full bg-success/10 flex items-center justify-center">
        <Check className="h-3 w-3 text-success" />
      </div>
      <span className="font-medium">Saved</span>
    </div>
  )
}
