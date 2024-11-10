import React from 'react';
import { useBetween } from 'use-between';
import { useNavigate } from 'react-router-dom';

const _useSharedCounter = () => {
    const [value, setValue] = React.useState(0);

    const increase = React.useCallback(() => {
        setValue(value + 1);
    }, [value, setValue]);

    return { value, increase };
};

export const useSharedCounter = () => useBetween(_useSharedCounter);

export default () => {
    const { value } = useSharedCounter();
    const navigate = useNavigate();    

    return (
        <>
            <div>My name is Alex and value is {value}</div>
            <div onClick={() => navigate('/')}>Click to go to main page</div>
        </>
    );
};