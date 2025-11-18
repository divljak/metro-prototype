import { Business, Person, Round2Progress } from '../stores/onboarding-store'

export interface Module {
  id: string
  label: string
  route: string
  priority: number
  required: boolean
}

export interface ModuleOrderingState {
  business: Business | null
  people: Person[]
  round2: Round2Progress
}

/**
 * Determines the risk profile of a business based on its characteristics
 */
function assessBusinessRisk(state: ModuleOrderingState): 'low' | 'medium' | 'high' {
  const { business, people } = state

  if (!business) return 'medium'

  let riskScore = 0

  // Turnover assessment
  if (business.turnover === '£500k+' || business.turnover === '£250k - £500k') {
    riskScore += 2
  }

  // Employee count assessment
  if (business.employees === '11-50' || business.employees === '50+') {
    riskScore += 2
  }

  // Cash handling increases risk
  if (business.handlesCash) {
    riskScore += 2
  }

  // International transactions increase risk
  if (business.international) {
    riskScore += 2
  }

  // Multiple directors/PSCs increase complexity
  if (people.length > 2) {
    riskScore += 1
  }

  // Risk thresholds
  if (riskScore <= 2) return 'low'
  if (riskScore <= 5) return 'medium'
  return 'high'
}

/**
 * Computes the optimal module ordering based on business risk profile
 */
export function computeModuleOrder(state: ModuleOrderingState): Module[] {
  const risk = assessBusinessRisk(state)

  const modules: Module[] = []

  // Low-risk SME path
  if (risk === 'low') {
    // Prioritize mandate and online banking
    modules.push({
      id: 'mandate',
      label: 'Mandate & Approvals',
      route: '/onboarding/round2/mandate',
      priority: 1,
      required: true
    })
    modules.push({
      id: 'online-banking',
      label: 'Online banking setup',
      route: '/onboarding/round2/online-banking',
      priority: 2,
      required: true
    })
    // Documents optional
    modules.push({
      id: 'documents',
      label: 'Upload documents',
      route: '/onboarding/round2/documents',
      priority: 3,
      required: false
    })
    // Business activity hidden for low-risk
    // (not included in modules array)
  }

  // Medium-risk path
  else if (risk === 'medium') {
    modules.push({
      id: 'business-activity',
      label: 'Business activity',
      route: '/onboarding/round2/business-activity',
      priority: 1,
      required: true
    })
    modules.push({
      id: 'mandate',
      label: 'Mandate & Approvals',
      route: '/onboarding/round2/mandate',
      priority: 2,
      required: true
    })
    modules.push({
      id: 'online-banking',
      label: 'Online banking setup',
      route: '/onboarding/round2/online-banking',
      priority: 3,
      required: true
    })
    modules.push({
      id: 'documents',
      label: 'Upload documents',
      route: '/onboarding/round2/documents',
      priority: 4,
      required: true
    })
  }

  // High-risk/complexity path
  else {
    modules.push({
      id: 'business-activity',
      label: 'Business activity',
      route: '/onboarding/round2/business-activity',
      priority: 1,
      required: true
    })
    modules.push({
      id: 'mandate',
      label: 'Mandate & Approvals',
      route: '/onboarding/round2/mandate',
      priority: 2,
      required: true
    })
    modules.push({
      id: 'documents',
      label: 'Upload documents',
      route: '/onboarding/round2/documents',
      priority: 3,
      required: true
    })
    modules.push({
      id: 'online-banking',
      label: 'Online banking setup',
      route: '/onboarding/round2/online-banking',
      priority: 4,
      required: true
    })
  }

  // Optional modules appear last (if business qualifies)
  // Subscription - always optional
  modules.push({
    id: 'subscription',
    label: 'Business plans',
    route: '/onboarding/round2/subscription',
    priority: 90,
    required: false
  })

  // Lending - optional, only if turnover data exists
  if (state.business?.turnover) {
    modules.push({
      id: 'lending',
      label: 'Business lending',
      route: '/onboarding/round2/lending',
      priority: 91,
      required: false
    })
  }

  return modules.sort((a, b) => a.priority - b.priority)
}

/**
 * Helper to determine if a module should be shown based on completion state
 */
export function shouldShowModule(
  module: Module,
  round2: Round2Progress
): boolean {
  // Always show required modules
  if (module.required) return true

  // For optional modules, show if not completed
  const statusMap: Record<string, boolean> = {
    'business-activity': round2.businessActivityDone,
    'mandate': round2.mandateDone,
    'online-banking': round2.onlineBankingDone,
    'documents': round2.docsDone
  }

  const isDone = statusMap[module.id] || false
  return !isDone
}
