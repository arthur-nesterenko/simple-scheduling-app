import { getRange, normalizeTime } from 'utils/time-helpers';
import moment from 'moment';

export const getHoursAfterAsNumber = startTime => Array.from( getRange( {
    start: normalizeTime( startTime ).add( 1, 'hour' ),
    end: moment().endOf( 'day' ),
} ).by( 'hours' ), m => +m.format( 'HH' ) );
