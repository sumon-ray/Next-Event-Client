import ManagePaymentsTable from '@/components/modules/managePayments/ManagePaymentsTable';
import { getAllPayment } from '@/services/PaymentService';
import React from 'react';

const ManagePaymentsPage = async () => {
  const paymentsData = await getAllPayment();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Payments</h2>
      <ManagePaymentsTable payments={paymentsData?.data?.data}/>
    </div>
  );
};

export default ManagePaymentsPage;
