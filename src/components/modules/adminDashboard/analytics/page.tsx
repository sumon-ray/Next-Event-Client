import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCardIcon, ShoppingBag, Ticket } from "lucide-react"

export default function DashboardAnalysis() {
  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Transfer Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-center w-10 h-10 text-indigo-500 bg-indigo-100 rounded-md">
                <CreditCardIcon className="w-5 h-5" />
              </div>
              <div className="mt-3 text-sm text-gray-500">Transfer via Card Number</div>
              <div className="mt-1 text-2xl font-semibold">$1241</div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-center w-10 h-10 text-indigo-500 bg-indigo-100 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M7 7h.01" />
                  <path d="M17 7h.01" />
                  <path d="M7 17h.01" />
                  <path d="M17 17h.01" />
                </svg>
              </div>
              <div className="mt-3 text-sm text-gray-500">Transfer other bank</div>
              <div className="mt-1 text-2xl font-semibold">$142</div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-center w-10 h-10 text-indigo-500 bg-indigo-100 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                </svg>
              </div>
              <div className="mt-3 text-sm text-gray-500">Transfer same bank</div>
              <div className="mt-1 text-2xl font-semibold">$155</div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="text-sm text-gray-500">Saved This Month</div>
              <div className="mt-1 text-3xl font-semibold">$234.2</div>
              <div className="mt-4">
                <Tabs defaultValue="month">
                  <TabsList className="grid w-full grid-cols-4 bg-slate-100">
                    <TabsTrigger value="day" className="text-xs">
                      Day
                    </TabsTrigger>
                    <TabsTrigger value="week" className="text-xs">
                      Week
                    </TabsTrigger>
                    <TabsTrigger value="month" className="text-xs">
                      Month
                    </TabsTrigger>
                    <TabsTrigger value="year" className="text-xs">
                      Year
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="h-24 mt-4">
                <svg viewBox="0 0 300 100" className="w-full h-full">
                  <path
                    d="M0,50 C20,30 40,60 60,40 C80,20 100,50 120,70 C140,90 160,10 180,50 C200,90 220,30 240,50 C260,70 280,40 300,50"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="2"
                  />
                  <circle cx="180" cy="50" r="4" fill="#4F46E5" />
                </svg>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Jan</span>
                <span>Feb</span>
                <span className="font-medium text-indigo-500">Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">Reach financial goals faster</h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Use your Payment card around the world with no hidden fees. Hold, transfer and spend money.
                  </p>
                  <Button className="mt-4 bg-indigo-500 hover:bg-indigo-600">Learn More</Button>
                </div>
                <div className="mt-4">
                  <div className="relative w-64 p-4 text-white bg-indigo-400 h-36 rounded-xl">
                    <div className="absolute right-4 top-4">
                      <div className="flex gap-1">
                        <div className="w-4 h-4 bg-white rounded-full opacity-70"></div>
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="mt-6 text-sm">Universal Card</div>
                    <div className="mt-4 text-lg tracking-wider">5214 4321 5678 4345</div>
                    <div className="flex justify-between mt-4 text-xs">
                      <span>Nayara Ulla</span>
                      <span>12/24</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chart Section */}
          <div className="grid grid-cols-1 gap-4">
            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="font-medium">Your Transaction</div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 text-indigo-500 bg-indigo-100 rounded-md">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium">Shopping</div>
                        <div className="text-xs text-gray-500">Today, 12:42</div>
                      </div>
                    </div>
                    <div className="text-red-500">-$112</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 text-indigo-500 bg-indigo-100 rounded-md">
                        <Ticket className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium">Movie</div>
                        <div className="text-xs text-gray-500">Today, 11:22</div>
                      </div>
                    </div>
                    <div className="text-red-500">-$35</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="font-medium">Your Transfer</div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Jenny Wilson" />
                        <AvatarFallback>JW</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Jenny Wilson</div>
                        <div className="text-xs text-gray-500">Today, 12:42</div>
                      </div>
                    </div>
                    <div className="text-green-500">+$52</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dianne Russell" />
                        <AvatarFallback>DR</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Dianne Russell</div>
                        <div className="text-xs text-gray-500">Today, 11:22</div>
                      </div>
                    </div>
                    <div className="text-green-500">+$35</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-white bg-blue-900 bg-navy-900">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <div className="text-sm text-indigo-200">Plan for 2021</div>
                  <div className="mt-1 text-xl font-semibold">Completed</div>
                </div>
                <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-navy-800">
                  <div className="text-lg font-bold">100%</div>
                  <div className="absolute inset-0">
                    <Progress
                      value={100}
                      className="w-full h-full rounded-full bg-navy-800"
                      
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
