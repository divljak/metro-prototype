'use client'

import { useState } from 'react'
import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { FormSection } from '@/components/onboarding/form-section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { useOnboardingStore, mockCompanies } from '@/lib/stores/onboarding-store'
import { useRouter } from 'next/navigation'
import { Search, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LookupBusinessPage() {
  const router = useRouter()
  const setBusiness = useOnboardingStore(state => state.setBusiness)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filteredCompanies = searchTerm.length >= 2
    ? mockCompanies.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const handleContinue = () => {
    const selected = mockCompanies.find(c => c.id === selectedId)
    if (selected) {
      // Create people from directors and PSCs
      const people = [
        ...selected.directors.map((name, idx) => ({
          id: `dir-${idx}`,
          name,
          role: 'Director' as const,
          status: 'not_started' as const
        })),
        ...selected.pscs
          .filter(name => !selected.directors.includes(name))
          .map((name, idx) => ({
            id: `psc-${idx}`,
            name,
            role: 'PSC' as const,
            status: 'not_started' as const
          }))
      ]

      setBusiness(selected)
      useOnboardingStore.getState().setPeople(people)
      router.push('/onboarding/round1/confirm-business')
    }
  }

  return (
    <OnboardingLayout progress={10} showBack={true}>
      <FormSection
        title="Find your business"
        description="Search for your company registered with Companies House."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Company name or number</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="search"
                type="text"
                placeholder="Start typing to search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-touch pl-10"
              />
            </div>
          </div>

          {/* Search results */}
          {searchTerm.length >= 2 && (
            <div className="space-y-3 mt-6">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <Card
                    key={company.id}
                    className={cn(
                      'cursor-pointer transition-all border-2 hover:border-primary/50',
                      selectedId === company.id && 'border-primary bg-primary/5'
                    )}
                    onClick={() => setSelectedId(company.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground">
                            {company.name}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {company.address}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {company.type}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="border-2">
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">
                      No companies found matching "{searchTerm}"
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {searchTerm.length > 0 && searchTerm.length < 2 && (
            <p className="text-sm text-muted-foreground mt-4">
              Type at least 2 characters to search
            </p>
          )}

          <Button
            size="lg"
            className="w-full h-touch-lg mt-8"
            onClick={handleContinue}
            disabled={!selectedId}
          >
            Continue
          </Button>
        </div>
      </FormSection>
    </OnboardingLayout>
  )
}
