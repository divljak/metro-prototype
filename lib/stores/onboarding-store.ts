import { create } from 'zustand'

// Mock data for business lookup
export const mockCompanies = [
  {
    id: "co1",
    name: "Acme Digital Ltd",
    address: "12 Baker Street, London, W1U 6TN",
    type: "Private Limited Company",
    directors: ["John Smith", "Aisha Rafiq"],
    pscs: ["John Smith"]
  },
  {
    id: "co2",
    name: "Blueberry Solar Solutions",
    address: "28 King's Road, Manchester, M1 4BT",
    type: "Private Limited Company",
    directors: ["Marta Sanchez"],
    pscs: ["Marta Sanchez"]
  },
  {
    id: "co3",
    name: "Greenfield Consulting Group",
    address: "45 Victoria Street, Birmingham, B1 3HZ",
    type: "Private Limited Company",
    directors: ["David Chen", "Sarah Johnson"],
    pscs: ["David Chen", "Sarah Johnson"]
  }
]

export type PersonRole = "Director" | "PSC" | "KAP"
export type PersonStatus = "not_started" | "invited" | "in_progress" | "completed"
export type KYCStatus = "not_started" | "in_progress" | "completed"

export interface Person {
  id: string
  name: string
  role: PersonRole
  status: PersonStatus
  isAdmin?: boolean
  isApprover?: boolean
  isViewer?: boolean
}

export interface Business {
  id: string
  name: string
  address: string
  type: string
  turnover?: string
  employees?: string
  handlesCash?: boolean
  international?: boolean
}

export interface KYC {
  primaryApplicantStatus: KYCStatus
  idUploaded: boolean
  selfieCompleted: boolean
  addressConfirmed: boolean
}

export interface ProvisionalAccount {
  created: boolean
  sortCode: string
  accountNumber: string
}

export interface Round2Progress {
  businessActivityDone: boolean
  mandateDone: boolean
  onlineBankingDone: boolean
  docsDone: boolean
  lendingDone: boolean
  // Business activity details
  countries: string[]
  paymentMethods: string[]
  cashPercentage: number
  // Mandate details
  mandateType: string
  // Online banking details
  plan: string
  dailyLimit: number
  // Documents
  proofOfAddress: string | null
  proofOfTrading: string | null
  additionalDocs: string | null
  // Lending details
  loanAmount: number
  estimatedRevenue: number
  estimatedProfit: number
  openBankingConnected: boolean
  lendingEligibilityRange: { min: number, max: number } | null
}

export interface User {
  email: string
  authenticated: boolean
}

interface OnboardingState {
  user: User
  business: Business | null
  people: Person[]
  kyc: KYC
  provisionalAccount: ProvisionalAccount
  round2: Round2Progress

  // Actions
  setUser: (email: string) => void
  setBusiness: (business: Business) => void
  updateBusinessProfile: (updates: Partial<Business>) => void
  setPeople: (people: Person[]) => void
  updatePersonStatus: (personId: string, status: PersonStatus) => void
  updatePersonPermissions: (personId: string, permissions: { isAdmin?: boolean, isApprover?: boolean, isViewer?: boolean }) => void
  addPerson: (person: Person) => void
  removePerson: (personId: string) => void
  updateKYCStatus: (status: KYCStatus) => void
  updateKYCStep: (step: 'idUploaded' | 'selfieCompleted' | 'addressConfirmed', value: boolean) => void
  createProvisionalAccount: () => void
  updateRound2Progress: (updates: Partial<Round2Progress>) => void
  resetOnboarding: () => void
}

const initialState = {
  user: {
    email: '',
    authenticated: false
  },
  business: null,
  people: [],
  kyc: {
    primaryApplicantStatus: 'not_started' as KYCStatus,
    idUploaded: false,
    selfieCompleted: false,
    addressConfirmed: false
  },
  provisionalAccount: {
    created: false,
    sortCode: '25-10-93',
    accountNumber: '12345678'
  },
  round2: {
    businessActivityDone: false,
    mandateDone: false,
    onlineBankingDone: false,
    docsDone: false,
    lendingDone: false,
    countries: [],
    paymentMethods: [],
    cashPercentage: 0,
    mandateType: '',
    plan: '',
    dailyLimit: 5000,
    proofOfAddress: null,
    proofOfTrading: null,
    additionalDocs: null,
    loanAmount: 0,
    estimatedRevenue: 0,
    estimatedProfit: 0,
    openBankingConnected: false,
    lendingEligibilityRange: null
  }
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,

  setUser: (email: string) => set({
    user: { email, authenticated: true }
  }),

  setBusiness: (business: Business) => set({ business }),

  updateBusinessProfile: (updates: Partial<Business>) => set((state) => ({
    business: state.business ? { ...state.business, ...updates } : null
  })),

  setPeople: (people: Person[]) => set({ people }),

  updatePersonStatus: (personId: string, status: PersonStatus) => set((state) => ({
    people: state.people.map(p => p.id === personId ? { ...p, status } : p)
  })),

  updatePersonPermissions: (personId: string, permissions) => set((state) => ({
    people: state.people.map(p => p.id === personId ? { ...p, ...permissions } : p)
  })),

  addPerson: (person: Person) => set((state) => ({
    people: [...state.people, person]
  })),

  removePerson: (personId: string) => set((state) => ({
    people: state.people.filter(p => p.id !== personId)
  })),

  updateKYCStatus: (status: KYCStatus) => set((state) => ({
    kyc: { ...state.kyc, primaryApplicantStatus: status }
  })),

  updateKYCStep: (step, value) => set((state) => ({
    kyc: { ...state.kyc, [step]: value }
  })),

  createProvisionalAccount: () => set((state) => ({
    provisionalAccount: { ...state.provisionalAccount, created: true }
  })),

  updateRound2Progress: (updates: Partial<Round2Progress>) => set((state) => ({
    round2: { ...state.round2, ...updates }
  })),

  resetOnboarding: () => set(initialState)
}))
