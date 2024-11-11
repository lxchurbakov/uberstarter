import { useForth } from 'lib/use-forth';
import React from 'react';

const useDebouncedEffect = (time: number, predicate: () => void, deps) => {
    const timeoutRef = React.useRef(null as NodeJS.Timeout | null);

    React.useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(predicate, time)
    }, deps);
};

export default () => {
    const key = 'some-data';

    const [value, setValue] = React.useState(
        useForth(() => fetch(process.env.SELF_URL + `/api/v1/examples/s3/${key}`).then((r) => r.json()).catch(() => '')) 
    );

    useDebouncedEffect(500, () => {
        fetch(process.env.SELF_URL + `/api/v1/examples/s3/${key}`, { method: 'PUT', body: JSON.stringify({ value }), headers: { 'Content-Type': 'application/json' } });
    }, [value]);

    return (
        <div>
            This is an S3 Example. Edit value:

            <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter value" />
        </div>  
    );
};
