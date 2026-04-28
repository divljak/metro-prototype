import type { ComponentType, ReactNode } from "react"
import { AccountTile } from "./account-tile"

export type LabEntry = {
  slug: string
  name: string
  owner: string
  description: string
  addedAt: string
  sourcePath: string
  usedIn: string[]
  preview: ReactNode
  component: ComponentType<any>
}

export const labRegistry: LabEntry[] = [
  {
    slug: "account-tile",
    name: "AccountTile",
    owner: "@design-team",
    description:
      "Compact account summary tile showing name, balance, and last activity. Candidate for the dashboard grid.",
    addedAt: "2026-04-28",
    sourcePath: "components/_lab/account-tile.tsx",
    usedIn: [],
    component: AccountTile,
    preview: (
      <AccountTile
        name="Everyday Current"
        balance="£4,210.55"
        lastActivity="Card payment · 2h ago"
      />
    ),
  },
]
