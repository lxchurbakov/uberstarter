import styled from "styled-components";
import * as theme from 'lib/theme';

export const Base = styled.div<{ mb?: string, mt?: string, mw?: string }>`
    margin-bottom: ${props => props.mb ?? 0};
    margin-top: ${props => props.mt ?? 0};
    max-width: ${props => props.mw ?? 'unset'};
`;

export const Container = styled(Base)`
    max-width: 1080px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    padding: 0px 20px;
    box-sizing: border-box;
`;

export const Text = styled(Base)<{ size?: string, weight?: string }>`
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

export const Link = styled.a`
    text-decoration: none;
    color: blue;
`;
