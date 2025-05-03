


import { ReactNode } from 'react';

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
      
            {children}
            footer
        </div>
    );
};

export default HomeLayout;