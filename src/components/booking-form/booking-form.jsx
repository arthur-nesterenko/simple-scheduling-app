import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { useBookingProvider } from './../../context/booking-provider';


const BookingForm = ( { onSubmit } ) => {
    const { hasEmail } = useBookingProvider();
    const [values, setValues] = React.useState( null );
    const handleSubmit = React.useCallback( ( e ) => {
        e.preventDefault();

        onSubmit( values );


    }, [hasEmail, onSubmit, values] );

    const emailExist = values && hasEmail( values.email );

    const onChange = React.useCallback( e => {
        const target = e.target;
        setValues( prev => ({
            ...prev,
            [ target.name ]: target.value,
        }) );
    }, [] );

    return <Form onSubmit={handleSubmit}>
        <InputGroup>
            <Input type='email'
                   name='email'
                   onChange={onChange}
                   invalid={emailExist}
                   valid={values ? !hasEmail( values.email ) : undefined}
                   placeholder="Please enter your email"/>
            <InputGroupAddon addonType="append">
                <Button disabled={emailExist} color="secondary">Confirm</Button>
            </InputGroupAddon>
        </InputGroup>
    </Form>;
};


BookingForm.propTypes = {
    onSubmit: PropTypes.func,
};
export default BookingForm;
