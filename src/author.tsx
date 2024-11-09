import React from 'react';
import { useForth } from 'lib/use-forth';

const Component = () => {
    const value = useForth(() => {
        // You can async do whatever you want here
        return new Promise<number>((resolve) => {
            let value = 0;

            for (;value < 3; value = Math.random() * 10) {}

            resolve(value);
        });
    });

    return (
        <div>Should be more than 3: {value}</div>
    );
};

export default () => {
    return (
        <div>My name is Alex <Component /></div>
    );
};