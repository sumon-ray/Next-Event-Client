/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Title from "@/components/shared/Title";
import { CreditCard, FileSearch } from "lucide-react";

const MyPaymentsHistory = ({ payments }: { payments: any }) => {
  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }} className="w-full px-4 py-6 mb-20 md:px-0">
      <div className="mb-6">
        <Title title="Payment History" />
      </div>

    {
      payments.length > 0 ?(
          <div className="w-full overflow-x-auto border border-white rounded-lg shadow-md">
        <table className="w-full text-base text-left">
          <thead className="text-sm font-medium text-gray-500 uppercase border-b border-white">
            <tr>
              <th className="px-4 py-3 pl-10">Event</th>
              <th className="px-4 py-3 border-2">Payment Method</th>
              <th className="px-4 py-3 border-2">Amount</th>
              <th className="px-4 py-3 border-2">Status</th>
              <th className="px-4 py-3 border-2">Transaction ID</th>
              <th className="px-4 py-3 border-2">Paid On</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment: any) => (
              <tr key={payment.id} className="border-white hover:bg-gray-50">
                <td className="flex items-center gap-3 px-4 py-3 border-2">
                  <div className="relative w-10 h-10">
                    <Image
                      src={payment?.event?.bannerImage || "/placeholder.svg"}
                      alt={payment.event.title}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <Link 
                    href={`/events/${payment.event.slug}`}
                    className="font-medium text-gray-800 hover:text-[#1E3A8A]"
                  >
                    {payment.event.title}
                  </Link>
                </td>
                <td className="px-4 py-3 border-2">{payment.method}</td>
                <td className="px-4 py-3 border-2">{payment.amount} BDT</td>
                <td className="px-4 py-3 border-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    payment.status === 'COMPLETED' 
                      ? 'bg-green-100 text-green-800' 
                      : payment.status === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-sm border-2">
                  {payment.transactionId}
                </td>
                <td className="px-4 py-3 text-gray-600 border-2">
                  {new Date(payment.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) :(
        <div className="flex flex-col items-center justify-center py-12 bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD] rounded-xl shadow-inner">
      <div className="relative w-48 h-48 mb-6">
   
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] opacity-10"></div>
        
  
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-6 bg-white rounded-full shadow-lg">
            <CreditCard className="w-12 h-12 text-[#1E3A8A]" strokeWidth={1.5} />
          </div>
        </div>
        
        {/* Magnifying glass overlay */}
        <div className="absolute -right-2 -bottom-2">
          <FileSearch className="w-16 h-16 text-[#1E3A8A]" strokeWidth={1.5} />
        </div>
      </div>
      
      <h3 className="text-3xl font-semibold text-[#1E3A8A] mb-2">No Payment History Found</h3>
      <p className="text-[#424242]  text-center max-w-md px-4">
        You haven't made any payments yet. Your transaction history will appear here once you complete a booking.
      </p>
    </div>
      )
    }
    </motion.div>
  );
};

export default MyPaymentsHistory;