"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"

export type AccountTileProps = {
  name: string
  balance: string
  lastActivity: string
}

export function AccountTile({ name, balance, lastActivity }: AccountTileProps) {
  return (
    <Card className="w-full">
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <div className="text-sm text-foreground/70">{name}</div>
          <div className="text-2xl font-semibold text-foreground">{balance}</div>
          <div className="mt-1 text-xs text-foreground/60">{lastActivity}</div>
        </div>
        <div className="rounded-pill bg-primary/10 p-2 text-primary">
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  )
}
