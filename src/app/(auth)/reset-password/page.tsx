import ResetPasswordComponent from '@/components/modules/Auth/ResetPassword/ResetPassword';
import React, { Suspense } from 'react';

const ResetPassPage = () => {
  return (
    <div>
      <Suspense>
      <ResetPasswordComponent/>
      </Suspense>
    </div>
  );
};

export default ResetPassPage;