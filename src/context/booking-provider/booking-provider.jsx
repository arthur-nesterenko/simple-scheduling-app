import PropTypes from 'prop-types';
import React from 'react';
import useSessionStorage from 'hooks/use-session-storage';

/**
 *
 * @type {React.Context<{}>}
 */
export const BookingProviderContext = React.createContext( {} );

/**
 *
 * @param children
 * @param accountName
 * @param bookTimeRange
 * @returns {*}
 * @constructor
 */
const BookingProvider = ( { children, accountName, bookTimeRange } ) => {

    const [initialUsers, updateSessionStorage] = useSessionStorage( accountName, [], false );
    const [users, setUsers] = React.useState( () => initialUsers );

    const addUser = React.useCallback( ( email, slot ) => {
        setUsers( prev => [...prev, { email: email.toLowerCase(), slot }] );
    }, [] );


    const hasEmail = React.useCallback( ( email ) => {
        const usersSet = new Set( users.map( user => user.email ) );
        return usersSet.has( email );
    }, [users] );

    const removeUser = React.useCallback( ( email ) => {
        if ( hasEmail( email ) ) {
            setUsers( prev => prev.filter( u => u.email !== email ) );
        }
    }, [hasEmail] );

    React.useEffect( () => {
        updateSessionStorage( users );
    }, [updateSessionStorage, users] );

    const value = React.useMemo( () => ({
        addUser,
        hasEmail,
        users,
        bookTimeRange,
        removeUser,
    }), [addUser, bookTimeRange, hasEmail, removeUser, users] );


    return <BookingProviderContext.Provider value={value}>
        {children}
    </BookingProviderContext.Provider>;
};

BookingProvider.propTypes = {
    children: PropTypes.node,
    accountName: PropTypes.string.isRequired,
    bookTimeRange: PropTypes.shape( {
        start: PropTypes.string,
        end: PropTypes.string,
    } ),
};


export default BookingProvider;
