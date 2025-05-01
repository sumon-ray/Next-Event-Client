import React, { ReactNode } from 'react';
import { Button } from '../ui/button';

const NextButton = ({name}:{name:ReactNode}) => {
    return (
        <Button className='px-10 py-6 rounded-md nextButton'>
            {name}
        </Button>
    );
};

export default NextButton;