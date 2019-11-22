import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col } from 'reactstrap';
import TimePicker from './time-picker';
import useBookedSlots from 'hooks/use-booked-slots';


const TimeRange = ( { start, end, onChange, range } ) => {
    const { notAvailableHours } = useBookedSlots();
    const disabledHours = React.useCallback( () => notAvailableHours, [notAvailableHours] );

    return <Row>
        <Col sm={6}>
            <TimePicker
                name='start'
                title='Start'
                placeholder='Start'
                onChange={onChange}
                disabledHours={disabledHours}
                value={start}
                max={range.end}
                min={range.start}
            />
        </Col>
        <Col sm={6}>
            <TimePicker
                name='end'
                title='End'
                placeholder='End'
                onChange={onChange}
                disabledHours={disabledHours}
                value={end}
                max={range.end}
                min={range.start}

            />
        </Col>
    </Row>;

};

TimeRange.propTypes = {
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    range: PropTypes.shape( {
        start: PropTypes.string,
        end: PropTypes.string,
    } ),
};


export default React.memo( TimeRange );

