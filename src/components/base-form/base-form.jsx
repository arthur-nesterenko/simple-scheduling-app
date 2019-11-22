import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, Input, InputGroup, InputGroupAddon } from 'reactstrap';


const BaseForm = ( { onSubmit, buttonName, buttonColor, disableButton, validInput, invalidInput } ) => {
    const [values, setValues] = React.useState( null );
    const handleSubmit = React.useCallback( ( e ) => {
        e.preventDefault();
        onSubmit( values );
    }, [onSubmit, values] );


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
                   invalid={invalidInput( values )}
                   valid={values ? validInput( values ) : undefined}
                   placeholder="Please enter your email"/>
            <InputGroupAddon addonType="append">
                <Button disabled={disableButton( values )} color={buttonColor}>{buttonName}</Button>
            </InputGroupAddon>
        </InputGroup>
    </Form>;
};


BaseForm.defaultProps = {
    buttonName: 'Confirm',
    buttonColor: 'secondary',
    disableButton: () => undefined,
    validInput: () => undefined,
    invalidInput: () => undefined,
};

BaseForm.propTypes = {
    onSubmit: PropTypes.func,
    buttonName: PropTypes.string,
    buttonColor: PropTypes.string,
    disableButton: PropTypes.func,
    validInput: PropTypes.func,
    invalidInput: PropTypes.func,
};
export default BaseForm;
