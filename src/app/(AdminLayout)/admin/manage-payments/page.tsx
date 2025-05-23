'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Title from '@/components/shared/Title';
import { getAllPayment } from '@/services/PaymentService';
import { IPayment } from '@/app/types';
import Loader from '@/components/ui/Loader/Loader';
import { IQuery } from '@/services/EventService';

interface Filters {
  searchTerm: string;
  paymentMethod: string;
  paymentStatus: string;
  minAmount: string;
  maxAmount: string;
}

const ManagePaymentsPage = () => {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  // Filters state
  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    paymentMethod: '',
    paymentStatus: '',
    minAmount: '',
    maxAmount: '',
  });

  const totalPages = Math.ceil(total / limit);

  // Handler for search input (text input)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      searchTerm: e.target.value,
    }));
  };

  // Handler for other filter inputs (selects, number inputs)
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      // Prepare query parameters aligned with backend filter names
      const query: IQuery & Record<string, any> = {
        page,
        limit,
      };

      if (filters.searchTerm.trim()) query.searchTerm = filters.searchTerm.trim();
      if (filters.paymentMethod) query.paymentMethod = filters.paymentMethod;
      if (filters.paymentStatus) query.paymentStatus = filters.paymentStatus;
      if (filters.minAmount) query.minAmount = Number(filters.minAmount);
      if (filters.maxAmount) query.maxAmount = Number(filters.maxAmount);

      const res = await getAllPayment(query);
      setPayments(res?.data?.data || []);
      setTotal(res?.data?.meta?.total || 0);
    } catch (error) {
      console.error('Failed to fetch payments:', error);
      setPayments([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return (
    <div className="px-10 py-6 mb-20">
      <div className="flex items-center justify-between mb-4">
        <Title title="Manage All Payments" />
      </div>

      {/* Search and Filter UI */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by user name or email..."
          value={filters.searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded w-[200px]"
        />

        <select
          name="paymentMethod"
          value={filters.paymentMethod}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Methods</option>
          <option value="COD">COD</option>
          <option value="Online">Online</option>
        </select>

        <select
          name="paymentStatus"
          value={filters.paymentStatus}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Failed">Failed</option>
        </select>

        <input
          type="number"
          name="minAmount"
          placeholder="Min Amount"
          value={filters.minAmount}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded"
          min={0}
        />

        <input
          type="number"
          name="maxAmount"
          placeholder="Max Amount"
          value={filters.maxAmount}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded"
          min={0}
        />
      </div>

      {/* Payment Table or Loader or No Data */}
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loader />
        </div>
      ) : payments.length > 0 ? (
        <div className="w-full overflow-x-auto border-t border-white rounded-lg shadow-md border-1">
          <table className="min-w-[900px] w-full text-left text-base">
            <thead className="text-sm font-medium text-gray-500 uppercase border-b border-white">
              <tr>
                <th className="px-4 py-3 w-[220px] pl-10">User</th>
                <th className="px-4 py-3 w-[220px] pl-10">User Email</th>
                <th className="px-4 py-3 w-[200px] border-2">Event</th>
                <th className="px-4 py-3 w-[150px] border-2">Amount</th>
                <th className="px-4 py-3 w-[150px] border-2">Transaction Id</th>
                <th className="px-4 py-3 w-[150px] border-2">Payment Method</th>
                <th className="px-4 py-3 w-[150px] border-2">Payment Status</th>
                <th className="px-4 py-3 w-[200px] border-2">Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-white">
                  <td className="flex items-center h-full gap-3 px-4 border-2 py-9">
                    <div className="relative w-10 h-10">
                      <Image
                        src={payment.user?.image || '/placeholder.svg'}
                        alt={payment.user?.name || 'User'}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <span className="font-medium text-gray-800">
                      {payment.user?.name || 'Unknown User'}
                    </span>
                  </td>
                  <td className="h-full px-4 py-4 truncate border-2">{payment.user?.email}</td>
                  <td className="h-full px-4 py-4 truncate border-2">{payment.event?.title}</td>
                  <td className="h-full px-4 py-4 truncate border-2">{payment.amount}</td>
                  <td className="h-full px-4 py-4 truncate border-2">{payment.transactionId}</td>
                  <td className="h-full px-4 py-4 truncate border-2">{payment.method}</td>
                  <td className="h-full px-4 py-4 truncate border-2">{payment.status}</td>
                  <td className="h-full px-4 py-4 border-2">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-semibold text-center text-gray-500">
            No Payments Found
          </h1>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-4 py-2 border rounded ${
              page === idx + 1 ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManagePaymentsPage;
