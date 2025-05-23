import Loader from '@/components/ui/Loader/Loader';
import React from 'react';

const loading = () => {
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <Loader />
        </div>
    );
};

export default loading;