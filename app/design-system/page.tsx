"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { FlaskConical } from "lucide-react"

export default function DesignSystemPage() {
  const [progress, setProgress] = useState(65)

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-12 px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
            <h1 className="text-4xl font-bold text-foreground">Metro Banking Design System</h1>
            <Button asChild variant="outline">
              <Link href="/design-system/lab">
                <FlaskConical className="mr-2 h-4 w-4" />
                View Lab
              </Link>
            </Button>
          </div>
          <p className="text-lg text-foreground/80">
            A flat, trustworthy UI with no shadows, clean lines, and bold brand colors.
          </p>
        </div>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Color Palette</h2>
          <p className="text-foreground/80 mb-6">
            Blue-primary color strategy: 75% blue buttons for common actions, 25% red for critical actions only.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <div className="w-full h-24 rounded-md mb-4" style={{ backgroundColor: '#0046AD' }}></div>
                <CardTitle className="text-lg">Metro Blue</CardTitle>
                <CardDescription>#0046AD</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold">PRIMARY (75%)</p>
                <p className="text-xs text-muted-foreground mt-1">Login, Continue, Save, Submit</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-full h-24 rounded-md mb-4" style={{ backgroundColor: '#DE1927' }}></div>
                <CardTitle className="text-lg">Metro Red</CardTitle>
                <CardDescription>#DE1927</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold">ACCENT (25%)</p>
                <p className="text-xs text-muted-foreground mt-1">Payments, Transfers, Apply Now</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-full h-24 rounded-md mb-4" style={{ backgroundColor: '#000D45' }}></div>
                <CardTitle className="text-lg">Metro Navy</CardTitle>
                <CardDescription>#000D45</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Primary text color</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-full h-24 rounded-md mb-4 border" style={{ backgroundColor: '#FEF9F9' }}></div>
                <CardTitle className="text-lg">Off White</CardTitle>
                <CardDescription>#FEF9F9</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Background canvas</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Semantic Colors */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Semantic Colors</h2>
          <p className="text-foreground/80 mb-6">
            Feedback colors for banking operations with light/dark variants for backgrounds and text.
          </p>

          <div className="space-y-6">
            {/* Success Colors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Success Colors</CardTitle>
                <CardDescription>Payment confirmations, successful transfers, positive feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="w-full h-24 rounded-md mb-3 bg-success flex items-center justify-center">
                      <span className="text-success-foreground font-semibold">Default</span>
                    </div>
                    <p className="text-sm font-mono">#16A34A</p>
                    <p className="text-xs text-muted-foreground">Primary success color</p>
                  </div>
                  <div>
                    <div className="w-full h-24 rounded-md mb-3 bg-success-light border flex items-center justify-center">
                      <span className="text-success-dark font-semibold">Light</span>
                    </div>
                    <p className="text-sm font-mono">#DCFCE7</p>
                    <p className="text-xs text-muted-foreground">Success backgrounds</p>
                  </div>
                  <div>
                    <div className="w-full h-24 rounded-md mb-3 bg-background border flex items-center justify-center">
                      <span className="text-success-dark font-semibold">Dark Text</span>
                    </div>
                    <p className="text-sm font-mono">#15803D</p>
                    <p className="text-xs text-muted-foreground">Success text on light</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Alert className="border-success-dark bg-success-light">
                    <AlertTitle className="text-success-dark">Payment Successful</AlertTitle>
                    <AlertDescription className="text-success-dark">
                      £2,500.00 has been transferred to John Smith. Transaction ID: TXN-2024-001
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            {/* Warning Colors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Warning Colors</CardTitle>
                <CardDescription>Low balance alerts, pending actions, cautionary messages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="w-full h-24 rounded-md mb-3 bg-warning flex items-center justify-center">
                      <span className="text-warning-foreground font-semibold">Default</span>
                    </div>
                    <p className="text-sm font-mono">#EA580C</p>
                    <p className="text-xs text-muted-foreground">Primary warning color</p>
                  </div>
                  <div>
                    <div className="w-full h-24 rounded-md mb-3 bg-warning-light border flex items-center justify-center">
                      <span className="text-warning-dark font-semibold">Light</span>
                    </div>
                    <p className="text-sm font-mono">#FEF3C7</p>
                    <p className="text-xs text-muted-foreground">Warning backgrounds</p>
                  </div>
                  <div>
                    <div className="w-full h-24 rounded-md mb-3 bg-background border flex items-center justify-center">
                      <span className="text-warning-dark font-semibold">Dark Text</span>
                    </div>
                    <p className="text-sm font-mono">#92400E</p>
                    <p className="text-xs text-muted-foreground">Warning text on light</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Alert className="border-warning-dark bg-warning-light">
                    <AlertTitle className="text-warning-dark">Low Balance Warning</AlertTitle>
                    <AlertDescription className="text-warning-dark">
                      Your account balance is below £500. Consider transferring funds to avoid overdraft fees.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            {/* Info Colors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Info Colors</CardTitle>
                <CardDescription>Informational messages, tips, general notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="w-full h-24 rounded-md mb-3 bg-info flex items-center justify-center">
                      <span className="text-info-foreground font-semibold">Default</span>
                    </div>
                    <p className="text-sm font-mono">#0046AD</p>
                    <p className="text-xs text-muted-foreground">Primary info color</p>
                  </div>
                  <div>
                    <div className="w-full h-24 rounded-md mb-3 bg-info-light border flex items-center justify-center">
                      <span className="text-info-dark font-semibold">Light</span>
                    </div>
                    <p className="text-sm font-mono">#DBEAFE</p>
                    <p className="text-xs text-muted-foreground">Info backgrounds</p>
                  </div>
                  <div>
                    <div className="w-full h-24 rounded-md mb-3 bg-background border flex items-center justify-center">
                      <span className="text-info-dark font-semibold">Dark Text</span>
                    </div>
                    <p className="text-sm font-mono">#1E3A8A</p>
                    <p className="text-xs text-muted-foreground">Info text on light</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Alert className="border-info-dark bg-info-light">
                    <AlertTitle className="text-info-dark">Account Statement Available</AlertTitle>
                    <AlertDescription className="text-info-dark">
                      Your monthly statement for December 2024 is ready to view in the Documents section.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Buttons</h2>
          <p className="text-foreground/80 mb-6">
            Blue-primary button strategy: Use blue (primary) for 75% of actions, red (accent) for critical actions only (25%).
          </p>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Primary (Blue Pill) - 75% of Buttons</h3>
                  <p className="text-sm text-muted-foreground mb-3">Use for: Login, Continue, Save, Submit, View Details</p>
                  <div className="flex flex-wrap gap-4">
                    <Button size="sm">Login</Button>
                    <Button>Continue</Button>
                    <Button size="lg">Save Changes</Button>
                    <Button disabled>Disabled Button</Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Accent (Red Pill) - 25% of Buttons</h3>
                  <p className="text-sm text-muted-foreground mb-3">Critical actions only: Confirm Payment, Transfer Funds, Apply Now</p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="accent" size="sm">Transfer</Button>
                    <Button variant="accent">Confirm Payment</Button>
                    <Button variant="accent" size="lg">Apply Now</Button>
                    <Button variant="accent" disabled>Disabled</Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Secondary (White with Blue Border)</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="secondary" size="sm">Cancel</Button>
                    <Button variant="secondary">Back</Button>
                    <Button variant="secondary" size="lg">Skip</Button>
                    <Button variant="secondary" disabled>Disabled</Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Other Variants</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="link">Link Button</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Form Elements */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Form Elements</h2>
          <Card>
            <CardContent className="pt-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account-type">Account Type</Label>
                  <Select>
                    <SelectTrigger id="account-type">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal Account</SelectItem>
                      <SelectItem value="business">Business Account</SelectItem>
                      <SelectItem value="savings">Savings Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Account Preferences</Label>
                  <RadioGroup defaultValue="standard">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard">Standard Account</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="premium" id="premium" />
                      <Label htmlFor="premium">Premium Account</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="vip" id="vip" />
                      <Label htmlFor="vip">VIP Account</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>Additional Services</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="overdraft" />
                      <Label htmlFor="overdraft">Overdraft protection</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="alerts" defaultChecked />
                      <Label htmlFor="alerts">SMS alerts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="paperless" defaultChecked />
                      <Label htmlFor="paperless">Paperless statements</Label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">
                    I agree to the <a href="#" className="text-primary hover:underline">terms and conditions</a>
                  </Label>
                </div>

                <div className="flex gap-4">
                  <Button type="submit">Submit Form</Button>
                  <Button type="button" variant="secondary">Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Balance</CardTitle>
                <CardDescription>Your current available balance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-foreground">$12,345.67</div>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="px-0">View transactions</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common banking tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">Transfer Money</Button>
                <Button variant="secondary" className="w-full">Pay Bills</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Last 3 transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Coffee Shop</span>
                    <span>-$4.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Salary Deposit</span>
                    <span className="text-green-600">+$3,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Grocery Store</span>
                    <span>-$87.32</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Alerts */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Alerts</h2>
          <div className="space-y-4">
            <Alert>
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                Your account statement for December is now available.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertTitle>Important Notice</AlertTitle>
              <AlertDescription>
                Your password will expire in 7 days. Please update it to maintain account security.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Badges */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Badges</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Avatars */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Avatars</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-6 items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>MK</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Progress */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Progress</h2>
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Account Setup</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Savings Goal</span>
                  <span>75%</span>
                </div>
                <Progress value={75} />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
                  Increase
                </Button>
                <Button size="sm" variant="secondary" onClick={() => setProgress(Math.max(0, progress - 10))}>
                  Decrease
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Accordion */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Accordion</h2>
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What are the account fees?</AccordionTrigger>
                  <AccordionContent>
                    Our standard checking account has no monthly maintenance fees when you maintain a minimum balance of $1,500 or set up direct deposit.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I set up online banking?</AccordionTrigger>
                  <AccordionContent>
                    You can set up online banking by visiting our website and clicking "Register" in the top right corner. You'll need your account number and personal information to complete the registration.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What are the transfer limits?</AccordionTrigger>
                  <AccordionContent>
                    Daily transfer limits are $5,000 for standard accounts and $25,000 for premium accounts. You can request higher limits by contacting customer service.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Tabs */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Tabs</h2>
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Account Overview</h3>
                    <p>View your account summary and recent activity here.</p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Available Balance</div>
                        <div className="text-2xl font-bold">$12,345.67</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Pending Transactions</div>
                        <div className="text-2xl font-bold">3</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="transactions" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Transaction History</h3>
                    <p>Browse your recent transactions and payment history.</p>
                  </div>
                </TabsContent>
                <TabsContent value="settings" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Account Settings</h3>
                    <p>Manage your preferences and security settings.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Table</h2>
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableCaption>Recent transactions for your account</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2024-01-15</TableCell>
                    <TableCell>Coffee Shop</TableCell>
                    <TableCell><Badge variant="outline">Food</Badge></TableCell>
                    <TableCell className="text-right">-$4.50</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-01-14</TableCell>
                    <TableCell>Salary Deposit</TableCell>
                    <TableCell><Badge variant="outline">Income</Badge></TableCell>
                    <TableCell className="text-right text-green-600">+$3,500.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-01-13</TableCell>
                    <TableCell>Grocery Store</TableCell>
                    <TableCell><Badge variant="outline">Shopping</Badge></TableCell>
                    <TableCell className="text-right">-$87.32</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024-01-12</TableCell>
                    <TableCell>Electric Bill</TableCell>
                    <TableCell><Badge variant="outline">Utilities</Badge></TableCell>
                    <TableCell className="text-right">-$125.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        {/* Dialogs & Modals */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Dialogs & Modals</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Transfer Money</DialogTitle>
                      <DialogDescription>
                        Send money to another account securely.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="recipient">Recipient</Label>
                        <Input id="recipient" placeholder="Account number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" type="number" placeholder="0.00" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="secondary">Cancel</Button>
                      <Button>Transfer</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="secondary">Open Sheet</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Account Details</SheetTitle>
                      <SheetDescription>
                        View and manage your account information
                      </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Account Number</Label>
                        <div className="text-sm">**** **** **** 1234</div>
                      </div>
                      <div className="space-y-2">
                        <Label>Account Type</Label>
                        <div className="text-sm">Premium Checking</div>
                      </div>
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <Badge>Active</Badge>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Dropdown Menu</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Skeleton */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Skeleton Loaders</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <Skeleton className="h-[125px] w-full" />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Typography</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground">Heading 1</h1>
                <p className="text-sm text-muted-foreground">4xl / Bold</p>
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-foreground">Heading 2</h2>
                <p className="text-sm text-muted-foreground">3xl / Semibold</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground">Heading 3</h3>
                <p className="text-sm text-muted-foreground">2xl / Semibold</p>
              </div>
              <div>
                <p className="text-base text-foreground">
                  Body text uses Metro Navy (#000D45) for maximum readability.
                  <a href="#" className="text-primary hover:underline"> Links use Metro Blue (#0046AD)</a> for clear distinction.
                </p>
                <p className="text-sm text-muted-foreground">Base / Regular</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Muted text is used for secondary information and descriptions.
                </p>
                <p className="text-sm text-muted-foreground">Small / Regular</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Mobile-First Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground mb-6">Mobile-First Features</h2>
          <p className="text-foreground/80 mb-6">
            Optimized for mobile devices with responsive typography, touch targets, and breakpoints.
          </p>

          <div className="space-y-6">
            {/* Fluid Typography */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fluid Typography</CardTitle>
                <CardDescription>Responsive font sizes that scale smoothly across all screen sizes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-display">Display Text</h1>
                  <p className="text-xs text-muted-foreground font-mono">text-display (clamp: 2rem → 3rem)</p>
                </div>
                <div className="space-y-2">
                  <h2 className="text-balance">Account Balance</h2>
                  <p className="text-xs text-muted-foreground font-mono">text-balance (clamp: 2rem → 2.5rem)</p>
                </div>
                <div className="space-y-2">
                  <h1 className="text-h1-responsive">Heading 1 Responsive</h1>
                  <p className="text-xs text-muted-foreground font-mono">text-h1-responsive (clamp: 1.75rem → 2.25rem)</p>
                </div>
                <div className="space-y-2">
                  <h2 className="text-h2-responsive">Heading 2 Responsive</h2>
                  <p className="text-xs text-muted-foreground font-mono">text-h2-responsive (clamp: 1.5rem → 1.875rem)</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-h3-responsive">Heading 3 Responsive</h3>
                  <p className="text-xs text-muted-foreground font-mono">text-h3-responsive (clamp: 1.25rem → 1.5rem)</p>
                </div>
              </CardContent>
            </Card>

            {/* Touch Targets */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Touch Targets</CardTitle>
                <CardDescription>Minimum 44px height following Apple/Android accessibility guidelines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <p className="text-sm font-semibold">Standard Touch Target (44px)</p>
                  <div className="flex gap-3 flex-wrap">
                    <Button className="h-touch">Transfer</Button>
                    <Button variant="secondary" className="h-touch">Pay Bill</Button>
                    <Button variant="outline" className="h-touch">View Details</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Using h-touch utility class</p>
                </div>
                <Separator />
                <div className="space-y-3">
                  <p className="text-sm font-semibold">Preferred Touch Target (48px)</p>
                  <div className="flex gap-3 flex-wrap">
                    <Button className="h-touch-lg">Transfer</Button>
                    <Button variant="secondary" className="h-touch-lg">Pay Bill</Button>
                    <Button variant="outline" className="h-touch-lg">View Details</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Using h-touch-lg utility class</p>
                </div>
              </CardContent>
            </Card>

            {/* Responsive Breakpoints */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Responsive Breakpoints</CardTitle>
                <CardDescription>Mobile-first breakpoint system optimized for all devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-mono font-semibold">Breakpoint</div>
                    <div className="font-mono font-semibold">Width</div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-mono">xs</div>
                    <div className="font-mono text-muted-foreground">375px (iPhone SE)</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-mono">sm</div>
                    <div className="font-mono text-muted-foreground">640px (Large phones)</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-mono">md</div>
                    <div className="font-mono text-muted-foreground">768px (Tablets)</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-mono">lg</div>
                    <div className="font-mono text-muted-foreground">1024px (Laptop)</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-mono">xl</div>
                    <div className="font-mono text-muted-foreground">1280px (Desktop)</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-mono">2xl</div>
                    <div className="font-mono text-muted-foreground">1536px (Large desktop)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Design Principles */}
        <section>
          <h2 className="text-3xl font-semibold text-foreground mb-6">Design Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Flat UI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">No shadows anywhere. Clean, modern aesthetic with clear borders and spacing.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bold CTAs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Blue pill buttons (75%) for most actions. Red pill buttons (25%) for critical actions only.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Clear Hierarchy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Navy text for readability. Blue for links and focus. Consistent spacing and typography.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  )
}
