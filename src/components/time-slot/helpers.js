import { getRange, getRoundedHour, getTimeSlots, normalizeTime } from './../../utils/time-helpers';
import moment from 'moment';


export const getNotAvailableHours = ( slot, bookedSlots ) => {
    const range = getTimeSlots( slot.start, slot.end, 30, 'minutes' );
    const ranges = range.filter( r => {
        const ran = getRange( r );
        return bookedSlots.some( slot => ran.intersect( slot ) );
    } ).map( getRange );
    const data = ranges.reduce( ( acc, curr ) => [...acc, Array.from( curr.by( 'hour' ), getRoundedHour )], [] ).flat();
    return [...new Set( data )];
};

export const getHoursFromRange = ( range, excludeEnd = false ) => Array.from( range.by( 'hour', { excludeEnd } ), m => +m.format( 'HH' ) );
export const parseNumberFromHour = ( time ) => +normalizeTime( time ).format( "H" );

export const disabledMinutes = time => h => {
    const disabledMinutes = [];
    const current = moment( h, 'HH' );
    const res = Math.abs( normalizeTime( time ).diff( current, 'minutes', true ) );
    if ( res <= 60 ) {
        return [30, 0];
    }
    return disabledMinutes;
};
