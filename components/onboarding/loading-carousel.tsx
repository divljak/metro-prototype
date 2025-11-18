'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingMessage {
  text: string
  duration: number
}

interface LoadingCarouselProps {
  messages: LoadingMessage[]
  onComplete: () => void
}

export function LoadingCarousel({ messages, onComplete }: LoadingCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex >= messages.length) {
      onComplete()
      return
    }

    const timer = setTimeout(() => {
      setCurrentIndex(prev => prev + 1)
    }, messages[currentIndex].duration)

    return () => clearTimeout(timer)
  }, [currentIndex, messages, onComplete])

  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            'flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-300',
            index < currentIndex && 'bg-success/5 border-success/20',
            index === currentIndex && 'bg-primary/5 border-primary/20',
            index > currentIndex && 'bg-muted/30 border-border opacity-40'
          )}
        >
          {index < currentIndex ? (
            <div className="h-6 w-6 rounded-full bg-success flex items-center justify-center flex-shrink-0">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          ) : index === currentIndex ? (
            <Loader2 className="h-6 w-6 text-primary animate-spin flex-shrink-0" />
          ) : (
            <div className="h-6 w-6 rounded-full border-2 border-muted flex-shrink-0" />
          )}
          <p
            className={cn(
              'text-sm font-medium transition-colors',
              index < currentIndex && 'text-success',
              index === currentIndex && 'text-foreground',
              index > currentIndex && 'text-muted-foreground'
            )}
          >
            {message.text}
          </p>
        </div>
      ))}
    </div>
  )
}
