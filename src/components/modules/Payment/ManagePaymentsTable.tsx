'use client';
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from 'next/navigation';
import { IPayment } from '@/app/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

interface ManagePaymentsTableProps {
  payments: IPayment[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  filters: {
    page?: string;
    limit?: string;
    search?: string;
    method?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  };
}

const ManagePaymentsTable = ({ payments, meta, filters }: ManagePaymentsTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchText, setSearchText] = useState(filters.search || '');

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key !== 'page') params.set('page', '1'); 

    router.push(`?${params.toString()}`);
  };

  const handleSearch = () => {
    updateQuery('searchTerm', searchText.trim());
  };

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}className="p-4 md:p-6 max-w-[1300px] mx-auto">
     
      <div className="flex flex-col gap-4 mb-4 md:flex-row">
        <div className="flex w-full gap-2">
          <Input
            placeholder="Search by name, email, method..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>

        <Select
          defaultValue={filters.status || 'all'}
          onValueChange={(val) => updateQuery('status', val)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          defaultValue={filters.method || 'all'}
          onValueChange={(val) => updateQuery('method', val)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            <SelectItem value="Online">Online</SelectItem>
            <SelectItem value="COD">COD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-hidden bg-white border rounded-lg">
        <div className="grid grid-cols-12 px-4 py-2 text-xs font-medium text-gray-500 border-b bg-gray-50">
          <div className="col-span-1">SELECT</div>
          <div className="col-span-3">USER</div>
          <div className="col-span-3">EVENT</div>
          <div className="col-span-2">METHOD</div>
          <div className="col-span-1">৳ AMOUNT</div>
          <div className="col-span-1">STATUS</div>
          <div className="col-span-1">ACTION</div>
        </div>

        {payments?.map((payment) => (
          <div
            key={payment.id}
            className="grid items-center grid-cols-12 px-4 py-3 border-b hover:bg-gray-50"
          >
            <div className="col-span-1">
              <Checkbox />
            </div>
            <div className="flex items-center col-span-3 gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src={payment.user?.profileImage || '/avatar.png'}
                  alt={payment.user?.name || 'User'}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div>
                <p className="text-sm font-medium">{payment.user?.name}</p>
                <p className="text-xs text-gray-500">{payment.user?.email}</p>
              </div>
            </div>
            <div className="col-span-3">
              <p className="text-sm font-medium">{payment.event?.title || 'N/A'}</p>
              <p className="text-xs text-gray-500">{payment.event?.dateTime}</p>
            </div>
            <div className="col-span-2 text-sm capitalize">{payment.method}</div>
            <div className="col-span-1 text-sm text-gray-700">৳ {payment.amount}</div>
            <div className="col-span-1">
              <Badge
                className={`text-xs capitalize transition-colors ${
                  payment.status === 'Paid'
                    ? 'bg-green-100 text-green-700 hover:bg-black hover:text-white'
                    : 'bg-red-100 text-red-700 hover:bg-black hover:text-white'
                }`}
              >
                {payment.status}
              </Badge>
            </div>
            <div className="flex justify-end col-span-1">
              <Button size="icon" variant="ghost">
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </Button>
            </div>
          </div>
        ))}

        {!payments?.length && (
          <div className="px-4 py-4 text-sm text-center text-gray-500">
            No payments found.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <Button
          disabled={meta.page <= 1}
          onClick={() => updateQuery('page', String(meta.page - 1))}
        >
          Previous
        </Button>
        <p className="text-sm text-gray-500">
          Page {meta.page} of {Math.ceil(meta.total / meta.limit)}
        </p>
        <Button
          disabled={meta.page >= Math.ceil(meta.total / meta.limit)}
          onClick={() => updateQuery('page', String(meta.page + 1))}
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
};

export default ManagePaymentsTable;
