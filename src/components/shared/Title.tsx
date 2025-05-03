import React, { ReactNode } from 'react';

const Title = ({title}:{title:ReactNode}) => {
    return (
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide text-transparent  drop-shadow-sm bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#1E293B] bg-clip-text'>
            {title}
        </h1>
    );
};

export default Title;