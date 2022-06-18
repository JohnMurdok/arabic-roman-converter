import React, { useState } from 'react';
import { TextField } from '@mui/material';
import DEFAULT_INPUT_PROPS, { ROMAN_REG_EXP } from '../../constant/input';

// const DEBOUNCE_TIME = 2000;
const ROMAN_INPUT_PROPS = {
    ...DEFAULT_INPUT_PROPS,
    type: 'string',
    label: 'Roman number',
};

const RomanInputComponent = () => {
    const [error, setError] = useState(false);

    const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = ev.target;
        if (!value.match(ROMAN_REG_EXP)) {
            setError(true);
            return;
        }
        setError(false);
    };


    return (
        <TextField error={error} {...ROMAN_INPUT_PROPS} onChange={onChange} />
    );
};

export default RomanInputComponent;
