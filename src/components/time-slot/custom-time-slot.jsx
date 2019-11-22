import React from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { getRange, normalizeTime, TIME_FORMAT } from './../../utils/time-helpers';
import useBookedSlots from '../../hooks/use-booked-slots';
import { getNotAvailableHours, parseNumberFromHour, getHoursFromRange, disabledMinutes } from './helpers';

const baseProps = {
    showSecond: false,
    minuteStep: 30,
    format: TIME_FORMAT,
    allowEmpty: false,
    hideDisabledOptions: true,
};


const CustomTimeSlot = ( { start, end, min, max, onChange } ) => {
    const { bookedSlots } = useBookedSlots();

    const handleChange = ( name ) => ( val ) => {
        onChange( {
            start,
            end,
            [ name ]: val.format( TIME_FORMAT ),
        } );
    };

    const disabledHours = ( name ) => () => {
        const disabledHours = getNotAvailableHours( { start: min, end: max }, bookedSlots );
        const hoursBeforeStart = getHoursFromRange( getRange( {
            start: moment().startOf( 'day' ),
            end: min,
        } ), true );
        const hoursAfterEnd = getHoursFromRange( getRange( {
            start: max,
            end: moment().endOf( 'day' ),
        } ) ).slice( 1 );
        disabledHours.push( parseNumberFromHour( name === 'start' ? end : start ) );
        return disabledHours.concat( hoursBeforeStart, hoursAfterEnd );
    };

    return <div className='row'>
        <div className='col-sm-6'>
            <TimePicker onChange={handleChange( 'start' )}
                        defaultValue={normalizeTime( start )}
                        {...baseProps}
                        value={normalizeTime( start )}
                        disabledHours={disabledHours( 'start' )}
                        disabledMinutes={disabledMinutes( end )}/>
        </div>
        <div className='col-sm-6'>
            <TimePicker onChange={handleChange( 'end' )}
                        value={normalizeTime( end )}
                        defaultValue={normalizeTime( end )}
                        {...baseProps}
                        disabledHours={disabledHours( 'end' )}
                        disabledMinutes={disabledMinutes( end )}/>
        </div>
    </div>;

};


export default React.memo( CustomTimeSlot );

