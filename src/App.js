import React from 'react';
import { getTimeSlots } from './utils/time-helpers';
import BookingProvider from './context/booking-provider';
import TimeSlotList from './components/time-slot-list';

function App() {

    const [selected, setSelected] = React.useState( null );
    const slots = React.useMemo( () => getTimeSlots( '07:00', '22:00', 3 ), [] );

    return (
        <BookingProvider>
            <div className="container mt-5">
                <h1>Time Slots</h1>
                <TimeSlotList onChange={setSelected} activeSlot={selected} items={slots}/>
            </div>
        </BookingProvider>
    );

}

export default App;
