import MyPaymentsHistory from '@/components/modules/Payment/MyPaymentsHistory';
import { getMyPaymentsHistory } from '@/services/PaymentService';
import React from 'react';

const MyPaymentsHistoryPage = async () => {
  const payments = await getMyPaymentsHistory();

  if (payments.data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">No Payments History</h1>
      </div>
    );
  }

  return (
    <div>
      <MyPaymentsHistory payments={payments.data} />
    </div>
  );
};

export default MyPaymentsHistoryPage;

export const dynamic = 'force-dynamic'
