import PropTypes from 'prop-types';
import React from 'react';
import BookingModal from 'components/booking-modal';
import useToggle from 'hooks/use-toggle';
import { useBookingProvider } from 'context/booking-provider';
import { normalizeTime } from 'utils/time-helpers';
import { Alert } from 'reactstrap';

const MAX_SLOT_RANGE = 3;

const validateSlot = ( { start, end } ) => {
    const startTime = normalizeTime( start );
    const endTime = normalizeTime( end );
    const diff = Math.abs( startTime.diff( endTime, 'hours', true ) );
    if ( diff > MAX_SLOT_RANGE ) {
        return `Booking time should be not more than ${MAX_SLOT_RANGE} hours`;
    }
    if ( diff === 0 ) {
        return `Booking time should be at least 30 minutes`;
    }
    if ( startTime.isSameOrAfter( endTime ) ) {
        return `Start time couldn't be the same or bigger than ${end} h`;
    }
    if ( endTime.isSameOrBefore( startTime ) ) {
        return `End time couldn't be the same or less than ${start} h`;
    }

    return undefined;

};

const BookingPanel = ( { slot } ) => {

    const { addUser } = useBookingProvider();
    const [isModalOpen, onToggleModal] = useToggle( false );
    const onConfirmBooking = React.useCallback( ( { email } ) => {
        addUser( email, slot );
    }, [addUser, slot] );


    const errors = React.useMemo( () => validateSlot( slot ), [slot] );

    const hasErrors = typeof errors !== 'undefined';


    return <div className='py-3'>
        <Alert color='danger' className='my-2' isOpen={hasErrors}>
            <h4 className="alert-heading">Warning!</h4>
            <strong>{errors}</strong>
        </Alert>
        {!hasErrors &&
        <BookingModal
            slot={slot}
            onConfirmBooking={onConfirmBooking}
            isOpen={isModalOpen}
            onClick={onToggleModal}
            buttonName={`Book now ${slot.start} - ${slot.end}`}
        />
        }
    </div>;
};

BookingPanel.propTypes = {
    slot: PropTypes.shape( {
        start: PropTypes.string,
        end: PropTypes.string,
    } ).isRequired,
};

export default BookingPanel;
