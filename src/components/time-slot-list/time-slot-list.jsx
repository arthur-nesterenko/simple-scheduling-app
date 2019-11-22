import PropTypes from 'prop-types';
import React from 'react';
import TimeSlot from './../time-slot';


const TimeSlotList = ( { items, onChange, activeSlot } ) => {


    return <div className='row'>
        {items.map( ( item, index ) => <div key={index} className="col-sm-12 col-md-4 my-1">
            <TimeSlot key={index} {...item} onChange={onChange} activeSlot={activeSlot}/>
        </div> )}
    </div>;
};

TimeSlotList.propTypes = {
    onChange: PropTypes.func,
    activeSlot: PropTypes.shape( {
        start: PropTypes.string,
        end: PropTypes.string,
    } ),
};


export default React.memo( TimeSlotList );
