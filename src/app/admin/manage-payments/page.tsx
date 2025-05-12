import ManagePaymentsTable from '@/components/modules/Payment/ManagePaymentsTable';
import { getAllPayment } from '@/services/PaymentService';
import { Metadata } from 'next';
import React from 'react';

// interface ManagePaymentsPageProps {
//   searchParams?: Record<string, string | string[] | undefined>;
// }

export const metadata: Metadata = {
  title: 'Manage Payments',
};

const ManagePaymentsPage = async ({ searchParams }: any) => {
  const query = await searchParams || {};
  const paymentsData = await getAllPayment(query);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Payments</h2>
      <ManagePaymentsTable
        payments={paymentsData?.data?.data || []}
        meta={paymentsData?.data?.meta || { page: 1, limit: 10, total: 0 }}
        filters={query}
      />
    </div>
  );
};

export default ManagePaymentsPage;
