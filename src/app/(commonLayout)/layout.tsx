

import { ReactNode } from 'react';

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            navbar
            {children}
            footer
        </div>
    );
};

export default HomeLayout;