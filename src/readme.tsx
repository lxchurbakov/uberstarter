import React from 'react';
import { Helmet } from 'react-helmet';

import { useForth } from 'lib/use-forth';
import { convert } from 'lib/md2jsx';
import * as theme from 'lib/theme';

import { Container, Text } from './components';

export default () => {
    const readme = useForth(() => 
        fetch(process.env.SELF_URL + '/api/v1/readme').then((r) => r.json())
    );

    // const { value, increase } = useSharedCounter();

    const content = React.useMemo(() => {
        return readme ? convert(readme, { Text }) : '';
    }, [readme]);

    return (
        <>
            <Helmet>
                {theme.helmet}
                <title>Uberstarter main page</title>
                <style>{'body { margin: 0; background: #f5f5f5; padding: 0 }'}</style>
            </Helmet>
            
            <Container mt="128px">
                {content}
            </Container>
        </>
    );
};
