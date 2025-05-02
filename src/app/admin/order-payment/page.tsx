"use client"

import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Transaction {
  id: string
  billNo: string
  customer: {
    name: string
    avatar: string
  }
  dueDate: string
  status: "Paid" | "Due" | "Overdue"
  memo: string
  amount: string
}

const transactions: Transaction[] = [
  {
    id: "1",
    billNo: "#74152",
    customer: {
      name: "Kathryn Murphy",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "6/19/2025",
    status: "Paid",
    memo: "Annual property insurance",
    amount: "$1275.00",
  },
  {
    id: "2",
    billNo: "#13536",
    customer: {
      name: "Jacob Jones",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "5/27/2025",
    status: "Due",
    memo: "Dryway - rehab unit",
    amount: "$12475.00",
  },
  {
    id: "3",
    billNo: "#65045",
    customer: {
      name: "Eleanor Pena",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "11/7/2025",
    status: "Paid",
    memo: "Monthly retainer fee",
    amount: "$1351.00",
  },
  {
    id: "4",
    billNo: "#28861",
    customer: {
      name: "Leslie Alexander",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "10/6/2025",
    status: "Due",
    memo: "Taxes",
    amount: "$1630.00",
  },
  {
    id: "5",
    billNo: "#51148",
    customer: {
      name: "Eleanor Pena",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "9/23/2025",
    status: "Overdue",
    memo: "Reseal driveway",
    amount: "$1219.00",
  },
  {
    id: "6",
    billNo: "#65560",
    customer: {
      name: "Kristin Watson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "9/18/2025",
    status: "Due",
    memo: "Desk for new reception",
    amount: "$1589.00",
  },
  {
    id: "7",
    billNo: "#91577",
    customer: {
      name: "Robert Fox",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    dueDate: "8/21/2025",
    status: "Paid",
    memo: "Eviction fees / consult",
    amount: "$1450.00",
  },
]

interface TransactionsTableProps {
  filterStatus?: "paid" | "unpaid" | "all"
}

export default function TransactionsTable({ filterStatus = "all" }: TransactionsTableProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const filteredTransactions = transactions.filter((transaction) => {
    if (filterStatus === "all") return true
    if (filterStatus === "paid") return transaction.status === "Paid"
    if (filterStatus === "unpaid") return transaction.status === "Due" || transaction.status === "Overdue"
    return true
  })

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredTransactions.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredTransactions.map((t) => t.id))
    }
  }

  const toggleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "text-green-600"
      case "Due":
        return "text-amber-500"
      case "Overdue":
        return "text-red-500"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="w-full overflow-auto">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Select defaultValue="vendors">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Vendors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vendors">Vendors</SelectItem>
              <SelectItem value="tenants">Tenants</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="unit">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unit">Unit</SelectItem>
              <SelectItem value="property">Property</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="status">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="due">Due</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-filter"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedRows.length === filteredTransactions.length && filteredTransactions.length > 0}
                onCheckedChange={toggleSelectAll}
              />
            </TableHead>
            <TableHead>Bill No.</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Memo</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(transaction.id)}
                  onCheckedChange={() => toggleSelectRow(transaction.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{transaction.billNo}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <img src={transaction.customer.avatar || "/placeholder.svg"} alt={transaction.customer.name} />
                  </Avatar>
                  <span>{transaction.customer.name}</span>
                </div>
              </TableCell>
              <TableCell>{transaction.dueDate}</TableCell>
              <TableCell>
                <span className={getStatusColor(transaction.status)}>{transaction.status}</span>
              </TableCell>
              <TableCell>{transaction.memo}</TableCell>
              <TableCell className="text-right">{transaction.amount}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
