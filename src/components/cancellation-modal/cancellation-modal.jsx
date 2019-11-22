import React from 'react';
import { Button, Modal, ModalBody, ModalHeader, Alert } from 'reactstrap';
import useToggle from 'hooks/use-toggle';
import { useBookingProvider } from 'context/booking-provider';
import BaseForm from 'components/base-form';


const CancellationModal = () => {
    const [isOpen, onToggle] = useToggle( false );
    const [user, setUser] = React.useState( null );
    const [isOpenAlert, onToggleAlert] = useToggle( false );
    const { users, removeUser } = useBookingProvider();


    const handleSubmit = React.useCallback( ( { email } ) => {
        const user = users.find( u => u.email === email.toLowerCase() );
        setUser( user );
        onToggleAlert();
    }, [onToggleAlert, users] );

    const handleRemoveUser = () => {
        removeUser( user.email );
        onToggle();
    };

    const alertMessage = user ?
        `Are you sure you want to cancel your reservation  ${user.slot.start} - ${user.slot.end}h ?`
        : `Email doesn't exist`;

    return <div>
        <Button color="danger" className='text-capitalize' size='sm'
                onClick={onToggle}>Cancel reservation</Button>
        <Modal isOpen={isOpen} toggle={onToggle}>
            <ModalHeader toggle={onToggle}>Cancel reservation</ModalHeader>
            <ModalBody>
                <BaseForm onSubmit={handleSubmit} buttonName='Remove' buttonColor='danger'/>
                <Alert className='my-2' color={user && user.email ? 'warning' : 'danger'} isOpen={isOpenAlert}
                       toggle={onToggleAlert}>
                    <h4 className="alert-heading">Warning!</h4>
                    <strong>{alertMessage}</strong>
                    <hr/>
                    <div className='d-flex flex-row-reverse'>
                        {user && user.email &&
                        <Button color='danger' onClick={handleRemoveUser}>Confirm</Button>
                        }
                    </div>
                </Alert>
            </ModalBody>
        </Modal>
    </div>;
};


export default React.memo( CancellationModal );
