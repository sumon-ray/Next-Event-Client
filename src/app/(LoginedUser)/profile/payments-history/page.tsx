import MyPaymentsHistory from '@/components/modules/Payment/MyPaymentsHistory';
import { getMyPaymentsHistory } from '@/services/PaymentService';
import React from 'react';

const MyPaymentsHistoryPage = async () => {
  const payments = await getMyPaymentsHistory();



  return (
    <div>
      <MyPaymentsHistory payments={payments.data} />
     
    </div>
  );
};

export default MyPaymentsHistoryPage;

export const dynamic = 'force-dynamic'
