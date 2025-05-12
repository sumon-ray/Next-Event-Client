import LoginForm from '@/components/modules/Auth/login/LoginForm';
import Image from 'next/image';
import React, { Suspense } from 'react';
const LoginPage = () => {
    return (
        <div className='relative flex items-center justify-center w-screen h-screen'>
            <Image src='/images/img14.jpg' width={5000} height={5000}
            className='absolute object-cover w-full h-full' alt="login" />
            <Suspense>
            <LoginForm />
            </Suspense>
        </div>
    );
};

export default LoginPage;