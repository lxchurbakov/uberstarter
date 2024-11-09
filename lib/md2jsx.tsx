import React from 'react';

export const convert = (md: string, { Text }) => {
    return md.split('\n').map((line, index) => {
        if (!line) {
            return null;
        }

        if (line.startsWith('###')) {
            return (
                <Text mw="600px" key={index} size="18px" weight="bold" mb="8px">{line.slice(3)}</Text>
            );
        }

        if (line.startsWith('##')) {
            return (
                <Text mw="600px" key={index} size="22px" weight="bold" mb="8px">{line.slice(2)}</Text>
            );
        }

        if (line.startsWith('#')) {
            return (
                <Text mw="600px" key={index} size="32px" weight="bold" mb="8px">{line.slice(1)}</Text>
            );
        }

        return <Text mw="600px" key={index} size="18px" weight="400" mb="12px">{line}</Text>;
    }).filter(Boolean);
};
