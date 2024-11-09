import React from 'react';
// import { Helmet } from 'react-helmet';;

// import { MainPage } from './main/page';
// import { Text } from './components/atoms';
// import * as theme from './components/theme';
// import { Switch, Route, useRouter } from 'lib/router';
// import { Notifications } from 'lib/notifcations';
// import { ProfilePage } from './profile/page';
// import { SessionPage } from './session/page';

export default () => {
    // const { navigate } = useRouter();
    const [counter, setCounter] = React.useState(0);

    return (
        <>
            {/* <Helmet>
                {theme.helmet}
                <style>{'body { margin: 0; background: #f5f5f5; padding: 0 }'}</style>
            </Helmet> */}
            
            <div onClick={() => setCounter($ => $ + 1)}>It works on client-side too {counter}</div>
        </>
    );
};
