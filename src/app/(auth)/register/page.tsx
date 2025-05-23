import RegisterForm from '@/components/modules/Auth/register/RegisterForm';
import React from 'react';
const RegisterPage = () => {
    return (
        <div className='relative flex items-center justify-center w-screen h-screen '>
            {/* <Image src={img} width={5000} height={5000}
            className='absolute object-cover w-full h-full' alt="login" /> */}
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;