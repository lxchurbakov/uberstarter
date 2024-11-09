import React from 'react';
import { Helmet } from 'react-helmet';;

// import { MainPage } from './main/page';
// import { Text } from './components/atoms';
import * as theme from 'lib/theme';
import { useForth } from 'lib/use-forth';
// import { Switch, Route, useRouter } from 'lib/router';
// import { Notifications } from 'lib/notifcations';

export default () => {
    const [counter, setCounter] = React.useState(
        useForth(() => Promise.resolve(
            Math.floor(Math.random() * 100)
        ))
    );

    return (
        <>
            <Helmet>
                {theme.helmet}
                <title>Uberstarter main page</title>
                <style>{'body { margin: 0; background: #f5f5f5; padding: 0 }'}</style>
            </Helmet>
            
            <div onClick={() => setCounter($ => $ + 1)}>It works on client-side too {counter}</div>
        </>
    );
};
