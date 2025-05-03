import { getAllPayment } from '@/services/PaymentService';
import React from 'react';

const ManagePaymentsPage = async () => {
  const paymentsData = await getAllPayment();
//   console.log(paymentsData.data.data);
//   const paymentsData = await getAllPayment({
//     page: 1,
//     limit: 10,
//     sortBy: 'createdAt',
//     sortOrder: 'desc',
//     searchTerm: 'john', // optional
//   });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Payments</h2>
      {paymentsData?.data?.data?.length ? (
        <ul>
          {paymentsData?.data?.data?.map((payment: any) => (
            <li key={payment.id}>
              {payment.user?.name} - {payment.amount} ({payment.status})
            </li>
          ))}
        </ul>
      ) : (
        <p>No payments found.</p>
      )}
    </div>
  );
};

export default ManagePaymentsPage;
