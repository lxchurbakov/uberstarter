import React from "react";
import { Base, Container, Text } from "@/components";

const useMemoAsync = <T,>(predicate: () => Promise<T>, deps) => {
    const [value, setValue] = React.useState(null as null | T);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        predicate()
            .then(($) => setValue($))
            .catch((e) => setError(e))
            .then(() => setLoading(false))
    }, deps);

    return [value, loading, error] as const;
};

const useForceUpdate = ([value, setValue] = React.useState(false)) =>
    React.useCallback(() => setValue(!value), [value, setValue]);

const useTicker = (forceUpdate = useForceUpdate()) =>
    React.useMemo(() => ({ update: forceUpdate }), [forceUpdate]);

const api = {
    get: (key: string) => {
        return fetch(process.env.SELF_URL + `/api/v1/examples/redis/${key}`, { 
            method: 'GET', headers: { 'Content-Type': 'application/json' } 
        }).then((r) => r.json());
    },
    set: (key: string, value: string) => {
        return fetch(process.env.SELF_URL + `/api/v1/examples/redis/${key}`, { 
            method: 'PUT', body: JSON.stringify({ value }), headers: { 'Content-Type': 'application/json' } 
        }).then((r) => r.json());
    },
    // create: (text: string) => {
        
    // },
    // list: () => {
    //     return fetch(process.env.SELF_URL + '/api/v1/examples/postgres', { 
    //         method: 'GET', headers: { 'Content-Type': 'application/json' } 
    //     }).then((r) => r.json());
    // },
    // remove: (id: string) => {
    //     return fetch(process.env.SELF_URL + `/api/v1/examples/postgres/${id}`, { 
    //         method: 'DELETE', headers: { 'Content-Type': 'application/json' } 
    //     }).then((r) => r.json());
    // },
};

export default () => {
    const key = 'test-key';
    const ticker = useTicker();
    const [value] = useMemoAsync(() => api.get(key), [key, ticker]);

    // const [text, setText] = React.useState('');

    // const create = React.useCallback(() => {
    //     api.create(text)
    //         .then(ticker.update);
    // }, [ticker, text]);

    const update = React.useCallback(($: string) => {
        api.set(key, $)
            .then(ticker.update);
    }, [key, ticker]);

    return (
        <Container>
            <Text>Redis example (string):</Text>

            {/* <Base>
                {(todos || []).map((todo, index) => (
                    <Text mb="4px" key={todo.id}>· {todo.text} <span onClick={() => remove(todo.id)}>❌</span></Text>
                ))}
            </Base> */}

            <input value={value} onChange={(e) => update(e.target.value)} />
            {/* <button onClick={create}>Create</button> */}
        </Container>
    );
};
