'use client'

import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Smartphone, Laptop, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QRHandoverProps {
  sessionId?: string
  title?: string
  description?: string
  onClose?: () => void
}

export function QRHandover({
  sessionId,
  title = "Continue on mobile",
  description = "Scan this code with your phone to continue",
  onClose
}: QRHandoverProps) {
  const [showQR, setShowQR] = useState(false)

  // Generate session URL with mock session ID
  const mockSessionId = sessionId || `session-${Date.now()}`
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
  const resumeUrl = `${baseUrl}/onboarding/resume?session=${mockSessionId}`

  const handleClose = () => {
    setShowQR(false)
    if (onClose) onClose()
  }

  return (
    <>
      {/* Toggle button - shown when QR not displayed */}
      {!showQR && (
        <Button
          variant="outline"
          size="lg"
          className="w-full h-touch-lg gap-2"
          onClick={() => setShowQR(true)}
        >
          <Smartphone className="h-5 w-5" />
          Continue on mobile
        </Button>
      )}

      {/* QR Code Modal */}
      {showQR && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={handleClose}
          />

          {/* Modal Card */}
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-sm mx-auto">
            <Card className="border-2">
              <CardHeader className="relative">
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 rounded-full p-2 hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <CardTitle className="text-h3">{title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {description}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* QR Code */}
                <div className="flex items-center justify-center p-6 bg-white rounded-lg border-2">
                  <QRCodeSVG
                    value={resumeUrl}
                    size={200}
                    level="M"
                    includeMargin={true}
                  />
                </div>

                {/* Instructions */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">1</span>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm text-foreground">
                        Open your phone's camera app
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">2</span>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm text-foreground">
                        Point it at the QR code
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">3</span>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm text-foreground">
                        Tap the notification to continue
                      </p>
                    </div>
                  </div>
                </div>

                {/* Alternative option */}
                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground text-center mb-3">
                    Or continue on this device
                  </p>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full h-touch gap-2"
                    onClick={handleClose}
                  >
                    <Laptop className="h-4 w-4" />
                    Continue here
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  )
}

// Standalone QR display component (for embedding directly in pages)
export function QRDisplay({ url, size = 180 }: { url: string, size?: number }) {
  return (
    <div className="flex items-center justify-center p-4 bg-white rounded-lg border-2">
      <QRCodeSVG
        value={url}
        size={size}
        level="M"
        includeMargin={true}
      />
    </div>
  )
}
