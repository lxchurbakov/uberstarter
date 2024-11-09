import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import * as theme from 'lib/theme';
import { useForth } from 'lib/use-forth';
import { convert } from 'lib/md2jsx';

import { useSharedCounter } from './author';
import { useNavigate } from 'react-router-dom';

const Base = styled.div<{ mb?: string, mt?: string, mw?: string }>`
    margin-bottom: ${props => props.mb ?? 0};
    margin-top: ${props => props.mt ?? 0};
    max-width: ${props => props.mw ?? 'unset'};
`;

const Container = styled(Base)`
    max-width: 1080px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    padding: 0px 20px;
    box-sizing: border-box;
`;

const Text = styled(Base)<{ size?: string, weight?: string }>`
    font-family: ${theme.font.family};
    font-size: ${props => props.size ?? theme.font.size};
    font-weight: ${props => props.weight ?? 400};
    color: #222222;

    & pre {
        display: inline;
        font-size: 0.95rem;
        background: #dedede;
        border-radius: 5px;
    }
`;

const Link = styled.a`
    text-decoration: none;
    color: blue;
`;

export default () => {
    const navigate = useNavigate();
    const readme = useForth(() => 
        fetch('http://localhost:8000/api/v1/readme').then((r) => r.json())
    );

    const { value, increase } = useSharedCounter();

    const content = React.useMemo(() => {
        const tags = {
            'shared-counter': (
                <>
                    <Text onClick={increase}>Value is {value}. Click to increase</Text>
                    <Text onClick={() => navigate('/author')}>Go to author page</Text>
                </>
            ),
        };

        return readme ? convert(readme, { Text, tags }) : '';
    }, [readme, value]);

    

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
