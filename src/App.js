import React from 'react';
import BookingProvider from './context/booking-provider';
import Account from 'components/account';
import { Container, Row, Col } from 'reactstrap';

const defaultRange = {
    start: '07:00',
    end: '22:00',
};

function App() {

    return (
        <Container className='mt-5'>
            <Row>
                <Col sm={12} md={6}>
                    <BookingProvider bookTimeRange={defaultRange} accountName='room_1'>
                        <Account accountTitle='Laundry room 1' slotRange={defaultRange}/>
                    </BookingProvider>
                </Col>
                <Col sm={12} md={6}>
                    <BookingProvider accountName='room_2' bookTimeRange={defaultRange}>
                        <Account accountTitle='Laundry room 2' slotRange={defaultRange}/>
                    </BookingProvider>
                </Col>
            </Row>
        </Container>
    );

}

export default App;
