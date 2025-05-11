import img from '../../../../../public/images/img16.jpg';
import React from 'react';
import CreateEvent from '@/components/modules/Events/CreateEvent';
import HeroSecton from '@/components/shared/HeroSecton';

const CreateEventPage = () => {
    return (
        <div>
            <div className="">
                 <HeroSecton img={img} title1="Next Level Create Events" title2="Browse Top Experiences" title3="Be Part of the Celebration" />
            </div>
            <div className="">
                <CreateEvent/>
            </div>
            
        </div>
    );
};

export default CreateEventPage;