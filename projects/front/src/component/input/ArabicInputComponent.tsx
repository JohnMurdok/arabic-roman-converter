import React, { useContext } from 'react';
import { useSetState } from 'react-use';
import { useDebounce } from 'react-use';
import { TextField } from '@mui/material';
import DEFAULT_INPUT_PROPS, { DEBOUNCE_TIME } from '../../constant/input';
import numberConverter from '../../service/numberConverter';
import context from '../../context';
import sseService from '../../service/sse';
import EventEnum from '../../enum/event';

const ARABIC_INPUT_PROPS = {
    ...DEFAULT_INPUT_PROPS,
    type: 'number',
    label: 'Arabic number',
    inputProps: {
        min: 1,
        step: 1,
    }
};

const NUMBER_REG_EXP = /^\d+$/;
interface IMessageEvent {
    romanNumber: string;
}

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
        if (!value.match(NUMBER_REG_EXP) || newValue <= 0) {
            setState({
                arabicNumber: newValue,
                error: true,
            });
            return;
        }
        setState({
            arabicNumber: newValue,
            error: false,
        });
        setArabicNumber(newValue);
    };

    useDebounce(async () => {
        if (!arabicNumber || state.arabicNumber !== arabicNumber || state.error) {
            return;
        }

        sseService.registerEvent(EventEnum.CONVERT_TO_ROMAN, (ev: IMessageEvent) => {
            setRomanNumber(ev.romanNumber);
        });

        await numberConverter.convertToRoman(arabicNumber, sseService.clientUuid);
    }, DEBOUNCE_TIME,[arabicNumber, state]);


    return (
        <TextField
            data-testid={'arabic-input'}
            error={!!state.error}
            {...ARABIC_INPUT_PROPS} onChange={onChange} value={arabicNumber} />
    );
}

export default ArabicInputComponent;
