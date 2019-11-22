import PropTypes from 'prop-types';
import React from 'react';
import { Card, CardTitle, CardSubtitle, Button, CardBody, Collapse } from 'reactstrap';
import useToggle from 'hooks/use-toggle';
import TimeRange from 'components/time-range';
import useBookedSlots from 'hooks/use-booked-slots';
import BookingPanel from 'components/booking-panel';
import CancellationModal from 'components/cancellation-modal';


const Account = ( { accountTitle, slotRange } ) => {
    const [isExpand, onToggleExpand] = useToggle( false );
    const { getFirstAvailableSlots, isBooked, bookedSlots } = useBookedSlots();


    const getAvailableSlots = React.useCallback( () => getFirstAvailableSlots( slotRange ), [getFirstAvailableSlots, slotRange] );

    const [selectedSlot, setSelectedSlot] = React.useState( getAvailableSlots );

    const onChange = React.useCallback( ( data ) => {
        setSelectedSlot( prev => ({ ...prev, ...data }) );
    }, [] );


    React.useEffect( () => {
        if ( selectedSlot && isBooked( selectedSlot ) ) {
            setSelectedSlot( () => getAvailableSlots() );
        }
    }, [bookedSlots, getAvailableSlots, isBooked, selectedSlot] );


    return <Card>
        <CardBody className='d-flex flex-column justify-content-center align-items-center'>
            <CardTitle className='text-center my-2'>
                <strong>{accountTitle}</strong>
            </CardTitle>
            <CardSubtitle className='my-2'>
                <i className='text-muted'>Choose your time (0.5-3h)</i>
            </CardSubtitle>
            <Button onClick={onToggleExpand}
                    color={isExpand ? 'danger' : 'success'}>{isExpand ? 'Close' : 'Show available slots'}</Button>
            <Collapse isOpen={isExpand}>
                <div className="d-flex flex-column py-3">
                    <TimeRange range={slotRange} onChange={onChange} {...selectedSlot}/>
                    {setSelectedSlot && <BookingPanel slot={selectedSlot}/>}
                </div>
            </Collapse>
            <CardBody>
                <CancellationModal/>
            </CardBody>
        </CardBody>
    </Card>;
};


Account.propTypes = {
    accountTitle: PropTypes.string,
    slotRange: PropTypes.shape( {
        start: PropTypes.string,
        end: PropTypes.string,
    } ).isRequired,

};

export default Account;
