import PropTypes from 'prop-types';
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import BookingForm from './../booking-form';
import useBookedSlots from './../../hooks/use-booked-slots';


const BookingModal = ( {
                           onClick,
                           isOpen,
                           slot,
                           onConfirmBooking,
                       } ) => {
    const { checkIsAvailableSlot } = useBookedSlots();


    const handleSubmit = React.useCallback( value => {
        onConfirmBooking( value );
        onClick();
    }, [onClick, onConfirmBooking] );
    const disableBookButton = checkIsAvailableSlot( slot );


    return (
        <div>
            <Button color="primary" disabled={disableBookButton} onClick={onClick}>Book</Button>
            <Modal isOpen={isOpen} toggle={onClick}>
                <ModalHeader toggle={onClick}>Slot {slot.start} - {slot.end}</ModalHeader>
                <ModalBody>
                    <BookingForm onSubmit={handleSubmit}/>
                </ModalBody>
            </Modal>
        </div>
    );
};

BookingModal.propTypes = {
    slot: PropTypes.shape( {
        start: PropTypes.string,
        end: PropTypes.string,
    } ),
    onClick: PropTypes.func,
    isOpen: PropTypes.bool,
    onConfirmBooking: PropTypes.func,
};

export default BookingModal;
