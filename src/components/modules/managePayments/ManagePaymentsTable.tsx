import { IPayment } from '@/app/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';

interface ManagePaymentsTableProps {
  payments: IPayment[];
}

const ManagePaymentsTable = ({ payments }: ManagePaymentsTableProps) => {
  return (
    <div className="p-4 md:p-6 max-w-[1300px] mx-auto">
      <h1 className="text-xl font-medium text-gray-700 mb-4">All Payments</h1>

      <div className="bg-white rounded-lg border overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 text-xs text-gray-500 py-2 px-4 border-b font-medium bg-gray-50">
          <div className="col-span-1">SELECT</div>
          <div className="col-span-3">USER</div>
          <div className="col-span-3">EVENT</div>
          <div className="col-span-2">METHOD</div>
          <div className="col-span-1">৳ AMOUNT</div>
          <div className="col-span-1">STATUS</div>
          <div className="col-span-1">ACTION</div>
        </div>

        {/* Table Rows */}
        {payments?.map((payment) => (
          <div
            key={payment.id}
            className="grid grid-cols-12 py-3 px-4 items-center border-b hover:bg-gray-50"
          >
            <div className="col-span-1">
              <Checkbox />
            </div>

            {/* User Info */}
            <div className="col-span-3 flex items-center gap-3">
              <div className="w-10 h-10 relative">
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

            {/* Event Info */}
            <div className="col-span-3">
              <p className="text-sm font-medium">{payment.event?.title || 'N/A'}</p>
              <p className="text-xs text-gray-500">{payment.event?.dateTime}</p>
            </div>

            <div className="col-span-2 capitalize text-sm">
              {payment.method}
            </div>

            <div className="col-span-1 text-sm text-gray-700">
              ৳ {payment.amount}
            </div>

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

            <div className="col-span-1 flex justify-end">
              <Button size="icon" variant="ghost">
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </Button>
            </div>
          </div>
        ))}

        {!payments?.length && (
          <div className="px-4 py-4 text-sm text-gray-500 text-center">
            No payments found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePaymentsTable;
