import React from 'react';

const EventDetailsPage = async ({params}: {params:Promise<{slug: string}>}) => {
    console.log(await (params));

    return (
        <div>
            hi
        </div>
    );
};

export default EventDetailsPage;