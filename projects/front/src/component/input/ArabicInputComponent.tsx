import React, { useContext } from 'react';
import { useSetState } from 'react-use';
import { useDebounce } from 'react-use';
import { TextField } from '@mui/material';
import DEFAULT_INPUT_PROPS, { DEBOUNCE_TIME } from '../../constant/input';
import numberConverter from '../../service/numberConverter';
import context from '../../context';

const ARABIC_INPUT_PROPS = {
    ...DEFAULT_INPUT_PROPS,
    type: 'number',
    label: 'Arabic number',
    inputProps: {
        min: 1,
    }
};

const ArabicInputComponent = () => {
    const {
        arabicNumber,
        setRomanNumber,
        setArabicNumber,
    } = useContext(context);
    const [state, setState] = useSetState({
        error: false,
        arabicNumber,
    });

    const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        ev.preventDefault();
        const { value } = ev.target;
        const newValue = Number(value);
        setState({
            arabicNumber: newValue,
            error: newValue <= 0,
        });
        setArabicNumber(newValue);
    };

    useDebounce(async () => {
        if (!arabicNumber || state.arabicNumber !== arabicNumber || state.error) {
            return;
        }
        const romanNumber = await numberConverter.convertToRoman(arabicNumber);
        if (!romanNumber) {
            // TODO: Handle error message
            return;
        }
        setRomanNumber(romanNumber);
    }, DEBOUNCE_TIME,[arabicNumber, state]);


    return (
        <TextField
            data-testid={'arabic-input'}
            error={!!state.error}
            {...ARABIC_INPUT_PROPS} onChange={onChange} value={arabicNumber} />
    );
}

export default ArabicInputComponent;
