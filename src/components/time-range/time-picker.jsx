import PropTypes from 'prop-types';
import React from 'react';
import RcTimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { TIME_FORMAT, normalizeTime } from 'utils/time-helpers';
import { getHoursAfterAsNumber } from './helpers';


const baseProps = {
    showSecond: false,
    minuteStep: 30,
    format: TIME_FORMAT,
    allowEmpty: false,
    hideDisabledOptions: false,
};


const TimePicker = ( { name, onChange, title, value, disabledHours, min, max, disabledMinutes, ...props } ) => {

    const handleChange = React.useCallback( ( val ) => {
        const value = val.format( TIME_FORMAT );
        onChange( { [ name ]: value }, name, val );
    }, [name, onChange] );

    const memoizedValue = React.useMemo( () => normalizeTime( value ), [value] );

    const handleDisableHours = React.useCallback( () => {
        const disabled = disabledHours( { value, name } );
        const startTime = parseInt( min );
        const disableBeforeMin = Array.from( { length: startTime }, ( m, i ) => i );
        const disableAfterMax = getHoursAfterAsNumber( max );
        return disabled.concat( disableBeforeMin, disableAfterMax );
    }, [disabledHours, max, min, name, value] );

    const handleDisabledMinutes = React.useCallback( ( h ) => {
        const disabled = disabledMinutes( h, name );

        const maxTime = parseInt( max );
        if ( maxTime === h ) {
            disabled.push( 30 );
        }
        return disabled;
    }, [disabledMinutes, name, max] );

    return <div className='d-flex flex-column'>
        <small>{title}</small>
        <RcTimePicker
            {...baseProps}
            name={name}
            onChange={handleChange}
            value={memoizedValue}
            disabledHours={handleDisableHours}
            disabledMinutes={handleDisabledMinutes}
            {...props}
        />
    </div>;
};

TimePicker.defaultProps = {
    disabledHours: () => [],
    disabledMinutes: () => [],
};

TimePicker.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    disabledHours: PropTypes.func,
    disabledMinutes: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
};


export default React.memo( TimePicker );
