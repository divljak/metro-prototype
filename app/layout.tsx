import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PasswordGate } from "@/components/password-gate"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Metro Bank - Business Account Application",
  description: "Apply for a new business account with Metro Bank",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PasswordGate>{children}</PasswordGate>
      </body>
    </html>
  )
}

