/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MyPaymentsHistory = ({ payments }: { payments: any }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left border border-gray-300">Event</th>
            <th className="px-4 py-2 text-left border border-gray-300">Payment Method</th>
            <th className="px-4 py-2 text-left border border-gray-300">Amount</th>
            <th className="px-4 py-2 text-left border border-gray-300">Status</th>
            <th className="px-4 py-2 text-left border border-gray-300">Transaction ID</th>
            <th className="px-4 py-2 text-left border border-gray-300">Paid On</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment: any) => (
            <tr key={payment.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300">
                <div className="flex items-center">
                  <Image
                    height={50}
                    width={50}
                    src={payment?.event?.bannerImage}
                    alt={payment.event.title}
                    className="w-12 h-12 object-cover rounded-lg mr-2"
                  />
                  <Link
                    href={`/events/${payment.event.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {payment.event.title}
                  </Link>
                </div>
              </td>
              <td className="px-4 py-2 border border-gray-300">{payment.method}</td>
              <td className="px-4 py-2 border border-gray-300">{payment.amount} BDT</td>
              <td className="px-4 py-2 border border-gray-300">{payment.status}</td>
              <td className="px-4 py-2 border border-gray-300">{payment.transactionId}</td>
              <td className="px-4 py-2 border border-gray-300">
                {new Date(payment.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPaymentsHistory;
