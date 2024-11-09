import React, { useState } from 'react';
import { useForceUpdate } from './hooks';

const getDispatcher = () => {
    return (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher.current;
};

const setDispatcher = (w: any) => {
    (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher.current = w;
};

const withDispatcherPatch = (patch, predicate) => {
    const old = getDispatcher();

    setDispatcher({ ...old, ...patch });

    let result = predicate();

    setDispatcher(old);
     
    return result;
};

//
//
//

const allboxes = new Map();
const allrender = new Map();

const withBoxes = (key, predicate) => {
    let index = 0;

    // React.useEffect(() => {
    //     // allboxes.set(key, []);
    //     // allrender.set(key, new Map());

    //     return () => {
    //         allboxes.delete(key);
    //         allrender.delete(key);
    //     };
    // }, [key]);

    if (!allboxes.has(key)) {
        allboxes.set(key, []);
    }

    if (!allrender.has(key)) {
        allrender.set(key, new Map());
    }

    const rendermap = allrender.get(key);
    const componentId = React.useId();
    const forceUpdate = useForceUpdate();

    React.useEffect(() => {
        rendermap.set(componentId, forceUpdate);

        return () => {
            rendermap.delete(componentId);
        };
    }, [componentId, forceUpdate]);

    return predicate({
        next: () => {
            let currentIndex = index++;

            return {
                // has: () => allboxes.get(key)[currentIndex],
                get: () => allboxes.get(key)[currentIndex],
                set: (value) => { allboxes.get(key)[currentIndex] = value; },
            };
        },
        render: () => {
            // console.log('rendercall', rendermap)
            for (let [key, value] of rendermap) {
                // console.log({ key })
                rendermap.get(key)();
            }
        },
    });
};

//
//
//

const areDependenciesShallowEqual = (a, b) => {
    if (a === null) {
        return false;
    }

    // if ((typeof a) !== (typeof b)) {
    //     return false;
    // }

    if (a.length !== b.length) {
        return false;
    }

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) {
            return false;
        }
    }

    return true;
};

const useBetween = (predicate) => {
    return withBoxes(predicate, ({ next, render }) => {
        const useState = (def) => {
            const box = next();
            
            if (typeof box.get() === 'undefined') {
                box.set(def);
            }

            const value = box.get();

            const update = (value) => {
                box.set(value);
                render();
                // console.log('render ')
            };

            return [value, update];
        };

        const useEffect = (predicate, deps) => {
            if (typeof window === 'undefined') {
                return
            }
            
            const box = next();

            setTimeout(() => {
                const old = box.get();

                if (!old) {
                    box.set(deps);
                    return predicate();
                } 
                
                if (!areDependenciesShallowEqual(old, deps)) {
                    box.set(deps);
                    return predicate();
                }
            }, 0);        
        };

        return withDispatcherPatch({
            useState, useEffect,  
        }, () => {
            return predicate();
        });
    });
};

export { useBetween };
