import React from 'react';


const useSessionStorage = ( key, initialValue, raw ) => {
    const [state, setState] = React.useState( () => {
        try {
            const sessionStorageValue = sessionStorage.getItem( key );
            if ( typeof sessionStorageValue !== 'string' ) {
                sessionStorage.setItem( key, raw ? String( initialValue ) : JSON.stringify( initialValue ) );
                return initialValue;
            } else {
                return raw ? sessionStorageValue : JSON.parse( sessionStorageValue || 'null' );
            }
        } catch {

            return initialValue;
        }
    } );

    React.useEffect( () => {
        try {
            const serializedState = raw ? String( state ) : JSON.stringify( state );
            sessionStorage.setItem( key, serializedState );
        } catch {

        }
    } );
    

    return [state, setState];
};


export default useSessionStorage;
