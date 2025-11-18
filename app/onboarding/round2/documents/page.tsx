'use client'

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout'
import { FormSection } from '@/components/onboarding/form-section'
import { UploadCard } from '@/components/onboarding/upload-card'
import { QRHandover } from '@/components/onboarding/qr-handover'
import { InlineHint } from '@/components/onboarding/inline-hint'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useOnboardingStore } from '@/lib/stores/onboarding-store'
import { useRouter } from 'next/navigation'
import { Info } from 'lucide-react'

export default function DocumentsPage() {
  const router = useRouter()
  const round2 = useOnboardingStore(state => state.round2)
  const updateRound2Progress = useOnboardingStore(state => state.updateRound2Progress)

  const handleUpload = (docType: 'proofOfAddress' | 'proofOfTrading' | 'additionalDocs') => {
    // Mock upload - just set a fake filename
    const fakeFileName = `${docType}_${Date.now()}.pdf`
    updateRound2Progress({
      [docType]: fakeFileName
    })
  }

  const requiredUploaded = round2.proofOfAddress && round2.proofOfTrading

  const handleContinue = () => {
    updateRound2Progress({ docsDone: true })
    router.push('/onboarding/round2/dashboard')
  }

  return (
    <OnboardingLayout progress={90} showBack={true}>
      <FormSection
        title="Upload your documents"
        description="We need a few documents to verify your business. All uploads are secure and encrypted."
      >
        <div className="space-y-4">
          <UploadCard
            label="Proof of address"
            description="Recent utility bill or bank statement (last 3 months)"
            uploaded={!!round2.proofOfAddress}
            fileName={round2.proofOfAddress}
            onUpload={() => handleUpload('proofOfAddress')}
          />

          <UploadCard
            label="Proof of trading"
            description="Invoice, contract, or recent bank statement showing trading activity"
            uploaded={!!round2.proofOfTrading}
            fileName={round2.proofOfTrading}
            onUpload={() => handleUpload('proofOfTrading')}
          />

          <UploadCard
            label="Additional supporting documents"
            description="Any other documents that support your application"
            uploaded={!!round2.additionalDocs}
            fileName={round2.additionalDocs}
            onUpload={() => handleUpload('additionalDocs')}
            optional={true}
          />

          <InlineHint>
            We're required by law to verify business ownership and trading activity. All documents are encrypted and stored securely in compliance with FCA regulations.
          </InlineHint>

          {/* QR Code handover option */}
          <Alert className="mt-6">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Easier on mobile? Scan a QR code to continue uploading documents from your phone.
            </AlertDescription>
          </Alert>

          <div className="space-y-3 mt-6">
            <QRHandover
              title="Continue on mobile"
              description="Scan to upload documents from your phone's camera"
            />

            <Button
              size="lg"
              className="w-full h-touch-lg"
              onClick={handleContinue}
              disabled={!requiredUploaded}
            >
              {requiredUploaded ? 'Continue' : 'Upload required documents first'}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full h-touch-lg"
              onClick={() => router.push('/dashboard/provisional')}
            >
              Skip for now
            </Button>
          </div>
        </div>
      </FormSection>
    </OnboardingLayout>
  )
}
