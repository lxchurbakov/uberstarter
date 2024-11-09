import React from 'react';

export const useForceUpdate = ([value, setValue] = React.useState(false)) =>
    React.useCallback(() => setValue(!value), [value, setValue]);
