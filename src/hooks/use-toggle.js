import React from 'react';

/**
 *
 * @param initialValue
 * @returns {[unknown, function(): void]}
 */
const useToggle = ( initialValue ) => {
    const [on, setOn] = React.useState( initialValue );

    const onToggle = React.useCallback( () => setOn( prev => !prev ), [] );

    return [on, onToggle];
};

export default useToggle;
