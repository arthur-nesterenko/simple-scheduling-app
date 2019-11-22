import React from 'react';
import { getTimeSlots, getRange } from './../utils/time-helpers';
import { useBookingProvider } from './../context/booking-provider';


const getNotAvailableHours = ( booked, slot ) => {
    const range = getTimeSlots( slot.start, slot.end, 30, 'minutes' );
    const ranges = range.filter( r => {
        const ran = getRange( r );
        return booked.some( slot => ran.intersect( slot ) );
    } ).map( getRange );
    const data = ranges.reduce( ( acc, curr ) => [...acc, Array.from( curr.by( 'hour' ), m => +m.minute( 0 ).second( 0 ).format( 'HH' ) )], [] ).flat();
    return [...new Set( data )];
};

const useBookedSlots = () => {
    const { users, bookTimeRange } = useBookingProvider();
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

    const getFirstAvailableSlots = ( slot ) => {

        const range = getTimeSlots( slot.start, slot.end, 30, 'minutes' );

        return range.find( r => {
            const ran = getRange( r );
            const isIntersect = bookedSlots.some( slot => ran.intersect( slot ) );
            return isIntersect === false;
        } );

    };

    const notAvailableHours = getNotAvailableHours( bookedSlots, bookTimeRange );


    return React.useMemo( () => ({
        bookedSlots,
        checkIsAvailableSlot,
        getFirstAvailableSlots,
        isBooked,
        notAvailableHours,
    }), [bookedSlots, notAvailableHours] );
};

export default useBookedSlots;
