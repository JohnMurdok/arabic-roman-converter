const DEFAULT_INPUT_PROPS = {
    fullWidth: true,
    margin: 'normal',
    variant: 'outlined',
    required: true,
} as const;

export const ROMAN_REG_EXP = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/i;

export const DEBOUNCE_TIME = 200;

export default DEFAULT_INPUT_PROPS;
