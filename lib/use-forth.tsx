import React from 'react';

export const ForthContext = React.createContext(null as { mode: string, cache: ForthCache } | null);

export const useForth = <T,>(promisePredicate: () => Promise<T>) => {
    const context = React.useContext(ForthContext);
    const key = React.useId();

    if (!context) {
        throw new Error(`no context`);
    //     return;
    }

    const { mode, cache } = context;

    // if (mode === 'client') {
    //     return cache.get(key);
    // }

    if (!cache.has(key)) {
        const promise = Promise.resolve(promisePredicate());

        promise.then((value) => {
            cache.set(key, value);
        });

        throw new Promise((resolve) => {
            promise.then(resolve);
        });
    }
    
    return cache.get(key) as T;
};

export const Forth = ({ children, mode, cache }: React.PropsWithChildren<{ mode: string, cache: ForthCache }>) => {
    return (
        <ForthContext.Provider value={{ mode, cache }}>
            <React.Suspense fallback={<></>}>
                {children}
            </React.Suspense>
        </ForthContext.Provider>
    );
};

export class ForthCache {
    constructor (private cache = new Map<string, unknown>()) {}

    public static from = (cache: Map<string, unknown>) => {
        return new ForthCache(cache);
    };

    public static parse = (str: string) => {
        return ForthCache.from(new Map(JSON.parse(str)));
    };

    public stringify = () => {
        return JSON.stringify(Array.from(this.cache.entries()))
    };

    public has = (key: string) => {
        return this.cache.has(key);
    };

    public set = (key: string, value: unknown) => {
        return this.cache.set(key, value);
    };

    public get = (key: string) => {
        return this.cache.get(key);
    };
};
