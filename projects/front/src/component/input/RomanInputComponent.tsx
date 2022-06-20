import React, { useContext } from 'react';
import { useSetState, useDebounce } from 'react-use';
import { TextField } from '@mui/material';
import DEFAULT_INPUT_PROPS, { DEBOUNCE_TIME, ROMAN_REG_EXP } from '../../constant/input';
import numberConverter from '../../service/numberConverter';
import context from '../../context';

const ROMAN_INPUT_PROPS = {
    ...DEFAULT_INPUT_PROPS,
    type: 'string',
    label: 'Roman number',
};

const RomanInputComponent = () => {
    const { romanNumber, setArabicNumber, setRomanNumber } = useContext(context);
    const [state, setState] = useSetState({
        romanNumber,
        error: false,
    });

    const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        ev.preventDefault();
        const { value } = ev.target;
        const romanValue = value.toUpperCase();
        if (!romanValue.match(ROMAN_REG_EXP)) {
            setState({ error: true, romanNumber: romanValue });
            return;
        }
        setState({ error: false, romanNumber: romanValue });
        setRomanNumber(romanValue);
    };

    useDebounce(async () => {
        if (!romanNumber || state.romanNumber !== romanNumber || state.error) {
            return;
        }
        const arabicNumber = await numberConverter.convertToArabic(romanNumber);
        if (!arabicNumber) {
            // Handle error to user
            return;
        }
        setArabicNumber(arabicNumber);
    }, DEBOUNCE_TIME,[romanNumber, state]);

    return (
        <TextField
            data-testid={'roman-input'}
            error={!!state.error} {...ROMAN_INPUT_PROPS} onChange={onChange} value={romanNumber} />
    );
};

export default RomanInputComponent;
