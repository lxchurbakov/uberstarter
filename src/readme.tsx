import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

// import { MainPage } from './main/page';
// import { Text } from './components/atoms';
import * as theme from 'lib/theme';
import { useForth } from 'lib/use-forth';
import { convert } from 'lib/md2jsx';
// import { Switch, Route, useRouter } from 'lib/router';

const Base = styled.div<{ mb?: string, mt?: string, mw?: string }>`
    margin-bottom: ${props => props.mb ?? 0};
    margin-top: ${props => props.mt ?? 0};
    max-width: ${props => props.mw ?? 'unset'};
`;

const Container = styled(Base)`
    max-width: 1080px;
    margin: 0 auto;
    width: 100%;
    padding: 0px 20px;
`;

const Text = styled(Base)<{ size?: string, weight?: string }>`
    font-family: ${theme.font.family};
    font-size: ${props => props.size ?? theme.font.size};
    font-weight: ${props => props.weight ?? 400};
    color: #222222;
`;

const Link = styled.a`
    text-decoration: none;
    color: blue;
`;

export default () => {
    // const [counter, setCounter] = React.useState(
    //     useForth(() => Promise.resolve(
    //         Math.floor(Math.random() * 100)
    //     ))
    // );

    const readme = useForth(() => fetch('http://localhost:8000/api/v1/readme').then((r) => r.json()));

    const content = React.useMemo(() => {
        if (!readme) {
            return '';
        }

        return convert(readme, { Text });
    }, [readme]);

    return (
        <>
            <Helmet>
                {theme.helmet}
                <title>Uberstarter main page</title>
                <style>{'body { margin: 0; background: #f5f5f5; padding: 0 }'}</style>
            </Helmet>
            
            <Container>
                {/* <Text size="32px" weight="600" mb="32px" mt="128px">
                    Uberstarter template
                </Text>

                <Text size="22px" weight="400" mw="650px">
                    Uberstarter is a great way to start your project. It has most of the commonly required features built in.&nbsp;
                    <Link href="#typescript">Typescript</Link>, React, Styled Components, Router, SSR, Api Proxy and State Management.
                </Text> */}

                {/* <Text onClick={() => setCounter($ => $ + 1)}>
                    SSR TEST {counter}
                </Text> */}
                {content}
            </Container>
        </>
    );
};


/*

const fetch = (url, { body, method, headers }) => {

};

// Definition

const { router, fetch } = require('fetchup');

const myRouter = router();

myRouter.get('/api/v1/test', async ({ body, headers }) => {
  
});

app.use('/', myRouter.toExpressRouter());

// application.ts

fetch('/api/v1/test').then((data) => {

});

*/
