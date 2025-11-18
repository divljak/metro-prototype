'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageCircle, X, Phone, Mail, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SupportBubble() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-white shadow-lg',
          'flex items-center justify-center transition-all duration-200 hover:scale-110',
          'z-50 md:bottom-8 md:right-8',
          isOpen && 'rotate-90'
        )}
        aria-label="Help and support"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Modal card */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Support card */}
          <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm md:bottom-28 md:right-8">
            <Card className="shadow-xl border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Need help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto py-3"
                  onClick={() => {
                    // Mock action
                    alert('Chat support would open here')
                  }}
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-medium text-sm">Chat with us</p>
                    <p className="text-xs text-muted-foreground">Usually responds in minutes</p>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto py-3"
                  onClick={() => {
                    // Mock action
                    alert('Call: 0800 123 4567')
                  }}
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-medium text-sm">Call us</p>
                    <p className="text-xs text-muted-foreground">Mon-Fri, 9am-5pm</p>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto py-3"
                  onClick={() => {
                    // Mock action
                    alert('Email: support@metrobank.com')
                  }}
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-medium text-sm">Email us</p>
                    <p className="text-xs text-muted-foreground">We'll reply within 24 hours</p>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto py-3"
                  onClick={() => {
                    // Mock action
                    alert('FAQs would open here')
                  }}
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-medium text-sm">FAQs</p>
                    <p className="text-xs text-muted-foreground">Common questions answered</p>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  )
}
