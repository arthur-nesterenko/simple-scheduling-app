import React from 'react';
import { getTimeSlots, getRange } from './../utils/time-helpers';
import { useBookingProvider } from './../context/booking-provider';


const useBookedSlots = () => {
    const { users } = useBookingProvider();
    const slots = users.map( user => user.slot );
    const bookedSlots = slots.map( getRange );

    const isBooked = ( slot ) => {
        const slotSet = new Set( users.map( ( { slot } ) => JSON.stringify( slot ) ) );
        return slotSet.has( JSON.stringify( slot ) );
    };

    const checkIsAvailableSlot = ( slot ) => {
        const slotRange = getRange( slot );
        return bookedSlots.some( s => s.contains( slotRange ) );
    };

    const getFirstAvailableSlots = ( defaultSlot, slot ) => {
        if ( checkIsAvailableSlot( defaultSlot ) ) {
            return defaultSlot;
        }
        const range = getTimeSlots( slot.start, slot.end, 30, 'minutes' );

        return range.find( r => {
            const ran = getRange( r );
            const isIntersect = bookedSlots.some( slot => ran.intersect( slot ) );
            return isIntersect === false;
        } );

    };


    return React.useMemo( () => ({
        bookedSlots,
        checkIsAvailableSlot,
        getFirstAvailableSlots,
        isBooked,
    }), [bookedSlots] );
};

export default useBookedSlots;
