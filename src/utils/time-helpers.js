import Moment from 'moment';
import { extendMoment } from 'moment-range';


const moment = extendMoment( Moment );


export const TIME_FORMAT = 'HH:mm';
export const getEndTime = ( time, interval = 3, duration = 'hours' ) => {
    return new moment( time, TIME_FORMAT ).add( interval, duration ).format( TIME_FORMAT );

};
export const normalizeTime = ( time ) => moment( time, TIME_FORMAT );


export const getTimeSlots = ( start, end, interval = 1, duration = 'hour', finish = '22:00' ) => {
    const initialStart = normalizeTime( start );
    const startTime = normalizeTime( start );
    const endTime = normalizeTime( end );
    const finishTime = normalizeTime( finish );


    if ( endTime.isBefore( startTime ) ) {
        endTime.add( 1, 'day' );
    }

    const timeStops = [];

    while ( startTime <= endTime ) {
        if ( !startTime.isSame( initialStart ) ) {
            startTime.subtract( interval, duration );
        }


        const start = new moment( startTime ).format( TIME_FORMAT );

        const end = startTime.add( interval, duration );

        //exit from the loop
        if ( end.isAfter( finishTime ) ) {
            break;
        }
        timeStops.push( {
            start: start,
            end: end.format( TIME_FORMAT ),
        } );

        startTime.add( interval, duration );

    }
    return timeStops;
};


export const getRange = ( { start, end } ) => {
    const startTime = normalizeTime( start );
    const endTime = normalizeTime( end );


    return moment.range( startTime, endTime );
};


export const getRoundedHour = ( start ) => {
    start = moment( start, TIME_FORMAT );
    const isMoreOrEqualHalf = start.minute() >= 30;

    return +start.minute( isMoreOrEqualHalf ? 60 : 0 ).second( 0 ).format( 'H' );


};




