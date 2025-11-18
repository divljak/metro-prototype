import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const CHECKPOINT_KEY = 'metrobank_onboarding_checkpoint'

interface Checkpoint {
  route: string
  timestamp: number
  email?: string
}

/**
 * Save the current onboarding checkpoint to localStorage
 */
export function saveCheckpoint(route: string, email?: string) {
  if (typeof window === 'undefined') return

  const checkpoint: Checkpoint = {
    route,
    timestamp: Date.now(),
    email
  }

  try {
    localStorage.setItem(CHECKPOINT_KEY, JSON.stringify(checkpoint))
  } catch (error) {
    console.warn('Failed to save checkpoint:', error)
  }
}

/**
 * Load the saved onboarding checkpoint from localStorage
 */
export function loadCheckpoint(): Checkpoint | null {
  if (typeof window === 'undefined') return null

  try {
    const saved = localStorage.getItem(CHECKPOINT_KEY)
    if (!saved) return null

    const checkpoint: Checkpoint = JSON.parse(saved)

    // Check if checkpoint is less than 7 days old
    const sevenDays = 7 * 24 * 60 * 60 * 1000
    if (Date.now() - checkpoint.timestamp > sevenDays) {
      clearCheckpoint()
      return null
    }

    return checkpoint
  } catch (error) {
    console.warn('Failed to load checkpoint:', error)
    return null
  }
}

/**
 * Clear the saved checkpoint
 */
export function clearCheckpoint() {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(CHECKPOINT_KEY)
  } catch (error) {
    console.warn('Failed to clear checkpoint:', error)
  }
}

/**
 * Hook to automatically save checkpoints as the user navigates
 */
export function useCheckpointSaver(email?: string) {
  const pathname = usePathname()

  useEffect(() => {
    // Only save checkpoints for onboarding routes
    if (pathname?.startsWith('/onboarding/')) {
      saveCheckpoint(pathname, email)
    }
  }, [pathname, email])
}
