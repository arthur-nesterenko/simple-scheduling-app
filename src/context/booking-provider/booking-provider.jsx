import React from 'react';
import useSessionStorage from './../../hooks/use-session-storage';

/**
 *
 * @type {React.Context<{}>}
 */
export const BookingProviderContext = React.createContext( {} );

/**
 *
 * @param children
 * @returns {*}
 * @constructor
 */
const BookingProvider = ( { children } ) => {

    const [initialUsers, updateSessionStorage] = useSessionStorage( 'users', [], false );
    const [users, setUsers] = React.useState( () => initialUsers );

    const addUser = React.useCallback( ( email, slot ) => {
        setUsers( prev => [...prev, { email: email.toLowerCase(), slot }] );
    }, [] );

    const hasEmail = React.useCallback( ( email ) => {
        const usersSet = new Set( users.map( user => user.email ) );
        return usersSet.has( email );
    }, [users] );

    React.useEffect( () => {
        updateSessionStorage( users );
    }, [updateSessionStorage, users] );

    const value = React.useMemo( () => ({
        addUser,
        hasEmail,
        users,
    }), [addUser, hasEmail, users] );


    return <BookingProviderContext.Provider value={value}>
        {children}
    </BookingProviderContext.Provider>;
};


export default BookingProvider;
