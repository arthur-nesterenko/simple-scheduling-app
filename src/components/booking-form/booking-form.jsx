import PropTypes from 'prop-types';
import React from 'react';
import { useBookingProvider } from './../../context/booking-provider';
import BaseForm from 'components/base-form';

const BookingForm = ( props ) => {
    const { hasEmail } = useBookingProvider();


    const isEmailExist = values => values && hasEmail( values.email );


    return <BaseForm {...props} disableButton={isEmailExist}
                     invalidInput={isEmailExist}
                     validInput={v => !isEmailExist( v )}/>;
};


BookingForm.defaultProps = {
    buttonName: 'Confirm',
    buttonColor: 'secondary',
};

BookingForm.propTypes = {
    onSubmit: PropTypes.func,
    buttonName: PropTypes.string,
    buttonColor: PropTypes.string,
};
export default BookingForm;
