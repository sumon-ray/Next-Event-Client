import ManagePaymentsTable from '@/components/modules/Payment/ManagePaymentsTable';
import Title from '@/components/shared/Title';
import { getAllPayment } from '@/services/PaymentService';
import { Metadata } from 'next';
import React from 'react';


export const metadata: Metadata = {
  title: 'Manage Payments',
};

const ManagePaymentsPage = async ({ searchParams }: any) => {
  const query = await searchParams || {};
  const paymentsData = await getAllPayment(query);

  return (
    <div>
     <Title title="Manage Payments" />
      <ManagePaymentsTable
        payments={paymentsData?.data?.data || []}
        meta={paymentsData?.data?.meta || { page: 1, limit: 10, total: 0 }}
        filters={query}
      />
    </div>
  );
};

export default ManagePaymentsPage;
