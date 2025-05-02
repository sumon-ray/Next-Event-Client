

import Footer from '@/components/shared/Footer';
import { ReactNode } from 'react';

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            navbar
            {children}
        <Footer />
            
        </div>
    );
};

export default HomeLayout;