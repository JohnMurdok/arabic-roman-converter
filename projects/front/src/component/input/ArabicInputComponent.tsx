import { TextField } from '@mui/material';
import DEFAULT_INPUT_PROPS from '../../constant/input';

const ARABIC_INPUT_PROPS = {
    ...DEFAULT_INPUT_PROPS,
    type: 'number',
    label: 'Arabic number',
    inputProps: {
        min: 1,
    }
};

const ArabicInputComponent = () => (
    <TextField {...ARABIC_INPUT_PROPS} />
);

export default ArabicInputComponent;
