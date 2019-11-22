import React from 'react';
import { BookingProviderContext } from './booking-provider';


const useBookingProvider = () => {
    const context = React.useContext( BookingProviderContext );

    if ( context === undefined ) {
        throw new Error( `useBookingProvider must be used within a BookingProvider` );
    }

    return context;
};


export default useBookingProvider;
