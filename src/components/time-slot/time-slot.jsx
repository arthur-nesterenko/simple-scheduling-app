import PropTypes from 'prop-types';
import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { getTimeSlots, getEndTime } from './../../utils/time-helpers';
import useToggle from './../../hooks/use-toggle';
import BookingModal from './../booking-modal';
import Slot from './slot';
import CustomTimeSlot from './custom-time-slot';
import { useBookingProvider } from './../../context/booking-provider';
import useBookedSlots from './../../hooks/use-booked-slots';


const TimeSlot = ( { start, end, onChange } ) => {
    const { getFirstAvailableSlots, isBooked, bookedSlots } = useBookedSlots();
    const memoizedEndInterval = React.useMemo( () => getEndTime( start ), [start] );

    const getAvailableSlots = () => getFirstAvailableSlots( { start, end }, {
        start,
        end: memoizedEndInterval,
    } );

    const [selected, setSelected] = React.useState( getAvailableSlots );
    const [dropdownOpen, onToggleDropdown] = useToggle( false );
    const [modalOpen, onToggleModal] = useToggle( false );
    const { addUser } = useBookingProvider();
    const memoizedSlots = React.useMemo( () => getTimeSlots( start, memoizedEndInterval, 30, 'minutes' ), [memoizedEndInterval, start] );
    const isSelectedSlot = selected && selected.start !== start;
    const hasAvailable = typeof selected !== 'undefined';

    const onConfirmBooking = ( { email } ) => {
        addUser( email, selected );
    };


    const handleChange = ( slot ) => {
        setSelected( slot );
        onChange( slot );
    };

    React.useEffect( () => {
        if ( selected && isBooked( selected ) ) {
            setSelected( () => getAvailableSlots() );
        }
    }, [bookedSlots, selected] );

    return <div className='flex-column align-items-center'>
        <Dropdown size='lg' disabled={!hasAvailable} active={isSelectedSlot} isOpen={dropdownOpen}
                  toggle={onToggleDropdown}>
            <DropdownToggle caret className={isSelectedSlot ? 'alert-primary col-sm-12' : 'col-sm-12'}>
                {!hasAvailable && <span>Not Available slots</span>}
                {hasAvailable &&
                <React.Fragment><span>{selected.start}</span> - <span>{selected.end}</span></React.Fragment>}
            </DropdownToggle>
            <DropdownMenu className='col-sm-12'>
                <DropdownItem header className='text-center'>Available slots</DropdownItem>
                {memoizedSlots.map( ( slot, index ) =>
                    <Slot key={index} currentSlot={slot} activeSlot={selected} onChange={handleChange}/> )}

            </DropdownMenu>
        </Dropdown>
        {hasAvailable &&
        <div className='mt-2 flex-column justify-content-center'>
            <small className='d-inline-block my-2'>Custom time slot</small>
            <CustomTimeSlot {...selected} min={start} max={memoizedEndInterval}
                            onChange={handleChange}/>
        </div>
        }
        <div className='my-3 text-center'>
            {!isBooked( selected ) && hasAvailable &&
            <BookingModal slot={selected} onClick={onToggleModal} isOpen={modalOpen}
                          onConfirmBooking={onConfirmBooking}/>
            }
        </div>

    </div>;
};


export const TimeSlotPropTypes = {
    start: PropTypes.oneOfType( [PropTypes.string, PropTypes.instanceOf( Date )] ),
    end: PropTypes.oneOfType( [PropTypes.string, PropTypes.instanceOf( Date )] ),
    onChange: PropTypes.func,
};

TimeSlot.propTypes = TimeSlotPropTypes;

export default React.memo( TimeSlot );

