import PropTypes from 'prop-types';
import React from 'react';
import { Badge, DropdownItem } from 'reactstrap';
import isEqual from 'lodash.isequal';
import useBookedSlots from '../../hooks/use-booked-slots';

const Slot = ( { onChange, activeSlot, currentSlot } ) => {
    const { checkIsAvailableSlot } = useBookedSlots();
    const handleChange = React.useCallback( () => {
        onChange( currentSlot );
    }, [currentSlot] );


    const disabled = checkIsAvailableSlot( currentSlot );


    return <DropdownItem
        className='d-flex justify-content-between align-items-center'
        active={isEqual( activeSlot, currentSlot )}
        disabled={disabled}
        onClick={handleChange}>
        <Badge color={disabled ? 'secondary' : 'primary'}>{currentSlot.start}</Badge>
        <span>-</span>
        <Badge color={disabled ? 'secondary' : 'primary'}>{currentSlot.end}</Badge>
    </DropdownItem>;
};

const SlotShape = PropTypes.shape( {
    start: PropTypes.string,
    end: PropTypes.string,
} );
Slot.propTypes = {
    activeSlot: SlotShape,
    currentSlot: SlotShape,
    onChange: PropTypes.func,
};

export default Slot;
